// Dev server: rebuilds the site on every change and serves it on http://localhost:3000
import http from 'node:http';
import { readFileSync, existsSync, statSync, watch } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, extname } from 'node:path';

const PORT = process.env.PORT || 3000;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.txt': 'text/plain' };

const build = () => {
  try { execFileSync('node', ['build.mjs'], { stdio: 'inherit' }); } catch { /* errore già stampato */ }
};
build();

let timer;
for (const dir of ['content', 'assets', 'site.json', 'build.mjs']) {
  if (!existsSync(dir)) continue;
  watch(dir, { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(build, 150); });
}

http.createServer((req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  let file = join('dist', path);
  if (!file.startsWith('dist')) { res.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404, { 'content-type': types['.html'] });
    res.end(existsSync('dist/404.html') ? readFileSync('dist/404.html') : 'Not found');
    return;
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
