# Mana Geyser Shaman — Rage, Defence & Spirit Theorycraft

**Date:** 2026-08-19  
**Purpose:** compare the Runeseeker-free budget Shaman against the 20k Mana Flare endpoint, then decide how much value Rage, the defensive ascendancy branch, Eternal Rage, Cast on Critical + Comet, and Arctic Armour actually add.

## Current live checkpoint

Fresh poe.ninja snapshot for `ToaBBMcy`:

- Level 57 Shaman
- 2,360 maximum Mana
- 1,157 Life
- 3,218 Armour
- 86 Runic Ward
- 140 Spirit
- 25% Block
- 6.6k simulated eHP
- Resistances: 14 Fire / 10 Cold / 55 Lightning / 0 Chaos
- Frost Darts: 1.9 casts/s, 53% crit, 191% CDB
- Entangle / Orb of Storms: 41% crit
- Current ascendancy: Sacred Flow + Wisdom of the Maji + Druidic Champion + Furious Wellspring
- Current tree gives +6 maximum Rage in addition to Furious Wellspring's +7; with the normal 30 base this produces **43 maximum Rage**.

The +40 Spirit Interlude reward is still missing. Taking it moves the same setup from 140 to **180 Spirit** before changing Charm occupancy.

## 1. What our build does differently from the 20k version

The 20k build is not merely our build with more Mana. Its runaway scaling comes from Runeseeker's Call: six Perfect Mind runes combined with Runeseeker and Wisdom of the Maji provide roughly **1,620 flat Mana plus 90% increased maximum Mana** from the weapon package alone. It then stacks expensive ES-to-Mana gear, cultivated Rathpith, high-quality mana-regeneration jewellery and a much more mature recovery shell.

Our design intentionally gives up that shortcut. The budget version compensates through mechanic overlap:

1. Keep Druidic Champion + Furious Wellspring longer instead of treating Rage as temporary.
2. Use Mystical Rage to turn the same 43 Rage into another Spell-Damage axis.
3. Use gain-as-extra, penetration, trigger damage and Rathpith once affordable rather than brute-forcing 20k Mana.
4. Keep Strugglescream as a flexible four-notable platform.
5. Aim for a much smaller pool that can actually be recovered on a ~50d budget.
6. Only move into Reactive Growth + Avatar once damage is already comfortable.

The correct benchmark is therefore not whether budget gear can reach 20k. The useful question is how much effective damage and survivability we can manufacture around **6–7k permanent Mana**.

## 2. Realistic permanent Mana target

| Permanent Mana | Interpretation |
|---:|---|
| **4,000** | First proper Archmage / Strugglescream transition checkpoint. Functional, not finished. |
| **5,500–6,500** | **Realistic strong finished budget target.** Enough Mana to feel like a true Mana stacker while still funding recovery, resists and crit. |
| **6,500–7,500** | Optimised budget target. Requires strong ES conversion, an excellent Exceptional wand, useful runes/augments and efficient jewellery/body rolls. |
| **~8,000** | Jackpot/stretch. Possible if several pieces overperform, but not the normal ~50d expectation. |
| **10,000+ permanent** | Not an honest baseline without Runeseeker or major opportunity-cost sacrifices. Temporary overflow for farming Runeseeker is a different objective. |

**Planning target:** build around **6k first, optimise toward 7k, and treat 8k as stretch.**

## 3. Mystical Rage — effective or bait?

Mystical Rage gives **2% increased Spell Damage per Rage**.

At 43 maximum Rage:

- Mystical Rage = **86% increased Spell Damage**
- Druidic Champion = **21% more Spell Damage** at full Rage

The important distinction is increased versus more. Mystical Rage joins the additive increased-damage bucket, while Druidic Champion multiplies the result.

If Mystical Rage is compared only against the Mana-linked 9% increased Spell Damage per 100 Mana from Arcane Intensity + cultivated Rathpith, its marginal value looks like this:

| Max Mana | Mana-linked increased bucket | Relative gain from +86% Mystical | Mystical × 21% more Druidic combined |
|---:|---:|---:|---:|
| 4k | +360% | **+18.7%** | **~+43.6%** |
| 5k | +450% | +15.6% | ~+39.9% |
| 6k | +540% | **+13.4%** | **~+37.3%** |
| 7k | +630% | +11.8% | ~+35.3% |
| 8k | +720% | +10.5% | ~+33.7% |
| 20k | +1800% | +4.5% | ~+26.5% |

Real marginal gains will be somewhat lower once all other increased Spell Damage is included, but the conclusion remains:

> **Mystical Rage is particularly good for the Runeseeker-free budget phase.** It loses relative value only after Mana-linked increased damage becomes enormous.

This makes a Strugglescream package containing **Invocated Efficiency + Mystical Rage** entirely reasonable once enough sustain notables are already present.

### Practical Rage constraint

Furious Wellspring gives 6% of maximum Rage regenerated per second and makes Mana-regeneration-rate modifiers apply to Rage regeneration. At 43 Rage the base source is **2.58 Rage/s** before those modifiers.

The current passive tree has about +109% increased Mana regeneration, with +50% while moving and -25% while stationary. Ignoring gear, that makes the Furious source approximately:

- moving: **~6.68 Rage/s**
- stationary: **~4.75 Rage/s**

Frost Darts currently casts at 1.9/s. If every manual cast pays the +5 Rage skill cost, that alone can demand **9.5 Rage/s** before counting any other paid skill events. Full-Rage uptime must therefore be tested, not assumed.

## 4. Defensive ascendancy — how much survivability?

The alternative pair is **Reactive Growth + Avatar of Evolution**.

Reactive Growth gives:

- 10% less Elemental Damage taken
- one Adaptation matching the highest elemental type of each hit
- each matching Adaptation = 10% less damage of that type

Avatar gives:

- 5% Physical taken as Fire
- 5% Physical taken as Cold
- 5% Physical taken as Lightning
- Adaptations last 5 seconds
- double Adaptation effect

With Avatar, each matching stack becomes **20% less**. Up to three Adaptations can exist.

Against repeated hits of the same element:

| State | Damage received | Effective elemental reduction | Approx max-hit multiplier |
|---|---:|---:|---:|
| Before any Adaptation | 90% | 10% less | ×1.11 |
| 1 matching stack | 72% | **28% less** | ×1.39 |
| 2 matching stacks | 54% | **46% less** | ×1.85 |
| 3 matching stacks | 36% | **64% less** | ×2.78 |

Adaptation applies to subsequent elemental hits; do not model the first hit as already adapted.

### Physical conversion

The 15% physical-taken-as-elemental line becomes much better once elemental resistances are capped.

- At the current 14/10/55 elemental resists, the conversion is only around **4% less raw physical damage before Armour**.
- At 75/75/75, the conversion is around **11.25% less raw physical damage before Armour**, and reducing the physical portion can also make Armour more effective against the remainder.

**Conclusion:** the defensive ascendancy pair is enormous for repeated elemental boss hits, but **capping Fire and Cold resistance is the bigger defensive upgrade today**. Keep Rage while damage is budget-constrained; consider Reactive + Avatar once ~7–8k Mana or actual boss damage makes the Rage multiplier unnecessary.

## 5. Spirit theorycraft — Arctic Armour vs Eternal Rage vs CoC Comet

Current Spirit = **140**. The missing +40 Spirit quest reward raises that to **180**. Because Sacred Flow grants +40 per empty Charm slot, removing one additional charm can reach **220**, and a fully empty three-slot setup can reach **260** before reservation efficiency.

### Raw reservations

- Archmage: 100 Spirit
- Cast on Critical: 100 Spirit
- Eternal Rage: 100 Spirit
- Mana Remnants: 30 Spirit
- Arctic Armour: 30 Spirit

| Spirit | What cleanly fits before quality/support reservation |
|---:|---|
| 140 | one 100-Spirit engine + one 30-Spirit utility |
| 180 | Archmage + Remnants + Arctic = **160** with 20 spare |
| 220 | Archmage + CoC **or** Archmage + Eternal = 200; only 20 remains |
| 260 | Archmage + one 100-Spirit engine + Remnants + Arctic = **260 exactly** |

### Arctic Armour — first choice

Arctic Armour costs only **30 Spirit**, adds strong Chill/Freeze control and retaliates against melee hits with a Cold spell. For this build it is the easiest near-term recommendation because it improves defence and can create another safe Mana-Flare trigger path without adding a new Mana sink.

> **Take Arctic Armour before spending 100 Spirit on a luxury engine.**

### Eternal Rage — transition stabiliser

Eternal Rage reserves 100 Spirit and at gem level 14 gives **3.5 flat Rage/s** before quality.

Its value is indirect: if it keeps the character near 43 Rage, it protects:

- Druidic Champion's ~21% more Spell Damage
- Mystical Rage's 86% increased Spell Damage
- the option to use Rageforged II when the Rage budget supports it

**Verdict:** Eternal Rage is a good temporary/mid-budget stabiliser if live testing shows Rage falling during Frost-Darts bossing. It becomes redundant if mature Mana regeneration lets Furious Wellspring sustain full Rage without it.

### Cast on Critical + Comet — luxury damage branch

Cast on Critical reserves 100 Spirit. Its Energy gain depends partly on how much of the enemy's Ailment Threshold the critical hit represents, so high crit chance alone does not guarantee fast boss Comets.

That matters because Frost Darts, Entangle and Orb of Storms are currently being used primarily as trigger engines and have low native hit damage. Comet is attractive once triggered, but it also becomes another Mana-consuming spell competing with the same pool that already feeds Archmage and Mana Flare.

**Verdict:** CoC Comet is a late luxury experiment. Test it only after Mana Flare sustain is solved around the 6k+ stage and Spirit is high enough that fitting CoC does not force out the defensive/recovery shell.

## 6. Recommended order

1. **Immediately:** fix Fire/Cold resists, take the missing +40 Spirit quest reward, use Arctic Armour.
2. **Rage test:** measure actual Rage during continuous Frost Darts + Flare bossing.
3. **If Rage falls:** use Eternal Rage from level 58 and test Mystical Rage with actual full-Rage uptime.
4. **Mana target:** push 4k → 6k → 7k while scaling percentage recovery, not just maximum Mana.
5. **At ~6k+:** reassess whether Eternal Rage is still needed. Remove it if Furious Wellspring alone maintains full Rage.
6. **Only after recovery is solved:** A/B Cast on Critical + Comet.
7. **At ~7–8k / comfortable boss DPS:** A/B Reactive Growth + Avatar of Evolution against the Rage pair.

## Working verdict

The budget Shaman should **not try to be a miniature 20k Runeseeker build**. Its comparative advantage is that Shaman lets a smaller Mana pool be multiplied by Rage, four-notable Strugglescream flexibility, gain-as-extra and Rathpith while Sacred Flow solves Spirit cheaply.

For the ~50d concept, the best target is **6–7k permanent Mana with full-Rage uptime and enough recovery to keep high-current Mana Flares firing**. That is a much more realistic and internally coherent endpoint than sacrificing recovery or defence to chase a headline 10k number.

## Sources

- POE Vault — Mana Flare Shaman Endgame Build: https://www.poe-vault.com/poe2/druid/shaman/mana-flare-build-guide
- PoE2 Wiki — Shaman: https://www.poe2wiki.net/wiki/Shaman
- PoE2 Wiki — Adaptation: https://www.poe2wiki.net/wiki/Adaptation
- PoE2 Wiki — Cast on Critical: https://www.poe2wiki.net/wiki/Cast_on_Critical
- PoE2DB — Comet: https://poe2db.tw/us/Comet
- PoE2 Wiki — Eternal Rage: https://www.poe2wiki.net/wiki/Eternal_Rage
- PoE2DB — Arctic Armour: https://poe2db.tw/us/Arctic_Armour
- poe2ref — Mystical Rage: https://poe2ref.com/passives/mystical-rage
- Live character: https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy