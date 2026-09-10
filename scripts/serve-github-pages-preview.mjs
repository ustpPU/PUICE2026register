import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const port = Number(process.argv[2] || 3020);
const root = resolve('out');
const base = '/puice2026utama';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };

createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);
  if (url.pathname === base || url.pathname === `${base}/`) {
    response.writeHead(302, { Location: `${base}/arkib/${url.search}` });
    response.end();
    return;
  }
  if (!url.pathname.startsWith(`${base}/`)) { response.writeHead(404); response.end('Not found'); return; }
  let relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\/+/, '');
  let file = resolve(root, normalize(relative));
  if (!file.startsWith(root)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, 'index.html');
    const finalInfo = await stat(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': finalInfo.size });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(join(root, '404.html')).pipe(response);
  }
}).listen(port, '127.0.0.1', () => console.log(`GitHub Pages preview: http://localhost:${port}${base}/`));
