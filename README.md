# Blog statico in stile stephango.com

Markdown (compatibile Obsidian) → HTML statico. Una sola dipendenza (`marked`).

## Uso

```bash
npm install
npm run dev      # build + server su http://localhost:3000 con rebuild automatico
npm run build    # genera ./dist
```

## Struttura

- `site.json` — titolo, autore, URL, menu, etichette, link social/footer
- `content/posts/*.md` — i saggi (frontmatter: `title`, `date`, `topics`, `description`, `cover`, `draft`)
- `content/pages/*.md` — pagine fisse (About, Now, Subscribe)
- `assets/` — CSS e immagini (opzionale `assets/card.png` per l'anteprima social)
- `build.mjs` — il generatore

## Funzionamento

- Home: ultimo post in evidenza, argomenti, elenco "AAAA · MM Titolo"
- Post: titolo, data · tempo di lettura, "Citato in" (backlink automatici), "Potrebbe interessarti" (per argomenti in comune)
- `[[Titolo]]` o `[[slug]]` nei file diventano link interni
- `/topics` e `/topics/<argomento>`, `/writing`, `/feed.xml`, `/sitemap.xml`, dark mode automatica
- URL puliti (`/slug`): `dist/` si pubblica su Cloudflare Pages, Netlify, Vercel o GitHub Pages

Prima di pubblicare, cambia `url` in `site.json`.
