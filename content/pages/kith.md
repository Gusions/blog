---
title: Kith
description: A personal CRM for Obsidian, where every contact is a Markdown note.
---

Most personal CRMs ask you to move your people into their app, their database and their subscription. Kith does the opposite. Every person is a plain note in your vault, with their details in the front matter, and Kith gives those notes everything you would expect from a real CRM: views, records, follow-ups, birthdays and imports. There is no database and nothing to migrate. Remove the plugin and the notes are still there, readable by anything. The idea behind it is in [[your-contacts-are-just-notes|Your contacts are just notes]].

## How contacts are stored

Each contact is a note in a folder you choose, with properties like name, birthday, city, email, current company, relationship, closeness, priority, contact frequency and last contact. You can edit them from Kith, from Obsidian's Properties panel, or query them with Bases and Dataview.

Kith is forgiving with what it reads. Property names can be in English or Italian, with or without accents, spaces or underscores: `first_name`, `First name` and `nome` are the same field. Existing notes are never rewritten in a new format; when you edit a contact, Kith keeps the keys already in that note. Dates are always saved in ISO format, the only unambiguous one, and shown however you prefer.

## Views

- **Table.** Fully configurable columns: sort, filter, pin, move or add any field, including your own. Tick rows to get a bulk action bar: mark as contacted today, log an interaction, edit many contacts at once, export birthdays, archive or delete.
- **Cards.** Compact cards with tags, next birthday and follow-up status.
- **Kanban.** Group people by relationship, closeness, status or priority, and drag a card to another column to change it.
- **Graph.** Your network as a map. People connect through a shared company, a "met through" link, a partner, or links between notes.
- **Saved views.** Save any combination of filters, search and sorting as a tab.

## Records and companies

Click a name to open a full-page record: inline editing, a photo, connected people with the reason ("introduced you to…"), current and past companies, and recent interactions. Email, phone, WhatsApp, LinkedIn and Instagram are one click away.

Every company gets its own page with the people who work or worked there, notes and a timeline. Kith can fill in empty fields such as website, industry and logo from Wikidata and the company's own site.

Relationships can be several per person and tied to a company, like *former colleague @ ACME*.

## Follow-ups and birthdays

Set a contact frequency (weekly, monthly, quarterly…) or a specific follow-up date, and Kith tells you who is overdue or due soon. "Contacted today" resets the clock in one click. Logging a call, meeting or message creates a note linked to the person and updates their last contact date.

Birthdays appear in an agenda. One click opens Google Calendar with a yearly event already filled in, without connecting any account, and all birthdays can be exported as an `.ics` file for any calendar app. A small "Today" block can sit in your daily note, listing follow-ups and upcoming birthdays.

## Importing

One importer recognises each file on its own: LinkedIn connections, phone address books (vCard or Google CSV), Apple Contacts archives, Facebook friends and generic CSV files. Drop LinkedIn and your address book together and Kith cross-checks them by email, profile and name, so each person appears once with the best of both sources. The preview marks who is new, who is already there and who is duplicated. Nothing is written until you confirm, and existing data is never overwritten.

## Make it yours

Rename, hide or add fields. Change colours, fonts, density and corner radius, or let everything follow your Obsidian theme. An optional modern mode gives every page a flatter, cleaner look. The interface is in English and Italian.

## Get it

- Code and releases: [GitHub](https://github.com/Gusions/obsidian-kith)
- With [BRAT](https://github.com/TfTHacker/obsidian42-brat): add `Gusions/obsidian-kith`.
- Manually: copy `main.js`, `manifest.json` and `styles.css` from the latest release into `.obsidian/plugins/kith/`.

Requires Obsidian 1.10 or later. Developed on desktop; mobile works but is less tested. Open source under the GPL-3.0 license.

Kith runs locally. The only network requests are the ones you trigger: company enrichment from Wikidata (can be turned off) and opening Google Calendar in your browser.
