import { NextResponse } from 'next/server';
import { journeyAccess, readJourneySettings } from '../../../lib/journey-settings';

type WebhookResult = {
  ok?: boolean;
  message?: string;
  record?: Record<string, unknown>;
  records?: Array<Record<string, unknown>>;
};

const clean = (value: unknown, limit = 200) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const normalizePhone = (value: string) => value.replace(/\D/g, '').replace(/^60(?=1)/, '').replace(/^0(?=1)/, '');

async function sendToSheet(payload: Record<string, unknown>) {
  const webhook = process.env.GOOGLE_SHEETS_REGISTRATION_WEBHOOK_URL;
  const key = process.env.GOOGLE_SHEETS_WEBHOOK_KEY ?? '';
  if (!webhook) return null;

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, webhook_key: key }),
    cache: 'no-store',
  });
  const result = await response.json().catch(() => null) as WebhookResult | null;
  if (!response.ok || !result?.ok) throw new Error(result?.message || 'Sambungan rekod belum tersedia.');
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const action = clean(body.action, 40);
    const settings = await readJourneySettings(true);
    const access = journeyAccess(settings);

    if (action === 'create_attendance') {
      if (!access.attendanceOpen) return NextResponse.json({ message: 'Borang kehadiran akan dibuka pada jam 8.00 pagi, 10 September 2026.' }, { status: 423 });
      const fullName = clean(body.full_name, 160);
      const organisation = clean(body.organisation_or_school, 200);
      const phone = clean(body.phone_number, 40);
      const phoneNormalized = normalizePhone(phone);
      const category = clean(body.category, 120);
      const otherCategory = clean(body.other_category, 160);
      const roles = Array.isArray(body.roles) ? body.roles.map(value => clean(value, 120)).filter(Boolean) : [];
      if (!fullName || !organisation || phoneNormalized.length < 8 || !category || roles.length === 0 || (category === 'Lain-lain' && !otherCategory)) {
        return NextResponse.json({ message: 'Lengkapkan semua maklumat kehadiran.' }, { status: 400 });
      }

      const payload = {
        action,
        registered_at: new Date().toISOString(),
        full_name: fullName,
        organisation_or_school: organisation,
        phone_number: phone,
        phone_normalized: phoneNormalized,
        category,
        other_category: otherCategory,
        roles: roles.join(' | ').slice(0, 600),
        attendance_status: 'CHECKED_IN',
        feedback_status: 'PENDING',
        certificate_status: 'NOT_ELIGIBLE',
        template_version: 'PUICE-2026-V1',
        source: 'WEBSITE',
      };
      const result = await sendToSheet(payload);
      if (!result) {
        const attendanceId = `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
        return NextResponse.json({ record: { ...payload, attendance_id: attendanceId }, message: 'Mod demo: kehadiran direkodkan pada peranti ini.' });
      }
      return NextResponse.json({ record: result.record, message: result.message || 'Kehadiran berjaya direkodkan.' });
    }

    if (action === 'lookup_attendance') {
      const phoneNormalized = normalizePhone(clean(body.phone_number, 40));
      if (phoneNormalized.length < 8) return NextResponse.json({ message: 'Masukkan nombor telefon yang sah.' }, { status: 400 });
      const result = await sendToSheet({ action, phone_normalized: phoneNormalized });
      if (!result) return NextResponse.json({ records: [], message: 'Carian demo belum mempunyai rekod.' });
      return NextResponse.json({ records: result.records ?? [] });
    }

    if (action === 'submit_feedback') {
      if (!access.feedbackOpen) return NextResponse.json({ message: 'Maklum balas dibuka pada jam 11.00 pagi, 10 September 2026.' }, { status: 423 });
      const attendanceId = clean(body.attendance_id, 80);
      const ratings = Array.isArray(body.ratings) ? body.ratings.map(Number) : [];
      const continueFuture = clean(body.continue_future, 20);
      const improvement = clean(body.improvement, 1500);
      const participateFuture = clean(body.participate_future, 20);
      if (!attendanceId || ratings.length !== 6 || ratings.some(value => !Number.isInteger(value) || value < 1 || value > 4) || !continueFuture || !improvement || !participateFuture || body.confirmation !== true) {
        return NextResponse.json({ message: 'Lengkapkan semua soalan maklum balas.' }, { status: 400 });
      }
      const result = await sendToSheet({
        action,
        attendance_id: attendanceId,
        submitted_at: new Date().toISOString(),
        ratings,
        continue_future: continueFuture,
        improvement,
        participate_future: participateFuture,
        completion_status: 'COMPLETE',
        source: 'WEBSITE',
      });
      if (!result) return NextResponse.json({ message: 'Mod demo tidak boleh mengesahkan sijil.' }, { status: 503 });
      return NextResponse.json({ record: result.record, message: result.message || 'Maklum balas lengkap. Sijil anda kini tersedia.' });
    }

    return NextResponse.json({ message: 'Tindakan tidak dikenali.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Permintaan tidak dapat diproses.' }, { status: 502 });
  }
}
