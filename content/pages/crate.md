---
title: Crate
description: A vinyl collection manager for Obsidian, with a cover grid you actually want to browse.
---

A record collection usually ends up in a spreadsheet, or in an app that owns your data. Crate keeps each record as a plain Markdown note in your vault, so the collection stays yours: searchable, linkable and readable by Bases or Dataview. On top of those notes it adds the part Obsidian doesn't have, a wall of covers you can flip through like the crates in a record shop.

## Browsing

- **Cover grid or compact list**, with search and sorting by artist, title or year.
- **Filter by anything.** A side panel lets you narrow the collection by artist, genre, label, decade, shelf location or tag. Every active filter is a chip you can remove with one click.
- **Find it in the room.** The shelf location is part of every record, so you know where the physical copy is.
- **Wishlist.** Records you want sit next to the ones you own, with a running total of what you have spent.

## Covers without effort

When you add a record or import a list, Crate looks up the cover on Apple's public catalogue by artist and title. No account is needed. Matching is deliberately strict: if Crate isn't confident, it shows a drawn vinyl in your accent colour rather than the wrong cover. You can also use Discogs with a release ID and a personal token, or paste any image link or file from your vault.

## Importing a collection

Already have your records somewhere else? Export a CSV from Discogs or any other app and import it. Crate shows a preview, lets you map the columns, and never overwrites existing notes. Importing the same file twice does not create duplicates, and two physical copies of the same album stay two records.

## How records are stored

Each copy is a note in a folder you choose, with properties for title, artist, year, label, format, genre, status (collection or wishlist), price, location and cover. The body of the note is yours, for reviews, links or listening notes. When you edit a record in Crate, it only changes the properties it owns and leaves your text alone.

Crate follows your Obsidian theme and accent colour, or uses one you pick. The interface is in English and Italian. It is built for desktop and mobile, with no telemetry and no runtime dependencies.

## Get it

- Code and releases: [GitHub](https://github.com/Gusions/obsidian-crate)
- With [BRAT](https://github.com/TfTHacker/obsidian42-brat): add `Gusions/obsidian-crate`.
- Manually: copy `main.js`, `manifest.json` and `styles.css` from the latest release into `.obsidian/plugins/crate/`.

Requires Obsidian 1.10 or later. Open source under the GPL-3.0 license. The only network requests are Apple's public search for covers (can be turned off), Discogs if you add a token, and the cover images themselves.
