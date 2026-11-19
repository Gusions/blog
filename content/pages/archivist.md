---
title: Archivist
description: Lossless, incremental backups for your Obsidian vault. Restore it byte for byte, no cloud, no account.
---

An Obsidian vault is a folder that grows for years. Copying the whole folder somewhere every week works, until it doesn't: each copy takes the full space again, you can't tell what changed between two of them, and nobody checks that the copy can actually be read back. Archivist is a desktop app built for that one job. It keeps a history of your vault as full snapshots, stores only what changed, and never touches the original files.

## What happens when you back up

Archivist splits every file into small blocks of about 64 KB and gives each block a fingerprint (BLAKE3). If a block is already in the archive, it only stores a reference to it. If it is new, it compresses it with zstd and appends it to the archive.

In practice this means:

- **An edited note costs a few KB.** Change three lines in a long note and only the blocks around those lines are written.
- **A moved, renamed or duplicated file costs nothing.** The blocks are already there.
- **Text shrinks, media doesn't.** Notes, JSON and CSS compress well. Images, PDFs, audio and video are already compressed, so Archivist stores them as they are. It never re-encodes or downsizes anything, which is why nothing is ever lost.
- **Every snapshot is complete.** Even though each backup only writes the difference, every snapshot is a full picture of the vault at that moment. You can restore any of them without the others.

A snapshot becomes visible only once it is fully written. If a backup is interrupted, earlier backups are untouched and the leftovers are cleaned up the next time.

## Restoring

You can restore a whole snapshot into a new folder, or search inside it and bring back a single file or folder. Archivist shows what was added, changed or removed between two snapshots, so you can find the version you need before restoring. Restore puts back contents, modification times and empty folders, and re-checks every block it reads: a damaged archive fails loudly instead of handing you silently wrong files.

Any snapshot can also be exported as a portable `.tar.zst` file, readable without Archivist.

## Encryption

An archive can be encrypted with a password (XChaCha20-Poly1305, key derived with Argon2id). Contents, file names, the folder structure and the vault path are all encrypted, so a copy on an external drive or in the cloud reveals nothing about what is inside. An existing plain archive can be converted into an encrypted copy, leaving the original untouched. If you lose the password, the data cannot be recovered.

## Keeping it tidy

- **Retention.** Keep the latest few snapshots plus daily, weekly and monthly ones. Older snapshots are pruned automatically and the newest one is never deleted.
- **Integrity checks.** A quick check confirms every block is present; a full check re-reads and re-hashes all of them.
- **Background backups.** On macOS, Archivist can run on a schedule even when the app is closed, with the password kept in the Keychain.

## The app

Archivist opens in its own native window, with light, dark and system themes. Setup is three steps: pick the vault (Obsidian vaults are detected automatically), pick a backup folder, ideally on another disk, and press **Back up now**. Everything the app does is also available from the command line, for scripts and power users. The interface is translatable; English and Italian are included.

It is a few megabytes, with no bundled browser, no account and no network access.

## Get it

- Download and documentation: [archivist.gusions.com](https://archivist.gusions.com)
- Code and releases: [GitHub](https://github.com/Gusions/archivist)

Builds for macOS (Apple Silicon `.dmg`, plus Intel), Windows and Linux. Open source under the MIT license.

Archivist protects one thing, your vault, with history and integrity checks. It is not a replacement for Time Machine or for your other backups.
