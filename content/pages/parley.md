---
title: Parley
description: Reread exported WhatsApp and Telegram chats, and keep them as notes.
---

When you export a chat from WhatsApp or Telegram you get a text file and a pile of media with numbers for names. The conversation is technically yours, but reading it is another story. Parley opens those exports and shows them as a chat again.

## What it does

- **Reader.** Message bubbles, day separators and the photo or voice note right where it was sent. Long chats stay fast.
- **Media.** Photos, videos, audio, voice notes, documents and links, with a full-screen viewer.
- **Gallery.** Everything you shared, in tabs: photos and videos, GIFs and stickers, documents, links.
- **Search.** Find a message with Cmd/Ctrl+F, or jump straight to a date.
- **Library.** Point Parley at a folder of exports and it lists every chat, merging duplicates of the same conversation.
- **Import into the vault.** When you choose, Parley writes a chat as plain Markdown: an index note and one note per month, readable without the plugin.

## How it works

Parley reads exports in place, from a folder or a zip, and uploads nothing. Media never gets copied into your vault, which keeps it light: imported notes list each attachment by file name, and the files stay in the export.

It supports WhatsApp exports from iOS and Android, with or without media, and Telegram Desktop exports in JSON or HTML. Why it exists is in [[chats-you-can-still-read|Chats you can still read]].

## Get it

- Code and releases: [GitHub](https://github.com/Gusions/obsidian-parley)
- Install with [BRAT](https://github.com/TfTHacker/obsidian42-brat) using `Gusions/obsidian-parley`, or copy the release files into `.obsidian/plugins/parley/`.

Built for desktop. Mobile support is experimental: you can open a zip or a text file, but folders and libraries are desktop only. Open source under the MIT license.
