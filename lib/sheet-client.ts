type Row = Record<string, string>;

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '1adKb-ItpTjaa0e3zFIOQ8OippWMY6F6qMuEpgD_Qk5k';

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];
    if (character === '"' && quoted && line[i + 1] === '"') { value += '"'; i += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === ',' && !quoted) { cells.push(value); value = ''; }
    else value += character;
  }
  cells.push(value);
  return cells;
}

export async function readPublicSheet(tab: string, options: { fresh?: boolean } = {}): Promise<Row[]> {
  const readApi = process.env.GOOGLE_SHEETS_READ_API_URL;
  if (!readApi && process.env.GOOGLE_SHEETS_PUBLIC_READ !== 'true') return [];
  try {
    const fetchOptions = options.fresh ? { cache: 'no-store' as const } : { next: { revalidate: 60 } };
    if (readApi) {
      const response = await fetch(`${readApi}?tab=${encodeURIComponent(tab)}`, fetchOptions);
      if (!response.ok) return [];
      const data = await response.json() as { rows?: Row[] };
      return data.rows ?? [];
    }
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
    const response = await fetch(url, fetchOptions);
    if (!response.ok) return [];
    const lines = (await response.text()).trim().split(/\r?\n/).map(parseCsvLine);
    const [headers, ...rows] = lines;
    return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
  } catch {
    return [];
  }
}
