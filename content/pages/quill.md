---
title: Quill
description: Write, edit and publish a GitHub-hosted blog from Obsidian.
---

A static blog is a great way to own your writing: Markdown files in a GitHub repository, turned into a site on every push. The downside is the workflow. Publishing a typo fix means opening a code editor, finding the file and making a commit. Quill brings the blog into Obsidian, so you write with the editor you already use and publish without leaving it. This site is written with Quill.

## The workflow

1. **Pull.** Quill downloads your posts and pages from the repository into a folder of the vault.
2. **Write.** You edit them like any other note, front matter included: title, date, topics, description.
3. **Publish.** When you are done, Quill commits the changes to GitHub. Your host, such as Netlify, rebuilds the site.

## The dashboard

All posts and pages in one table, with title, description, topics, date and status. Filters show what is live, what is still a draft, what you changed locally and haven't published yet, and what changed on GitHub since your last pull. Click a post to open it in place, ready to edit.

## Safe by default

- **Drafts first.** New posts start as drafts, because publishing to the main branch puts them online.
- **No silent overwrites.** Before publishing a file, Quill checks whether it changed on GitHub in the meantime. If it did, it stops and asks.
- **Local backups.** Before a pull replaces a file you edited, your version is saved to a hidden backup folder.
- **Valid front matter.** Dates and fields are checked against the format your site expects, before anything is published.

Quill talks to GitHub with a personal access token, ideally limited to your blog's repository. The token stays in the plugin's settings on your device.

> **Private repository.** The code is not public yet. If you would like to try it, [get in touch](/about).
