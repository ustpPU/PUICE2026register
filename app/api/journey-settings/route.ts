import { NextResponse } from 'next/server';
import { readJourneySettings } from '../../../lib/journey-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await readJourneySettings(true);
  return NextResponse.json({ settings }, { headers: { 'Cache-Control': 'no-store' } });
}
