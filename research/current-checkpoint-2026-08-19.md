# Mana Geyser Shaman — Current Checkpoint

**Date:** 2026-08-19  
**Level:** 53 Shaman  
**Purpose:** Recalibrate the budget-minmax thesis against the actual equipped character rather than a generic progression assumption.

## Current snapshot

- Maximum Mana: **2,669**
- Life: **1,331**
- Armour: **2,487**
- Runic Ward: **119**
- Spirit: **140 current / 180 after removing the unused Valako charm**
- Resistances: **37 Fire / 38 Cold / 73 Lightning / 0 Chaos**
- Current configured Mana regeneration/recovery readout: **272.8 Mana/s**
- Eldritch Battery + Mind Over Matter active
- Archmage is **not currently equipped**

## Current equipped pieces that change the recommendation

### Main hand — Bramble Scratch, Attuned Wand — KEEP

Current relevant lines:

- 70% increased Spell Damage
- Greater Iron Rune: another 30% increased Spell Damage
- 43% increased Critical Hit Chance for Spells
- Gain 13% of Damage as Extra Cold
- Gain 18% of Damage as Extra Lightning
- +3 to Physical Spell Skills

For Mana Flare specifically this is already a strong weapon: **31% total gain-as-extra**, about **100% increased Spell Damage** counting the rune, and 43% Spell Crit.

At 2,669 current Mana, Mana Flare's native base is:

`2669 × 25% = 667.25 Fire`

The current wand's 31% gain-as-extra takes the simplified raw pre-increased hit to:

`667.25 × 1.31 = 874.10`

A random rare wand that merely adds Mana is not an upgrade. The next wand should be a deliberate Exceptional endgame caster wand that preserves or beats the current gain-as-extra/crit package while adding a large Mana chassis.

### Offhand — Crest of Ardura — KEEP

Current relevant lines:

- **50% Cooldown Recovery Rate**
- **46% Mana Regeneration Rate**
- +10 Intelligence
- bonded Life/Mana and Fire resistance from the socketed rune

50% CDR already moves Mana Flare's theoretical cooldown ceiling from 1.00/s to **1.50/s**. This means the level-53 build is **not CDR-starved**. Buying more CDR before recovery/trigger reliability improves is fake throughput.

Cultivated Rathpith is a later transition, not a current replacement.

### Astramentis — KEEP FOR NOW

Current Astramentis gives about **+118 STR / +118 DEX / +118 INT** including its implicit and also carries Invocated Efficiency.

Removing it would leave the current character only slightly short of the present hard requirements, but the economic cost is larger than the requirement check suggests:

- 118 INT is about **236 base Mana**.
- With the current roughly 44% increased maximum Mana from the tree + two Dream Fragments, that is about **340 final Mana** before other edge interactions.
- 118 STR is also a large Life contribution.
- Invocated Efficiency is already on Astramentis, so Strugglescream gains only the **three additional** instilled notables in this direct comparison.

Strugglescream should therefore replace Astramentis only when the missing STR/DEX are solved cheaply and the three extra notables clearly beat roughly 340 Mana + Life + requirement convenience.

### The Prisoner's Manacles — KEEP UNTIL A REAL ARCANE-SURGE RARE EXISTS

The current corrupted gloves provide:

- **13% Lightning penetration**
- +100 Life
- +39% Lightning Resistance
- substantial Armour/ES
- rune-based Fire/Lightning resistance and bonded Life/Mana

This is much better than a generic placeholder glove. A 10–15% Arcane-Surge-on-crit rare glove remains the endgame direction, but only swap when the new glove preserves enough defence/resistance/Mana that the uptime gain is real rather than cosmetic.

### Waistgate — KEEP

Current Waistgate has 3 Charm Slots, +76 Mana and 30% increased Mana-flask Recovery rate. One flask slot is currently empty while Uhtred's Chalice occupies the other.

**Immediate cheap upgrade:** put a strong rare Mana Flask in the empty flask slot. Waistgate is specifically built to allow Mana flasks in either slot.

## The strongest free upgrade: remove Valako's Roar

The current Topaz Charm grants a Frenzy Charge on use. PoE2 Charges grant **no inherent benefit** unless another skill/effect consumes or uses them, and the current skill setup contains no Frenzy-charge consumer.

Sacred Flow grants **+40 Spirit per empty Charm slot**.

Current state:

- 2 empty charm slots → +80 Spirit from Sacred Flow → **140 total Spirit**.

After removing Valako's Roar:

- 3 empty charm slots → +120 Spirit → **180 total Spirit**.

This is effectively a free **+40 Spirit** upgrade.

## Arctic Armour can be added immediately

Current Spirit reservation is approximately:

- Mana Remnants 30
- Clarity II 20
- Vitality II 40
- Time of Need 30
- Clarity I 10
- **Total: 130 Spirit**

After removing Valako:

- Total Spirit: **180**
- Current package: 130
- Arctic Armour: +30
- New reservation: **160 / 180**
- Spare: **20 Spirit**

Therefore Arctic Armour can be tested **right now without removing the current recovery/cleanse package**.

## Current bottleneck is recovery, not cooldown

With 2,669 current Mana:

- one full-current Flare consumes **667.25 Mana**;
- Crest already supplies a **1.50 Flare/s theoretical cooldown ceiling**;
- sustaining that ceiling at full Mana would imply roughly **1,000 Mana/s** of Flare consumption before carrier costs and incoming damage.

The current configured Mana regen/recovery readout is only about **272.8 Mana/s** before treating Remnant/flask pickups separately.

That is why more CDR is the wrong purchase now.

The correct order is:

> **protect current Mana → add flask/recovery → improve trigger reliability → only then raise CDR beyond Crest's existing 50%.**

## Resistances are an offensive stat while MoM is active

Current Fire/Cold/Lightning/Chaos are **37 / 38 / 73 / 0**.

Because MoM sends incoming damage to Mana before Life, uncapped resistance also drains the same current-Mana pool that Mana Flare samples.

Illustrative 1,000 raw Fire hit:

- at 37% Fire resistance: **630 Mana lost** → 2,039 current Mana → next Flare base about **509.8**;
- at 75% Fire resistance: **250 Mana lost** → 2,419 current Mana → next Flare base about **604.8**.

After the same raw incoming hit, capping Fire resistance leaves the next Flare base about **18.6% higher** in this example, while also improving survival.

Therefore cheap Fire/Cold resistance fixes are currently both defensive and offensive upgrades.

## Archmage — massive damage, but not yet a free toggle

Archmage is not currently equipped.

At 2,669 maximum Mana:

- 4% extra Lightning per 100 Mana = about **106.76% of damage gained as extra Lightning**.
- current wand gain-as-extra total = 31%.
- simplified current raw multiplier = **1.31**.
- simplified Archmage raw multiplier = **2.3776**.
- relative raw increase from adding Archmage to the current gain-as-extra package = about **81.5%** before increased-damage/penetration/crit effects.

That is enormous.

But level-appropriate Archmage also adds roughly 6.8% of maximum Mana to the cost of each non-channelling spell. At 2,669 Mana that is about **181.5 Mana per cast before Eldritch Battery's doubled Mana Costs**. After EB, the added component is roughly **363 Mana per cast** before other cost modifiers.

At the current Frost Darts display rate of roughly 1.6 casts/s, that alone can represent roughly **581 Mana/s of additional cost** before the spell's normal cost, other skills, Mana Flare consumption, or incoming MoM damage.

So Archmage should be treated as the **next A/B test**, not an automatic permanent switch today.

### Safe current package

After removing Valako:

- Mana Remnants + existing Clarity/Vitality supports
- Time of Need + Clarity I
- Arctic Armour
- 160 / 180 Spirit

### Archmage test package

Use all 180 Spirit as:

- Archmage: 100
- Mana Remnants: 30
- Clarity II: 20
- Arctic Armour: 30

Remove Time of Need, Clarity I and Vitality II for the test. This gives up periodic healing/ailment cleanse and Life regeneration, so it is a real trade rather than a free damage toggle.

Zenith II is an especially coherent support to test on Frost Darts because it adds Mana Cost Efficiency and 30% more Spell Damage while above 90% Mana — exactly the state this build is trying to preserve.

## What to do now — exact order

1. **Remove Valako's Roar** → 140 → **180 Spirit**.
2. **Add Arctic Armour** while keeping the current recovery package.
3. **Fill the empty flask slot with a strong rare Mana Flask**; keep Uhtred's Chalice in the other.
4. **Cap Fire and Cold resistance and get Chaos positive**, spending as little as possible on temporary level-53 gear.
5. **Keep Bramble Scratch.** Do not replace it with a random Mana wand.
6. **Keep Crest of Ardura.** 50% CDR already makes cooldown a later problem.
7. **Keep the current helmet, boots and Prisoner's Manacles** until a clearly superior endgame piece exists.
8. **Keep both Dream Fragments.** The corrupted 12% damage-taken-from-Mana-before-Life ring is particularly valuable for the eventual fake-MoM route.
9. **Keep Astramentis for now.** Switch to Strugglescream only after stats are solved and its three extra notables beat the Mana/Life loss.
10. **Bank most of the remaining ~15 Divines.** Level 65–80 unlocks the body/boot/wand ceiling that is actually worth paying for.
11. After the free/cheap recovery changes, **A/B test Archmage**. If current Mana cannot stay high in realistic fights, keep levelling without it rather than forcing the tooltip damage.
12. Later, target Arcane-Surge-on-crit gloves, Cultivated Rathpith and an intentional Exceptional Mana wand — not before their whole-build trade is favourable.

## Spend decision at level 53

**Recommended immediate spend: 0–2 Divines, not 15.**

Use that only for a strong Mana flask and cheap resistance/attribute fixes if they are needed. Keep roughly **13+ Divines liquid** for the level-65–80 transition.

The profile changes the earlier generic plan: the current wand and Crest are already good enough that premature replacement would waste currency.
