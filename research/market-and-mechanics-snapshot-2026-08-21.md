# Mana Geyser — Market + Mechanics Snapshot — 2026-08-21

This file records the v7 planner corrections so later iterations do not regress to the older placeholder model.

## Economy snapshot

Primary current currency source: Divindex, Runes of Aldur, Exalted quote mode.

- Divine Orb: **338.1 Exalted Orbs** per Divine at the captured snapshot.
- Jiquani's Thesis: **170,042 Ex** on the current Divindex result.
- Perfect Mind Rune: **499.9 Ex**.
- Perfect Iron Rune: **457.0 Ex**.
- Perfect Inspiration Rune: **585.1 Ex**.
- Perfect Vision Rune: **553.5 Ex**.
- Perfect Storm Rune: **572.0 Ex**.
- Perfect Resolve Rune: **702.7 Ex**.
- Perfect Ward Rune: **622.4 Ex**.
- Farrul's Rune of the Chase: **21.71 Ex**.
- Khatal's Rejuvenation: **936.6 Ex**.

Planner normalization rule:

`normalized_divines = raw_divines + raw_exalts / 338.1`

Source: https://divindex.com/

Equipment prices are less uniformly available from currency-exchange data. The planner therefore stores the source and snapshot date per item. Rare crafted items and exact premium Morior modifier combinations remain explicitly unpriced rather than receiving fabricated values.

Recent indexed references used for equipment include ProExile and MeetTheMarket-derived snapshots captured during research. Notably, ProExile listed normal Grand Regalia Morior Invictus at about 2 Divine from 7,314 listings on 2026-08-18, while the Runemastered version was about 15 Divine from 44 listings. Exact Mana/Defence/Combined roll premiums are not represented by those broad base-type medians.

## Morior Invictus correction

Current 0.4.0 values:

- `(300–400)% increased Armour, Evasion and Energy Shield` locally.
- `+50–60 maximum Mana per Socket filled` (previously 20–30).
- `(9–12)% increased Global Armour, Evasion and Energy Shield per Socket filled` (previously 6–10%).
- Existing items can be updated with a Divine Orb.

Source: https://poe2db.tw/us/Morior_Invictus

The planner exposes three deliberately separate theorycraft versions:

1. **Global Defences** — midpoint 10.5% per filled socket.
2. **Maximum Mana** — midpoint +55 Mana per filled socket.
3. **Combined** — both of the above simultaneously.

Do **not** automatically add the separate `+5–7 all Attributes per Socket filled` Morior modifier to these three variants. If we later want an attribute version, model it as its own explicit roll combination.

Socket rules in the planner:

- normal Morior: 4 augment sockets;
- corrupted Morior: 5 augment sockets;
- per-socket unique modifiers count **filled sockets**, not capacity.

For the Global-Defence/Combined versions, the global defence modifier is applied to final Armour/Evasion/ES after local item defence calculations. Spectral Ward still reads the body's **Item Evasion** before global modifiers, then the ES it grants participates in global ES scaling.

## Darkness Enthroned correction

Current unique variants can gain bonuses from socketed items as though the belt were a Body Armour, Helmet, Gloves, Boots, or Shield. Darkness Enthroned has:

- **2 hidden Augment Sockets**;
- `(50–100)% increased effect of Socketed Augment Items`;
- no invented third corrupted socket in the planner.

Source: https://poe2db.tw/us/Darkness_Enthroned

The v7 planner explicitly supports **Helmet-mode Darkness Enthroned**, which allows Helmet socket effects such as Jiquani's Thesis.

## Jiquani's Thesis correction

Current Jiquani wording:

`Helmets: +1 to maximum Mana per 2 Item Energy Shield on Equipped Helmet`

It is an Ancient Augment, requires level 60, and is limited to 1.

Sources:

- https://poe2db.tw/us/Jiquanis_Thesis
- https://poe2db.tw/us/Item_Energy_Shield

`Item Energy Shield` means the exact ES value listed on the equipped helmet, including quality and local modifiers, but not global modifiers from elsewhere.

For a Helmet-mode Darkness Enthroned, Jiquani still reads the **equipped helmet's Item ES**; the belt's `(50–100)% increased effect of Socketed Augment Items` then scales Jiquani's effect. The belt's own stats are not used as the Jiquani ES source.

## Bonded / Wisdom correction

Wisdom/Bonded modelling must distinguish ordinary Runes from Ancient Augments. Ancient Soul Cores such as Jiquani do not receive the generic Rune Bonded bonus.

Important current Perfect Rune values used by the planner:

### Perfect Mind Rune

- Wand/Staff: `+90 maximum Mana`.
- Armour: `+50 maximum Mana`.
- Bonded Wand/Staff: `5% increased maximum Mana`.
- Bonded Armour: `+20 maximum Life, +20 maximum Mana`.

### Perfect Iron Rune

- Armour: `20% increased Armour, Evasion and Energy Shield`.
- Bonded Armour: `+20 maximum Life, +20 maximum Mana`.

### Perfect Inspiration Rune

- Wand/Staff: `35% increased Mana Regeneration Rate`.
- Armour: `21% increased Mana Regeneration Rate`.
- Bonded Wand/Staff: `16% increased Mana Cost Efficiency`.
- Bonded Armour: `+20 maximum Life, +20 maximum Mana`.

### Perfect Vision Rune

- Wand/Staff: `28% increased Critical Hit Chance for Spells`.
- Armour: `20% increased Life and Mana Recovery from Flasks`.
- Bonded Wand/Staff: `25% increased Critical Damage Bonus`.
- Bonded Armour: `+20 maximum Life, +20 maximum Mana`.

Sources:

- https://poe2db.tw/us/Perfect_Iron_Rune
- https://poe2db.tw/us/Bonded_Modifiers
- https://poe2db.tw/us/Mana

## ilvl 82 helmet branches

The v7 planner adds three comparable rare helmet paths rather than assuming pure ES is always correct.

### Pure ES

**Ancestral Tiara**

- base ES: 109
- required level: 80
- T1 `Divine` local defence modifier at ilvl78+: `+26–30 maximum ES` and `39–42% increased ES`
- planner midpoint: +28 flat ES and +40.5% local ES, with 20% quality.

### Armour / ES

**Cryptic Crown**

- base Armour: 206
- base ES: 57
- required level: 80
- T1 `Grand` local: `+42–52 Armour`, `+13–15 maximum ES`, and `39–42% increased Armour and ES`
- planner midpoint: +47 Armour, +14 ES and +40.5%, with 20% quality.

### Pure Armour

**Imperial Greathelm**

- base Armour: 374
- required level: 80
- T1 `Hardened` local: `+76–95 Armour` and `39–42% increased Armour`
- planner midpoint: +85.5 Armour and +40.5%, with 20% quality.

Relevant sources:

- https://poe2db.tw/us/Helmets_int
- https://poe2db.tw/us/Helmets_str_int
- https://poe2db.tw/Imperial_Greathelm
- https://poe2db.tw/us/Armour
- https://poe2db.tw/us/Energy_shield

## Recovery / Mana Flare model

User-calibrated current recovery defaults to **319 Mana/s**.

The planner rebases this against the current reference equipment regeneration bucket:

- Crest of Ardura: +46% Mana regeneration in the retained current roll;
- two Dream Fragments: modeled at +40% Mana regeneration each (midpoint of current 30–50% range).

The resulting underlying recovery reference is held constant while item/rune regeneration deltas are applied.

Mana Flare consumes 25% of current Mana in the retained build model. The planner separately displays:

- cooldown-limited Flares/s;
- recovery-limited Flares/s;
- the actual simplified sustainable rate = the lower of the two;
- bottleneck = cooldown or recovery.

This remains explicitly a **Flare-only** sustain model until Archmage/carrier spell costs are incorporated into the same cycle calculation.
