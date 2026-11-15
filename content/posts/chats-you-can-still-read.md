---
title: Chats you can still read
date: 22/10/2026
topics: [projects, obsidian]
description: Parley, an Obsidian plugin to reread exported WhatsApp and Telegram chats.
---

I lost a digital conversation with someone dear to me. Since then I've been obsessed with owning my data.

Platforms are closed. Your messages live on their servers, in their format, under their rules. If a backup corrupts, you can't get years of conversations back. It happened to me, and it isn't pleasant.

So I back up my chats regularly and keep the copies offline. A message that exists in one place is a message you can lose.

Then I opened one of those backups. A WhatsApp export is a zip with a `.txt` file inside, every message stacked on the one before, and next to it hundreds of photos and voice notes named by number. Nothing points to anything. The conversation was mine, and I couldn't read it.

A backup you can't read is a folder you hope never to open.

## A reader first

Obsidian is where I keep what matters to me. My contacts live there in [Kith](/your-contacts-are-just-notes), my records in Crate. So I built [Parley](https://github.com/Gusions/obsidian-parley), a plugin that opens an exported chat and shows it as a chat again. The photo sits next to the message it came with. The voice note plays. You can search a conversation, jump to a date, or scroll through everything you ever sent each other. It works with WhatsApp and Telegram.

## Then the notes

For a while that was enough. Then I saw the flaw. The chat lived only inside the plugin. Turn Parley off and the conversation disappears from my notes again. I had moved the problem somewhere nicer.

So Parley now writes a chat into the vault when I ask it to. Plain Markdown, one index note and one note per month. I can search it, link to it, and open it without Parley.

The media stays where it was. Years of photos and videos would make the vault enormous, and they are already safe in the export. Each note lists the attachments by file name, so I know what was sent and where to find it.

A chat I can read is a chat I still have.
