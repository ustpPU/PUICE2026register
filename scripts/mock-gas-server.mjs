import { createServer } from 'node:http';

const port = Number(process.argv[2] || 3021);
const records = [];
const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const send = (response, value) => { response.writeHead(200, headers); response.end(JSON.stringify(value)); };

createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);
  if (request.method === 'GET') {
    if (url.searchParams.get('action') === 'journey_settings') return send(response, { ok: true, settings: { testMode: true, attendanceEnabled: true, attendanceOpenAt: '2026-09-10T08:00:00+08:00', feedbackEnabled: true, feedbackOpenAt: '2026-09-10T11:00:00+08:00', certificateEnabled: true } });
    const tab = url.searchParams.get('tab');
    if (tab === 'Participants') return send(response, { ok: true, rows: [{ participant_id: 'QA-001', display_name: 'Peserta Ujian', school_name: 'Sekolah Ujian', competition_id: 'pbl', audience: 'MURID', featured: 'TRUE', public_visibility: 'TRUE' }] });
    if (tab === 'Results') return send(response, { ok: true, rows: [{ result_id: 'QR-001', competition_id: 'pbl', participant_id: 'QA-001', award: 'PLATINUM', result_state: 'AVAILABLE', reveal_at: '', display_order: '1', citation_bm: 'Ujian migrasi' }] });
    return send(response, { ok: true, rows: [] });
  }
  let body = '';
  request.on('data', chunk => { body += chunk; });
  request.on('end', () => {
    const payload = JSON.parse(body || '{}');
    if (payload.action === 'create_attendance') {
      const record = { attendance_id: `QA-${String(records.length + 1).padStart(3, '0')}`, full_name: payload.full_name, organisation_or_school: payload.organisation_or_school, phone_number: payload.phone_number, attendance_status: 'CHECKED_IN', feedback_status: 'PENDING', certificate_status: 'NOT_ELIGIBLE', certificate_number: '' };
      records.push(record);
      return send(response, { ok: true, record, message: 'Kehadiran ujian berjaya direkodkan.' });
    }
    if (payload.action === 'lookup_attendance') return send(response, { ok: true, records });
    if (payload.action === 'submit_feedback') {
      const record = records.find(item => item.attendance_id === payload.attendance_id);
      if (!record) return send(response, { ok: false, message: 'Rekod ujian tidak ditemui.' });
      record.feedback_status = 'COMPLETE'; record.certificate_status = 'ELIGIBLE'; record.certificate_number = `PUICE26-${record.attendance_id}`;
      return send(response, { ok: true, record, message: 'Maklum balas ujian lengkap.' });
    }
    return send(response, { ok: false, message: 'Tindakan ujian tidak dikenali.' });
  });
}).listen(port, '127.0.0.1', () => console.log(`Mock Apps Script API: http://localhost:${port}/exec`));
