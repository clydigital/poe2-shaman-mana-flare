# Mana Geyser Shaman — Budget Minmax Thesis

**Date:** 2026-08-19  
**Objective:** Reach the Runeseeker farm, sell Runeseeker, and keep a strong Runeseeker-free Mana Flare Shaman.  
**Total endgame ceiling:** about **50 Divines**.  
**Working budget remaining:** about **15 Divines**.

---

## Executive decision

The build should be treated as a **Mana engine**, not as a normal caster that happens to use Mana Flare.

The same point of Mana can scale all of these at once:

1. **Mana Flare base hit** — consumes 25% of current Mana to deal that much Fire damage.
2. **Archmage** — 4% of damage gained as extra Lightning per 100 maximum Mana.
3. **Cultivated Rathpith** — 6% increased damage and 3% increased spell crit per 100 maximum Mana.
4. **Arcane Intensity** — 3% increased Spell Damage per 100 maximum Mana.
5. **Mana regeneration base** — more maximum Mana raises the raw 4%-per-second regeneration base.
6. **Defence** — whenever damage is redirected to Mana before Life.

That overlap is why the main rule is:

> **Mana first → trigger reliability + recovery → CDR → penetration / gain-as-extra / CDB.**

The external Stormweaver build is useful because it validates the recovery architecture, but we should **not copy the class**. The best Shaman version combines:

- Stormweaver-style Mana/recovery/cost-efficiency discipline;
- Shaman Rage scaling;
- Strugglescream;
- Cultivated Rathpith;
- Mana Flare rather than Arc as the main payload.

### Current build conclusion

**Preferred finished direction, within the 50d philosophy:**

- **Cultivated Rathpith** offhand.
- **Strugglescream** with Invocated Efficiency locked.
- **Arcane Surge on-crit rare gloves** rather than buying Kurgal's Gaze.
- **Archmage + Mana Remnants + Arctic Armour** once 160 Spirit is available.
- **Exceptional 2-socket caster Wand** as the best long-term weapon target.
- Prefer **Perfect Inspiration Rune + Perfect Mind Rune** for the balanced weapon socket pair when recovery is still the constraint.
- Use **Perfect Storm Rune** instead of Mind only when Mana/recovery are already comfortable and boss payload/Shock is the better marginal upgrade.
- Keep **Mind Over Matter** until a real replacement defence exists; the eventual ideal is high damage-taken-from-Mana-before-Life **without** MoM's 50% less Mana Recovery.
- Treat **Cloak of Defiance** as a serious budget transition body, not a curiosity.

---

# 1. What the Maxroll / Phoenix Stormweaver actually teaches us

Reference PoB: <https://maxroll.gg/poe2/pob/3s56jm06>

The imported Level 97 Stormweaver benchmark shows approximately:

- **6,268 Mana**
- **14,824 eHP**
- **75 / 75 / 75** elemental resistances
- **86% crit** on Arc
- **441% crit multiplier** shown for Arc
- **187% increased Mana Regeneration Rate** in the tree summary
- **15% increased Mana Recovery Rate**
- **80% Mana Cost Efficiency**
- **52% damage taken from Mana before Life** visible in the passive summary before remaining gear contributions
- **30% Lightning penetration**
- **50% increased Shock magnitude**
- Eldritch Battery + Chaos Inoculation
- permanent Arcane Surge from Stormweaver

The important lesson is the **stat allocation**, not the skill:

- Mana
- Mana regeneration
- Mana Cost Efficiency
- Mana-before-Life
- Lightning penetration
- Shock magnitude
- spell crit / CDB
- cast speed
- Intelligence

This is a much better template than spending every point on generic increased Spell Damage.

## What Shaman cannot copy

Stormweaver gets two enormous class advantages:

- **Constant Gale:** permanent Arcane Surge.
- **Force of Will:** 20% damage taken from Mana before Life and increasing Arcane Surge effect as Mana is missing.

Shaman has to manufacture those functions from gear/passives.

## What Shaman gets instead

- **Druidic Champion:** every 2 Rage grants 1% more Spell Damage.
- **Furious Wellspring:** Mana-regeneration modifiers also scale Rage regeneration.
- **Mystical Rage:** 2% increased Spell Damage per Rage.
- **Strugglescream:** four instilled notables.
- **Cultivated Rathpith:** Mana directly scales spell damage and spell crit.

So the thesis is:

> **Steal the Stormweaver's recovery engineering, not its ascendancy. Keep Shaman's Rage/Rathpith/Strugglescream damage engine.**

---

# 2. Mana stacking vs generic spell scaling

Current mechanics used in the simplified marginal-value model:

- Mana Flare: `Fire base = 0.25 × current Mana`
- Archmage: `+4% damage as extra Lightning per 100 maximum Mana`
- Cultivated Rathpith: `+6% increased Damage per 100 maximum Mana`
- Arcane Intensity: `+3% increased Spell Damage per 100 maximum Mana`

Assume current Mana is near maximum and assume an illustrative **+200% other increased-damage bucket**.

### Simplified formula

`Flare base = 0.25M`

`Archmage raw multiplier = 1 + 0.0004M`

`Rathpith + Arcane Intensity = +0.0009M increased damage`

`Illustrative payload = 0.25M × (1 + 0.0004M) × (3 + 0.0009M)`

This is deliberately not presented as exact in-game DPS. It is a **marginal-stat comparison**.

| Max Mana | Flare base | Archmage extra Lightning | Mana-linked increased damage | Illustrative payload |
|---:|---:|---:|---:|---:|
| 3,000 | 750 | +120% | +270% | 9,405 |
| 4,000 | 1,000 | +160% | +360% | 17,160 |
| 6,000 | 1,500 | +240% | +540% | 42,840 |
| 8,000 | 2,000 | +320% | +720% | 85,680 |

## Marginal +100 Mana vs +20% generic Spell Damage

| Starting Mana | +100 Mana | +20% generic increased Spell Damage |
|---:|---:|---:|
| 3,000 | **+6.87%** | +3.51% |
| 4,000 | **+5.50%** | +3.03% |
| 6,000 | **+3.96%** | +2.38% |
| 8,000 | **+3.12%** | +1.96% |

This is the key answer to **Mana stacking or Mana scaling?**

### Decision

**Actual Mana is the better first-order purchase** until the pool is already large, because it simultaneously increases base damage, Archmage, Rathpith, Arcane Intensity, regen base and defensive capacity.

Generic `% increased Spell Damage` is still useful, but becomes heavily diluted by the enormous Rathpith + Arcane Intensity additive bucket.

Around **6k+ Mana**, start comparing each extra Mana roll against:

- penetration;
- gain-as-extra;
- CDB;
- trigger crit/hit-rate;
- CDR;
- recovery.

Mana does not become bad. It simply stops being the only answer.

---

# 3. Why Arcane Surge should be part of our build

Current Arcane Surge buff:

- **15% increased Cast Speed**
- **20% more Mana Regeneration Rate**
- default duration: **4 seconds**

Reference: <https://poe2db.tw/us/Arcane_Surge>

This is unusually efficient for Mana Flare because it improves **two separate bottlenecks**:

1. more regen increases the recovery-limited Flare rate;
2. cast speed can increase carrier hit frequency, improving trigger saturation.

## Recovery example at 6,000 Mana

At 6k Mana:

- base regen at 4% = **240 Mana/s**
- with +250% increased Mana regen = **840/s**
- with Arcane Surge = **1,008/s**
- with full MoM's 50% less Mana Recovery = only **504/s**

Meanwhile:

- 1 Flare/s at full Mana consumes **1,500 Mana/s**
- 1.5 Flares/s consumes **2,250 Mana/s**
- 2 Flares/s consumes **3,000 Mana/s**

Arcane Surge is therefore a strong multiplier, but **not a complete sustain engine**. Mana Remnants, flask/direct recovery and recovery-rate scaling remain important.

## Trigger-saturation benefit

Using a 46% carrier-crit / 4 eligible-hits-per-second baseline:

- without Surge, 1.0s trigger window ≈ **91.5% saturation**
- if 15% cast speed translates to 4.6 hits/s, ≈ **94.1%**

At a 0.5s cooldown window:

- 4 hits/s ≈ **70.8%**
- 4.6 hits/s ≈ **75.8%**

So Arcane Surge becomes even more useful as CDR rises.

---

# 4. Best Shaman source of Arcane Surge

## Best budget-endgame source: rare Kurgal gloves

Desecrated gloves can roll:

> **10–15% chance to Gain Arcane Surge when you deal a Critical Hit**

This is superior to deliberately spending Mana to maintain the support buff.

Approximate uptime with a 4-second buff:

`Uptime ≈ 1 - (1 - procChance)^(criticalHitsPerSecond × 4)`

At 46% carrier crit:

| Eligible hits/s | Crit hits/s | 10% proc | 12.5% proc | 15% proc |
|---:|---:|---:|---:|---:|
| 4 | 1.84 | 54.0% | 62.6% | **69.8%** |
| 8 | 3.68 | 78.8% | 86.0% | **90.9%** |
| 10 | 4.60 | 85.6% | 91.4% | **95.0%** |

At 70% crit and 8 hits/s, the 15% roll is roughly **97.4% uptime**.

This is excellent because the same crit/hit-rate purchases that improve Mana Flare also improve Surge uptime.

## Temporary answer: Aspiring Genius

**Aspiring Genius** gives:

- 20% increased Mana Regeneration Rate
- 10% chance to gain Arcane Surge on crit

This is an excellent temporary **fourth Strugglescream instill** before good Surge gloves exist.

Once the gloves provide Surge, replace Aspiring Genius with:

- **Temporal Mastery** if cooldown is the actual cap;
- **Pure Chaos** if CDR is already solved and payload is the cap.

## Arcane Surge support gem

The support gives 10 seconds of Surge after spending 100% of maximum Mana on supported self-cast spells.

With Archmage adding roughly 6.1% max-Mana cost and two casts per second, that can mean roughly **12.2% of max Mana spent each second**, or about **732 Mana/s at 6k** before other cost modifiers.

That is the wrong maintenance model for a skill whose damage is based on **current Mana**.

### Conclusion

> **Proc Arcane Surge from crit. Do not burn Mana merely to keep Arcane Surge active.**

---

# 5. Arctic Armour is now recommended utility

Current Arctic Armour:

- reserves **30 Spirit**
- **11% base crit**
- retaliates with a Cold Spell hit when a melee hit consumes a stage
- 100% more Chill magnitude
- 100% more Freeze buildup

Reference: <https://poe2db.tw/us/Arctic_Armour>

Preferred persistent package:

- Archmage: **100 Spirit**
- Mana Remnants: **30 Spirit**
- Arctic Armour: **30 Spirit**
- target: **160 Spirit**

Why it fits:

- anti-melee Chill/Freeze defence;
- retaliatory spell hits can crit and trigger Mana Flare;
- those crits can also contribute to a global Arcane-Surge-on-crit glove proc;
- it keeps producing value while moving/repositioning or under melee pressure.

Do **not** model it as a second independent Mana Flare cooldown. Treat it as **defence + trigger redundancy**.

---

# 6. One-hand weapon thesis

## Best final type: Exceptional 2-socket Wand

For our budget philosophy, plan around **two augment sockets**, not a Runeseeker-style socket fantasy.

The current crafting ecosystem supports high-level 2-socket Exceptional wands. A current 0.5 crafting route commonly starts from an item-level-81 2-socket wand.

With only ~15d remaining, however, **buying a good existing base/item is safer than attempting a mirror-tier craft from scratch**.

## Best explicit Alloy mods

### Celestial Alloy — prefix

Wand / Staff:

- **+142–188 maximum Mana**
- **+1 to all Spell Skills**

### Sovereign Alloy — suffix

Weapons:

- **20–30% increased effect of Socketed Augment Items**

This is particularly important because our sockets are not decorative: they can carry Mana, regen or gain-as-extra.

### Transcendent Alloy — suffix

Current 0.5.3+ Wand values:

- **26–31% increased Cast Speed**
- **Gain 7–11% of Elemental Damage as Extra Cold Damage**

It was briefly removed from Wands in 0.5.2, then restored in 0.5.3 at lower Wand values than Staff values.

This makes the **chase explicit package** approximately:

- Celestial Mana/+1 prefix
- Sovereign augment-effect suffix
- Transcendent cast-speed + gain-as-extra suffix
- plus natural/other useful crit, spell-level or Mana modifiers

This package is powerful, but **not a 15d deterministic craft target**. The budget goal is to buy the best partial version available.

---

# 7. Best caster rune pair — new conclusion

This is where the uptime theorycraft changes the weapon recommendation.

## Perfect Inspiration Rune

Wand / Staff:

- **+60 maximum Mana**
- **35% increased Mana Regeneration Rate**
- Bonded: **5% increased maximum Mana**

## Perfect Mind Rune

Wand / Staff:

- **+90 maximum Mana**
- Bonded: **5% increased maximum Mana**

## Perfect Storm Rune

Wand / Staff:

- **Gain 12% of Damage as Extra Lightning Damage**
- Bonded: **30% increased Shock magnitude**

## With perfect 30% Sovereign effect

Primary socket effects become approximately:

- Inspiration: **+78 Mana +45.5% increased Mana Regen**
- Mind: **+117 Mana**
- Storm: **15.6% gain-as-extra Lightning**

If Sovereign also scales the Bonded line in the equipped tooltip, the 5% increased-max-Mana Bonded line becomes **6.5%**. Verify this in-game before committing currency.

## Inspiration vs Mind at 6k Mana

Illustrative assumption:

- current 6,000 Mana;
- roughly +100% existing increased maximum Mana;
- average Celestial roll +165 flat Mana;
- perfect 30% Sovereign;
- Bonded maximum-Mana effect scales as expected.

### Celestial + Mind

Approx reconstructed Mana: **6,777**

Illustrative payload increase vs 6,000 baseline: **~33.6%**

### Celestial + Inspiration

Approx reconstructed Mana: **6,697**

Illustrative payload increase vs 6,000 baseline: **~29.8%**

So choosing Inspiration instead of Mind costs only about **2.9% relative illustrative payload** between these two completed variants.

But Inspiration also adds **45.5 percentage points of increased Mana regen**.

If existing increased Mana regen is +250%:

- old multiplier = 3.50
- with Inspiration = 3.955
- regen component improves by roughly **13%**

### Decision

For this Mana Flare Shaman, where recovery is a known bottleneck:

> **Perfect Inspiration Rune is probably the best first weapon rune.**

Then:

- **Inspiration + Mind** = preferred balanced pair.
- **Inspiration + Storm** = recovery + boss-damage/Shock pair once Mana is healthy.
- **Mind + Mind** = maximum raw-Mana/payload/defence pair if recovery is already solved.

This is more useful than blindly socketing two Mind Runes.

## Current currency snapshot

Recent Runes of Aldur economy snapshot:

- Divine Orb ≈ **325.4 Exalted**
- Perfect Inspiration Rune ≈ **652.5 Exalted** ≈ **2.0d**
- Perfect Mind Rune ≈ **549 Exalted** ≈ **1.69d**
- Perfect Storm Rune ≈ **557.6 Exalted** ≈ **1.71d**

These are snapshot prices, not permanent guide prices.

---

# 8. Non-wand one-hand options

## Adonia's Ego — best cheap bridge

Current useful lines:

- +100–150 maximum Mana
- +3 all Spell Skills
- 15–30% increased Cast Speed
- Pinnacle of Power

Why it is good:

- cheap combination of Mana + speed + native carrier skill levels;
- particularly good while Entangle/Frost Darts/Orb native damage matters.

Why it is not the final Flare weapon:

- +3 skill levels do not multiply Mana Flare's 25%-of-current-Mana base like actual Mana does;
- a strong 2-socket rare Wand can scale Mana, recovery, caster utility and augment effects simultaneously.

### Verdict

**Excellent bridge. Do not sink premium currency into building around it.**

## Guiding Palm of the Mind — legitimate experiment

Current item:

- **100 Spirit**
- **Gain 25% of Damage as Extra Lightning**
- +20–30 Dexterity
- permanent Guided Tempest Shrine effect

This is not a meme for us.

It can single-handedly solve the Spirit pressure for:

- Archmage
- Mana Remnants
- Arctic Armour

But fixed gain-as-extra is diluted by Archmage as Mana rises.

Approx relative value of another fixed +25% extra Lightning:

| Mana | Existing Archmage extra | +25% relative raw value |
|---:|---:|---:|
| 3,000 | +120% | 11.36% |
| 4,000 | +160% | 9.62% |
| 6,000 | +240% | **7.35%** |
| 8,000 | +320% | **5.95%** |

### Verdict

**Great budget Spirit experiment; not the preferred final weapon once Spirit is solved elsewhere.**

## Generic martial one-hand weapons

Reject.

Caster runes change to attack/leech effects on martial weapons, so they lose the exact Mana/caster socket scaling we want.

---

# 9. Defence: fake MoM is the destination, not today's obligation

Mind Over Matter:

- all damage from Mana before Life
- **50% less Mana Recovery Rate**

That recovery penalty is especially painful because the same Mana pool powers Mana Flare.

Current no-MoM sources include:

- Cloak of Defiance: **50%**
- Feathered Raiment implicit: 5–10%
- Kurgal body suffix: 10–20%
- selected ring/jewel/passive sources
- Greatwolf body rune

The Stormweaver reference build demonstrates why **100% Mana-before-Life without MoM** is an excellent premium endpoint.

But Stormweaver gets 20% from Force of Will for free. Shaman does not.

### Therefore

Do **not** spend the remaining 15d forcing 100% fake MoM if it ruins the rest of the character.

## Cloak of Defiance becomes important

Current Cloak:

- 50–100% increased ES
- +100–150 maximum Mana
- 50–100% increased Mana Regeneration Rate
- **50% damage taken from Mana before Life**

This makes it a strong budget test item because it combines:

- Mana;
- regen;
- EB-convertible local ES;
- half of the fake-MoM problem in one slot.

### Body decision

**Cloak wins** when MoM's recovery penalty is the dominant problem and one item can let the rest of the defence transition safely.

**Morior wins** when its actual socket rolls solve several constraints — especially Mana + Spirit + attributes/resists.

**High-ES rare wins** when displayed local ES + flat Mana + exact suffixes are simply better.

There is no universal body winner.

---

# 10. Updated Strugglescream package

One slot is already locked:

1. **Invocated Efficiency**

Before Arcane-Surge gloves:

2. **Mystical Rage**
3. **Electric Amplification**
4. **Aspiring Genius**

After Arcane-Surge gloves:

2. Mystical Rage
3. Electric Amplification
4. **Temporal Mastery** if cooldown is the cap, otherwise **Pure Chaos**

This is better than buying Kurgal's Gaze. A recent economy snapshot puts Kurgal's Gaze around **17,614 Exalted**, or roughly **54 Divines** at the same Divine quote — more than the entire remaining budget and around the whole intended build ceiling.

---

# 11. Remaining ~15 Divine spend plan

This is a priority order, not a promise that every market listing fits the band.

## Priority 1 — Arcane Surge gloves

**Target value band: roughly 2–4d, but skip if overpriced.**

Desired:

- 10–15% chance to gain Arcane Surge on crit;
- Mana and/or good local ES;
- CDB/crit or useful defence;
- needed resistance/attribute.

If good gloves are too expensive, use **Aspiring Genius** temporarily instead.

## Priority 2 — reach 160 Spirit

Spend as little as possible.

This turns on:

- Archmage 100
- Mana Remnants 30
- Arctic Armour 30

Spirit on an otherwise-good Morior/amulet/boot becomes meaningfully valuable because it activates an actual defensive/trigger layer.

## Priority 3 — weapon

Do **not** attempt a chase craft from scratch with 15d.

Look for a strong existing **2-socket Exceptional Wand** or a significantly cheaper partial version.

Desired order:

1. high Mana / Celestial package;
2. Sovereign augment effect;
3. strong natural crit/cast/spell-level modifier;
4. one good rune first;
5. second rune after the first weapon is clearly permanent enough.

### Preferred first rune

**Perfect Inspiration Rune** if recovery is still binding.

### Preferred second rune

**Perfect Mind Rune** for the balanced version.

Swap the second slot to **Perfect Storm** only if recovery/Mana are comfortable and boss damage/Shock is the better marginal purchase.

## Priority 4 — defence reserve

Keep several Divines liquid.

If full MoM is clearly choking recovery, test whether Cloak + existing Mana-before-Life sources let the build drop MoM without becoming fragile.

Do not refund MoM first and hope the defence works afterward.

---

# 12. What not to buy with the last 15d

- Kurgal's Gaze
- Jiquani's Thesis
- Temporalis
- Runeseeker itself
- mirror-tier wand crafting steps
- a forced 100% fake-MoM package that destroys Mana/resists/crit
- expensive generic `% increased Spell Damage` with no second job
- a power-charge package merely to justify Adonia's Pinnacle of Power

---

# 13. Final finished architecture

## Weapon

**Exceptional 2-socket rare Wand**

Ideal direction:

- high flat Mana / Celestial
- Sovereign augment effect
- useful crit/cast/spell-level modifier
- Transcendent if the item/budget supports it
- **Perfect Inspiration + Perfect Mind** as the balanced socket pair

Budget bridge: **Adonia's Ego**.  
Spirit experiment: **Guiding Palm of the Mind**.

## Offhand

**Cultivated Rathpith**.

## Amulet

**Strugglescream**.

Core:

- Invocated Efficiency
- Mystical Rage
- Electric Amplification

Fourth:

- Aspiring Genius before Surge gloves;
- Temporal Mastery or Pure Chaos afterward.

## Body

Choose by actual bottleneck:

- Cloak = value recovery/fake-MoM bridge
- Morior = socket-flexibility + Mana/Spirit/stats
- high-ES rare = raw EB Mana + exact affixes

## Gloves

Preferred endgame budget direction:

**rare gloves with 10–15% Arcane Surge on crit**.

Nightscale remains the recovery bridge.  
Leopold remains the payload glove once Surge/recovery are solved.

## Persistent skills

- Archmage
- Mana Remnants
- Arctic Armour

Target: **160 Spirit**.

## Carrier skills

- mapping: Entangle / Orb of Storms by feel and coverage
- bossing: Frost Darts + Orb of Storms for repeated crit events
- Arctic Armour: defensive retaliatory trigger redundancy

---

# 14. Final decision tree

**Mana below ~5–6k?**  
Buy efficient actual Mana / local ES / INT / %max Mana first.

**Flare procs inconsistent?**  
Improve carrier crit/hit-rate and Arcane Surge uptime before buying more CDR.

**Cooldown visibly capped?**  
Then buy CDR.

**Current Mana collapsing during sustained damage?**  
Recovery is the cap. Prioritise Surge, Remnants, regen, Inspiration Rune, flask/direct recovery and question full MoM.

**Recovery + trigger rate healthy?**  
Buy penetration, gain-as-extra, CDB and premium weapon effects.

**Item only offers generic `% Spell Damage`?**  
It should be cheap or have a second premium job.

---

# Sources

- Mana Flare: <https://poe2db.tw/us/Mana_Flare>
- Archmage: <https://poe2db.tw/us/Archmage>
- Arcane Surge / Aspiring Genius / Kurgal mods: <https://poe2db.tw/us/Arcane_Surge>
- Arctic Armour: <https://poe2db.tw/us/Arctic_Armour>
- Cultivated Rathpith: <https://poe2db.tw/us/Rathpith_Globe>
- Arcane Intensity: <https://poe2db.tw/us/Arcane_Intensity>
- Mana-before-Life: <https://poe2db.tw/us/Mana_before_Life>
- Cloak of Defiance: <https://poe2db.tw/us/Cloak_of_Defiance>
- Celestial Alloy: <https://poe2db.tw/us/Celestial_Alloy>
- Sovereign Alloy: <https://poe2db.tw/us/Sovereign_Alloy>
- Transcendent Alloy: <https://poe2db.tw/us/Transcendent_Alloy>
- Runes: <https://poe2db.tw/us/Rune>
- Guiding Palm of the Mind: <https://poe2db.tw/Guiding_Palm_of_the_Mind>
- Adonia's Ego: <https://poe2db.tw/us/Adonias_Ego>
- Maxroll benchmark: <https://maxroll.gg/poe2/pob/3s56jm06>
- Current wand crafting context: <https://mobalytics.gg/poe-2/profile/bigdaddygaming/guides/0-5-7-wand-crafting-guide>
- Runes of Aldur currency snapshot: <https://divindex.com/>

## Research note

The supplied Phoenix/YouTube transcript was treated as an architectural reference. Class-specific Stormweaver conclusions were not copied into the Shaman recommendation unless the underlying mechanic also made sense for Shaman.
