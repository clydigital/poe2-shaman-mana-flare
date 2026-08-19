# Mana Geyser Shaman — Budget Minmax Thesis

**Date:** 2026-08-19  
**Objective:** reach the Runeseeker farm, sell Runeseeker, and keep a strong Runeseeker-free Mana Flare Shaman.  
**Total endgame ceiling:** about **50 Divines**.  
**Working budget remaining:** about **15 Divines**.

---

## Executive decision

The build should be treated as a **Mana engine**, not as a normal caster that happens to use Mana Flare.

The same point of Mana can scale all of these at once:

1. **Mana Flare base hit** — consumes 25% of current Mana to deal that much Fire damage.
2. **Archmage** — gains 4% of damage as extra Lightning per 100 maximum Mana.
3. **Cultivated Rathpith** — 6% increased damage and 3% increased spell crit per 100 maximum Mana.
4. **Arcane Intensity** — 3% increased Spell Damage per 100 maximum Mana.
5. **Mana regeneration base** — maximum Mana raises the raw regeneration base.
6. **Defence** — whenever damage is redirected to Mana before Life.

That overlap gives the central rule:

> **Mana first → trigger reliability + recovery → enough CDR to use that recovery → penetration / gain-as-extra / CDB.**

The external Stormweaver build is useful because it validates the recovery architecture, but we should **not copy the class**. The best Shaman version combines:

- Stormweaver-style Mana / recovery / cost-efficiency discipline;
- Shaman Rage scaling;
- Strugglescream;
- Cultivated Rathpith;
- Mana Flare as the payload.

### Current finished direction

Within the ~50d philosophy:

- **Cultivated Rathpith** stays the preferred Flare-centric offhand.
- **Strugglescream** stays, with Invocated Efficiency already locked.
- **Arcane Surge-on-crit rare gloves** are the preferred budget-endgame Surge source.
- **Archmage + Mana Remnants + Arctic Armour** is the desired persistent package once 160 Spirit is available.
- **Exceptional 2-socket rare Wand** is the preferred long-term main hand.
- **Perfect Mind Rune** is the default first weapon rune while maximum Mana is still the first-order bottleneck.
- **Perfect Inspiration Rune** becomes extremely attractive when recovery / carrier cost efficiency is the bottleneck.
- **Perfect Storm Rune** is the boss-payload / Shock option after Mana and sustain are healthy.
- **Sacred Flame** is the best weird non-Wand one-hand experiment found so far: 100 Spirit, 40–60% gain-as-extra Fire, and lowest-elemental-resistance normalisation while still allowing Rathpith offhand.
- Keep **Mind Over Matter** until a real replacement defence exists; the premium direction is high Mana-before-Life without MoM's 50% less Mana Recovery.
- **Cloak of Defiance** is a serious value transition body rather than a curiosity.

---

# 1. What the Phoenix / Maxroll Stormweaver teaches us

Reference PoB: <https://maxroll.gg/poe2/pob/3s56jm06>

The imported Level 97 Stormweaver benchmark exposes approximately:

- **6,268 Mana**
- **14,824 eHP**
- **75 / 75 / 75** elemental resistances
- **86% crit** on Arc
- **441% crit multiplier** shown for Arc
- **187% increased Mana Regeneration Rate** in the passive summary
- **15% increased Mana Recovery Rate**
- **80% Mana Cost Efficiency**
- **52% damage taken from Mana before Life** visible in the passive summary before remaining gear contributions
- **30% Lightning penetration**
- **50% increased Shock magnitude**
- Eldritch Battery + Chaos Inoculation
- permanent Arcane Surge from Stormweaver

The useful lesson is the **allocation of power**, not Arc itself. A successful high-end Mana caster spends resources on:

- maximum Mana;
- Mana regeneration;
- Mana Recovery Rate;
- Mana Cost Efficiency;
- damage taken from Mana before Life;
- penetration;
- Shock magnitude;
- crit / CDB;
- cast speed;
- Intelligence.

That is much healthier than treating every remaining point as generic increased Spell Damage.

## What Shaman cannot copy

Stormweaver gets two huge class advantages:

- **Constant Gale:** permanent Arcane Surge.
- **Force of Will:** 20% damage taken from Mana before Life plus increasing Arcane Surge effect while Mana is missing.

Shaman has to manufacture those functions elsewhere.

## What Shaman gets instead

- **Druidic Champion:** Rage becomes more Spell Damage.
- **Furious Wellspring:** Mana-regeneration modifiers also scale Rage regeneration.
- **Mystical Rage:** Rage also grants increased Spell Damage.
- **Strugglescream:** four instilled notables.
- **Cultivated Rathpith:** maximum Mana directly scales spell damage and spell crit.

So the transferable thesis is:

> **Steal the Stormweaver's recovery engineering. Keep Shaman's Rage + Rathpith + Strugglescream damage engine.**

---

# 2. Mana stacking vs generic Spell Damage

Current mechanics used in the marginal-value model:

- Mana Flare: `Fire base = 0.25 × current Mana`
- Archmage: `+4% damage as extra Lightning per 100 maximum Mana`
- Cultivated Rathpith: `+6% increased Damage per 100 maximum Mana`
- Arcane Intensity: `+3% increased Spell Damage per 100 maximum Mana`

Assume current Mana is near maximum and use an illustrative **+200% other increased-damage bucket**.

### Simplified model

`Flare base = 0.25M`

`Archmage raw multiplier = 1 + 0.0004M`

`Rathpith + Arcane Intensity = +0.0009M increased damage`

`Illustrative payload = 0.25M × (1 + 0.0004M) × (3 + 0.0009M)`

This is not presented as exact in-game DPS. It is a **marginal-stat comparison**.

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

This answers the user's **Mana stacking or Mana scaling?** question:

### Decision

**Final maximum Mana is the first-order stat until the pool is already healthy.**

That does not mean blindly preferring flat Mana over % Mana. It means building the largest final pool efficiently:

- flat Mana creates the base;
- Intelligence adds base Mana;
- local ES converted through Eldritch Battery adds to the Mana chassis;
- % maximum Mana multiplies the base;
- generic Spell Damage is a later additive multiplier.

Around **6k+ Mana**, begin comparing another Mana roll directly against penetration, gain-as-extra, CDB, recovery and CDR. Mana remains good; it simply stops being the only good stat.

---

# 3. Arcane Surge should be part of the build

Current Arcane Surge:

- **15% increased Cast Speed**
- **20% more Mana Regeneration Rate**
- default duration **4 seconds**

Reference: <https://poe2db.tw/us/Arcane_Surge>

This is unusually efficient for Mana Flare because it improves two independent bottlenecks:

1. more regen improves recovery-limited Flare frequency;
2. cast speed improves carrier hit frequency and therefore trigger saturation.

## Recovery example at 6,000 Mana

At 6k Mana:

- base 4% regen = **240 Mana/s**
- with +250% increased Mana regen = **840/s**
- with Arcane Surge = **1,008/s**
- with full MoM's 50% less Mana Recovery = only **504/s**

Meanwhile, at full current Mana:

- 1 Flare/s consumes **1,500 Mana/s**
- 1.5 Flares/s consumes **2,250 Mana/s**
- 2 Flares/s consumes **3,000 Mana/s**

So Arcane Surge is powerful but does **not** replace Mana Remnants, flask/direct recovery or recovery-rate scaling.

## Trigger-saturation effect

Using the previous 46% carrier-crit / 4 eligible-hits-per-second benchmark:

- 1.0s trigger window: ~91.5% saturation
- if 15% cast speed effectively turns 4 → 4.6 hits/s: ~94.1%

At a 0.5s cooldown window:

- 4 hits/s: ~70.8%
- 4.6 hits/s: ~75.8%

Arcane Surge becomes more useful as CDR rises because shorter trigger windows demand more eligible crit events.

---

# 4. Best Shaman Arcane Surge source

## Preferred budget-endgame source: Kurgal glove suffix

Desecrated gloves can roll:

> **10–15% chance to Gain Arcane Surge when you deal a Critical Hit**

Approximate uptime with a 4-second buff:

`Uptime ≈ 1 - (1 - procChance)^(criticalHitsPerSecond × 4)`

At 46% carrier crit:

| Eligible hits/s | Crit hits/s | 10% proc | 12.5% proc | 15% proc |
|---:|---:|---:|---:|---:|
| 4 | 1.84 | 54.0% | 62.6% | **69.8%** |
| 8 | 3.68 | 78.8% | 86.0% | **90.9%** |
| 10 | 4.60 | 85.6% | 91.4% | **95.0%** |

At 70% crit and 8 eligible hits/s, a 15% roll is roughly **97.4% uptime**.

The key synergy is that carrier crit/hit-rate upgrades improve both Mana Flare triggering **and** Surge uptime.

## Temporary source: Aspiring Genius

**Aspiring Genius** gives:

- 20% increased Mana Regeneration Rate
- 10% chance to gain Arcane Surge on crit

Use it as the temporary fourth Strugglescream instill if good Surge gloves are not yet affordable.

Once gloves supply Surge, reclaim the fourth instill for:

- **Temporal Mastery** if cooldown is the active cap;
- **Pure Chaos** if CDR is already solved and payload is the cap.

## Arcane Surge Support

The support grants a 10-second Surge after cumulatively spending 100% of maximum Mana on the supported self-cast skill.

It works, but deliberately spending Mana to maintain a recovery buff is awkward on a build whose payload depends on **current Mana**.

### Conclusion

> **Proc Arcane Surge from crit instead of deliberately draining the Flare fuel tank.**

---

# 5. Arctic Armour is recommended utility

Current Arctic Armour:

- reserves **30 Spirit**
- has **11% base crit**
- retaliates with a Cold Spell hit when a melee hit consumes a stage
- has doubled Chill magnitude and Freeze buildup

Reference: <https://poe2db.tw/us/Arctic_Armour>

Preferred persistent package:

- Archmage: **100 Spirit**
- Mana Remnants: **30 Spirit**
- Arctic Armour: **30 Spirit**
- target: **160 Spirit**

Why it fits:

- anti-melee Chill / Freeze defence;
- retaliatory spell hits can crit and trigger Mana Flare;
- those crits can also contribute to global Arcane-Surge-on-crit uptime;
- it gives value while moving, repositioning or under melee pressure.

Do **not** model Arctic Armour as a second independent Mana Flare cooldown. Treat it as **defence + trigger redundancy**.

---

# 6. One-hand weapon thesis

## Preferred final type: Exceptional 2-socket Wand

Normal one-handed weapons have one augment socket. High-level Exceptional drops can generate with an additional socket, so a Wand can drop with **two sockets**. Corruption can exceed the normal limit again, but the budget plan should not assume a successful corrupt.

Reference: <https://www.poe2wiki.net/wiki/Augment_socket>

With only ~15d remaining, **buy a good existing Exceptional Wand or partial craft rather than attempting a chase craft from scratch**.

## Premium Alloy package

### Celestial Alloy — prefix

Wand / Staff:

- **+142–188 maximum Mana**
- **+1 to all Spell Skills**

### Sovereign Alloy — suffix

Weapons:

- **20–30% increased effect of Socketed Augment Items**

### Transcendent Alloy — suffix

Current Wand values:

- **26–31% increased Cast Speed**
- **Gain 7–11% of Elemental Damage as Extra Cold Damage**

Transcendent was briefly removed from Wands, then restored in 0.5.3 at lower Wand values than Staff values.

### Ideal direction

The chase explicit package is approximately:

- Celestial Mana / +1 prefix;
- Sovereign augment-effect suffix;
- Transcendent cast-speed / extra-Cold suffix;
- plus whatever strong natural crit, skill-level, Mana or damage modifier the actual item can support.

This is a **ceiling**, not a 15d deterministic crafting recipe.

---

# 7. Caster rune comparison — corrected

This is the important correction from the latest source check.

## Perfect Mind Rune

Wand / Staff:

- **+90 maximum Mana**
- Bonded: **5% increased maximum Mana**

With a perfect 30% Sovereign effect, the primary +90 line becomes approximately **+117 flat Mana**.

If Sovereign also scales the Bonded line, the 5% line would become 6.5%; verify the equipped tooltip before assuming that in a purchase calculation.

### Role

**Best default first rune while maximum Mana is still the main bottleneck.**

It scales payload, Archmage, Rathpith, regen base and Mana defence simultaneously.

## Perfect Inspiration Rune

Wand / Staff:

- **35% increased Mana Regeneration Rate**
- Bonded: **16% increased Mana Cost Efficiency**

**It does not give flat Mana on a Wand.**

With perfect 30% Sovereign, the primary 35% regen line becomes approximately **45.5% increased Mana Regeneration Rate**.

If Bonded effects are also scaled, 16% Cost Efficiency would become 20.8%; verify the in-game tooltip before assuming that scaling.

### Role

This is a **sustain rune**, not a Mana rune.

At an existing +250% increased-Mana-regen bucket:

- old multiplier = 3.50
- +45.5 percentage points → 3.955
- regen component rises by about **13%**

Its Cost Efficiency also helps prevent Archmage/carrier casting from eroding current Mana between Flares.

## Perfect Storm Rune

Wand / Staff:

- **Gain 12% of Damage as Extra Lightning Damage**
- Bonded: **30% increased Shock magnitude**

With 30% Sovereign, the primary becomes roughly **15.6% gain-as-extra Lightning**.

### Role

Boss-payload / Shock rune after Mana and recovery are already comfortable.

## Correct rune decision

### If maximum Mana is still below target

**Mind first.**

### If current Mana is collapsing under sustained casting / Flare use

**Inspiration becomes the best sustain socket.**

### If Mana and recovery are both comfortable

**Storm can replace Inspiration or the second Mind for boss payload.**

### Preferred pairs

- **Mind + Inspiration** = balanced Mana + sustain pair.
- **Mind + Mind** = maximum raw Mana / payload / defence pair if recovery is solved.
- **Mind + Storm** = high-Mana boss-payload pair.
- **Inspiration + Storm** = only if the base item already provides enough Mana and recovery remains more important than another Mind.

This is much more precise than blindly recommending two Mind Runes or pretending Inspiration also adds Mana.

---

# 8. Sacred Flame — best weird non-Wand found

Current **Sacred Flame Shrine Sceptre**:

- base Sceptres provide **100 Spirit**
- **Gain 40–60% of Damage as Extra Fire Damage**
- enemies in your Presence resist Elemental Damage based on their **lowest elemental resistance**
- can be equipped one-handed, allowing a Focus such as Cultivated Rathpith in the other hand

References:

- <https://poe2db.tw/us/Sacred_Flame>
- <https://poe2db.tw/us/Sceptres>
- <https://www.poe2wiki.net/wiki/Sacred_Flame>

## Why this is much more interesting than Guiding Palm

At 6k Mana, Archmage contributes +240% extra Lightning in the simplified non-recursive model.

A median 50% Sacred Flame roll therefore adds approximately:

`0.50 / (1 + 2.40) = 14.7%`

relative raw hit damage before its resistance-normalisation line.

A 60% roll is approximately **17.6%** by the same simplified comparison.

It also grants 100 Spirit, enough to solve the entire extra Spirit requirement for the 160-Spirit Archmage + Remnants + Arctic Armour package.

## Lowest-resistance line

Sacred Flame makes all Fire, Cold and Lightning damage received by nearby enemies use their **lowest current elemental resistance** after resistance increases/reductions such as exposure. Penetration is applied afterward and still has to match the damage type.

That is especially useful for our mixed Fire + Lightning Mana Flare hit because one well-reduced elemental resistance can effectively become the resistance basis for both elements.

It does **not** use Chaos resistance.

## Why it still probably loses to the final Mana Wand

- no Celestial flat-Mana package;
- caster runes on Sceptres do not provide the Wand/Staff effects;
- no Sovereign-boosted Mind rune package;
- less direct final-Mana scaling means less Flare base, Archmage, Rathpith scaling and Mana defence.

### Verdict

> **Sacred Flame is the best weird budget / mapping / Spirit one-hand challenger. The Exceptional Mana Wand remains the preferred high-Mana bossing endpoint.**

It is also an excellent candidate for a second weapon set if the Spirit-reservation behaviour and skill package are configured around the swap.

---

# 9. Other one-hand alternatives

## Guiding Palm of the Mind

Current useful lines:

- 100 Spirit
- Gain 25% of Damage as Extra Lightning
- +20–30 Dexterity

At 6k Mana, another fixed 25% gain is roughly **7.35% relative raw damage** in the same conservative Archmage comparison.

So Sacred Flame offers roughly twice the raw gain-as-extra at a good roll, while Guiding Palm provides Dexterity and Lightning alignment.

### Verdict

Useful Spirit/stat alternative, but **Sacred Flame is the stronger weird damage experiment** unless the DEX or Lightning typing specifically matters.

## Adonia's Ego

Current useful lines:

- +100–150 maximum Mana
- +3 all Spell Skills
- 15–30% Cast Speed

This is an excellent cheap bridge because it improves carriers as well as Mana/cast smoothness.

The +3 levels do not scale Mana Flare's 25%-current-Mana base nearly as directly as actual Mana, so a strong Exceptional Mana Wand remains the endpoint.

## Generic martial weapons

Reject for the main build. Caster runes change to attack/leech effects on martial weapons, so they lose the Wand/Staff Mana/caster package.

---

# 10. Defence — fake MoM is the destination, not today's obligation

Mind Over Matter:

- all damage taken from Mana before Life
- **50% less Mana Recovery Rate**

That recovery penalty is painful because the same resource powers Mana Flare.

The Stormweaver reference demonstrates why high / 100% Mana-before-Life **without** MoM is an excellent premium endpoint, but Stormweaver gets 20% from Force of Will for free. Shaman does not.

Therefore:

> Do **not** spend the remaining ~15d forcing 100% fake MoM if doing so destroys Mana, resistances, crit or recovery elsewhere.

## Cloak of Defiance

Current useful package:

- +100–150 maximum Mana
- 50–100% increased Mana Regeneration Rate
- local ES
- **50% damage taken from Mana before Life**

That makes Cloak a serious budget test because one slot solves:

- half of the fake-MoM problem;
- Mana;
- regen;
- EB-convertible local ES.

### Body comparison

**Cloak wins** when MoM's recovery penalty is the dominant problem and one item enables a safe transition.

**Morior wins** when its socket rolls solve several constraints at once — especially Mana + Spirit + attributes / resistances.

**High-ES rare wins** when displayed local ES + flat Mana + exact suffixes simply produce the best final character.

There is no universal body winner.

---

# 11. Updated Strugglescream package

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

This is far more budget-efficient than buying Kurgal's Gaze merely to scale Arcane Surge effect.

---

# 12. Remaining ~15 Divine spend plan

Market prices move, so these are priority bands rather than guaranteed listing prices.

## Priority 1 — identify the current Mana bottleneck

If final Mana is still well below ~5–6k, **the weapon/Mana chassis outranks pure damage purchases**.

## Priority 2 — Arcane Surge gloves

Target:

- 10–15% chance to gain Arcane Surge on crit;
- Mana and/or good local ES;
- useful CDB / crit / defence;
- needed resistance / attribute.

If the price premium is excessive, use **Aspiring Genius** temporarily instead.

## Priority 3 — reach 160 Spirit cheaply

This activates:

- Archmage 100
- Mana Remnants 30
- Arctic Armour 30

Sacred Flame can solve this instantly as a weapon-set / alternate-main-hand experiment because Sceptres supply 100 Spirit.

## Priority 4 — Exceptional Wand

Do **not** attempt a mirror-tier deterministic craft from scratch with 15d.

Look for a strong existing **2-socket Exceptional Wand** or partial craft.

Desired order:

1. high final Mana / Celestial package;
2. Sovereign augment effect;
3. useful natural crit / cast / spell-level modifier;
4. **Perfect Mind** first while Mana remains the bottleneck;
5. second rune chosen by the actual bottleneck: Inspiration for sustain, Storm for boss payload, second Mind for maximum Mana.

## Priority 5 — keep a reserve

Keep several Divines liquid for:

- resistances;
- attributes;
- boots;
- body transition;
- unexpected cheap high-value listing.

A theoretical 10% damage upgrade that breaks recovery or defence is not an upgrade.

---

# 13. What not to buy with the last ~15d

- Kurgal's Gaze
- Jiquani's Thesis
- Temporalis
- Runeseeker itself
- mirror-tier Wand crafting attempts
- a forced 100% fake-MoM package that ruins the rest of the character
- expensive generic `% increased Spell Damage` with no second job
- a power-charge package merely to justify Adonia's Pinnacle of Power

---

# 14. Final equipment architecture

## Main-hand endpoint

**Exceptional 2-socket rare Wand**

Ideal direction:

- strong final Mana / Celestial
- Sovereign augment effect
- useful crit / cast / spell-level modifier
- Transcendent if the actual item and budget support it

Rune order:

- **Mind** while Mana is first-order
- **Inspiration** if recovery / casting cost is first-order
- **Storm** if boss payload / Shock is first-order

## Weird / second-set main hand

**Sacred Flame**

Best use case:

- mapping;
- Spirit-starved setup;
- Arctic Armour activation;
- mixed-element resistance normalisation;
- budget damage before the great Mana Wand exists.

## Offhand

**Cultivated Rathpith**.

## Amulet

**Strugglescream**.

## Gloves

Preferred budget-endgame direction:

**rare gloves with 10–15% Arcane Surge on crit**.

Nightscale remains the recovery bridge.  
Leopold remains the pure payload glove once Surge/recovery are solved.

## Body

Choose according to the actual bottleneck:

- Cloak = value recovery / fake-MoM bridge
- Morior = socket flexibility + Mana / Spirit / stats
- high-ES rare = raw EB Mana + exact affixes

## Persistent skills

- Archmage
- Mana Remnants
- Arctic Armour

Target: **160 Spirit**.

---

# 15. Final decision tree

**Mana below ~5–6k?**  
Buy efficient final Mana first.

**Flare procs inconsistent?**  
Improve carrier crit / hit-rate and Arcane Surge uptime before buying more CDR.

**Current Mana collapses during sustained casting / Flare use?**  
Recovery is the cap. Consider Inspiration Rune, Surge, Remnants, regen, flask/direct recovery and eventually the MoM transition.

**Cooldown visibly capped while Mana stays healthy?**  
Then buy CDR.

**Mana + recovery + trigger rate healthy?**  
Buy penetration, gain-as-extra, CDB and premium weapon effects.

**Need 100 Spirit plus immediate damage cheaply?**  
Test Sacred Flame.

**Item only offers generic `% Spell Damage`?**  
It should be cheap or have another premium job.

---

# Primary sources

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
- Sacred Flame: <https://poe2db.tw/us/Sacred_Flame>
- Sceptres: <https://poe2db.tw/us/Sceptres>
- Sacred Flame mechanics: <https://www.poe2wiki.net/wiki/Sacred_Flame>
- Augment sockets: <https://www.poe2wiki.net/wiki/Augment_socket>
- Guiding Palm of the Mind: <https://poe2db.tw/Guiding_Palm_of_the_Mind>
- Adonia's Ego: <https://poe2db.tw/us/Adonias_Ego>
- Maxroll benchmark: <https://maxroll.gg/poe2/pob/3s56jm06>

## Research note

The supplied Phoenix/YouTube transcript was treated as an architectural reference. Stormweaver-specific conclusions were not copied into the Shaman recommendation unless the underlying mechanic also made sense for Shaman.
