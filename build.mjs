// Static site generator: Markdown (Obsidian-style) → HTML
// Usage: node build.mjs  →  output in ./dist
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { marked } from 'marked';

const cfg = JSON.parse(readFileSync('site.json', 'utf8'));
const L = cfg.labels;
const OUT = 'dist';

// ---------- utilities ----------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad2 = (n) => String(n).padStart(2, '0');
const fmtDate = (d) => `${pad2(d.getUTCDate())}/${pad2(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`; // GG/MM/YYYY
const parseDate = (v) => {
  const m = String(v ?? '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); // GG/MM/YYYY
  return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : new Date(v);
};
const ym = (d) => `${d.getUTCFullYear()} · ${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stripMd = (s) => s.replace(/```[\s\S]*?```/g, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#>*_`~-]/g, '').replace(/\s+/g, ' ').trim();

function parseFrontmatter(raw) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    data[k] = v;
  }
  return { data, body: m[2] };
}

const readDir = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : []);

// ---------- content loading ----------
const posts = readDir('content/posts')
  .map((f) => {
    const { data, body } = parseFrontmatter(readFileSync(join('content/posts', f), 'utf8'));
    const slug = data.slug || basename(f, '.md');
    return {
      slug,
      title: data.title || slug,
      date: parseDate(data.date),
      topics: Array.isArray(data.topics) ? data.topics : data.topics ? [data.topics] : [],
      description: data.description || '',
      cover: data.cover || '',
      draft: data.draft === 'true',
      rawBody: body,
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date - a.date);

const pages = readDir('content/pages').map((f) => {
  const { data, body } = parseFrontmatter(readFileSync(join('content/pages', f), 'utf8'));
  const slug = data.slug || basename(f, '.md');
  return { slug, title: data.title || slug, description: data.description || '', rawBody: body };
});

// [[wikilink]] resolution (by slug or title)
const byKey = new Map();
for (const p of posts) { byKey.set(p.slug.toLowerCase(), p); byKey.set(p.title.toLowerCase(), p); }
for (const p of pages) { byKey.set(p.slug.toLowerCase(), p); }

function resolveWikilinks(md) {
  return md.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const hit = byKey.get(target.trim().toLowerCase());
    if (!hit) return label || target;
    return `[${label || hit.title}](/${hit.slug})`;
  });
}

marked.use({ gfm: true, breaks: false });

for (const item of [...posts, ...pages]) {
  item.body = resolveWikilinks(item.rawBody);
  item.html = marked.parse(item.body);
  item.plain = stripMd(item.body);
  item.minutes = Math.max(1, Math.ceil(item.plain.split(' ').filter(Boolean).length / 200));
  if (!item.description) item.description = item.plain.slice(0, 160).trim();
}

// ---------- graph: mentions, related, topics ----------
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const backlinks = new Map(posts.map((p) => [p.slug, []]));
for (const p of [...posts, ...pages]) {
  const seen = new Set();
  for (const m of p.body.matchAll(/\]\(\/([a-z0-9-]+)\)/g)) {
    const target = m[1];
    if (target !== p.slug && bySlug.has(target) && !seen.has(target) && posts.includes(p)) {
      seen.add(target);
      backlinks.get(target).push(p);
    }
  }
}

function related(p, limit = 6) {
  const exclude = new Set([p.slug, ...backlinks.get(p.slug).map((x) => x.slug)]);
  return posts
    .filter((o) => !exclude.has(o.slug))
    .map((o) => ({ o, score: o.topics.filter((t) => p.topics.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.o.date - a.o.date)
    .slice(0, limit)
    .map((x) => x.o);
}

const topicMap = new Map();
for (const p of posts) for (const t of p.topics) {
  if (!topicMap.has(t)) topicMap.set(t, []);
  topicMap.get(t).push(p);
}
const topics = [...topicMap.keys()].sort((a, b) => a.localeCompare(b, cfg.locale));

// ---------- template ----------
const minLabel = (n) => (n === 1 ? L.oneMinuteRead : `${n} ${L.minuteRead}`);
const topicLinks = (list) => list.map((t) => `<a href="/topics/${slugify(t)}">${esc(t)}</a>`).join(', ');
const extLink = (l) => `<a href="${esc(l.href)}"${l.title ? ` title="${esc(l.title)}"` : ''}>${esc(l.label)}</a>`;

function subscribeBlock() {
  const links = cfg.social.map(extLink).join(', ');
  return `<section class="subscribe">
  <h2><a href="/subscribe">${esc(L.subscribeTitle)}</a></h2>
  <p>${esc(L.subscribeText)} ${links}</p>
</section>`;
}

function layout({ title, description, path, image, body, crumb = false, type = 'website' }) {
  const url = cfg.url + path;
  const fullTitle = path === '/' ? cfg.title : `${title} · ${cfg.title}`;
  const fallbackImg = existsSync('assets/card.png') ? `${cfg.url}/assets/card.png` : '';
  const img = image ? (image.startsWith('http') ? image : cfg.url + image) : fallbackImg;
  const nav = cfg.nav.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join(' ');
  return `<!doctype html>
<html lang="${esc(cfg.lang)}" data-theme="mono">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || cfg.description)}">
<meta name="author" content="${esc(cfg.author)}">
<link rel="canonical" href="${esc(url)}">
<link rel="alternate" type="application/rss+xml" title="${esc(cfg.title)}" href="/feed.xml">
<script>try{var t=localStorage.getItem('theme');if(t==='mono'||t==='default')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<link rel="stylesheet" href="/assets/style.css">
<meta property="og:site_name" content="${esc(cfg.title)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description || cfg.description)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${esc(url)}">
${img ? `<meta property="og:image" content="${esc(img)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="${esc(img)}">` : '<meta name="twitter:card" content="summary">'}
</head>
<body>
<div class="wrap">
<header class="site">
  <nav class="crumbs"><a class="brand" href="/">${esc(cfg.title)}</a>${crumb ? ` <span class="sep">/</span> <a href="/">${esc(L.writing)}</a>` : ''}</nav>
  <nav class="links">${nav}<button class="theme-toggle" type="button" data-mono="${esc(L.themeToMono)}" data-color="${esc(L.themeToColor)}" aria-label="${esc(L.themeToMono)}" title="${esc(L.themeToMono)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg></button></nav>
</header>
<main>
${body}
</main>
${subscribeBlock()}
<footer class="site">${cfg.footerLinks.map(extLink).join(' ')}</footer>
</div>
<script>
(function(){
  var b=document.querySelector('.theme-toggle');if(!b)return;
  var root=document.documentElement;
  function cur(){return root.getAttribute('data-theme')==='mono'?'mono':'default';}
  function sync(){
    var m=cur()==='mono';
    var label=m?b.getAttribute('data-color'):b.getAttribute('data-mono');
    b.setAttribute('aria-label',label);b.setAttribute('title',label);b.setAttribute('aria-pressed',m?'true':'false');
  }
  b.addEventListener('click',function(){
    var n=cur()==='mono'?'default':'mono';
    root.setAttribute('data-theme',n);
    try{localStorage.setItem('theme',n);}catch(e){}
    sync();
  });
  sync();
})();
</script>
</body>
</html>
`;
}

const postItem = (p) => `<li><a href="/${p.slug}"><span class="date">${ym(p.date)}</span> ${esc(p.title)}</a></li>`;
const writingList = () => `<ul class="writing">\n${posts.map(postItem).join('\n')}\n</ul>`;

const cardLink = (p) => `<li><a href="/${p.slug}"><strong>${esc(p.title)}</strong>${p.description ? ` <span class="desc">${esc(p.description)}</span>` : ''}</a></li>`;

// ---------- output ----------
function write(path, content) {
  const file = path.endsWith('.html') || path.includes('.') && !path.endsWith('/') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
if (existsSync('assets')) cpSync('assets', join(OUT, 'assets'), { recursive: true });
if (existsSync('public')) cpSync('public', OUT, { recursive: true });

// home
{
  const latest = posts[0];
  const latestHtml = latest
    ? `<section class="latest-block">
  <h2 class="label">${esc(L.latest)}</h2>
  <a class="latest" href="/${latest.slug}">
    <strong>${esc(latest.title)}</strong>
    <span class="meta">${fmtDate(latest.date)} · ${minLabel(latest.minutes)}</span>
    <span class="desc">${esc(latest.description)} <em>${esc(L.readMore)}</em></span>
  </a>
</section>
<hr>`
    : '';
  const body = `${latestHtml}
<section>
  <h2><a href="/topics">${esc(L.topics)}</a></h2>
  <p class="topics">${topics.map((t) => `<a href="/topics/${slugify(t)}">${esc(t)}</a>`).join(', ')}</p>
</section>
<hr>
<section>
  <h2><a href="/writing">${esc(L.writing)}</a></h2>
  ${writingList()}
</section>
<hr>`;
  write('/index.html', layout({ title: cfg.title, description: cfg.description, path: '/', body }));
}

// writing
write('/writing', layout({
  title: L.writing, description: cfg.description, path: '/writing', crumb: true,
  body: `<h1>${esc(L.writing)}</h1>\n${writingList()}`,
}));

// post
for (const p of posts) {
  const mentions = backlinks.get(p.slug);
  const rel = related(p);
  const body = `<article class="post">
  <h1>${esc(p.title)}</h1>
  <p class="meta"><time datetime="${p.date.toISOString().slice(0, 10)}">${fmtDate(p.date)}</time> · ${minLabel(p.minutes)}</p>
  <div class="content">
${p.html}
  </div>
</article>
${p.topics.length ? `<p class="post-topics">${topicLinks(p.topics)}</p>` : ''}
<hr>
${mentions.length ? `<section class="more"><h2>${esc(L.linkedMentions)}</h2><ul>${mentions.map(cardLink).join('')}</ul></section>` : ''}
${rel.length ? `<section class="more"><h2>${esc(L.related)}</h2><ul class="plain">${rel.map((o) => `<li><a href="/${o.slug}">${esc(o.title)}</a></li>`).join('')}</ul></section>` : ''}`;
  write(`/${p.slug}`, layout({
    title: p.title, description: p.description, path: `/${p.slug}`, crumb: true, type: 'article',
    image: p.cover, body,
  }));
}

// static pages (about, now, subscribe…)
for (const pg of pages) {
  write(`/${pg.slug}`, layout({
    title: pg.title, description: pg.description, path: `/${pg.slug}`, crumb: true,
    body: `<article class="post"><h1>${esc(pg.title)}</h1><div class="content">\n${pg.html}\n</div></article>`,
  }));
}

// topics
write('/topics', layout({
  title: L.topics, description: cfg.description, path: '/topics', crumb: true,
  body: `<h1>${esc(L.topics)}</h1>\n<p class="topics">${topics.map((t) => `<a href="/topics/${slugify(t)}">${esc(t)}</a>`).join(', ')}</p>`,
}));
for (const t of topics) {
  write(`/topics/${slugify(t)}`, layout({
    title: t, description: cfg.description, path: `/topics/${slugify(t)}`, crumb: true,
    body: `<h1><a href="/topics" class="quiet">${esc(L.topics)}</a> / ${esc(t)}</h1>\n<ul class="writing">\n${topicMap.get(t).map(postItem).join('\n')}\n</ul>`,
  }));
}

// 404
write('/404.html', layout({
  title: L.notFound, description: L.notFound, path: '/404', crumb: true,
  body: `<h1>${esc(L.notFound)}</h1><p><a href="/">← ${esc(L.writing)}</a></p>`,
}));

// RSS
{
  const items = posts.slice(0, 30).map((p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${cfg.url}/${p.slug}</link>
    <guid isPermaLink="true">${cfg.url}/${p.slug}</guid>
    <pubDate>${p.date.toUTCString()}</pubDate>
    <description>${esc(p.description)}</description>
    <content:encoded><![CDATA[${p.html.replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
  </item>`).join('\n');
  write('/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(cfg.title)}</title>
  <link>${cfg.url}/</link>
  <description>${esc(cfg.description)}</description>
  <language>${esc(cfg.lang)}</language>
  <atom:link href="${cfg.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`);
}

// sitemap + robots
{
  const urls = ['/', '/writing', '/topics', ...pages.map((p) => `/${p.slug}`), ...posts.map((p) => `/${p.slug}`), ...topics.map((t) => `/topics/${slugify(t)}`)];
  write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${cfg.url}${u === '/' ? '/' : u}</loc></url>`).join('\n')}
</urlset>
`);
  write('/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${cfg.url}/sitemap.xml\n`);
}

console.log(`✓ ${posts.length} posts, ${pages.length} pages, ${topics.length} topics → ${OUT}/`);
