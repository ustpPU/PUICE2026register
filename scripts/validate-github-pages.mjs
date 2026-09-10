import { access, readFile, readdir, stat } from 'node:fs/promises';

const requiredRoutes = ['kemuncak', 'buku-program', 'keputusan', 'lokasi', 'pertandingan', 'peserta', 'puice', 'utama', 'arkib'];
const errors = [];

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

for (const route of requiredRoutes) {
  if (!(await exists(`out/${route}/index.html`))) errors.push(`Missing route: /${route}/`);
}

const pages = (await readdir('out/media/book-program/pages')).filter(name => /^page-\d{2}\.webp$/.test(name));
if (pages.length !== 48) errors.push(`Expected 48 programme pages, found ${pages.length}`);

const pdf = await stat('out/media/buku-program-puice-2026.pdf');
if (pdf.size < 1_000_000 || pdf.size > 15_000_000) errors.push(`Unexpected programme PDF size: ${pdf.size}`);

const rootHtml = await readFile('out/index.html', 'utf8');
const htmlFiles = await Promise.all(requiredRoutes.map(route => readFile(`out/${route}/index.html`, 'utf8')));
const allHtml = htmlFiles.join('\n');
for (const pattern of [/src="\/(?!puice2026utama\/)/, /href="\/(?:media|brand)\//, /url\(\/(?:media|brand)\//]) {
  if (pattern.test(allHtml)) errors.push(`Unprefixed GitHub Pages path matched ${pattern}`);
}

const unprefixedInternalRoute = /href="\/(?:puice|pertandingan|peserta|kemuncak|keputusan|lokasi|arkib|utama|buku-program)(?:[/?#"])/;
if (unprefixedInternalRoute.test(allHtml)) errors.push('Found an internal route without the /puice2026utama base path.');

if (!rootHtml.includes("location.replace('./arkib/'")) errors.push('Root redirect to /arkib/ is missing.');

const summit = htmlFiles[0];
for (const phrase of ['Buku Program Rasmi', 'Borang kehadiran', 'Isi Maklum Balas', 'ACARA TELAH TAMAT']) {
  if (!summit.includes(phrase)) errors.push(`Kemuncak is missing: ${phrase}`);
}

const archive = htmlFiles[requiredRoutes.indexOf('arkib')];
for (const phrase of ['Lengkapkan perjalanan', 'Isi Maklum Balas', 'maklum-balas']) {
  if (!archive.includes(phrase)) errors.push(`Archive feedback journey is missing: ${phrase}`);
}

if (!(await exists('out/.nojekyll'))) errors.push('Missing .nojekyll');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Static export valid: ${requiredRoutes.length} routes, 48 programme pages, PDF ${(pdf.size / 1_000_000).toFixed(1)} MB.`);
