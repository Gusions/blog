---
title: Archivist
description: Incremental, lossless backups for your Obsidian vault.
---

An Obsidian vault is just a folder, and folders get big. Notes are small, but images, PDFs and attachments add up, and a plain copy of the whole thing every time wastes space and time. Archivist is a small desktop app that backs up a vault properly.

## What it does

- **Incremental backups.** The first backup stores everything. After that, each run saves only the files that changed, so backups are quick even on a large vault.
- **Lossless compression.** Files are compressed without any loss of quality. Text compresses well; images and PDFs are usually compressed already, so expect smaller gains there.
- **Exact restore.** Restoring gives you back the same files, byte for byte, in the same structure.
- **Encryption.** Archives can be encrypted, so a copy on an external drive or in the cloud stays private.

## How it feels

Archivist runs in its own native window, not in a browser tab. It follows the system's light or dark theme, keeps its settings out of the way, and the interface can be translated. You pick the vault, pick where backups go, and press one button.

## Get it

- Site and documentation: [archivist.gusions.com](https://archivist.gusions.com)
- Code and releases: [GitHub](https://github.com/Gusions/archivist)

Built for macOS. Open source under the MIT license.
