import { NextResponse } from 'next/server';
import { publicSheetTabs } from '../../../../lib/site-data';
import { readPublicSheet } from '../../../../lib/sheet-client';

export async function GET(_: Request, { params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  if (!publicSheetTabs.includes(tab)) return NextResponse.json({ rows: [] }, { status: 404 });
  const rows = await readPublicSheet(tab);
  return NextResponse.json({ rows });
}
