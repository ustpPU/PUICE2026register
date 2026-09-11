import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  const text = (field: string) => typeof body[field] === 'string' ? body[field].trim() : '';
  const roles = Array.isArray(body.roles) ? body.roles.filter((value): value is string => typeof value === 'string' && Boolean(value.trim())) : [];
  const ratings = Array.isArray(body.ratings) ? body.ratings.map(Number) : [];
  const required = ['full_name', 'organisation_or_school', 'phone_number', 'category', 'continue_future', 'improvement', 'participate_future'];
  const incomplete = required.some((field) => !text(field)) || roles.length === 0 || ratings.length !== 6 || ratings.some(value => !Number.isInteger(value) || value < 1 || value > 4) || body.confirmation !== true;
  if (incomplete || (text('category') === 'Lain-lain' && !text('other_category'))) {
    return NextResponse.json({ message: 'Sila lengkapkan semua maklumat dan maklum balas.' }, { status: 400 });
  }

  const registration = {
    registration_id: `G-${Date.now()}`,
    registered_at: new Date().toISOString(),
    full_name: text('full_name').slice(0, 160),
    organisation_or_school: text('organisation_or_school').slice(0, 200),
    role: roles.join(' | ').slice(0, 500),
    phone_or_email: text('phone_number').slice(0, 80),
    number_of_guests: 1,
    attendance_status: 'REGISTERED',
    consent_public_updates: false,
    notes: '',
    category: text('category').slice(0, 120),
    other_category: text('other_category').slice(0, 160),
    rating_time_allocation: ratings[0],
    rating_venue_facilities: ratings[1],
    rating_information_platform: ratings[2],
    rating_inspiration: ratings[3],
    rating_positive_impact: ratings[4],
    rating_creative_critical: ratings[5],
    continue_future: text('continue_future'),
    improvement: text('improvement').slice(0, 1500),
    participate_future: text('participate_future'),
    completion_status: 'COMPLETE',
  };

  const webhook = process.env.GOOGLE_SHEETS_REGISTRATION_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === 'development') return NextResponse.json({ registration_id: registration.registration_id, message: 'Mod demo: kehadiran dan maklum balas lengkap serta sedia disambungkan kepada Google Sheet.' });
    return NextResponse.json({ message: 'Saluran pendaftaran belum diaktifkan.' }, { status: 503 });
  }

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-PUICE-Key': process.env.GOOGLE_SHEETS_WEBHOOK_KEY ?? '' },
    body: JSON.stringify({ ...registration, webhook_key: process.env.GOOGLE_SHEETS_WEBHOOK_KEY ?? '' }),
  });
  const webhookResult = await response.json().catch(() => null) as { ok?: boolean; registration_id?: string } | null;
  if (!response.ok || webhookResult?.ok !== true || webhookResult.registration_id !== registration.registration_id) {
    return NextResponse.json({ message: 'Pendaftaran belum dapat direkodkan. Sila cuba lagi.' }, { status: 502 });
  }
  return NextResponse.json({ registration_id: registration.registration_id, message: 'Kehadiran dan maklum balas berjaya direkodkan. Terima kasih!' });
}
