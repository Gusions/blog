---
title: Chats you can still read
date: 22/10/2026
topics: [projects, obsidian]
description: Parley, an Obsidian plugin to reread exported WhatsApp and Telegram chats.
---

I lost a digital conversation with someone dear to me. Since then I've been obsessed with owning my data.

Platforms are closed. Your messages live on their servers, in their format, under their rules. If a backup corrupts, you can't get years of conversations back. It happened to me, and it isn't pleasant.

So I changed my habits. I back up my chats regularly, and I keep the copies offline. A message that exists in one place is a message you can lose.

## The part nobody tells you

Owning your data means being able to open it, whenever you want. That's not always true.

Export a chat from WhatsApp or Telegram and you get an archive with a `.txt` file and a pile of media. Photos, voice notes and videos sit next to it in no order that makes sense. The conversation is technically yours. Reading it is another story.

A backup you can't read isn't much of an archive. It's a folder you hope never to open.

## Where it ended up

I decided to bring it into Obsidian. It's my main app, and the place where I keep what matters to me. I built [Kith](/your-contacts-are-just-notes) there for my contacts, and Crate for my vinyl collection. My chats belong in the same place.

So I built [Parley](https://github.com/Gusions/obsidian-parley), a plugin for [Obsidian](https://obsidian.md).

## What it is

Parley reads an exported chat and shows it like a chat. Point it at a folder or a zip and you scroll through the conversation again, with photos, voice notes and documents where they belong. You can search inside a chat, jump to a date and browse the media in a gallery. It works with WhatsApp and Telegram exports.

## Files over app

Parley started as a reader and nothing more. It never touched my vault, and that was on purpose. Then I looked at what it meant: a chat that exists only inside a plugin isn't really mine. Turn the plugin off and the conversation is gone from my notes. That goes against the idea of files over app.

So I added an import, and it only runs when you ask. It writes the open chat as plain Markdown: an index note and one note per month. Any app can open them, and Obsidian can search them.

The media stays out. Copying years of photos and videos into the vault would make it huge. The notes list each attachment by file name, and the files stay in your export.

## What it isn't

It isn't a media archive. Photos, videos and voice notes stay where the export put them. Parley shows them, but never moves them, and nothing is uploaded anywhere.

It is built for desktop. Mobile is experimental: you can open a zip or a text file, but folders and saved libraries are desktop only.
