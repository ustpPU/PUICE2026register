import { writeFile } from 'node:fs/promises';

const destination = './kemuncak/';
const redirect = `<!doctype html><html lang="ms"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>PUiCE 2026</title><link rel="canonical" href="https://ustppu.github.io/puice2026utama/kemuncak/"></head><body><p>Membuka <a href="${destination}">Kemuncak PUiCE 2026</a>…</p><script>location.replace('./kemuncak/' + location.search + location.hash)</script></body></html>`;

await writeFile('out/index.html', redirect);
await writeFile('out/.nojekyll', '');
console.log('GitHub Pages output finalized: root → /kemuncak/');
