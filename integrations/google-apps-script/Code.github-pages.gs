/**
 * PUICE 2026 — GitHub Pages API candidate.
 * Deploy this as a Google Apps Script Web App only during the approved rollout.
 * Execute as: Me. Access: Anyone.
 */

const PUBLIC_FIELDS = {
  Settings: ['setting_key', 'setting_value', 'key', 'value', 'setting', 'name', 'value_bm'],
  Competitions: ['competition_id', 'slug', 'official_name', 'audience', 'phase', 'status', 'published'],
  Participants: ['participant_id', 'display_name', 'school_name', 'competition_id', 'audience', 'featured', 'public_visibility'],
  Results: ['result_id', 'competition_id', 'participant_id', 'award', 'result_state', 'reveal_at', 'display_order', 'citation_bm'],
  Programme: ['programme_id', 'start_time', 'end_time', 'title_bm', 'title_en', 'venue_id', 'programme_type', 'details_bm', 'published'],
  Venues: ['venue_id', 'name_bm', 'zone', 'published'],
  Gallery: ['media_id', 'title_bm', 'category', 'media_url', 'album_url', 'external_url', 'published'],
  Highlights: ['highlight_id', 'title_bm', 'summary_bm', 'media_url', 'published']
};

const ATTENDANCE_TAB = 'Attendance';
const FEEDBACK_TAB = 'Feedback';
const CERTIFICATES_TAB = 'Certificates';
const ATTENDANCE_HEADERS = ['attendance_id', 'registered_at', 'full_name', 'name_normalized', 'organisation_or_school', 'phone_number', 'phone_normalized', 'category', 'other_category', 'roles', 'attendance_status', 'feedback_status', 'certificate_status', 'certificate_number', 'template_version', 'source'];
const FEEDBACK_HEADERS = ['feedback_id', 'attendance_id', 'submitted_at', 'rating_time_allocation', 'rating_venue_facilities', 'rating_information_platform', 'rating_inspiration', 'rating_positive_impact', 'rating_creative_critical', 'continue_future', 'improvement', 'participate_future', 'completion_status', 'source'];
const CERTIFICATE_HEADERS = ['certificate_number', 'attendance_id', 'full_name', 'eligible_at', 'template_version', 'status', 'generated_count', 'last_generated_at'];

function doGet(e) {
  try {
    const action = clean_(e && e.parameter && e.parameter.action, 40);
    if (action === 'journey_settings') return json_({ ok: true, settings: journeySettings_() });
    const tab = clean_(e && e.parameter && e.parameter.tab, 40);
    if (!PUBLIC_FIELDS[tab]) return json_({ ok: false, message: 'Tab tidak dibenarkan.' });
    return json_({ ok: true, rows: publicRows_(tab) });
  } catch (error) {
    return json_({ ok: false, message: 'Data tidak dapat dibaca.', detail: String(error) });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (payload.website) return json_({ ok: false, message: 'Permintaan tidak sah.' });
    ensureJourneySheets_();
    const action = clean_(payload.action, 40);
    const settings = journeySettings_();
    if (action === 'create_attendance') {
      if (!accessOpen_(settings, 'attendance')) return json_({ ok: false, message: 'Borang kehadiran belum dibuka.' });
      rateLimit_(action, payload.phone_number || payload.phone_normalized, 12, 600);
      return json_(createAttendance_(payload));
    }
    if (action === 'lookup_attendance') {
      rateLimit_(action, payload.phone_number || payload.phone_normalized, 40, 600);
      return json_(lookupAttendance_(payload));
    }
    if (action === 'submit_feedback') {
      if (!accessOpen_(settings, 'feedback')) return json_({ ok: false, message: 'Maklum balas belum dibuka.' });
      rateLimit_(action, payload.attendance_id, 12, 600);
      return json_(submitFeedback_(payload));
    }
    return json_({ ok: false, message: 'Tindakan tidak dikenali.' });
  } catch (error) {
    return json_({ ok: false, message: String(error).replace(/^Error:\s*/, '') });
  }
}

function publicRows_(tab) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sheet) return [];
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  const allowed = PUBLIC_FIELDS[tab];
  return values.slice(1).filter(row => row.some(Boolean)).map(row => {
    const source = Object.fromEntries(headers.map((header, index) => [header, row[index] || '']));
    return Object.fromEntries(allowed.map(field => [field, source[field] || '']));
  }).filter(row => tab !== 'Participants' || String(row.public_visibility).toUpperCase() === 'TRUE');
}

function journeySettings_() {
  const defaults = {
    testMode: false,
    attendanceEnabled: true,
    attendanceOpenAt: '2026-09-10T08:00:00+08:00',
    feedbackEnabled: true,
    feedbackOpenAt: '2026-09-10T11:00:00+08:00',
    certificateEnabled: true
  };
  const rows = publicRows_('Settings');
  const values = {};
  rows.forEach(row => {
    const key = normalizeSettingKey_(row.setting_key || row.key || row.setting || row.name);
    const value = row.setting_value || row.value || row.value_bm || '';
    if (key) values[key] = value;
  });
  return {
    testMode: bool_(values.test_mode, defaults.testMode),
    attendanceEnabled: bool_(values.attendance_form_enabled, defaults.attendanceEnabled),
    attendanceOpenAt: validDate_(values.attendance_open_at, defaults.attendanceOpenAt),
    feedbackEnabled: bool_(values.feedback_form_enabled, defaults.feedbackEnabled),
    feedbackOpenAt: validDate_(values.feedback_open_at, defaults.feedbackOpenAt),
    certificateEnabled: bool_(values.certificate_enabled, defaults.certificateEnabled)
  };
}

function accessOpen_(settings, type) {
  if (settings.testMode) return true;
  if (type === 'attendance') return settings.attendanceEnabled && Date.now() >= new Date(settings.attendanceOpenAt).getTime();
  if (type === 'feedback') return settings.feedbackEnabled && Date.now() >= new Date(settings.feedbackOpenAt).getTime();
  return settings.certificateEnabled;
}

function createAttendance_(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ATTENDANCE_TAB);
  const fullName = clean_(payload.full_name, 160);
  const organisation = clean_(payload.organisation_or_school, 200);
  const phoneDisplay = clean_(payload.phone_number, 40);
  const phone = normalizePhone_(payload.phone_normalized || phoneDisplay);
  const nameNormalized = normalizeName_(fullName);
  const category = clean_(payload.category, 120);
  const otherCategory = clean_(payload.other_category, 160);
  const roles = Array.isArray(payload.roles) ? payload.roles.map(value => clean_(value, 120)).filter(Boolean).join(' | ') : clean_(payload.roles, 600);
  if (!fullName || !organisation || phone.length < 8 || !category || !roles || (category === 'Lain-lain' && !otherCategory)) return { ok: false, message: 'Lengkapkan semua maklumat kehadiran.' };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const values = sheet.getDataRange().getDisplayValues();
    const duplicate = values.slice(1).find(row => row[3] === nameNormalized && row[6] === phone && normalizeName_(row[4]) === normalizeName_(organisation));
    if (duplicate) return { ok: true, duplicate: true, record: attendanceRecord_(duplicate), message: 'Rekod kehadiran ini sudah wujud.' };
    const attendanceId = 'PU26-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
    const row = [attendanceId, new Date().toISOString(), safeCell_(fullName), nameNormalized, safeCell_(organisation), safeCell_(phoneDisplay), phone, safeCell_(category), safeCell_(otherCategory), safeCell_(roles), 'CHECKED_IN', 'PENDING', 'NOT_ELIGIBLE', '', 'PUICE-2026-V1', safeCell_(payload.source || 'GITHUB_PAGES')];
    sheet.appendRow(row);
    return { ok: true, record: attendanceRecord_(row), message: 'Kehadiran berjaya direkodkan.' };
  } finally {
    lock.releaseLock();
  }
}

function lookupAttendance_(payload) {
  const phone = normalizePhone_(payload.phone_normalized || payload.phone_number);
  if (phone.length < 8) return { ok: false, message: 'Masukkan nombor telefon yang sah.' };
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ATTENDANCE_TAB);
  const values = sheet.getDataRange().getDisplayValues();
  return { ok: true, records: values.slice(1).filter(row => row[6] === phone).map(attendanceRecord_) };
}

function submitFeedback_(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const attendanceSheet = ss.getSheetByName(ATTENDANCE_TAB);
  const feedbackSheet = ss.getSheetByName(FEEDBACK_TAB);
  const certificateSheet = ss.getSheetByName(CERTIFICATES_TAB);
  const values = attendanceSheet.getDataRange().getDisplayValues();
  const attendanceId = clean_(payload.attendance_id, 80);
  const index = values.findIndex((row, rowIndex) => rowIndex > 0 && row[0] === attendanceId);
  if (index < 1) return { ok: false, message: 'Rekod kehadiran tidak ditemui.' };
  const row = values[index];
  if (row[11] === 'COMPLETE' && row[13]) return { ok: true, record: attendanceRecord_(row), message: 'Maklum balas telah dilengkapkan sebelum ini.' };
  const ratings = Array.isArray(payload.ratings) ? payload.ratings.map(Number) : [];
  if (ratings.length !== 6 || ratings.some(value => !Number.isInteger(value) || value < 1 || value > 4)) return { ok: false, message: 'Jawapan maklum balas tidak lengkap.' };
  const continueFuture = clean_(payload.continue_future, 20);
  const improvement = clean_(payload.improvement, 1500);
  const participateFuture = clean_(payload.participate_future, 20);
  if (!continueFuture || !improvement || !participateFuture || payload.confirmation !== true) return { ok: false, message: 'Lengkapkan semua soalan maklum balas.' };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const feedbackId = 'FB-' + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
    const certificateNumber = certificateNumber_(row[0]);
    const eligibleAt = new Date().toISOString();
    feedbackSheet.appendRow([feedbackId, row[0], eligibleAt, ...ratings, safeCell_(continueFuture), safeCell_(improvement), safeCell_(participateFuture), 'COMPLETE', safeCell_(payload.source || 'GITHUB_PAGES')]);
    attendanceSheet.getRange(index + 1, 12, 1, 3).setValues([['COMPLETE', 'ELIGIBLE', certificateNumber]]);
    certificateSheet.appendRow([certificateNumber, row[0], row[2], eligibleAt, row[14] || 'PUICE-2026-V1', 'ELIGIBLE', 0, '']);
    row[11] = 'COMPLETE'; row[12] = 'ELIGIBLE'; row[13] = certificateNumber;
    return { ok: true, record: attendanceRecord_(row), message: 'Maklum balas lengkap. Sijil anda kini tersedia.' };
  } finally {
    lock.releaseLock();
  }
}

function attendanceRecord_(row) {
  return { attendance_id: row[0], registered_at: row[1], full_name: row[2], organisation_or_school: row[4], phone_number: row[5], category: row[7], roles: row[9], attendance_status: row[10], feedback_status: row[11], certificate_status: row[12], certificate_number: row[13], template_version: row[14] };
}

function ensureJourneySheets_() {
  ensureSheet_(ATTENDANCE_TAB, ATTENDANCE_HEADERS, 2000);
  ensureSheet_(FEEDBACK_TAB, FEEDBACK_HEADERS, 2000);
  ensureSheet_(CERTIFICATES_TAB, CERTIFICATE_HEADERS, 2000);
}

function ensureSheet_(name, headers, rowCount) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (sheet) return sheet;
  sheet = ss.insertSheet(name);
  if (sheet.getMaxRows() < rowCount) sheet.insertRowsAfter(sheet.getMaxRows(), rowCount - sheet.getMaxRows());
  if (sheet.getMaxColumns() < headers.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setBackground('#132341').setFontColor('#ffffff').setFontWeight('bold').setWrap(true);
  sheet.setFrozenRows(1); sheet.setHiddenGridlines(true); sheet.autoResizeColumns(1, headers.length);
  return sheet;
}

function rateLimit_(action, identity, limit, seconds) {
  const digest = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(identity || 'anonymous'))).slice(0, 18);
  const key = 'rate:' + action + ':' + digest;
  const cache = CacheService.getScriptCache();
  const count = Number(cache.get(key) || 0) + 1;
  if (count > limit) throw new Error('Terlalu banyak percubaan. Sila tunggu sebentar dan cuba semula.');
  cache.put(key, String(count), seconds);
}

function clean_(value, limit) { return String(value || '').trim().slice(0, limit || 200); }
function safeCell_(value) { const text = clean_(value, 1500); return /^[=+\-@]/.test(text) ? "'" + text : text; }
function certificateNumber_(attendanceId) { return 'PUICE26-' + String(attendanceId).replace(/[^A-Z0-9]/gi, '').slice(-8).toUpperCase(); }
function normalizePhone_(value) { return String(value || '').replace(/\D/g, '').replace(/^60(?=1)/, '').replace(/^0(?=1)/, ''); }
function normalizeName_(value) { return clean_(value, 160).toUpperCase().replace(/\s+/g, ' '); }
function normalizeSettingKey_(value) { return clean_(value, 100).toLowerCase().replace(/[\s-]+/g, '_'); }
function bool_(value, fallback) { if (value === undefined || String(value).trim() === '') return fallback; return ['TRUE', 'YES', 'YA', '1', 'ON', 'ENABLED'].includes(String(value).trim().toUpperCase()); }
function validDate_(value, fallback) { return value && !isNaN(new Date(value).getTime()) ? String(value) : fallback; }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
