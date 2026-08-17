# Mana Flare / Entangle Shaman Guide

A dedicated Path of Exile 2 Shaman build guide, planner and simulator for the Mana Flare / Entangle setup.

## Files

- `MASTER_GUIDE.md` — consolidated build guide and source of truth.
- `site/index.html` — interactive guide, planner, simulator and experiment hub.
- `site/data/character.json` — current poe.ninja snapshot used by the planner.
- `scripts/sync_poe.py` — refreshes the poe.ninja snapshot.
- `.github/workflows/pages.yml` — GitHub Pages deployment + hourly snapshot refresh.

## Publish with GitHub Pages

This repo is configured to deploy with GitHub Actions.

Go to **Settings → Pages → Build and deployment → Source → GitHub Actions**.

The workflow also supports a manual run from **Actions → Sync PoE Ninja and deploy Pages → Run workflow**.
