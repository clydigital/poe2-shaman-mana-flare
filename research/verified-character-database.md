# Mana Geyser — Verified Character Database

_Last verified snapshot preserved from the old site before the UI wipe._

## Source and status

- Observed: 2026-08-18 05:07:37 UTC
- Source: verified poe.ninja rendered snapshot + exact current PoB allocation
- Snapshot authority: poe.ninja
- Sync status: verified-rendered-snapshot
- Character level: 53

## Core displayed stats

| Stat | Value |
|---|---:|
| Strength / Dexterity / Intelligence | 175 / 130 / 299 |
| Intelligence | 299 |
| Life | 1,331 |
| Mana | 2,669 |
| Spirit | 140 |
| Armour | 2,487 |
| Evasion | 8 |
| Block | 25% |
| Runic Ward | 119 |
| Fire / Cold / Lightning / Chaos resistance | 37 / 38 / 73 / 0 |

## Crit snapshot

| Skill | Crit chance | Critical Damage Bonus |
|---|---:|---:|
| Frost Darts | 46% | 191% |
| Entangle | 35% | 191% |
| Orb of Storms | 35% | 191% |
| Detonate Dead | 18% | 230% |

### Mana Flare crit proxy used by the old calculator

- Mana Flare base crit: 7%
- Pinpoint Critical on carrier: 60% more Critical Hit Chance
- Estimated generic Spell Crit increase: ~119.55%
- Estimated Mana Flare crit chance: ~15.37%
- Payload CDB proxy: 191%
- The payload CDB was not exposed by poe.ninja, so the calculator used the common 191% carrier CDB as a labelled proxy.

Method note: the shared crit multiplier was inferred from Frost Darts at 46% crit from a 13% base and Entangle / Orb of Storms at 35% from a 10% base after dividing out Pinpoint Critical's 60% more Critical Hit Chance.

## Passive-tree snapshot

| Counter | Value |
|---|---:|
| Total passive points represented | 69 |
| Normal passive points | 68 |
| Weapon-set passive points | 1 |
| Ascendancy points | 8 |

### Verified allocated named nodes

- Eldritch Battery
- Mind Over Matter
- Raw Mana
- Arcane Intensity
- Druidic Champion
- Furious Wellspring
- Sacred Flow
- Wisdom of the Maji

Rendered aggregate effects also matched Raw Mana, Arcane Intensity and Invocated Efficiency, but aggregate effects alone were not treated as proof of allocation. Exact current PoB node IDs were the authority. Invocated Efficiency and Controlling Magic were not allocated in this snapshot.

## Tree-derived stat estimates

| Effect | Stored value |
|---|---:|
| Increased maximum Mana | 8% |
| Flat Mana | +30 |
| Increased Mana Regeneration Rate | 109% |
| Moving Mana regen bonus | 50% |
| Stationary Mana regen penalty | 25% |
| Increased Spell Critical Strike Chance | 46% |
| Increased Critical Damage Bonus | 30% |
| Damage recouped as Mana | 9% |
| Increased flask recovery | 12% |

## Gear evidence

Gear evidence was intentionally conservative because the rendered poe.ninja page did not expose trustworthy tooltip modifiers for most equipped slots.

Verified named item:

- Against the Darkness Time-Lost Diamond

Observed socketed rune types:

- Lightning Rune Tier 2 ×3
- Fire Rune Tier 2 ×2
- Enhance Rune Tier 2 ×3

No Mana, crit, CDB, cooldown-recovery or recovery modifiers were guessed for the weapon, armour, rings, amulet or belt when tooltip data was unavailable.

## Old calculator defaults

- Default trigger carrier: Frost Darts
- Preserved manual carrier hit rate: 4.0 hits/s
- Other recovery per second: 0 by default
- Mana leech per second: 0 by default
- 9% Mana recoup was conditional and was not auto-counted
- No qualifying attack-based Mana leech source was verified
- Archmage was disabled by default when the current poe.ninja page did not expose it rather than being guessed

## Why this file exists

This is the retained structured baseline from `site/data/character.json` and `site/data/verified-baseline.json`. The original JSON files and the old site runtime were deliberately removed after this Markdown archive was created.
