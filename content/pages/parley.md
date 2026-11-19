---
title: Parley
description: Reread your exported WhatsApp and Telegram chats inside Obsidian, like a chat app.
---

Exporting a chat from WhatsApp or Telegram is the right thing to do if you care about your conversations. What you get, though, is a `.txt` file with every message on one line and a pile of photos and voice notes named by number. The conversation is technically yours, but reading it is another story. Parley turns those exports back into conversations you can scroll, search and browse, inside Obsidian. Why it exists is in [[chats-you-can-still-read|Chats you can still read]].

## Reading

- **A familiar reader.** Message bubbles, day separators and a floating date while you scroll. Very long chats stay fast because only what is on screen is drawn.
- **Media where it belongs.** Photos, videos, audio, voice notes, documents and links appear in the conversation where they were sent, with a full-screen viewer you move through with the arrow keys.
- **Gallery.** Everything a chat contains, in tabs: photos and videos, GIFs and stickers, documents, links. Photos are grouped by month, newest first.
- **Search.** Find any message with Cmd/Ctrl+F, or jump to a specific date.
- **Which one is you.** Pick your name per chat, so your messages sit on the right side.

## Your archive, as it is

Parley reads exports in place, straight from a folder or a `.zip` on disk. Nothing is uploaded and, by default, nothing is created in your vault. Large zips open instantly: media is extracted only when it scrolls into view.

If you keep many exports, add the whole folder as a library. Parley finds every chat inside, whether it is a zip, a plain folder or a folder containing a zip, and gives each one a card. If the same conversation was exported twice, the copies are merged.

## Importing into the vault

When you want a chat to become part of your notes, **Import into vault** writes it as plain Markdown: an index note with the chat's details and one note per month with every message. Search, links and Dataview work on it, and the notes stay readable without Parley. Media is not copied, which keeps the vault light: each attachment is listed by file name and points back to the original export.

## Supported exports

- **WhatsApp:** iOS and Android `.txt` exports, with or without media, as a folder or a zip.
- **Telegram:** Desktop exports, JSON and HTML.

The interface follows your Obsidian theme and language, in English or Italian.

## Get it

- Code and releases: [GitHub](https://github.com/Gusions/obsidian-parley)
- With [BRAT](https://github.com/TfTHacker/obsidian42-brat): add `Gusions/obsidian-parley`.
- Manually: unzip the latest release into `.obsidian/plugins/parley/`.

Requires Obsidian 1.10 or later. Mobile is experimental: you can open a single zip or text file, but folders and libraries are desktop only. Open source under the MIT license.
