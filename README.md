# Gusions — static blog

Markdown (Obsidian-compatible) → static HTML. One dependency (`marked`).

## Usage

```bash
npm install
npm run dev      # build + server on http://localhost:3000 with automatic rebuild
npm run build    # generates ./dist
```

## Structure

- `site.json` — title, author, URL, menu, labels, social and footer links
- `content/posts/*.md` — the posts (front matter: `title`, `date` as `DD/MM/YYYY`, `topics`, `description`, `cover`, `draft`)
- `content/pages/*.md` — fixed pages (About, Now, Subscribe); `draft: true` hides a page and its menu entry
- `assets/` — CSS and images (optional `assets/card.png` for the social preview)
- `build.mjs` — the generator

## How it works

- Home: latest post featured, topics, list of posts
- Post: title, date · reading time, "Linked mentions" (automatic backlinks), "You might also enjoy" (by shared topics)
- `[[Title]]` or `[[slug]]` in files become internal links
- `/topics` and `/topics/<topic>`, `/writing`, `/feed.xml`, `/sitemap.xml`
- Black and white theme by default, with a switch to the color theme (automatic dark mode)
- Images: `![alt](/assets/photo.png)` renders with rounded corners. An italic line right after the image becomes its caption. Add flags after a pipe in the alt text: `![alt|wide](…)` for a full-width image, `![alt|outline](…)` for a 1px border
- Clean URLs (`/slug`): `dist/` is published on Netlify, deployed from `main`
- Links: internal links open in the same tab, external links in a new tab (`target="_blank" rel="noopener noreferrer"`, added automatically by the build)

Before publishing, set `url` in `site.json`.
