---
title: Your contacts are just notes
date: 10/10/2026
topics: [projects, obsidian, AI]
description: Kith, a personal CRM that lives inside Obsidian.
---

A contact is a name and a few facts. It fits on an index card. It doesn't need a server.

Most CRMs ask you to move your people into their app. I wanted the app to move into my notes. So I built [Kith](https://github.com/Gusions/obsidian-kith).

## What it is

Every person is a Markdown note. Kith reads those notes and shows them as a table, cards, a kanban board or a graph. Open a person and you see their notes and a timeline. Open a company and you see who works there.

It remembers what I forget. When we last spoke. When I should write again. Whose birthday is next week.

## What it isn't

It isn't a database. It isn't an account. It isn't a cloud, because there is no cloud.

It also leaves your notes alone. Point it at a folder of people and it reads, it doesn't rewrite. Milano and Milan are the same city, so Kith treats them that way.

It follows file over app, the idea from Steph Ango (@kepano). Delete the plugin and you lose the views. You keep the people.

## Try it

Kith is free and open source. Install it with BRAT from `Gusions/obsidian-kith`, or copy `main.js`, `manifest.json` and `styles.css` into `.obsidian/plugins/kith/`. You need [Obsidian](https://obsidian.md) 1.15 or later, and I've tested it on desktop only.

It's small and early. If it breaks, tell me.

A contact is a note. Kith just helps you read it.
