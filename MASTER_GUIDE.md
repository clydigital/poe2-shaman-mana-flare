# Mana Flare / Entangle Shaman — Master Guide

> **Current working build:** Shaman · Mana Flare / Entangle · Eldritch Battery · Archmage · Mana Remnants · Rage package  
> **Purpose:** one source of truth for the build, progression, item/node decisions, experiments, and the simulator.

---

## 1. Current build snapshot

Latest working snapshot used by the planner:

| Stat | Current snapshot |
|---|---:|
| Level | 49 |
| Maximum Mana | 2,497 |
| Intelligence | 294 |
| Life | 1,214 |
| Armour | 2,487 |
| Runic Ward | 119 |
| Spirit | 140 |
| Frost Darts crit | ~42% |
| Critical Damage Bonus | ~191% |
| Normal passive points | 63 |
| Ascendancy points | 8 |

Core live-tree elements:

- Eldritch Battery
- Mind Over Matter
- Raw Mana
- Arcane Intensity
- Invocated Efficiency
- Furious Wellspring
- Druidic Champion
- Sacred Flow
- Wisdom of the Maji
- Mana-regeneration investment
- Spell crit / Critical Damage Bonus investment
- Mana Remnant investment

The immediate build goal is **not** “force 10,000 Mana right now.” It is to build a stable Mana / recovery / crit / Rage / defence chassis that can reach Atlas comfortably and still pivot into the strongest endgame route later.

---

# 2. The build in one page

Mana Flare is a triggered spell. Your supported spell must crit, and Mana Flare then consumes **25% of current Mana** to create its base Fire hit.

The build therefore has two different Mana variables:

- **Maximum Mana** controls long-term scaling such as Archmage, Arcane Intensity, Rathpith and the size of your resource pool.
- **Current Mana at the instant Mana Flare fires** controls the actual Mana Flare base hit.

This means a character with 10,000 maximum Mana but only 4,000 current Mana when Flare triggers is not really operating like a “10k Mana Flare” character.

The basic engine is:

**Entangle / Frost Darts / Orb of Storms crit**  
→ Mana Flare triggers  
→ current Mana is consumed  
→ Archmage and Mana-scaling damage amplify the hit  
→ Mana regeneration / Remnants / flasks refill Mana  
→ Furious Wellspring converts Mana-regeneration scaling into Rage regeneration  
→ Druidic Champion turns retained Rage into more Spell Damage.

The build fails when one of four resources falls behind:

1. current Mana,
2. Rage,
3. trigger reliability,
4. defensive Mana.

The planner/simulator exists to identify which one is actually limiting you.

---

# 3. Questions this guide is meant to answer

This guide consolidates the major questions raised during the build:

### Mana / Eldritch Battery
- How does Eldritch Battery actually interact with Energy Shield?
- Do global `% increased Energy Shield` nodes help EB Mana?
- Should we stack local ES, flat Mana, Intelligence, or % maximum Mana first?
- How much Mana can realistic gear produce at different levels?
- Is 10k maximum Mana necessary, or is 10k current Mana through overflow enough for the Runeseeker requirement?
- Can Armour → ES → EB become a better route to Mana?
- Is Ruinic Helm worth taking?

### Damage
- How much damage does Mana Flare gain from current Mana?
- How does Archmage interact with Mana Flare?
- How valuable is Arcane Intensity?
- How strong is cultivated Rathpith?
- How important is crit chance versus Critical Damage Bonus?
- Should Entangle remain only a trigger, or become a real damage skill at level 31–36?
- How should skill supports change between mapping and bossing?
- How should CDR be valued if recovery is already limiting the build?

### Rage
- Why does Shaman care about Rage on a spell build?
- How does Furious Wellspring turn Mana regeneration into Rage regeneration?
- Why did Rageforged feel bad in practice?
- What is Eternal Rage for?
- Can Eternal Rage make Druidic Champion permanently strong?
- When, if ever, should Rageforged come back?
- Is Berserk worth testing?

### Recovery
- How much Mana regeneration is actually needed?
- Are Mana Remnants real sustain or only QoL?
- Should Uhtred / Waistgate / flask recovery be used for overflow?
- Is MoM harming the endgame because of its recovery penalty?
- Can partial damage-taken-from-Mana-before-Life replace MoM?

### Defence
- Should the build stack ES, Armour, Runic Ward, or some mix?
- Can Armour also help against elemental hits?
- Does Ruinic Helm make an Armour/ES helmet better than pure ES?
- Should Runic Ward be stacked heavily or only used as an extra lethal buffer?
- Is Waveshaper a good defensive route?
- Is Cloak of Defiance a better late defensive shell than permanent MoM?

### Gear / progression
- What should be equipped at levels 20 / 30 / 40 / 50 / 60 / 70 / 80?
- What should the wand upgrade path look like?
- Which cheap uniques are actually worth using?
- What is the budget alternative to Temporalis?
- Are Exceptional Regalia platforms worth considering?
- When should Rathpith become the endgame offhand?
- Can the build stay under a sensible budget before the premium route?

### Weird branches / experiments
- Threaded Light + Spirit
- Serpent's Lesson / Low Mana / Low Life
- Pain Attunement
- Indigon
- Divinity / Immaculate Adherence
- Liminal curse-count engines
- Time-Lost CDR / trigger / Mana jewels
- Uhtred + Waistgate
- Temporalis
- Exceptional Regalia
- high-level Entangle
- Rageforged
- Eternal Rage

---

# 4. Core mechanics

## 4.1 Mana Flare

If current Mana is \(C\):

\[
\text{Mana Flare base Fire} = 0.25C
\]

Examples:

| Current Mana | Mana Flare base Fire |
|---:|---:|
| 2,500 | 625 |
| 5,000 | 1,250 |
| 7,000 | 1,750 |
| 10,000 | 2,500 |
| 15,000 overflow | 3,750 |

That is why **current Mana** matters separately from maximum Mana.

---

## 4.2 Archmage

The working build model uses:

\[
\text{Archmage factor} \approx 1 + 0.0004M
\]

where \(M\) is maximum Mana.

Illustrative raw Flare + Archmage values:

| Max/current Mana | Flare base | Archmage-adjusted raw |
|---:|---:|---:|
| 5,000 / 5,000 | 1,250 | ~3,750 |
| 7,000 / 7,000 | 1,750 | ~6,650 |
| 10,000 / 10,000 | 2,500 | ~12,500 |
| 10,000 / 15,000 | 3,750 | ~18,750 |

These are **pre-crit / pre-increased-damage / pre-enemy-mitigation** numbers.

---

## 4.3 Arcane Intensity

Arcane Intensity converts maximum Mana into Spell Damage.

At 10,000 Mana, the earlier deck modelled this as roughly **+300% increased Spell Damage**.

This is one of the most efficient nodes in the whole build because it scales the same stat the character already wants for Mana Flare and Archmage.

---

## 4.4 Cultivated Rathpith

The high-priority cultivated Rathpith lines previously researched are:

- non-channelling spells gain increased damage per 100 maximum Mana;
- non-channelling spells gain increased critical strike chance per 100 maximum Mana.

At 10,000 Mana, the previous deck modelled the desired combination as roughly:

- **+600% increased Spell Damage**
- **+300% increased Spell Critical Chance**

That is why the Rathpith route remains the most obvious pure-Mana-Flare endgame branch.

Important: these are **increased** modifiers, not “more” multipliers. Their actual value depends on how much increased damage is already in the build.

---

# 5. Crit and Critical Damage Bonus

Use expected-hit maths rather than looking only at crit chance.

\[
\text{Expected crit multiplier}
=
1 + C \times B
\]

where:

- \(C\) = actual crit probability,
- \(B\) = Critical Damage Bonus as a decimal.

Examples:

### Current-ish state
42% crit, 191% CDB:

\[
1 + 0.42 \times 1.91 \approx 1.80
\]

### Same crit, 300% CDB
\[
1 + 0.42 \times 3.00 \approx 2.26
\]

### High-crit endgame
80% crit, 300% CDB:

\[
1 + 0.80 \times 3.00 = 3.40
\]

### Practical conclusion

Early:
**get enough crit to trigger Mana Flare reliably.**

Later:
once crit is strong, **CDB becomes one of the cleanest ways to raise expected damage** because it does not consume Mana or Rage and benefits both Mana Flare and native Entangle damage.

---

# 6. Entangle: trigger or second main skill?

Earlier deck calculations used approximately:

| Skill | Base average hit |
|---|---:|
| Entangle L20 fissure | 139 |
| Entangle L20 vine | 36 |
| Entangle L36 fissure | 1,092 |
| Entangle L36 vine | 344 |

The L36 fissure base is about:

\[
1092 / 139 \approx 7.86\times
\]

the L20 fissure base.

This changes the build.

### Normal Mana-Flare route

Entangle is primarily:

- persistent trigger coverage,
- mapping convenience,
- a way to fish crits without constantly recasting.

### L31–36 Entangle route

Entangle becomes:

- native spell damage,
- Archmage-scaled damage,
- crit/CDB-scaled damage,
- plus Mana Flare triggers.

That route can potentially solve one of pure Flare's problems: **Mana Flare has a cooldown, but Entangle keeps doing damage between Flares.**

### Main conflict

The high-level Entangle route generally wants a +levels weapon/offhand/amulet package.

The pure Mana Flare route wants:

- Rathpith,
- huge Mana,
- crit,
- recovery,
- CDR.

Therefore it must be tested as a **whole-character route**, not by comparing L20 and L36 Entangle tooltips in isolation.

---

# 7. Skill setup

## Entangle — mapping / default

Recommended concept:

- Mana Flare
- Pinpoint Critical
- Branching Fissures II
- Magnified Area
- Accelerated Growth

Purpose:

- high coverage,
- persistent hit generation,
- crit-trigger reliability,
- Rage-efficient mapping.

## Frost Darts — boss trigger

Recommended concept:

- Mana Flare
- Pinpoint Critical
- Concentrated Area
- Multishot-style support
- flex slot

Purpose:

- controlled boss trigger,
- better single-target focus,
- useful comparison skill when Entangle coverage does not matter.

Be careful with excessive cast speed. If the real cap is Mana recovery / cooldown / Rage, more casts can simply spend Rage faster.

## Orb of Storms

Purpose:

- one cast creates repeated hits,
- excellent trigger fishing,
- Rage-efficient because the build pays the +5 Rage skill cost once rather than every hit.

## Mana Remnants

This is not merely pickup QoL.

Relevant research includes:

- Arcane Remnants,
- Empowering Remnants,
- extra-remnant chance,
- pickup range,
- double-effect,
- Remnant effect.

The stronger the Mana Flare rate becomes, the more recovery moves from “nice to have” to “required.”

---

# 8. Rage engine

## 8.1 Druidic Champion

Every 2 Rage gives approximately 1% more Spell Damage.

At 43 Rage:

\[
43 / 2 \approx 21.5\% \text{ more Spell Damage}
\]

That is a real multiplicative-style layer if average Rage stays high.

---

## 8.2 Furious Wellspring

Furious Wellspring makes Mana-regeneration-rate scaling apply to Rage regeneration.

With 43 max Rage:

\[
43 \times 6\% = 2.58 \text{ base Rage/s}
\]

At +250% Mana regeneration:

\[
2.58 \times 3.5 \approx 9.03 \text{ Rage/s}
\]

This is why Mana regeneration is so unusually valuable:

- Flare recovery,
- defensive recovery,
- Rage regeneration,
- Druidic Champion uptime.

---

# 9. Eternal Rage

Eternal Rage is a persistent Spirit skill that adds direct Rage regeneration.

Its role here is **resource stability**.

It is not used because “Rage is cool.” It is used because the Shaman engine can otherwise become Rage-negative when:

- every skill event costs +5 Rage from Furious Wellspring,
- Frost Darts / Entangle are cast repeatedly,
- Mana Flare triggers rapidly.

Illustrative Atlas state:

\[
\text{Furious supply} \approx 9.03 \text{ Rage/s}
\]

Add an Atlas-level Eternal Rage around ~4.25 Rage/s:

\[
9.03 + 4.25 \approx 13.28 \text{ Rage/s}
\]

If the build pays ~2.5 skill events/s:

\[
2.5 \times 5 \approx 12.5 \text{ Rage/s}
\]

Now the build is approximately Rage-neutral/slightly positive.

### Recommendation

**Do not remove Archmage merely to fit Eternal Rage.**

Eternal Rage becomes a very strong addition once Spirit can support:

- Archmage,
- Mana Remnants / other required reservation,
- Eternal Rage.

---

# 10. Why Rageforged was demoted

Rageforged looked excellent on paper because 35% more damage is a strong multiplier.

The problem was practical.

Live behaviour showed:

**Rageforged spends Rage**  
→ Rage falls  
→ Mana Flare stops triggering consistently  
→ Druidic Champion weakens  
→ momentum collapses.

If a support gives 35% more damage but reduces actual Flare frequency enough, real DPS can fall.

Example:

Without Rageforged:

\[
1.5 \text{ Flares/s} \times 1.00 = 1.50
\]

With Rageforged but Rage starvation drops frequency to 0.9/s:

\[
0.9 \times 1.35 = 1.215
\]

That is about **19% lower output**.

### Rule

Rageforged can return only when:

\[
\text{Rage regeneration} - \text{Rage expenditure} > 0
\]

under the actual boss rotation.

---

# 11. Mana recovery and CDR

This is the biggest correction from the older decks.

CDR does not automatically equal DPS.

Mana Flare consumes 25% current Mana.

A simple recurrence is:

\[
C_{n+1}=0.75C_n+RT
\]

where:

- \(C\) = current Mana,
- \(R\) = effective Mana recovery per second,
- \(T\) = time between Flares.

At simple equilibrium:

\[
C^*=4RT
\]

So if the cooldown becomes faster than recovery can support, current Mana falls and every subsequent Flare becomes weaker.

### Recovery-limited full-strength Flare rate

\[
f \approx \frac{\text{Effective Mana recovery/sec}}
{0.25 \times \text{desired pre-Flare Mana}}
\]

This is why the simulator shows:

- theoretical Flare/s,
- realised Flare/s,
- current Mana,
- Mana regen,
- Rage surplus.

### Upgrade rule

If +20% CDR adds almost no realised DPS because recovery is already limiting the build, buy recovery instead.

---

# 12. Mind Over Matter: now vs later

MoM is excellent while levelling because it creates a huge effective resource pool.

The problem is that the same Mana pool is also:

- defence,
- Mana Flare ammunition,
- Archmage fuel,
- Rage-supporting recovery.

Permanent full MoM can therefore make endgame recovery much harder.

### Expected progression

**Now / levelling:**  
keep MoM if it materially improves survival.

**Later:**  
start stacking partial damage-taken-from-Mana-before-Life from:

- Lucidity,
- Mental Perseverance,
- gear,
- runeforged body bases,
- Cloak of Defiance style setups.

**Endgame possibility:**  
drop MoM and retain perhaps 50–80% partial Mana diversion without the full recovery penalty.

---

# 13. Defence package

The preferred mature architecture is:

1. capped elemental resistances,
2. useful Armour,
3. some Armour applying to elemental damage where efficient,
4. partial mana-before-life,
5. Life,
6. Runic Ward as a lethal buffer,
7. strong Mana recovery.

The point is to stop making Mana tank **every** problem.

Every hit prevented by Armour is also Mana you do not have to regenerate before the next Mana Flare.

---

# 14. Ruinic Helm / Armour → ES → EB

Ruinic Helm is the important passive for the helmet concept:

> gain maximum ES based on item Armour on the equipped helmet.

That creates:

**helmet Armour**  
→ extra maximum ES  
→ Eldritch Battery  
→ extra maximum Mana.

This is a legitimate conversion route.

But it is not automatically better than a huge pure-ES helmet.

### Example

Pure ES helmet:

- 350 displayed ES
- EB → ~350 Mana-equivalent

Hybrid helmet:

- 900 Armour
- 180 natural ES
- Ruinic Helm gives about 112.5 extra ES from Armour

Total:

\[
180+112.5\approx293
\]

So the hybrid gives roughly 293 Mana-equivalent plus 900 Armour.

It gives up only around:

\[
350-293=57
\]

Mana versus the pure ES example while gaining real physical mitigation.

That is why the **Armour/ES hybrid + Ruinic Helm** route is more interesting than pure Armour.

### Recommendation

- Pure ES helmet: best for maximum Mana.
- Armour/ES + Ruinic Helm: probably the better balanced Atlas route if rolls are good.
- Pure Armour just to create Mana through Ruinic Helm: usually inefficient.
- Runic Ward: bonus defensive layer, not the main stat to stack.

---

# 15. Runic Ward

Runic Ward remains separate from Energy Shield and therefore remains defensive after Eldritch Battery converts ES into Mana.

That makes runeforged items interesting:

- ES can become Mana,
- Armour can remain mitigation,
- Ward can remain a lethal-hit buffer.

The build should normally take Ward **opportunistically** rather than dedicating the entire passive/gear budget to Ward.

---

# 16. Waveshaper

Waveshaper is especially interesting because maximum Mana can become Armour.

Example at a 40% roll:

| Maximum Mana | Armour gained |
|---:|---:|
| 7,000 | 2,800 |
| 8,000 | 3,200 |
| 10,000 | 4,000 |

This is efficient because Mana is already the primary offensive stat.

Waveshaper is therefore one of the strongest **balanced Atlas** body-armour ideas.

---

# 17. Body armour ladder and Temporalis alternatives

## Budget / early

### Sands of Silk
Useful for:

- flat Mana,
- CDR,
- Intelligence,
- cheap early frequency.

Downside:
little/no ES conversion fuel compared with a strong rare chest.

## Balanced

### Waveshaper
Local ES + Spirit + Mana→Armour.

### Cloak of Defiance
Flat Mana + ES + regen + 50% mana-before-life.

### High-ES rare / Exceptional Regalia
The cleanest “just give me a giant EB Mana pool” solution.

## Exceptional Regalia platforms

### Atziri's Splendour
Interesting because the ES version can combine:

- strong ES,
- multiple Augment Sockets,
- Soul Core flexibility,
- all-res style utility.

### Morior Invictus Exceptional Grand Regalia
Interesting because some variants can produce flat maximum Mana per filled socket.

This makes Exceptional Regalia a legitimate **socket-platform experiment**, not merely a generic rare chest.

## Premium

### Temporalis
The premium cooldown cap-breaker.

The problem is that it can create a new bottleneck:

**flat cooldown becomes extremely low**  
→ Flare demand explodes  
→ current Mana collapses  
→ Rage demand rises  
→ recovery becomes the actual cap.

Therefore a “Budget Temporalis” route is:

- Sands of Silk,
- Crest of Ardura,
- Temporal Mastery,
- Multitasking,
- Volatile Catalyst,
- Time-Lost CDR jewels,
- CDR rune/idol tech,

until the build genuinely needs flat cooldown compression.

---

# 18. Gear progression

The old deck's useful progression rule still stands:

> do not force the final Mana-stack identity before the gear can support it.

## Level 20

### Gear
- Dream Fragments if available.
- Lifesprig only if the current wand is worse.
- Mana / Intelligence / resistance rares.

### Skills
- Entangle + Mana Flare once available.
- add Branching Fissures / Pinpoint as sockets allow.
- level Mana Remnants.

### Tree
- efficient Mana / Intelligence pathing.
- survival nodes if campaign feels rough.

### Avoid
- expensive ES stacking too early,
- forcing endgame uniques.

---

## Level 30

### Gear
Prioritise:

- better Mana wand,
- Mana / Int / resists,
- movement speed,
- enough local ES to make EB worthwhile if EB is already active.

Potential bridge items from the research log include:

- Enezun's Charge,
- Effigy of Cruelty,
- Threaded Light,
- Serpent's Lesson,
- Crest if level allows.

### Build goal
Start separating:

- Entangle mapping role,
- Frost Darts boss role.

---

## Level 40

The first serious experimental branches start appearing.

Potential tests:

- Atziri's Disdain,
- Coward / Low-Life ideas,
- stronger local-ES rares,
- crit/CDB gear.

Do not buy expensive gimmicks just because they exist.

---

## Level 45–50

This is the first meaningful “build lab” stage.

Potential options include:

- Nightscale,
- Maligaro's Virtuosity,
- Uhtred's Chalice,
- Waistgate,
- Crest of Ardura,
- Sands of Silk,
- stronger Mana wand.

### Current recommendation
Stay on the stable Mana / regen / crit chassis and test one variable at a time.

---

## Level 50–60

### Targets
- 3.5–4.5k Mana as a reasonable direction if gear cooperates.
- reliable elemental resistances.
- stronger local ES.
- real Mana regeneration.
- enough crit that Mana Flare triggers consistently.

### Body armour
Start comparing:

- Sands of Silk,
- Waveshaper,
- high-ES rare.

### Rage
Start testing whether Eternal Rage can fit without removing Archmage.

---

## Level 60–70

### Target
Atlas-ready:

- roughly 4.5–5.5k+ Mana,
- capped elemental resistances,
- useful Armour,
- positive/near-positive Rage economy,
- enough recovery that CDR does not empty Mana.

### Gear
Potentially:

- Waveshaper,
- Cloak,
- high-ES rare,
- Crest / high-ES focus.

### Tree
Keep:

- Mana,
- Arcane Intensity,
- Invocated Efficiency,
- Druidic Champion,
- Furious Wellspring,
- efficient crit/CDB,
- regen.

Start preparing partial mana-before-life.

---

## Level 70–80

### Target
- 6–7k Mana if possible without destroying defence,
- better CDB,
- better recovery,
- more reliable Rage,
- decide whether MoM still helps.

This is the point where the character can begin choosing an endgame route rather than remaining a generic Mana stacker.

---

## Level 80+

Choose the route.

### Route A — Balanced Atlas
- 6–8k Mana,
- high regen,
- Armour,
- Ward,
- partial mana-before-life,
- easy pivoting.

### Route B — Rathpith Flare
- 8–10k+ Mana,
- cultivated Rathpith,
- high crit,
- high CDB,
- recovery-matched CDR.

### Route C — L31–36 Entangle hybrid
- +levels weapon/offhand/amulet,
- native Entangle damage,
- Archmage,
- crit/CDB,
- Mana Flare remains the nuke.

### Route D — premium Temporalis
Only after recovery is solved.

---

# 19. Runeseeker / 10k-current-Mana question

The earlier progression deck separated:

- **10k maximum Mana**
from
- **10k current Mana for the quest/unlock state**.

The old modelling showed that overflow can reduce the maximum-Mana requirement substantially.

Example:

If an overflow engine can reach 150% current Mana:

\[
6,667 \text{ max Mana}
\times1.5
\approx10,000 \text{ current Mana}
\]

This is why the quest should not force the permanent build into a 10k-max-Mana setup if a temporary overflow / ES / flask swap can complete the requirement more cheaply.

---

# 20. Main endgame routes

## Balanced Mana / Armour / Ward

### Strengths
- lowest pivot friction,
- easiest Atlas survival,
- does not commit the offhand/chest too early,
- good testing platform.

### Weakness
- lower peak boss ceiling than the specialised builds.

### Recommendation
Best route while the character is still developing.

---

## Rathpith Mana Flare

### Strengths
- huge Mana-derived spell damage,
- huge Mana-derived crit,
- best pure Mana Flare scaling.

### Weakness
- competes with other Focus ideas,
- expensive cultivation,
- recovery becomes the real limiter.

### Recommendation
Most likely pure boss-damage endpoint.

---

## L31–36 Entangle hybrid

### Strengths
- native damage continues between Flare cooldowns,
- benefits from Archmage, crit and CDB,
- can be excellent for mapping.

### Weakness
- requires +level gear,
- conflicts with Rathpith/rare-wand priorities,
- must be compared as a full build.

### Recommendation
Most important competing route to test.

---

## Overflow

### Strengths
- enormous opening Flare,
- useful for quest threshold,
- can help burst phases.

### Weakness
- current Mana falls after every Flare,
- peak Mana screenshot can exaggerate sustained performance.

### Recommendation
Treat as a recovery/burst architecture, not as a free 50% more damage assumption.

---

# 21. Item experiments

## Threaded Light
Turns Spirit into Spell Damage.

Good when:

- Sacred Flow adds Spirit,
- Spirit-heavy gear is already attractive,
- the loss of Rathpith/ES is not too expensive.

Usually a levelling/midgame or experiment branch rather than the final pure-Flare route.

## Serpent's Lesson
Low-Mana / Low-Life crosswire.

Potentially enables:

- Pain Attunement,
- Low-Mana nodes,
- threshold-based defensive changes.

Problem:
adds another state variable to a build already tracking Mana, Rage and cooldowns.

## Indigon
Mana-spent engine.

Important distinction:

- Mana Flare **consumes** Mana.
- Indigon-style mechanics care about Mana **spent**.

Therefore the delivery spell ramps Indigon, not the Flare's own consumption.

Potentially powerful, but very easy to create a runaway cost loop.

## Immaculate Adherence / Divinity
Interesting because delivery skill costs may be moved away from Mana while Flare still consumes current Mana.

But this affects many Mana-spent systems and conversion ordering.

Keep as a lab branch until verified.

## Liminal
Potential curse-count / gain-as-extra engine.

Likely expensive and clunky.

Keep in experiment hub, not progression.

---

# 22. Flask / overflow experiments

## Uhtred
Useful because it can increase current Mana beyond maximum Mana.

This directly increases the next Mana Flare base hit.

## Waistgate
Potential flask-engine support.

The right question is not:
“how high can the Mana orb go?”

The right question is:
“what is average current Mana before every Flare during a 10–20 second fight?”

## Glowswarm / flask-recovery rings
Interesting if the build commits to a real flask-recovery architecture.

---

# 23. Jewels and CDR

Important research branches include:

- Time-Lost CDR per notable,
- Time-Lost triggered-spell damage,
- Time-Lost crit / CDB,
- Time-Lost Mana recovery,
- Against the Darkness,
- Mind-rune / Vision-rune style socket choices.

The simulator should evaluate:

\[
\text{realised DPS gain per jewel socket}
\]

not just the nominal mod value.

---

# 24. Node priorities

## Core / high priority
- Raw Mana
- Arcane Intensity
- Invocated Efficiency
- Druidic Champion
- Furious Wellspring
- efficient Mana regeneration
- Critical Overload
- Shredding Force
- Aspiring Genius
- Arcane Remnants when recovery matters

## Conditional
- Temporal Mastery
- Multitasking
- Volatile Catalyst
- Lucidity
- Mental Perseverance
- Sacred Flow
- Wildsurge Incantation
- Low-Mana / threshold nodes
- Spirit / Archon nodes

## Review / avoid under EB
- generic global maximum ES clusters taken only to “scale EB Mana”
- Focus ES scaling that does not actually create local/displayed conversion fuel
- ES-threshold mechanics that disappear because EB removes the normal ES pool

---

# 25. Passive-tree planner requirements

The ideal planner should use the actual PoE2 passive-tree graph.

Selecting a notable should:

1. identify its node ID,
2. find the shortest legal path from the current allocated tree,
3. auto-select required connecting small passives,
4. show total point cost,
5. optionally enforce the character-level / passive-point budget.

Recommended toggles:

- **Auto-select connecting small passives**
- **Limit selection to current/target passive points**
- **Use my poe.ninja tree as baseline**
- **Show planned vs current vs travel nodes**

Visual states:

- green = currently allocated,
- blue = planned notable,
- purple = auto-selected travel,
- red = over budget.

The planner should compare **DPS / point**, not only notable strength.

---

# 26. Item planner requirements

The same logic must apply to items.

Never just add a selected item on top of a full imported character.

The system should track:

- current item,
- planned replacement,
- delta,
- slot legality,
- conditional modifiers,
- level requirements,
- conversion order.

Examples:

### Equip Rathpith
Show:
- Mana delta,
- crit delta,
- CDB/damage delta,
- realised Flare DPS delta,
- recovery delta,
- defence delta.

### Replace pure ES helmet with Armour/ES + Ruinic Helm
Show:
- local ES change,
- Mana change,
- Armour gained,
- Ward gained,
- estimated defensive effect.

---

# 27. Skill-link simulator requirements

Each skill should have selectable links.

### Entangle presets
- mapping,
- Flare trigger,
- native Entangle DPS,
- L36 hybrid.

### Frost Darts presets
- boss trigger,
- max crit,
- Mana Flare delivery.

### Orb of Storms presets
- persistent trigger,
- Rage-efficient trigger,
- utility.

Supports should be classified by what they actually change:

- MORE damage,
- increased damage,
- crit,
- CDB,
- cast speed,
- duration,
- hit count,
- projectile count,
- area,
- cooldown,
- cost,
- ailment,
- trigger behaviour.

Mechanical supports should **not** be faked as a generic damage multiplier.

---

# 28. Simulator outputs

The floating output rail should show:

- Maximum Mana
- current Mana before Flare
- Mana regen/s
- crit chance
- CDB
- non-crit Flare
- crit Flare
- expected Flare hit
- theoretical Flare/s
- realised Flare/s
- burst DPS
- sustained DPS
- Rage regen/s
- Rage spend/s
- Rage surplus
- Armour
- mana-before-life
- Runic Ward
- resistances / EHP estimate where available.

The next step beyond static formulas is a **10-second and 30-second temporal simulation**:

Mana and Rage should actually change over time.

That lets the simulator show:

- Flare #1,
- Mana after Flare,
- recovery interval,
- Flare #2,
- Remnant collection,
- Rage expenditure,
- Rage stall events,
- average pre-Flare Mana.

That is the correct way to evaluate CDR, Eternal Rage, Uhtred and Rageforged.

---

# 29. Build bottleneck diagnosis

The planner should end every simulation with a diagnosis.

Possible outputs:

### Recovery limited
Theoretical CDR supports 1.8 Flare/s, but recovery only supports 1.15 strong Flares/s.

### Rage limited
Rage expenditure exceeds regeneration by 3.2 Rage/s.

### Crit limited
Enough Mana/recovery exists, but trigger crit is too low to utilise the cooldown.

### CDR limited
Recovery and Rage are healthy; more cooldown recovery should directly improve output.

### Defence limited
Incoming damage removes too much Mana from the same pool needed for Flare.

The most useful recommendation is therefore:

> **Best next stat**, not simply “highest DPS item.”

---

# 30. Current recommendation

For the present character, the safest route remains:

**Mana + local ES → EB**  
+ **Archmage**  
+ **Mana Flare**  
+ **Entangle / Frost Darts / Orb trigger package**  
+ **Mana regeneration**  
+ **Furious Wellspring**  
+ **Druidic Champion**  
+ **crit then CDB**  
+ **useful Armour**  
+ **partial mana-before-life later**  
+ **Runic Ward as bonus protection**.

Near-term:

1. improve Mana / local ES / Intelligence,
2. continue Mana regeneration,
3. keep Rageforged out,
4. cap resistances,
5. test Eternal Rage only when it can coexist with Archmage,
6. avoid paying for CDR that recovery cannot use,
7. enter Atlas on the balanced chassis,
8. later compare Rathpith against the L36 Entangle route.

---

# 31. What remains unresolved

These should stay in the experiment hub rather than be treated as facts:

- exact Ruinic Helm vs top pure-ES rare helmet efficiency on real purchasable gear,
- exact armour-to-elemental mitigation value for the final gear package,
- Eternal Rage's full interaction under the real boss rotation,
- exact L36 Entangle whole-character DPS versus cultivated Rathpith,
- true Remnant generation/collection rate during bossing,
- Temporalis recovery requirements,
- exact Divinity / EB / Archmage conversion ordering,
- Liminal route economics,
- whether a premium Exceptional Regalia socket setup beats a strong rare chest in total character value.

---

# 32. Companion simulator

The HTML simulator remains the interactive companion to this guide.

Use the MD to answer:

- what should I do,
- why,
- what route exists,
- what item/node means,
- what to aim for at each level.

Use the simulator to answer:

- what happens if I equip this,
- what happens if I take this passive,
- what happens if I change this link,
- what is limiting my current setup,
- how much Mana / Rage / Flare damage does the planned state produce.

The guide is the source of truth.  
The simulator is the testing tool.
