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
- sustaining that ceiling from full current Mana would imply roughly **1,000 Mana/s** of Mana-Flare consumption before Archmage, carrier costs or incoming damage.

The current configured Mana regen/recovery readout is only about **272.8 Mana/s** before treating Remnant/flask pickups separately.

That is why more CDR is the wrong purchase now.

The correct order is:

> **protect current Mana → add recovery + cost efficiency → improve trigger reliability → only then raise CDR beyond Crest's existing 50%.**

## Resistances are an offensive stat while MoM is active

Current Fire/Cold/Lightning/Chaos are **37 / 38 / 73 / 0**.

Because MoM sends incoming damage to Mana before Life, uncapped resistance also drains the same current-Mana pool that Mana Flare samples.

Illustrative 1,000 raw Fire hit:

- at 37% Fire resistance: **630 Mana lost** → 2,039 current Mana → next Flare base about **509.8**;
- at 75% Fire resistance: **250 Mana lost** → 2,419 current Mana → next Flare base about **604.8**.

After the same raw incoming hit, capping Fire resistance leaves the next Flare base about **18.6% higher** in this example, while also improving survival.

Therefore cheap Fire/Cold resistance fixes are currently both defensive and offensive upgrades.

## Archmage — massive damage, but the full loop is much more expensive than the first estimate

Archmage is not currently equipped.

At 2,669 maximum Mana:

- 4% extra Lightning per 100 Mana = about **106.76% of damage gained as extra Lightning**.
- current wand gain-as-extra total = 31%.
- simplified current raw multiplier = **1.31**.
- simplified Archmage raw multiplier = **2.3776**.
- relative raw increase from adding Archmage to the current gain-as-extra package = about **81.5%** before increased-damage/penetration/crit effects.

That is enormous and is now the largest obvious damage unlock.

### Correction to the earlier sustain estimate

The first checkpoint estimate only priced the Archmage cost added to the Frost Darts carrier. That was too optimistic for planning the whole trigger loop.

The new conservative model tracks:

1. Frost Darts carrier Archmage cost.
2. The triggered spell loop's Archmage tax.
3. Eldritch Battery doubling Mana Costs.
4. Mana Flare separately consuming **25% of current Mana**.

Mana Flare's 25% consume is not a normal Mana Cost, so Mana Cost Efficiency does not reduce that part.

At the current level, Archmage is roughly **6.8% of maximum Mana** per applicable non-channelling spell before Eldritch Battery and cost efficiency.

The current Astramentis already provides **Invocated Efficiency = 10% Mana Cost Efficiency**. Zenith II adds **25% Mana Cost Efficiency** to Frost Darts.

Using a conservative model where Zenith II is counted on the carrier only:

- global cost efficiency = 10%.
- Frost Darts carrier efficiency = 35%.
- fixed Archmage portion of a successful carrier → Flare cycle ≈ **22.44% of maximum Mana**.
- at a 75%-current-Mana Flare, total cycle drain ≈ **41.19% of maximum Mana**.

At 2,669 maximum Mana, maintaining a Flare around 75% current Mana therefore requires approximately:

- **0.50 Flare/s → 550 Mana/s**.
- **0.75 Flare/s → 824 Mana/s**.
- **1.00 Flare/s → 1,099 Mana/s**.
- **1.50 Flare/s → 1,649 Mana/s**.

The normal Frost Darts base cost and incoming Mind Over Matter damage are still on top.

This is why the current **272.8 Mana/s** recovery cannot feed the 1.5/s CDR ceiling.

The detailed 2.7k → 4k → 6k model now lives in:

**`research/archmage-sustain-snapshot-2026-08-19.md`**

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

Zenith II remains coherent on Frost Darts because its **25% Mana Cost Efficiency works at all Mana levels**. Its 30% more Spell Damage clause only works above 90% maximum Mana and should be treated as an opener / recovered-state bonus because Mana Flare itself immediately removes 25% of current Mana.

## Updated Archmage progression gates

### ~2.7k Mana — test state

- Current recovery: **272.8/s**.
- First useful recovery target: **550–650/s**.
- This supports roughly 0.5 high-current Flare/s before mapping pickups.
- Mana Remnants + the second Waistgate Mana Flask can bridge mapping bursts.
- Do not expect permanent full-rate boss sustain.

### ~4k Mana — permanent Archmage transition

Treat 4k as the number **after** any Astramentis → Strugglescream swap.

Target:

- ~60% global Mana Cost Efficiency.
- Zenith II on Frost Darts.
- stable Arcane Surge.
- ~1,000–1,200 Mana/s repeatable recovery.

A coherent four-instill Strugglescream sustain package is:

- Invocated Efficiency.
- Conservative Casting.
- Efficient Casting.
- Mind Eraser.

Together those give about **60% global Mana Cost Efficiency +55% increased Mana Regeneration Rate**, while Invocated Efficiency also keeps the triggered-spell damage bonus.

### ~6k Mana — mature Archmage engine

Target:

- ~75% global Mana Cost Efficiency.
- ~100% carrier efficiency on Frost Darts after Zenith II.
- **35–40% of maximum Mana recovered per second** in repeatable boss conditions.
- At 6k, that means roughly **2,100–2,400 Mana/s**.

That range supports about one high-current Flare/s in the conservative model, with faster burst windows available. Only after this recovery layer exists should the build pay to push CDR beyond Crest's current 50%.

## What to do now — exact order

1. **Remove Valako's Roar** → 140 → **180 Spirit**.
2. **Add Arctic Armour** while keeping the current recovery package.
3. **Fill the empty flask slot with a strong rare Mana Flask**; keep Uhtred's Chalice in the other.
4. **Cap Fire and Cold resistance and get Chaos positive**, spending as little as possible on temporary level-53 gear.
5. **Keep Bramble Scratch.** Do not replace it with a random Mana wand.
6. **Keep Crest of Ardura.** 50% CDR already makes cooldown a later problem.
7. **Keep the current helmet, boots and Prisoner's Manacles** until a clearly superior endgame piece exists.
8. **Keep both Dream Fragments.** The corrupted 12% damage-taken-from-Mana-before-Life ring is particularly valuable for the eventual fake-MoM route.
9. **Keep Astramentis for now.** Switch to Strugglescream only after stats are solved and the post-swap Mana total plus its sustain instills clearly beat the current package.
10. **Bank most of the remaining ~15 Divines.** Level 65–80 unlocks the body/boot/wand ceiling that is actually worth paying for.
11. After the free/cheap recovery changes, **A/B test Archmage**. Judge it by current Mana after 8–10 seconds of realistic fighting, not by the first hit or tooltip.
12. Build toward the **4k permanent gate**, then the **6k 35–40% recovery/s gate**.
13. Later, target Arcane-Surge-on-crit gloves, Cultivated Rathpith and an intentional Exceptional Mana wand — not before their whole-build trade is favourable.

## Spend decision at level 53

**Recommended immediate spend: 0–2 Divines, not 15.**

Use that only for a strong Mana flask and cheap resistance/attribute fixes if they are needed. Keep roughly **13+ Divines liquid** for the level-65–80 transition.

The profile changes the earlier generic plan: the current wand and Crest are already good enough that premature replacement would waste currency. The next real project is now **Archmage sustain architecture**.
