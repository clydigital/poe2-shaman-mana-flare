# Mana Geyser Shaman — Final Budget Minmax Thesis

**Date:** 2026-08-19  
**Objective:** reach the Runeseeker farm, **sell Runeseeker**, and keep a strong Runeseeker-free Mana Flare Shaman.  
**Total endgame ceiling:** about **50 Divines**.  
**Working budget remaining:** about **15 Divines**.

---

## Executive thesis

This is not a normal caster build. It is a **Mana engine**.

A point of actual maximum Mana can improve several systems at once:

1. **Mana Flare base hit** — it consumes 25% of current Mana to deal that much Fire damage.
2. **Archmage** — non-channelling spells gain 4% of damage as extra Lightning per 100 maximum Mana.
3. **Cultivated Rathpith** — maximum Mana supplies increased spell damage and spell critical chance.
4. **Mana-linked passive damage** — another 3% increased Spell Damage per 100 maximum Mana.
5. **Mana regeneration base** — a larger pool raises the raw amount regenerated before increased/more modifiers.
6. **Defence** — whenever incoming damage is redirected to Mana before Life.

That makes the correct optimisation order:

> **Actual Mana first → trigger reliability + recovery → enough CDR to use that recovery → penetration / gain-as-extra / CDB.**

The external Phoenix/Maxroll Stormweaver and the current PoE Vault Mana Flare Shaman both support the same broad conclusion: successful endgame Mana characters do not merely stack generic `% Spell Damage`. They fund maximum Mana, Mana regeneration, Mana Cost Efficiency, Mana-before-Life, crit, penetration, Shock and cast speed together.

### Current recommended finished direction

- **Cultivated Rathpith** stays the Flare-centric offhand.
- **Strugglescream** stays; Invocated Efficiency is already locked.
- **Rare gloves with 10–15% chance to gain Arcane Surge on crit** are a major budget-endgame target.
- **Archmage + Mana Remnants + Arctic Armour** is the desired persistent package.
- **Sacred Flow**, not expensive gear, is the first Spirit solution.
- **Exceptional 2-socket rare Wand** is the sane long-term main-hand target within this budget.
- A **3-socket corrupted Exceptional Wand** is the theoretical one-hand socket ceiling, but is chase/gamble territory and should not shape the last-15d plan.
- **Perfect Mind Rune** is the default first Wand rune while final Mana is still the main bottleneck.
- **Perfect Inspiration Rune** is the sustain/cost-efficiency rune when current Mana collapses under repeated casts and Flares.
- **Perfect Storm Rune** becomes the boss-payload/Shock option after Mana and recovery are healthy.
- **Sacred Flame** is the best weird non-Wand one-hand challenger found so far, but mainly because of 40–60% gain-as-extra Fire and lowest-elemental-resistance normalisation — not because we need its Spirit.
- Keep **Mind Over Matter** while the replacement defence is incomplete. The premium destination is high/100% Mana-before-Life **without** MoM's 50% less Mana Recovery.
- **Cloak of Defiance** is a serious value transition body.
- **Khatal's Rejuvenation** is a strong mapping-specific CDR purchase after the core Mana/Surge chassis, not a first bossing purchase.

---

# 1. What the external builds actually teach us

## Phoenix / Maxroll Stormweaver benchmark

Reference: <https://maxroll.gg/poe2/pob/3s56jm06>

Visible benchmark values include approximately:

- 6,268 Mana
- 14,824 eHP
- 75 / 75 / 75 elemental resistance
- 86% Arc crit
- 441% crit multiplier shown
- 187% increased Mana Regeneration Rate in the passive summary
- 15% increased Mana Recovery Rate
- 80% Mana Cost Efficiency
- 52% damage taken from Mana before Life visible before the rest of the gear package
- 30% Lightning penetration
- 50% increased Shock magnitude
- Eldritch Battery
- permanent Arcane Surge from Stormweaver

The transferable lesson is the **distribution of stats**. Mana, recovery, cost efficiency and defence are treated as part of the damage engine rather than as afterthoughts.

Stormweaver itself is not our answer. It gets permanent Arcane Surge and 20% Mana-before-Life through ascendancy. Shaman instead gets Rage scaling, Wisdom of the Maji, Sacred Flow and Strugglescream compression.

## Current PoE Vault Mana Flare Shaman

The current high-end guide reaches extreme Mana values with Runeseeker, but the useful Runeseeker-independent lessons are:

- each 100 maximum Mana scales Mana Flare on several axes at once;
- Arctic Armour is excellent anti-melee / anti-stunlock trigger redundancy;
- boss and mapping trees should not be identical;
- mapping can aggressively buy area and CDR because the payload already overkills;
- Mana regeneration is absolutely mandatory;
- high-end Mana defence wants damage taken from Mana before Life without the MoM recovery penalty;
- Sacred Flow solves Spirit cheaply;
- at lower Mana, the Shaman Rage package is worthwhile; only at very high damage does a defensive ascendancy pivot become obviously better.

### Translation for our build

> **Use Stormweaver-style recovery engineering + the Shaman-specific damage engine. Do not imitate either guide item-for-item.**

---

# 2. Mana stacking vs generic Spell Damage

Current model inputs:

- Mana Flare base: `0.25 × current Mana`
- Archmage: `+4% damage as extra Lightning / 100 maximum Mana`
- Rathpith + Mana-linked passive: approximately `+9% increased Spell Damage / 100 maximum Mana`

For comparison only, assume current Mana ≈ maximum Mana and assume another **+200% increased damage** already exists from the rest of the character.

### Simplified marginal model

`Flare base = 0.25M`

`Archmage raw multiplier = 1 + 0.0004M`

`Mana-linked increased damage = +0.0009M`

`Illustrative payload = 0.25M × (1 + 0.0004M) × (3 + 0.0009M)`

This is **not exact tooltip DPS**. It is a consistent way to compare the marginal value of stats.

| Max Mana | Flare base | Archmage extra Lightning | Mana-linked increased damage | Illustrative payload |
|---:|---:|---:|---:|---:|
| 3,000 | 750 | +120% | +270% | 9,405 |
| 4,000 | 1,000 | +160% | +360% | 17,160 |
| 6,000 | 1,500 | +240% | +540% | 42,840 |
| 8,000 | 2,000 | +320% | +720% | 85,680 |

## Marginal comparison

| Starting Mana | +100 actual Mana | +20% generic increased Spell Damage | +25% fixed gain-as-extra Lightning after existing Archmage |
|---:|---:|---:|---:|
| 3,000 | **+6.87%** | +3.51% | +11.36% |
| 4,000 | **+5.50%** | +3.03% | +9.62% |
| 6,000 | **+3.96%** | +2.38% | +7.35% |
| 8,000 | **+3.12%** | +1.96% | +5.95% |

### Decision

**Final maximum Mana remains first-order deep into endgame.**

The correct question is not “flat Mana or % Mana?” It is “which combination gives the largest useful final Mana pool without destroying recovery or defence?”

- flat Mana creates the base;
- Intelligence adds base Mana;
- local ES converted by Eldritch Battery helps the Mana chassis;
- % maximum Mana multiplies that base;
- generic Spell Damage is an increasingly diluted additive modifier.

Once the build is around **6k+ Mana**, another Mana roll should be compared directly against penetration, gain-as-extra, CDB, recovery and CDR rather than automatically winning.

---

# 3. Arcane Surge — strong enough to build around

Current Arcane Surge:

- **15% increased Cast Speed**
- **20% more Mana Regeneration Rate**
- default duration: **4 seconds**

Reference: <https://poe2db.tw/us/Arcane_Surge>

That is unusually good for Mana Flare because it improves both:

- **recovery-limited Flare frequency** through the 20% more regen multiplier;
- **trigger saturation** through increased carrier cast/hit frequency.

## 6k Mana recovery example

At 6,000 Mana:

- base 4% regen ≈ **240 Mana/s**
- with +250% increased Mana regen: **840/s**
- with Arcane Surge: **1,008/s**
- with MoM's 50% less Mana Recovery: only **504/s**

At full current Mana, Mana Flare consumption is approximately:

- 1 Flare/s: **1,500 Mana/s**
- 1.5 Flares/s: **2,250 Mana/s**
- 2 Flares/s: **3,000 Mana/s**

Arcane Surge is therefore a strong multiplier, not a full sustain solution. Mana Remnants, flask/direct recovery and recovery-rate scaling still matter.

## Trigger-saturation effect

Using the previous 46% carrier-crit / 4 eligible-hits-per-second benchmark:

- 1.0s trigger window: ~91.5% saturation
- if 15% cast speed effectively turns 4 → 4.6 hits/s: ~94.1%

At a 0.5s cooldown window:

- 4 hits/s: ~70.8%
- 4.6 hits/s: ~75.8%

Arcane Surge becomes **more** useful as CDR rises because shorter cooldown windows demand denser crit events.

---

# 4. Best Arcane Surge source for Shaman

## Preferred budget-endgame source: Kurgal glove suffix

Desecrated gloves can roll:

> **10–15% chance to Gain Arcane Surge when you deal a Critical Hit**

Approximate uptime for a four-second buff:

`Uptime ≈ 1 - (1 - procChance)^(criticalHitsPerSecond × 4)`

At 46% carrier crit:

| Eligible hits/s | Crit hits/s | 10% proc | 12.5% proc | 15% proc |
|---:|---:|---:|---:|---:|
| 4 | 1.84 | 54.0% | 62.6% | **69.8%** |
| 8 | 3.68 | 78.8% | 86.0% | **90.9%** |
| 10 | 4.60 | 85.6% | 91.4% | **95.0%** |

At roughly 70% crit and 8 eligible hits/s, a 15% roll approaches **97% uptime**.

This is excellent because the same crit/hit-rate investment that improves Mana Flare also improves Surge uptime.

## Temporary answer: Aspiring Genius

**Aspiring Genius** gives:

- 20% increased Mana Regeneration Rate
- 10% chance to gain Arcane Surge on crit

Use it as the temporary fourth Strugglescream slot if good Surge gloves are not affordable.

After Surge gloves:

- use **Temporal Mastery** if cooldown is the active cap;
- use **Pure Chaos** if CDR is already solved and payload is the cap.

## Arcane Surge Support

The support works after spending a total of 100% of maximum Mana on supported self-cast spells, but deliberately burning the resource that controls Mana Flare's current-Mana payload is awkward.

### Decision

> **Proc Arcane Surge from crit instead of intentionally draining the Flare fuel tank.**

---

# 5. Arctic Armour + Sacred Flow

Arctic Armour currently:

- reserves **30 Spirit**
- has **11% base crit**
- retaliates with a Cold Spell hit when a melee hit consumes a stage
- strongly scales Chill and Freeze buildup

It fits this character unusually well because its retaliation can provide:

- anti-melee Chill / Freeze;
- Mana Flare trigger redundancy;
- extra crit events that can help Arcane-Surge-on-crit uptime.

Do not model it as another independent Mana Flare cooldown. Treat it as **defence + trigger redundancy**.

## Spirit target

Base persistent package:

- Archmage: **100 Spirit**
- Mana Remnants: **30 Spirit**
- Arctic Armour: **30 Spirit**
- total: **160 Spirit**

## Sacred Flow changes the budget

Sacred Flow grants:

> **+40 Spirit for each empty Charm slot**

With the normal 100 campaign Spirit:

- one empty Charm slot → **140 Spirit**
- two empty Charm slots → **180 Spirit**

So **do not spend Divines on Spirit gear simply to reach 160**.

Two empty slots already cover the baseline package.

The real cost is the loss of charm utility. If Stone Charm or another charm becomes important for stun/QoL, then gear Spirit can become worth paying for.

### Decision

> **Sacred Flow first; gear Spirit only when we want the charm slots back.**

---

# 6. Highest augment one-hand route

## Normal / Exceptional / corrupted ceiling

Default one-handed weapon socket limit: **1**.

High-level Exceptional item: can generate with **+1 additional socket**.

Corruption: can add **another socket ignoring the usual socket limit**.

Sockets cannot exceed the item's inventory grid spaces. A Wand occupies three grid spaces vertically, so:

- normal Wand: practical cap **1**
- Exceptional Wand: **2**
- corrupted Exceptional Wand with successful socket outcome: theoretical **3**

### Budget conclusion

> **Target a 2-socket Exceptional Wand. Treat a 3-socket corrupted Exceptional Wand as chase/gamble tech, not part of the remaining-15d plan.**

The value is not just “more sockets”; Wisdom of the Maji lets the socketed runes contribute their Bonded modifiers too.

---

# 7. Best rare Wand explicit package

## Celestial Alloy — prefix

Wand / Staff:

- **+142–188 maximum Mana**
- **+1 to all Spell Skills**

## Sovereign Alloy — suffix

Weapon:

- **20–30% increased effect of Socketed Augment Items**

## Transcendent Alloy — suffix

Current Wand values:

- **26–31% increased Cast Speed**
- **Gain 7–11% of Elemental Damage as Extra Cold Damage**

### Ideal ceiling

A premium Runeseeker-free Wand can therefore stack:

- very large final Mana;
- socketed augment effect;
- cast speed;
- gain-as-extra;
- useful natural crit / Mana / skill-level modifiers.

With only ~15d left, this is **not** a deterministic chase-craft target. Buy a strong existing 2-socket item or a partial craft whose real final Mana/recovery beats the current Wand.

---

# 8. Correct rune hierarchy

## Perfect Mind Rune

Wand / Staff:

- **+90 maximum Mana**
- Bonded: **5% increased maximum Mana**

At 30% Sovereign, the primary flat line becomes roughly **+117 Mana**.

This is the default first rune while actual maximum Mana remains first-order.

## Perfect Inspiration Rune

Wand / Staff:

- **35% increased Mana Regeneration Rate**
- Bonded: **16% increased Mana Cost Efficiency**

**It does not give flat Mana on a Wand.**

At 30% Sovereign, the primary regen line becomes about **45.5% increased Mana Regeneration Rate**.

At an existing +250% increased-Mana-regen bucket:

- old multiplier = 3.50
- new multiplier = 3.955
- regen component improves by about **13%**

The Bonded Cost Efficiency also reduces the amount that Archmage/carrier casts erode current Mana between Flares.

## Perfect Storm Rune

Wand / Staff:

- **12% of Damage gained as Extra Lightning**
- Bonded: **30% increased Shock magnitude**

At 30% Sovereign, the primary becomes roughly **15.6% gain-as-extra Lightning**.

## Decision tree

**Mana still below target?**  
Mind first.

**Current Mana collapsing during sustained combat?**  
Inspiration becomes the better sustain socket.

**Mana + recovery comfortable?**  
Storm becomes the boss-payload option.

Preferred pairs:

- **Mind + Inspiration** — balanced Mana + sustain
- **Mind + Mind** — maximum raw Mana if sustain is solved
- **Mind + Storm** — high-Mana boss payload
- **Inspiration + Storm** — niche case where the Wand already supplies enough Mana

---

# 9. Best weird non-Wand: Sacred Flame

**Sacred Flame Shrine Sceptre** currently provides:

- **100 Spirit** from the Sceptre base
- **Gain 40–60% of Damage as Extra Fire**
- enemies in your Presence resist Elemental Damage based on their **lowest elemental resistance**
- one-handed Sceptre, so Rathpith can remain offhand

## Raw gain comparison

At 6,000 Mana, Archmage contributes +240% extra Lightning in the conservative non-recursive model.

A 50% Sacred Flame roll adds approximately:

`0.50 / (1 + 2.40) = 14.7%`

relative raw hit damage before the resistance-normalisation effect.

A 60% roll is approximately **17.6%**.

That is materially stronger raw gain than Guiding Palm's fixed 25% extra Lightning at the same Mana level.

## Lowest-resistance effect

For nearby enemies, Fire / Cold / Lightning damage effectively uses the enemy's lowest elemental resistance as its resistance basis. This is unusually useful for a Mana Flare hit that becomes mixed Fire + mostly Lightning under Archmage.

Penetration remains damage-type-specific afterward.

Chaos resistance is not part of this lowest-elemental-resistance comparison.

## Why Sacred Flame is not the default final main hand

Sacred Flow means we do **not** need to equip a Sceptre merely to reach the Arctic Armour Spirit target.

A premium Wand can instead provide:

- much more final Mana;
- Mind rune scaling;
- Sovereign augment scaling;
- cast speed / gain-as-extra;
- stronger synergy with Flare + Archmage + Rathpith + Mana defence simultaneously.

### Decision

> **Sacred Flame is the best weird mapping/utility damage challenger. The strong Mana Wand remains the preferred bossing / final-Mana endpoint.**

---

# 10. Other one-hand options

## Guiding Palm of the Mind

Useful lines:

- 100 Spirit
- Gain 25% of Damage as Extra Lightning
- +20–30 Dexterity

At 6k Mana, the fixed +25% gain is about **7.35% relative raw damage** in the conservative Archmage comparison.

Sacred Flow also reduces the importance of its 100 Spirit.

Use Guiding Palm only when the DEX / Lightning alignment solves something concrete.

## Adonia's Ego

Useful lines:

- +100–150 maximum Mana
- +3 all Spell Skills
- 15–30% Cast Speed

Excellent cheap bridge because carrier spells benefit from levels and speed.

The +levels barely improve Mana Flare's own 25%-current-Mana base, so a strong actual-Mana Wand remains the endpoint.

## Martial one-hand weapons

Reject for the main build. The useful caster rune effects are designed for Wand / Staff rather than martial weapons.

---

# 11. Mapping-specific upgrades

The build should not use the exact same optimisation for bossing and Runeseeker farming.

## Khatal's Rejuvenation

Mana Remnants can grant **Khatal's Rejuvenation** stacks:

- up to **8 stacks**
- **5% increased CDR per stack**
- maximum **40% CDR**
- each stack lasts **10 seconds**

This is enormous mapping CDR when Remnants are being collected continuously.

It is not reliable enough to treat as permanent boss CDR without proving stack uptime in the encounter.

Current economy snapshots put it around several Divines, making it a plausible **second-wave mapping purchase**, not the first use of the remaining budget.

### Decision

> **After the Mana + Surge chassis is healthy, Khatal is one of the strongest purchases specifically for Runeseeker-farm smoothness.**

## Eonyr's Thunder

Eonyr's Thunder:

- makes Lightning damage from the supported skill contribute to Electrocution;
- prevents the supported skill from inflicting Shock;
- enemies killed while Electrocuted trigger Voltaic Fulmination corpse-life Lightning explosions.

Because Archmage makes most of Mana Flare's hit Lightning at high Mana, this can dramatically expand mapping clear.

### Decision

Use as a **mapping support**, not the boss Shock package.

---

# 12. Ascendancy — keep Rage for now

The current PoE Vault high-Mana build makes an important distinction:

- at lower / moderate Mana, **Druidic Champion + Furious Wellspring** is a strong damage engine;
- once Mana is so high that damage already one-shots almost everything, **Reactive Growth + Avatar of Evolution** becomes attractive for defence.

That supports our present plan.

With a ~50d ceiling and only ~15d left, we are still trying to maximise damage **without becoming weak**.

### Current decision

> **Keep the Rage ascendancy package now. Revisit the defensive ascendancy pivot only after the real character has enough Mana/Flare damage that Rage damage is visibly redundant.**

Do not sacrifice a useful damage engine just because a mirror-tier guide can afford to.

---

# 13. Defence — fake MoM is the destination

Mind Over Matter currently:

- sends all damage to Mana before Life
- imposes **50% less Mana Recovery Rate**

That penalty is especially painful because Mana is also the damage resource.

The premium direction is therefore high/100% damage taken from Mana before Life through gear/passives **without** the keystone.

But Shaman has to pay more for this than Stormweaver because it does not receive Force of Will's 20% for free.

### Current budget decision

> **Do not force 100% fake MoM with the last 15d if doing so ruins Mana, resistances, crit or recovery.**

Keep MoM until the replacement defence is actually ready.

## Cloak of Defiance

Useful package:

- +100–150 maximum Mana
- 50–100% increased Mana Regeneration Rate
- local Energy Shield
- **50% damage taken from Mana before Life**

Cloak is therefore a serious cheap transition test.

### Body comparison

**Cloak wins** when removing MoM's recovery penalty is the biggest gain and the remaining Mana-before-Life can be built safely.

**Morior wins** when its socket rolls solve several constraints at once, especially Mana + stats / resists / Spirit utility.

**High-ES rare wins** when actual displayed ES + Mana + exact suffixes provide the strongest total character.

There is no universal chest winner.

---

# 14. Strugglescream — updated four-slot logic

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

The whole point is to avoid paying for the same function twice.

---

# 15. How to spend the remaining ~15 Divines

Prices move, so treat the bands as priorities rather than fixed shop prices.

| Priority | Spend | What I would buy | Why |
|---|---:|---|---|
| **1** | variable | **Actual Mana / good 2-socket Wand chassis** | If final Mana is still below ~5–6k, this remains the largest overlapping offensive + defensive upgrade. |
| **2** | ~2–4d target | **Arcane-Surge-on-crit rare gloves** | Adds recovery + carrier speed without spending a Strugglescream slot or deliberately burning Mana. Skip if overpriced. |
| **3** | ~2d per rune snapshot | **Perfect Mind first** | Best default rune while actual Mana is the bottleneck. Do not socket premium runes into a temporary Wand. |
| **4** | usually free | **Sacred Flow → Arctic Armour** | Use empty charm slots to reach 160 Spirit before buying Spirit gear. |
| **5** | ~3.5–4.5d snapshot | **Khatal's Rejuvenation** | Strong mapping-specific 40% conditional CDR once the core engine already works. |
| **Reserve** | several d | resists / attributes / boots / body transition | Never spend the last currency on a theoretical DPS upgrade that breaks the character. |

## Practical purchase order

If the current Wand is weak and Mana is low:

**Wand/Mana first → Surge gloves → Mind rune → mapping CDR / defence.**

If the current Wand is already strong but Mana collapses during sustained combat:

**Surge gloves → Inspiration rune / recovery → MoM/body evaluation → CDR.**

If Mana + recovery already feel excellent but mapping is slow:

**Khatal + mapping CDR/AoE + Eonyr experiment.**

---

# 16. What not to buy with the last ~15d

- Kurgal's Gaze
- Jiquani's Thesis
- Temporalis
- Runeseeker itself
- a mirror-tier Wand crafting project
- expensive Spirit gear merely to reach 160 Spirit
- a forced 100% fake-MoM package that destroys the rest of the character
- expensive generic `% increased Spell Damage` with no second useful job
- a Power-Charge package merely to justify one item

---

# 17. Final build architecture

## Boss / general endgame main hand

**Exceptional 2-socket rare Wand**

Desired direction:

- large final Mana / Celestial
- Sovereign augment effect
- useful cast / crit / gain-as-extra modifier
- Mind rune by default
- second rune chosen by the active bottleneck

## Weird / mapping main-hand challenger

**Sacred Flame**

Use when the extra Fire + resistance normalisation beats the final-Mana loss in actual play.

## Offhand

**Cultivated Rathpith**.

## Amulet

**Strugglescream**.

## Gloves

**Rare Arcane-Surge-on-crit gloves** are the preferred budget-endgame direction.

Nightscale remains the recovery bridge.  
Leopold remains the pure payload glove after Surge/recovery are solved.

## Body

Choose according to the active bottleneck:

- Cloak = value recovery / fake-MoM transition
- Morior = socket flexibility / multiple constraints
- high-ES rare = raw EB Mana + exact affixes

## Persistent skills

- Archmage
- Mana Remnants
- Arctic Armour

Use **Sacred Flow** to reach the Spirit target cheaply.

## Carrier split

**Bossing:** Frost Darts + Orb of Storms / reliable repeated crits.  
**Mapping:** Entangle / area / conditional CDR / optional Eonyr corpse explosions.  
**Defensive redundancy:** Arctic Armour.

---

# 18. Final decision tree

**Final Mana below ~5–6k?**  
Buy final Mana first.

**Flare procs inconsistent?**  
Improve carrier crit / hit-rate and Arcane Surge uptime before more CDR.

**Current Mana collapses during sustained combat?**  
Recovery is the cap. Buy Surge / Inspiration / Remnant / recovery solutions and question full MoM.

**Cooldown is visibly the cap while Mana stays healthy?**  
Buy CDR.

**Mapping specifically feels slow?**  
Khatal and Eonyr become much more attractive.

**Need a weird cheap weapon experiment?**  
Sacred Flame.

**Mana + recovery + trigger rate all healthy?**  
Now spend on penetration, gain-as-extra, CDB and premium Wand effects.

---

# Sources

- Mana Flare: <https://poe2db.tw/us/Mana_Flare>
- Archmage: <https://poe2db.tw/us/Archmage>
- Arcane Surge / Aspiring Genius / Kurgal mods: <https://poe2db.tw/us/Arcane_Surge>
- Runes: <https://poe2db.tw/us/Rune>
- Celestial Alloy: <https://poe2db.tw/us/Celestial_Alloy>
- Sovereign Alloy: <https://poe2db.tw/us/Sovereign_Alloy>
- Transcendent Alloy: <https://poe2db.tw/us/Transcendent_Alloy>
- Sacred Flame: <https://poe2db.tw/us/Sacred_Flame>
- Sacred Flow / Shaman: <https://www.poe-vault.com/poe2/guides/the-druid-class>
- Current Mana Flare Shaman guide: <https://www.poe-vault.com/poe2/guides/mana-flare-build-guide>
- Khatal's Rejuvenation: <https://poe2db.tw/us/Khatals_Rejuvenation>
- Eonyr's Thunder: <https://poe2db.tw/us/Eonyrs_Thunder>
- Cloak of Defiance: <https://poe2db.tw/us/Cloak_of_Defiance>
- Augment socket mechanics: <https://www.poe2wiki.net/wiki/Augment_socket>
- External Stormweaver benchmark: <https://maxroll.gg/poe2/pob/3s56jm06>

## Research note

The supplied Phoenix/YouTube transcript and external builds were treated as **comparison architectures**. Stormweaver-specific or Runeseeker-specific conclusions were not copied into the Shaman recommendation unless the underlying mechanic also improved this Runeseeker-free build within the stated budget.
