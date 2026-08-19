# Mana Geyser Shaman — Budget Minmax Thesis

**Date:** 2026-08-19  
**Build objective:** Reach the Runeseeker farm, sell Runeseeker, and keep a strong Runeseeker-free Mana Flare Shaman.  
**Total build ceiling:** ~50 Divines.  
**Working budget remaining:** ~15 Divines.  

## Executive thesis

The best version of this build is **not** a generic spell-damage caster and it is not a Runeseeker imitation. It is a Mana engine.

For Mana Flare Shaman, **stacking actual Mana is the first-order offensive stat** until the character has a healthy endgame pool. Mana simultaneously scales:

1. Mana Flare's native hit because the Flare consumes **25% of current Mana**.
2. Archmage, which grants **4% of damage as extra Lightning per 100 maximum Mana**.
3. Cultivated Rathpith, which grants **6% increased damage and 3% increased spell critical chance per 100 maximum Mana**.
4. Arcane Intensity, which grants **3% increased Spell Damage per 100 maximum Mana**.
5. Base Mana regeneration, because the raw regeneration base grows with maximum Mana.
6. Defence whenever damage is redirected to Mana before Life.

This creates several simultaneous returns from the same point of Mana. Generic `% increased Spell Damage` is useful, but it enters an additive bucket that is already very large once Rathpith and Arcane Intensity are active.

**Therefore:**

> **Mana first → recovery and trigger reliability second → CDR third → multiplicative/gain-as-extra/penetration after the engine is healthy.**

At the present budget, the best new discoveries are:

- **Arcane Surge should be added**, preferably from a **10–15% chance to gain Arcane Surge on Critical Hit Kurgal glove suffix**, not by forcing the Arcane Surge support gem.
- **Arctic Armour should be the preferred third persistent skill** once Spirit reaches roughly **160** for Archmage + Mana Remnants + Arctic Armour.
- **A two-socket Exceptional rare wand is the best non-Runeseeker one-hand ceiling** for this build. Celestial Alloy + Sovereign Alloy + caster runes can scale Mana much more efficiently than a martial weapon.
- **Adonia's Ego is a very good cheap bridge**, but its +3 spell levels are more valuable to Arc/Entangle/Frost Darts than to Mana Flare itself. A good rare Mana/augment wand should eventually beat it for a Flare-centric Shaman.
- **Guiding Palm of the Mind is a real experiment, not a joke:** 100 Spirit + 25% damage as extra Lightning can solve Arctic Armour Spirit and add damage. However, as Mana rises, Archmage makes the marginal value of another 25% gain-as-extra smaller, while a caster wand continues to add Mana, cast speed, spell utility and augment scaling.
- **Mind Over Matter remains a cheap defensive bridge, not the preferred finished state.** The finished direction is high damage-taken-from-Mana-before-Life without MoM's 50% less Mana Recovery, but a Shaman must pay more gear/passive pressure for this than a Stormweaver.
- **Cloak of Defiance is now a serious budget body competitor** because it grants 50% damage taken from Mana before Life, +100–150 Mana, 50–100% Mana regeneration and local ES that Eldritch Battery can convert.

---

# 1. External benchmark: what the Maxroll Stormweaver actually teaches us

Reference build: <https://maxroll.gg/poe2/pob/3s56jm06>

The imported Level 97 Stormweaver benchmark exposes the following useful totals:

- **6,268 Mana**
- **14,824 eHP**
- **75/75/75 elemental resistances**
- **86% crit chance**
- **441% crit multiplier shown for Arc**
- **187% increased Mana Regeneration Rate** from the tree summary
- **15% increased Mana Recovery Rate**
- **80% increased Mana Cost Efficiency**
- **52% of Damage taken from Mana before Life** in the passive/tree summary before the remainder from gear
- **30% Lightning penetration**
- **50% increased Shock magnitude**
- Eldritch Battery + Chaos Inoculation
- Permanent Arcane Surge through Stormweaver

The key lesson is that a successful endgame Mana caster does **not** spend every point on generic increased damage. Its tree is a balance of:

- Mana
- Mana regeneration
- Mana Cost Efficiency
- damage taken from Mana before Life
- penetration
- Shock
- crit/CDB
- cast speed
- Intelligence

That architecture is directly transferable to our Shaman. The Stormweaver ascendancy itself is not.

## What we cannot copy

Stormweaver has two enormous advantages that Shaman does not:

- **Constant Gale:** permanent Arcane Surge.
- **Force of Will:** 20% damage taken from Mana before Life plus Arcane Surge effect scaling as Mana is missing.

So a Shaman needs to manufacture those functions elsewhere.

## What Shaman gets instead

Our compensation is real:

- Druidic Champion converts Rage into **more Spell Damage**.
- Furious Wellspring creates a Rage-regeneration engine that benefits from Mana-regeneration modifiers.
- Mystical Rage converts Rage into additional increased Spell Damage.
- Strugglescream gives four instilled notables, with Invocated Efficiency already locked in.
- Cultivated Rathpith directly scales non-channelling spell damage and crit from Mana.

The correct strategy is therefore **Stormweaver recovery architecture + Shaman damage architecture**, not a class conversion.

---

# 2. Mana stacking versus generic Mana/spell scaling

Current mechanics used in this model:

- Mana Flare: `Base Fire = 0.25 × current Mana`
- Archmage: `+4% of damage as extra Lightning per 100 maximum Mana`
- Cultivated Rathpith: `+6% increased Damage per 100 maximum Mana`
- Arcane Intensity: `+3% increased Spell Damage per 100 maximum Mana`

For an easy comparison, assume current Mana is near maximum and add a fixed **+200% other increased damage** bucket. This is not a DPS simulator; it is a marginal-value model.

### Model

`Flare base = 0.25M`

`Archmage raw multiplier = 1 + 0.0004M`

`Mana-linked increased-damage contribution = 0.0009M`

`Illustrative total = 0.25M × (1 + 0.0004M) × (3 + 0.0009M)`

The `3` is the base 1.0 multiplier plus the assumed +200% other increased damage.

| Maximum Mana | Flare base | Archmage extra | Raw Fire + Lightning before increased damage | Rathpith + Arcane Intensity linked increased damage | Illustrative total |
|---:|---:|---:|---:|---:|---:|
| 3,000 | 750 | +120% | 1,650 | +270% | 9,405 |
| 4,000 | 1,000 | +160% | 2,600 | +360% | 17,160 |
| 6,000 | 1,500 | +240% | 5,100 | +540% | 42,840 |
| 8,000 | 2,000 | +320% | 8,400 | +720% | 85,680 |

The exact total is illustrative; the **relative behaviour** is the useful part.

## Marginal value of +100 Mana

With the same model:

| Starting Mana | Approx gain from +100 Mana | Approx gain from another +20% increased Spell Damage |
|---:|---:|---:|
| 3,000 | **+6.87%** | +3.51% |
| 4,000 | **+5.50%** | +3.03% |
| 6,000 | **+3.96%** | +2.38% |
| 8,000 | **+3.12%** | +1.96% |

So even around 6–8k Mana, another +100 Mana can remain more valuable than +20% generic increased Spell Damage before defensive/recovery value is counted.

## Marginal value of another 25% gain-as-extra Lightning

If the extra 25% is measured against the original damage and does not recursively chain, its relative value is diluted by Archmage's existing extra Lightning:

| Mana | Archmage extra Lightning | Approx relative value of +25% additional gain-as-extra Lightning |
|---:|---:|---:|
| 3,000 | +120% | **11.36%** |
| 4,000 | +160% | **9.62%** |
| 6,000 | +240% | **7.35%** |
| 8,000 | +320% | **5.95%** |

This explains why **Guiding Palm of the Mind** is unusually attractive at low/mid Mana but loses relative value as a huge Archmage pool grows.

### Decision

- Below ~5–6k Mana: aggressively buy efficient flat Mana / local ES-to-EB Mana / Intelligence / % maximum Mana.
- Around ~6k+: Mana still wins often, but start comparing it to **penetration, gain-as-extra, crit/CDB, CDR and recovery** on a per-slot basis.
- Do not pay premium prices for ordinary `% increased Spell Damage` unless it is attached to another valuable stat.

---

# 3. Arcane Surge: yes, we should use it

Current Arcane Surge buff:

- **15% increased Cast Speed**
- **20% more Mana Regeneration Rate**
- default duration **4 seconds**

Reference: <https://poe2db.tw/us/Arcane_Surge>

This is excellent for Mana Flare because it attacks **both sides of uptime**:

1. More regeneration raises the recovery-limited Flare rate.
2. Cast speed raises carrier hit frequency, which improves trigger saturation, especially once CDR shortens the trigger window.

## Arcane Surge does not solve 2 Flare/s by itself

At 6,000 Mana:

- 1 Flare/s consumes up to **1,500 Mana/s** at full current Mana.
- 1.5 Flares/s consumes up to **2,250 Mana/s**.
- 2 Flares/s consumes up to **3,000 Mana/s**.

Example with 6,000 Mana and +250% increased Mana regeneration:

- base regen = 4% × 6,000 = **240/s**
- after +250% increased regen = **840/s**
- with base Arcane Surge = **1,008/s**
- with MoM's 50% less Mana Recovery = only **504/s**

So Arcane Surge is a powerful multiplier, but Mana Remnants/flasks/direct recovery are still required for high Flare frequency. It also makes the MoM recovery penalty look even worse at endgame.

## How Shaman gets Arcane Surge

### Best budget-endgame source: Kurgal glove suffix

Desecrated gloves can roll:

> **10–15% chance to Gain Arcane Surge when you deal a Critical Hit**

This gives the buff without spending Mana merely to maintain it and without consuming a Strugglescream slot.

At 46% carrier crit:

| Eligible hits/s | Critical hits/s | 10% proc uptime | 12.5% proc uptime | 15% proc uptime |
|---:|---:|---:|---:|---:|
| 4 | 1.84 | **54.0%** | 62.6% | **69.8%** |
| 8 | 3.68 | **78.8%** | 86.0% | **90.9%** |
| 10 | 4.60 | **85.6%** | 91.4% | **95.0%** |

At a more mature 70% carrier crit and 8 hits/s, a 15% roll is roughly **97.4% uptime**.

This means the glove suffix gets dramatically better as the same crit/hit-rate upgrades that improve Mana Flare are purchased. It is an unusually efficient synergy.

### Temporary / alternative source: Aspiring Genius

**Aspiring Genius**:

- 20% increased Mana Regeneration Rate
- 10% chance to gain Arcane Surge on Critical Hit

Recipe: Concentrated Liquid Suffering + Diluted Liquid Greed + Diluted Liquid Greed.

This is a very good **temporary fourth Strugglescream slot** if gloves do not yet provide Arcane Surge. Once a good Kurgal glove is acquired, reclaim the slot for Temporal Mastery or Pure Chaos.

### Arcane Surge support gem: workable, but not preferred

The support gives 10 seconds of Arcane Surge after spending **100% of maximum Mana** on supported self-cast spells.

With Archmage adding roughly 6.1–8% of maximum Mana to each non-channelling spell cost, a carrier costing ~6.1% max Mana and cast twice per second spends ~12.2% max Mana/s. It can ramp into near-continuous Surge after roughly 8.2 seconds of sustained casting.

But that same maintenance costs around **732 Mana/s at 6,000 Mana** before other costs. For a build whose damage spell consumes current Mana, this is the wrong way to buy recovery unless those casts were already required.

**Conclusion:** proc Surge from crit, not from deliberate Mana spending.

## Trigger-saturation effect

Using the old 46% carrier-crit / 4 hits/s benchmark:

- no Surge, 1.0s window: ~**91.5%** trigger saturation
- if the full 15% cast-speed increase translated into hit rate, 4 → 4.6 hits/s: ~**94.1%**
- at a 0.5s window, the same move improves ~**70.8% → 75.8%**

So Surge's cast speed matters more as CDR becomes aggressive.

---

# 4. Arctic Armour belongs in the finished utility package

Current Arctic Armour:

- reserves **30 Spirit**
- **11% base crit**
- retaliates with a Cold Spell hit when a melee attack removes a stage
- 100% more Chill magnitude
- 100% more Freeze buildup
- can be supported by Mana Flare

Reference: <https://poe2db.tw/us/Arctic_Armour>

The desirable persistent package is therefore:

- Archmage: **100 Spirit**
- Mana Remnants: **30 Spirit**
- Arctic Armour: **30 Spirit**
- total target: **160 Spirit**

Arctic Armour does three useful jobs:

1. anti-melee Chill/Freeze defence;
2. retaliatory crit events that can trigger Mana Flare;
3. those crits can also feed a global on-crit Arcane Surge glove proc.

Do not model Arctic Armour as an independent extra Mana Flare cooldown. Treat it as **trigger redundancy and defence**.

**Recommendation:** once Spirit reaches 160 without crippling gear, Arctic Armour moves into the preferred endgame skill package.

---

# 5. One-hand weapon thesis: Exceptional rare wand wins

## The socket ceiling we should actually plan around

By default, one-handed weapons can have one augment socket. High-level **Exceptional** items can drop with an additional socket, so an Exceptional wand can practically be planned as a **2-socket caster weapon**.

A third socket through corruption is not something the 15-div budget plan should assume. Current sources conflict on whether the corruption socket outcome applies to wands in the present patch, so the recommendation is built around two sockets only.

Reference: <https://www.poe2wiki.net/wiki/Augment_socket>

## Best rare-wand modifier package

### Celestial Alloy — prefix

On a Wand:

- **+142–188 maximum Mana**
- **+1 to all Spell Skills**

### Sovereign Alloy — suffix

On a Wand:

- **20–30% increased effect of Socketed Augment Items**

These can coexist because Celestial is a prefix and Sovereign is a suffix.

References:

- <https://poe2db.tw/us/Celestial_Alloy>
- <https://poe2db.tw/us/Sovereign_Alloy>

## Rune choices

### Perfect Mind Rune

Wand/Staff:

- **+90 maximum Mana**
- Bonded with Wisdom of the Maji: **5% increased maximum Mana**

At a perfect 30% Sovereign roll, the primary +90 line becomes **+117 Mana**. If the Bonded line is also scaled by augment-effect as expected, 5% becomes **6.5% increased maximum Mana**. Confirm the equipped tooltip before committing expensive runes.

The current Runes of Aldur currency snapshot puts Perfect Mind Rune around **549 Exalted**, with Divine around **325 Exalted**, or roughly **1.7 Divine** per rune at that snapshot.

### Perfect Storm Rune

Wand/Staff:

- **Gain 12% of Damage as Extra Lightning Damage**
- Bonded: 30% increased Shock magnitude

At +30% socketed-augment effect, the 12% primary line becomes roughly **15.6% gain-as-extra Lightning**.

This is the better second socket if Mana is already healthy and penetration/Shock/gain-as-extra gives more marginal value than more Mana.

## How strong is one boosted Perfect Mind Rune?

The exact result depends on how much `% increased maximum Mana` the build already has, because those modifiers are additive. Using a 6,000-Mana example and plausible existing total increased-Mana values of +50% to +150%, a +117 flat / +6.5 percentage-point Mana rune produces roughly a **7.3–7.6% increase in the actual Mana pool** in a simplified reconstruction.

Feeding that new Mana back through Mana Flare + Archmage + Rathpith + Arcane Intensity gives roughly **18–19% illustrative offensive gain** in the same marginal model.

That is why the Exceptional/Sovereign caster-wand route deserves priority over generic `% spell damage` weapon shopping.

## Two Mind Runes?

Two boosted Mind runes are the maximum-Mana configuration. In the same 6,000-Mana reconstruction they can produce roughly a **15% larger Mana pool** before the rest of the gear is rebalanced. That is enormous, but the second rune should still be compared against Perfect Storm because:

- Archmage already supplies huge extra Lightning at high Mana;
- Lightning penetration and Shock can become the real boss-DPS bottlenecks;
- recovery must keep up with the larger 25%-current-Mana Flare cost.

### Preferred socket logic

- **Recovery/payload still Mana-limited:** Mind + Mind.
- **Mana healthy, boss damage needs multiplicative scaling:** Mind + Storm.
- **Do not spend both sockets on generic Spell Damage runes** unless the good caster runes are unavailable.

---

# 6. Non-wand one-hand experiments

## Guiding Palm of the Mind — real, but conditional

Current item:

- 100 Spirit
- Gain **25% of Damage as Extra Lightning Damage**
- +20–30 Dexterity
- Guided Tempest Shrine

Reference: <https://poe2db.tw/Guiding_Palm_of_the_Mind>

Why it is interesting here:

- 100 Spirit instantly removes the pressure of fitting Archmage + Mana Remnants + Arctic Armour.
- +25% gain-as-extra Lightning is global and useful.
- Dexterity may fix our weakest attribute.

Why it is probably not the final answer:

- sceptres do not naturally give the caster-wand Mana/spell-level/cast-speed package;
- it gives no flat Mana itself;
- as Mana rises, Archmage dilutes another fixed +25% gain-as-extra Lightning: about 7.35% relative at 6k Mana and 5.95% at 8k in the simple non-recursive model;
- it competes with a rare wand that can add hundreds of effective Mana and augment scaling.

**Verdict:** excellent cheap experiment / Spirit solution; not the preferred high-end weapon unless the rest of the build is Spirit-starved.

## Adonia's Ego — best cheap bridge

Current item:

- +100–150 maximum Mana
- +3 to all Spell Skills
- 15–30% Cast Speed
- Pinnacle of Power
- elemental-resistance penalty per Power Charge

Reference: <https://poe2db.tw/us/Adonias_Ego>

It is especially good when Entangle/Frost Darts/Orb of Storms native spell damage still matters. For pure Mana Flare payload, +3 levels do not multiply the 25%-of-current-Mana base the way raw Mana does.

**Verdict:** use if it is a cheap large upgrade over the present wand; do not sink currency min-maxing it instead of saving for an Exceptional rare Mana wand.

## Generic martial one-hand weapons

Reject for this build. Caster runes change behaviour on martial weapons: Perfect Mind becomes physical Mana leech rather than flat Mana, and damage runes become attack stats. The augment system itself pushes us back toward Wand/Staff.

---

# 7. Defence thesis: fake MoM is the destination, not the immediate purchase

Current Mind Over Matter:

- all damage taken from Mana before Life
- **50% less Mana Recovery Rate**

Current no-MoM sources include:

- Cloak of Defiance: **50%**
- Feathered Raiment implicit: 5–10%
- Kurgal body suffix: 10–20%
- Genesis ring prefix: up to 13–15% each
- Sapphire jewel suffix: 2–4%
- Lucidity: 8%
- Mental Perseverance: 10%
- Chakra of Thought: 8%
- Greatwolf body rune: 15%

References:

- <https://poe2db.tw/us/Mana_before_Life>
- <https://poe2db.tw/us/Cloak_of_Defiance>

The Stormweaver benchmark confirms that **100% Mana-before-Life without MoM** is the correct premium architecture because it keeps the Mana defence without halving Mana Recovery.

However, the Stormweaver gets 20% from Force of Will for free. Shaman does not.

## Budget conclusion

Do **not** spend the remaining 15 Divines forcing 100% fake-MoM if it destroys Mana, resists, crit or recovery elsewhere.

### Recommended defence progression

1. **MoM while cheap gear is still weak.**
2. **Cloak of Defiance is the best budget bridge to test** if a good copy is inexpensive: 50% MBL + Mana + regen + local ES-to-Mana in one slot.
3. Move to **partial/high MBL without MoM** only when the combined gear/passive package is clearly stronger.
4. The eventual premium rare/Feathered body can chase 100% total, but that is not the 15-div priority.

## Cloak versus Morior versus rare high-ES body

### Cloak of Defiance

Best when:

- recovery is painful;
- MoM's 50% less Recovery is the main bottleneck;
- you need a cheap one-slot defensive transition.

### Morior Invictus

Best when:

- Mana/socket roll is strong;
- Spirit/attributes/resists/socket utility solve several constraints;
- its actual local defence + socket package beats the rare.

### High-ES rare / Exceptional rare

Best when:

- displayed local ES is exceptional;
- flat Mana is strong;
- suffixes solve the exact build pressure;
- later fake-MoM/desecrated/rune architecture is affordable.

There is no universal chest winner. For the current budget, **Cloak is the value challenger, Morior/rare is the ceiling challenger.**

---

# 8. What Arcane Surge does to our recovery target

The Maxroll benchmark's tree summary shows 6,268 Mana, +187% Mana regeneration, +15% Mana Recovery Rate, +50% moving regen and Arcane Surge.

Using only those visible values:

- base 4% regen at 6,268 = **250.7 Mana/s**
- +187% increased regen = **719.6/s**
- while moving with another +50% increased = **844.9/s**
- ×1.15 Recovery Rate = **971.7/s**
- ×1.20 Arcane Surge = **1,166.0/s**

The transcript's ~2,000 Mana/s claim therefore requires the remaining gear/ring/skill sources, which is plausible. More importantly, it shows the build stacks **multiple recovery layers**, not one giant regen notable.

For our Shaman, Arcane Surge is therefore a **20% multiplier on the regen component**, not a replacement for Remnants or flasks.

---

# 9. Updated Strugglescream recommendation

One slot is already locked:

1. **Invocated Efficiency** — keep.

The other three should now be conditional rather than blindly fixed.

## Default with Arcane Surge gloves

2. **Mystical Rage** — Shaman/Rage synergy.  
3. **Electric Amplification** — Lightning penetration + gain-as-extra, increasingly valuable with Archmage.  
4. **Temporal Mastery** if cooldown is still the active cap, otherwise **Pure Chaos** for clean payload.

## Before Arcane Surge gloves

Use:

2. Mystical Rage  
3. Electric Amplification  
4. **Aspiring Genius**

Aspiring Genius gives both 20% increased Mana regeneration and the 10% on-crit Surge source. Once the glove suffix is acquired, it becomes redundant and the fourth slot can return to CDR/payload.

This is a better budget progression than buying Kurgal's Gaze. Current economy snapshots put Kurgal's Gaze around **20k Exalted**, over 60 Divines at the same snapshot — already beyond the entire remaining budget.

---

# 10. Remaining ~15 Divine spend plan

Prices move. This is a **priority budget**, not a shopping list with guaranteed prices.

## Tier 1 — buy only if missing

### A. Arcane Surge gloves — target 2–4d-equivalent value band

Desired rare gloves:

- 10–15% chance to gain Arcane Surge on Critical Hit (Kurgal suffix)
- Mana and/or local ES
- CDB / crit utility if available
- resistance/attribute as needed

If the market charges too much, **do not chase the perfect glove**. Instill Aspiring Genius temporarily.

### B. Reach 160 Spirit — ~0–2d depending current gear

Enough for:

- Archmage 100
- Mana Remnants 30
- Arctic Armour 30

Do this with the least destructive slot. Spirit on Morior/socket/amulet/boots is worth more now because it activates a real defensive skill.

## Tier 2 — biggest offensive target

### C. Exceptional 2-socket rare wand — allocate roughly 5–8d only if a good base/craft is available

Priority:

1. strong flat Mana / Celestial Alloy package;
2. Sovereign Alloy 20–30% augment effect;
3. useful crit/cast/gain line;
4. socket one Perfect Mind Rune first;
5. second socket Mind or Perfect Storm depending bottleneck.

Current Perfect Mind/Perfect Storm currency snapshots are each around 1.7d. Do not buy both runes before the base is worth socketing.

### Cheap bridge if the rare wand is not ready

**Adonia's Ego** is acceptable. Spend little; save the rest.

### Guiding Palm experiment

Only buy if Spirit is the current bottleneck and the item is cheap. It is not the default final weapon.

## Tier 3 — defence if MoM is choking recovery

### D. Test Cloak of Defiance before buying a premium body

A decent Cloak is interesting because one slot gives 50% fake-MoM, Mana, regen and EB-convertible ES. If it lets us drop the MoM keystone without becoming fragile, the recovery gain can be enormous.

If it cannot reach a safe total damage-to-Mana share with the rest of the current gear, **keep MoM and postpone the transition**.

## Do not spend the remaining budget on

- Kurgal's Gaze
- Jiquani's Thesis
- Temporalis
- Runeseeker itself
- perfect 100% fake-MoM at the cost of the whole character
- generic expensive +spell-damage gear with no Mana/recovery/crit/pen utility
- a power-charge package merely to justify Adonia's Pinnacle of Power

---

# 11. Recommended finished architecture under the 50-div philosophy

## Weapon

**Exceptional 2-socket rare Wand**  
Celestial Mana/+1 prefix + Sovereign augment-effect suffix if attainable, with Perfect Mind + Mind/Storm.

Budget bridge: **Adonia's Ego**.  
Experiment: **Guiding Palm of the Mind**.

## Offhand

**Cultivated Rathpith** remains the preferred Flare-centric offhand. It is too synergistic with actual Mana to drop for a generic focus unless the replacement solves a much larger recovery/defence problem.

## Amulet

**Strugglescream** with Invocated Efficiency locked.

Preferred variable package after Arcane Surge gloves:

- Mystical Rage
- Electric Amplification
- Temporal Mastery **or** Pure Chaos

Before Arcane Surge gloves: use Aspiring Genius in the fourth slot.

## Body

Current-budget choice is contextual:

- **Cloak of Defiance** if it enables dropping MoM safely and recovery is the cap.
- **Morior** if socket rolls solve Mana + Spirit/attributes/resists well.
- **High-ES rare** if actual displayed ES + Mana + useful suffixes win the direct comparison.

## Gloves

Priority has changed.

The best budget-endgame rare glove is now one with **10–15% Arcane Surge on crit** plus Mana/ES/CDB/defence. Nightscale remains an excellent recovery bridge; Leopold remains a strong damage glove only after Surge/recovery are solved.

## Boots

High movement + local ES/Mana + attribute/resists. Chronomancy/Uhtred remains desirable if CDR is the bottleneck, but do not sacrifice the entire defensive budget to force it.

## Persistent skills

1. Archmage
2. Mana Remnants
3. **Arctic Armour** once 160 Spirit is available

## Carrier skills

- Mapping: Entangle / Orb of Storms depending coverage and feel.
- Bossing: Frost Darts + Orb of Storms for repeated crit events.
- Arctic Armour supplies defensive retaliation/trigger redundancy.

---

# 12. Final decision tree

### If current Mana is below ~5–6k

Buy Mana first.

### If Mana is healthy but Flare frequency feels inconsistent

Buy carrier crit/hit-rate and Arcane Surge uptime before more CDR.

### If the cooldown indicator is the obvious cap

Buy CDR through boots/Temporal Mastery.

### If current Mana collapses during sustained damage

Recovery is the cap. Prioritise Arcane Surge, Mana Remnants, regen, flask/direct recovery; question MoM.

### If recovery and trigger rate are healthy

Then buy penetration, gain-as-extra, CDB and premium wand augments.

### If a new item has only `% increased Spell Damage`

It must be very cheap or carry another premium stat. Mana already creates a huge additive damage bucket.

---

# Primary sources

- Mana Flare: <https://poe2db.tw/us/Mana_Flare>
- Archmage: <https://poe2db.tw/us/Archmage>
- Arcane Surge / Aspiring Genius / Kurgal mods: <https://poe2db.tw/us/Arcane_Surge>
- Arctic Armour: <https://poe2db.tw/us/Arctic_Armour>
- Cultivated Rathpith: <https://poe2db.tw/us/Rathpith_Globe>
- Arcane Intensity: <https://poe2db.tw/us/Arcane_Intensity>
- Mana before Life: <https://poe2db.tw/us/Mana_before_Life>
- Cloak of Defiance: <https://poe2db.tw/us/Cloak_of_Defiance>
- Celestial Alloy: <https://poe2db.tw/us/Celestial_Alloy>
- Sovereign Alloy: <https://poe2db.tw/us/Sovereign_Alloy>
- Perfect Mind Rune / runes: <https://poe2db.tw/us/Rune>
- Guiding Palm of the Mind: <https://poe2db.tw/Guiding_Palm_of_the_Mind>
- Adonia's Ego: <https://poe2db.tw/us/Adonias_Ego>
- Augment socket mechanics: <https://www.poe2wiki.net/wiki/Augment_socket>
- External benchmark: <https://maxroll.gg/poe2/pob/3s56jm06>
- Economy context: <https://divindex.com/>

## Research note

The provided Phoenix/YouTube transcript was used as an architectural reference for the current Stormweaver mana-stacking approach. Its class-specific claims were not copied into the Shaman recommendation unless they were independently compatible with Shaman mechanics.
