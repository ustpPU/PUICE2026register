import { writeFile } from 'node:fs/promises';

const redirect = `<!doctype html><html lang="ms"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PUiCE 2026</title><link rel="canonical" href="https://ustppu.github.io/puice2026utama/arkib/"></head><body><p>Membuka Arkib PUiCE 2026…</p><p><a href="./arkib/">Buka Arkib PUiCE 2026</a></p><script>location.replace('./arkib/'+location.search+location.hash)</script></body></html>`;

await writeFile('out/index.html', redirect);
await writeFile('out/.nojekyll', '');
console.log('GitHub Pages output finalized: root → /arkib/.');
