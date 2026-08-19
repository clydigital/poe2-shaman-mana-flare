# Mana Geyser Shaman — Archmage Sustain Snapshot

**Date:** 2026-08-19  
**Purpose:** Work out when Archmage is actually sustainable at ~2.7k → 4k → 6k maximum Mana, using the current Mana Flare / Frost Darts character as the starting point.

## Bottom line

Archmage is the next large damage unlock. It is also the first upgrade where **more maximum Mana does not make the sustain problem easier by itself**.

Mana regeneration starts at 4% of maximum Mana per second, but Archmage's added cost and Mana Flare's 25% current-Mana consumption also scale with the Mana pool. Therefore, if the recovery package stays unchanged, going from 2.7k to 6k Mana roughly preserves the same sustain ratio while making the absolute numbers larger.

The transition should be treated as three different operating states:

- **~2.7k Mana:** Archmage is a burst / mapping A-B test. Do not expect full-rate boss sustain yet.
- **~4k Mana:** first realistic permanent-Archmage breakpoint if cost efficiency and regeneration are deliberately rebuilt around it.
- **~6k Mana:** Archmage should be permanent, with enough recovery to hold roughly one high-payload Mana Flare per second on bosses and burst faster in maps.

The current 50% CDR from Crest of Ardura gives a theoretical 1.5 Mana Flare/s ceiling. **That ceiling is not the sustain target yet.** Trying to feed 1.5 high-current flares per second before the recovery package is mature is the fastest way to turn a very large tooltip into low-current, low-damage flares.

---

## Current verified mechanics

### Archmage

Archmage reserves 100 Spirit and gives non-channelling spells **4% of damage as extra Lightning per 100 maximum Mana**. Its extra Mana cost falls with gem level; around the current level the added cost is roughly **6.8% of maximum Mana**, reaching **6.1% at gem level 20**.

### Eldritch Battery

Eldritch Battery converts Energy Shield to maximum Mana but **doubles Mana Costs**.

### Mana Flare

Mana Flare is a triggered Spell with a 1.00 second base cooldown. On a critical hit it **consumes 25% of current Mana** and deals that amount as Fire damage.

That 25% is a **Consume**, not a normal Mana Cost, so Mana Cost Efficiency does not reduce it.

### Zenith II

Zenith II gives the supported carrier spell **25% increased Mana Cost Efficiency** at all times. The 30% more Spell Damage clause only works while above 90% maximum Mana.

Because a Mana Flare itself removes 25% of current Mana, the >90% damage clause should be treated as an opener / recovered-state bonus, not as something the build can assume is permanently active during rapid flare chaining. The cost-efficiency portion remains useful at all Mana levels.

### Arcane Surge

Arcane Surge gives **20% more Mana Regeneration Rate** and 15% increased Cast Speed. For this build, stable Arcane Surge is a recovery multiplier, not merely a cast-speed buff.

---

## The sustain equation

For the conservative two-spell loop used in this snapshot:

1. Frost Darts is the carrier spell.
2. A critical hit triggers Mana Flare.
3. Archmage adds a maximum-Mana-based cost to each applicable non-channelling spell.
4. Eldritch Battery doubles those Mana Costs.
5. Mana Flare additionally consumes 25% of current Mana.

For one spell:

`Archmage cost = (2 × Archmage cost % × Maximum Mana) / (1 + Mana Cost Efficiency)`

For one carrier → flare cycle:

`Cycle drain ≈ Carrier Archmage cost + Flare Archmage cost + 25% of current Mana`

The normal Frost Darts base cost is deliberately excluded from the headline numbers below, so the targets contain a small additional safety margin requirement in real play.

**Important modelling note:** Zenith II is counted on the carrier spell only. Global Mana Cost Efficiency is counted on both. If live-client testing shows Zenith II also modifies the triggered flare's Archmage tax, the real requirement will be slightly lower than this snapshot.

---

## Stage 1 — 2,669 Mana now

### Damage unlock

At 2,669 maximum Mana:

- Archmage gain-as-extra Lightning: **106.76%**
- Current wand gain-as-extra: **31%**
- Simplified raw multiplier without Archmage: **1.31×**
- Simplified raw multiplier with Archmage: **2.3776×**
- Relative simplified payload increase: **~81.5%** before increased damage, penetration, shock and critical scaling.

This is why Archmage is more important than another ordinary item swap.

### Current sustain state

Current configured Mana recovery is **272.8 Mana/s**, equal to about **10.22% of maximum Mana per second**.

With 20% more regeneration from Arcane Surge, that becomes roughly **327 Mana/s**, or **12.27% of max Mana/s**, assuming the current readout does not already include Arcane Surge.

Current cost-efficiency model:

- Global: **10%** from Invocated Efficiency on Astramentis.
- Frost Darts: **+25%** from Zenith II → **35% carrier efficiency**.
- Archmage cost rate: **6.8%**.

Under the conservative two-spell model, the fixed Archmage portion is about **22.44% of maximum Mana per successful carrier → flare cycle** before Mana Flare consumes current Mana.

At a 75% current-Mana flare, the total cycle drain is therefore roughly **41.19% of maximum Mana**.

### What recovery is actually required

To keep flares occurring around **75% current Mana**:

| Sustained Flare rate | Recovery needed | Recovery as % max Mana/s |
|---|---:|---:|
| 0.50 /s | ~550 Mana/s | ~20.6% |
| 0.75 /s | ~824 Mana/s | ~30.9% |
| 1.00 /s | ~1,099 Mana/s | ~41.2% |
| 1.50 /s | ~1,649 Mana/s | ~61.8% |

To hold closer to **90% current Mana**, the 1.0/s target rises to roughly **1,199 Mana/s**, while 1.5/s rises to about **1,799 Mana/s**.

### Verdict at 2.7k

**Archmage is worth testing now, but it is not yet a full-rate boss toggle.**

The immediate target is not 1.5 flares/s. The realistic first goal is **550–650 Mana/s of repeatable recovery**, then use Mana Remnants and the second Waistgate Mana Flask to cover mapping bursts. That makes approximately 0.5 high-current flares/s sustainable and lets Archmage's enormous gain-as-extra improve everything else between flares.

For a genuinely comfortable 0.75–1.0 high-current flare/s boss loop at this Mana level, the character needs roughly **825–1,100+ Mana/s** before incoming Mind Over Matter damage. That is too large a jump to solve with one cheap item.

**Do now:** keep Archmage as the next A/B test, but judge it by average current Mana during a boss, not by the tooltip immediately after activating it.

---

## Stage 2 — 4,000 Mana transition

The 4k stage is where the recovery architecture should change on purpose.

### Damage unlock

At 4,000 maximum Mana:

- Archmage gain-as-extra Lightning: **160%**.
- With the current wand's 31% existing gain-as-extra, simplified raw multiplier becomes **2.91×** versus **1.31×** without Archmage.
- That is roughly **+122% simplified raw payload** from adding Archmage to the same gain-as-extra chassis.

### Cost-efficiency target

Use **~60% global Mana Cost Efficiency** as the first serious target, plus Zenith II on Frost Darts.

A clean Strugglescream sustain package can supply the core of this:

- **Invocated Efficiency:** +10% Mana Cost Efficiency; triggered spells deal 40% increased Spell Damage.
- **Conservative Casting:** +15% Mana Cost Efficiency; +20% Mana Regeneration Rate.
- **Efficient Casting:** +20% Mana Cost Efficiency; +15% Mana Regeneration Rate.
- **Mind Eraser:** +15% Mana Cost Efficiency; +20% Mana Regeneration Rate.

Total from those four instills: **60% global Mana Cost Efficiency +55% increased Mana Regeneration Rate**, while retaining Invocated Efficiency's triggered-spell damage.

This is a much more coherent Archmage Strugglescream than using all four instills as pure damage notables.

**But:** the 4k checkpoint must mean **4k after removing Astramentis**, not 4k before the swap. Astramentis currently contributes roughly 340 final Mana plus attribute freedom. Do not switch merely to reach the efficiency package if the swap collapses the Mana pool or breaks requirements.

### 4k sustain math

Model assumptions:

- Archmage cost rate: **6.5%**.
- Global cost efficiency: **60%**.
- Frost Darts with Zenith II: **85%**.

Fixed Archmage tax per successful carrier → flare cycle falls to about **15.15% of maximum Mana**.

Recovery needed to keep Mana Flare around 75% current Mana:

| Sustained Flare rate | Recovery needed | Recovery as % max Mana/s |
|---|---:|---:|
| 0.50 /s | ~678 Mana/s | ~17.0% |
| 0.75 /s | ~1,017 Mana/s | ~25.4% |
| 1.00 /s | ~1,356 Mana/s | ~33.9% |
| 1.50 /s | ~2,034 Mana/s | ~50.9% |

At a 90% current-Mana target, 0.75/s needs roughly **1,130 Mana/s**, and 1.0/s needs roughly **1,506 Mana/s**.

### Recovery package for 4k

The transition target is **~1,000–1,200 Mana/s repeatable recovery**. That is the point where Archmage becomes a sensible permanent mapping state and a sustainable ~0.75 high-current flare/s boss state.

Build it from layers rather than one gimmick:

1. **Clarity II** — +50% increased Mana Regeneration Rate.
2. **Permanent or near-permanent Arcane Surge** — 20% more Mana Regeneration Rate. Get it from a 10–15% spell-crit Kurgal glove roll later, or temporarily from **Aspiring Genius** if needed.
3. **Cost-efficiency instills / passives** — reducing the Archmage part of the loop is mandatory because the 25% Mana Flare consume cannot be reduced.
4. **High mana-regeneration suffixes** — T1 jewellery reaches 60–69% before quality. The full endgame example uses quality-scaled jewellery to approach 300% increased regen from rings + amulet alone.
5. **Mana Remnants for mapping** — useful burst recovery, but increasingly a supplement as max Mana rises.
6. **Efficient Killing / recover-on-kill** — mapping recovery is disproportionately strong because it is percentage based.

At 4k, **2% maximum Mana on kill = 80 Mana per kill**. Ten kills in a dense Mana Flare pack returns 800 Mana independently of regeneration.

---

## Stage 3 — 6,000 Mana mature Archmage

At 6k, Archmage should stop being a test and become part of the build's permanent damage chassis.

### Damage unlock

At 6,000 maximum Mana:

- Archmage gain-as-extra Lightning: **240%**.
- With the same 31% current-wand gain-as-extra shell, simplified raw multiplier is **3.71×** versus 1.31× without Archmage.
- That is roughly **+183% simplified raw payload** from Archmage alone before penetration, shock, spell damage and crit.

### Cost-efficiency target

Target **~75% global Mana Cost Efficiency**, with Zenith II taking Frost Darts to roughly **100% carrier efficiency**.

The first 60% can come from the Strugglescream package above. Another ~15% can come from a boot augment such as Kurgal's Gaze while its condition is satisfied, a suitable helmet augment, tree allocation, jewel tech, or equivalent source. The exact source is flexible; the threshold is what matters.

At gem level 20, Archmage's cost rate is **6.1%**.

Under this model, the fixed Archmage portion of the carrier → flare loop falls to roughly **13.07% of maximum Mana**.

### 6k sustain math

Recovery needed to keep Mana Flare around 75% current Mana:

| Sustained Flare rate | Recovery needed | Recovery as % max Mana/s |
|---|---:|---:|
| 0.50 /s | ~955 Mana/s | ~15.9% |
| 0.75 /s | ~1,432 Mana/s | ~23.9% |
| 1.00 /s | ~1,909 Mana/s | ~31.8% |
| 1.50 /s | ~2,864 Mana/s | ~47.7% |

At a 90% current-Mana target:

- 0.75/s: **~1,601 Mana/s**.
- 1.00/s: **~2,134 Mana/s**.
- 1.50/s: **~3,201 Mana/s**.

### The 6k target I would actually build for

Aim for **35–40% of maximum Mana recovered per second in repeatable boss conditions**.

At 6k that is roughly **2,100–2,400 Mana/s**.

That range:

- comfortably supports about one high-current flare per second in this conservative model;
- leaves some headroom for Frost Darts' normal cost and Mind Over Matter damage;
- allows 1.5/s burst windows without pretending 1.5/s must be maintained forever;
- matches the philosophy of the proven 20k Shaman, which reports roughly 7–8k Mana regeneration/s (about 35–40% of its Mana pool) and uses percentage-on-kill recovery to refill aggressively in maps.

The proven 20k setup is useful here because it shows the correct target is **recovery as a percentage of maximum Mana**, not a fixed flat number.

---

## The recovery stack I would prioritise

### 1. Arcane Surge becomes mandatory recovery tech

A crit build can maintain Arcane Surge reliably. Its **20% more** Mana Regeneration Rate multiplies the large pile of increased regeneration instead of merely adding another small line.

Best later source: spell-crit Kurgal gloves. If those gloves are not ready, **Aspiring Genius** is a legitimate temporary instill because it gives both +20% Mana Regen and 10% chance to gain Arcane Surge on crit.

### 2. Cost Efficiency before more CDR

The current Crest already supplies 50% CDR. Every point of CDR beyond that increases how quickly the build can empty the Mana pool.

Until boss recovery is above roughly 30–35% of max Mana/s, **Mana Cost Efficiency is a better throughput stat than extra CDR**.

Useful current notables:

- Invocated Efficiency — 10% cost efficiency.
- Conservative Casting — 15% cost efficiency + regen.
- Efficient Casting — 20% cost efficiency + regen.
- Mind Eraser — 15% cost efficiency + regen.
- Brain Storm — 15% cost efficiency + Lightning damage if recovery is already healthy.

### 3. Recovery Rate becomes more valuable after regen is stacked

Once increased Mana Regeneration Rate is already several hundred percent, a multiplicative recovery-rate layer becomes increasingly attractive. **Arcane Blossom's 15% increased Mana Recovery Rate** is therefore a strong late sustain candidate for a fourth Strugglescream slot if the other cost-efficiency thresholds are already met.

A practical split is:

- **Boss-sustain Strugglescream:** Invocated Efficiency + Conservative Casting + Efficient Casting + Mind Eraser.
- **High-regen / mature variant:** replace Mind Eraser with Arcane Blossom if the live character's total recovery rises more after the swap.
- **Damage-biased variant:** replace the fourth sustain slot with Brain Storm only after boss Mana stops collapsing.

### 4. Percentage recovery is king in maps

Efficient Killing currently gives 15% increased Mana Regeneration Rate and **2% maximum Mana recovered on kill**.

That means:

- 2.7k Mana → ~53 Mana per kill.
- 4k Mana → 80 Mana per kill.
- 6k Mana → 120 Mana per kill.

Mana Flare kills packs in clumps, so percentage-on-kill recovery can erase a large part of the post-flare deficit immediately.

Arcane Remnants is another interesting map layer: **3% maximum Mana when collecting a Remnant**. At 6k, that is 180 Mana per pickup before considering the normal Mana Remnant recovery itself.

### 5. Flasks are progression tech, not the final engine

At the current 2.7k state, Waistgate's second Mana Flask slot is genuinely useful because flat flask recovery is still meaningful relative to the pool.

At 6k and beyond, flat flask recovery becomes proportionally weaker. The mature setup should not depend on a Mana Flask to keep Archmage alive; it should use regeneration, Arcane Surge, cost efficiency and percentage recovery as the engine.

---

## Exact progression gates

### Gate A — turn Archmage on for testing now

- Remove Valako's Roar → 180 Spirit.
- Archmage 100 + Mana Remnants 30 + Clarity II 20 + Arctic Armour 30 = 180.
- Zenith II on Frost Darts.
- Fill the second Waistgate flask slot.
- Fix Fire/Cold resistances so Mind Over Matter does not unnecessarily drain the same Mana pool.
- Judge the test by **lowest current Mana after 8–10 seconds of realistic fighting**, not by the first hit.

**Pass:** mapping recovers quickly and bosses remain above ~50–60% Mana without constant flask panic.  
**Fail:** Archmage turns Mana Flare into a sequence of smaller and smaller hits. If so, keep levelling with the safe package and build recovery first.

### Gate B — make Archmage permanent around 4k

- 4k maximum Mana **after** any Astramentis → Strugglescream swap.
- ~60% global Mana Cost Efficiency.
- Arcane Surge uptime.
- ~1,000–1,200 Mana/s repeatable recovery.
- Capped Fire/Cold/Lightning resistance.

This is the first breakpoint where the permanent Archmage package makes sense without relying on a flask to fake boss sustain.

### Gate C — mature 6k Archmage

- 6k maximum Mana.
- ~75% global Mana Cost Efficiency; ~100% on Frost Darts with Zenith II.
- 35–40% max Mana/s repeatable recovery → **~2,100–2,400 Mana/s**.
- Stable Arcane Surge.
- Percentage-on-kill recovery for mapping.
- Only then begin pushing CDR above the current 50% Crest baseline.

---

## What this changes in the build priority

Previous instinct: another item swap might be the next damage step.

Updated priority:

> **Archmage sustain architecture → maximum Mana → Rathpith / endgame payload pieces → additional CDR.**

The biggest hidden stat is now **recovery per second as a percentage of maximum Mana**.

For every future gear comparison, the build should therefore track five values together:

1. Maximum Mana.
2. Archmage gain-as-extra Lightning.
3. Global Mana Cost Efficiency.
4. Repeatable Mana recovery per second and as % of max Mana.
5. Sustainable Mana Flare rate at a chosen current-Mana floor.

That is the correct way to compare a 4k or 6k setup to the current 2.669k character. A piece that adds Mana but lowers recovery percentage can increase the screenshot hit while making sustained damage worse.

---

## Source anchors

- PoE2DB — Archmage: current gain-as-extra, Spirit reservation and level-based extra cost.
- PoE2DB — Mana Flare: 25% current-Mana consume and 1.00s base cooldown.
- PoE2DB — Zenith II: 25% Mana Cost Efficiency and >90% Mana damage clause.
- PoE2DB — Clarity II: +50% increased Mana Regeneration Rate.
- PoE2DB — Arcane Surge: 20% more Mana Regeneration Rate.
- PoE2DB — Invocated Efficiency / Conservative Casting / Efficient Casting / Mind Eraser / Brain Storm / Arcane Blossom.
- PoE Vault, Mana Flare Shaman Endgame Build, updated 2026-07-24: ~20k Mana example reports ~7–8k Mana regeneration/s and percentage-on-kill recovery as the mature sustain solution.
