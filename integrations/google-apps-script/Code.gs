const PUBLIC_TABS = ['Settings', 'Competitions', 'Participants', 'Results', 'Programme', 'Venues', 'Gallery', 'Highlights'];
const LEGACY_REGISTRATION_TAB = 'Guest Registration';
const ATTENDANCE_TAB = 'Attendance';
const FEEDBACK_TAB = 'Feedback';
const CERTIFICATES_TAB = 'Certificates';

const ATTENDANCE_HEADERS = ['attendance_id', 'registered_at', 'full_name', 'name_normalized', 'organisation_or_school', 'phone_number', 'phone_normalized', 'category', 'other_category', 'roles', 'attendance_status', 'feedback_status', 'certificate_status', 'certificate_number', 'template_version', 'source'];
const FEEDBACK_HEADERS = ['feedback_id', 'attendance_id', 'submitted_at', 'rating_time_allocation', 'rating_venue_facilities', 'rating_information_platform', 'rating_inspiration', 'rating_positive_impact', 'rating_creative_critical', 'continue_future', 'improvement', 'participate_future', 'completion_status', 'source'];
const CERTIFICATE_HEADERS = ['certificate_number', 'attendance_id', 'full_name', 'eligible_at', 'template_version', 'status', 'generated_count', 'last_generated_at'];

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || '');
  if (action === 'lookup_attendance') {
    ensureJourneySheets_();
    return json_(lookupAttendance_({ phone_normalized: e && e.parameter && e.parameter.phone_normalized }));
  }
  const tab = String((e && e.parameter && e.parameter.tab) || '');
  if (!PUBLIC_TABS.includes(tab)) return json_({ ok: false, message: 'Tab tidak dibenarkan.' });
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sheet) return json_({ ok: false, message: 'Tab tidak ditemui.' });
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return json_({ ok: true, rows: [] });
  const headers = values[0];
  const rows = values.slice(1).filter(row => row.some(Boolean)).map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
  return json_({ ok: true, rows: rows });
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const expectedKey = PropertiesService.getScriptProperties().getProperty('PUICE_WEBHOOK_KEY');
    if (!expectedKey || payload.webhook_key !== expectedKey) return json_({ ok: false, message: 'Akses tidak dibenarkan.' });
    ensureJourneySheets_();
    if (payload.action === 'create_attendance') return json_(createAttendance_(payload));
    if (payload.action === 'lookup_attendance') return json_(lookupAttendance_(payload));
    if (payload.action === 'submit_feedback') return json_(submitFeedback_(payload));
    return json_(legacyRegistration_(payload));
  } catch (error) {
    return json_({ ok: false, message: String(error) });
  }
}

function createAttendance_(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ATTENDANCE_TAB);
  const phone = normalizePhone_(payload.phone_normalized || payload.phone_number);
  const nameNormalized = normalizeName_(payload.full_name);
  if (!phone || !nameNormalized) return { ok: false, message: 'Maklumat kehadiran tidak lengkap.' };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const values = sheet.getDataRange().getDisplayValues();
    const duplicate = values.slice(1).find(row => row[3] === nameNormalized && row[6] === phone && normalizeName_(row[4]) === normalizeName_(payload.organisation_or_school));
    if (duplicate) return { ok: true, duplicate: true, record: attendanceRecord_(duplicate), message: 'Rekod kehadiran ini sudah wujud.' };
    const attendanceId = 'PU26-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
    const row = [attendanceId, payload.registered_at || new Date().toISOString(), payload.full_name, nameNormalized, payload.organisation_or_school, payload.phone_number, phone, payload.category, payload.other_category || '', payload.roles, 'CHECKED_IN', 'PENDING', 'NOT_ELIGIBLE', '', payload.template_version || 'PUICE-2026-V1', payload.source || 'WEBSITE'];
    sheet.appendRow(row);
    return { ok: true, record: attendanceRecord_(row), message: 'Kehadiran berjaya direkodkan.' };
  } finally { lock.releaseLock(); }
}

function lookupAttendance_(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ATTENDANCE_TAB);
  const phone = normalizePhone_(payload.phone_normalized || payload.phone_number);
  const values = sheet.getDataRange().getDisplayValues();
  return { ok: true, records: values.slice(1).filter(row => normalizePhone_(row[6] || row[5]) === phone).map(attendanceRecord_) };
}

function submitFeedback_(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const attendanceSheet = ss.getSheetByName(ATTENDANCE_TAB);
  const feedbackSheet = ss.getSheetByName(FEEDBACK_TAB);
  const certificateSheet = ss.getSheetByName(CERTIFICATES_TAB);
  const values = attendanceSheet.getDataRange().getDisplayValues();
  const index = values.findIndex((row, rowIndex) => rowIndex > 0 && row[0] === payload.attendance_id);
  if (index < 1) return { ok: false, message: 'Rekod kehadiran tidak ditemui.' };
  const row = values[index];
  if (row[11] === 'COMPLETE' && row[13]) return { ok: true, record: attendanceRecord_(row), message: 'Maklum balas telah dilengkapkan sebelum ini.' };
  const ratings = Array.isArray(payload.ratings) ? payload.ratings : [];
  if (ratings.length !== 6) return { ok: false, message: 'Jawapan maklum balas tidak lengkap.' };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const feedbackId = 'FB-' + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
    const certificateNumber = certificateNumber_(row[0]);
    const eligibleAt = payload.submitted_at || new Date().toISOString();
    feedbackSheet.appendRow([feedbackId, row[0], eligibleAt, ratings[0], ratings[1], ratings[2], ratings[3], ratings[4], ratings[5], payload.continue_future, payload.improvement, payload.participate_future, 'COMPLETE', payload.source || 'WEBSITE']);
    attendanceSheet.getRange(index + 1, 12, 1, 3).setValues([['COMPLETE', 'ELIGIBLE', certificateNumber]]);
    certificateSheet.appendRow([certificateNumber, row[0], row[2], eligibleAt, row[14] || 'PUICE-2026-V1', 'ELIGIBLE', 0, '']);
    row[11] = 'COMPLETE'; row[12] = 'ELIGIBLE'; row[13] = certificateNumber;
    return { ok: true, record: attendanceRecord_(row), message: 'Maklum balas lengkap. Sijil anda kini tersedia.' };
  } finally { lock.releaseLock(); }
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

function certificateNumber_(attendanceId) { return 'PUICE26-' + String(attendanceId).replace(/[^A-Z0-9]/gi, '').slice(-8).toUpperCase(); }
function normalizePhone_(value) { return String(value || '').replace(/\D/g, '').replace(/^60(?=1)/, '').replace(/^0(?=1)/, ''); }
function normalizeName_(value) { return String(value || '').trim().toUpperCase().replace(/\s+/g, ' '); }

function legacyRegistration_(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEGACY_REGISTRATION_TAB);
  if (!sheet) return { ok: false, message: 'Tindakan tidak dikenali.' };
  sheet.appendRow([payload.registration_id, payload.registered_at, payload.full_name, payload.organisation_or_school, payload.role, payload.phone_or_email, payload.number_of_guests, payload.attendance_status, payload.consent_public_updates, payload.notes, payload.category, payload.other_category, payload.rating_time_allocation, payload.rating_venue_facilities, payload.rating_information_platform, payload.rating_inspiration, payload.rating_positive_impact, payload.rating_creative_critical, payload.continue_future, payload.improvement, payload.participate_future, payload.completion_status]);
  return { ok: true, registration_id: payload.registration_id };
}

function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
