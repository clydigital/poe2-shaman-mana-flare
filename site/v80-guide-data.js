window.MANA_GEYSER_GUIDE = {
  nodes: [
    {name:'Eldritch Battery', bucket:'Mana Conversion', effect:'Energy Shield from gear becomes Mana; Mana Costs are doubled.', grade:'S', status:'CORE'},
    {name:'Raw Mana', bucket:'Mana', effect:'Large increased maximum Mana with increased Mana Cost.', grade:'S', status:'CORE', instill:['Suffering','Ire','Isolation']},
    {name:'Arcane Intensity', bucket:'Highest DPS gain', effect:'3% increased Spell Damage per 100 maximum Mana.', grade:'S', status:'CORE', instill:['Disgust','Fear','Despair']},
    {name:'Invocated Efficiency', bucket:'Highest DPS gain', effect:'Mana Cost Efficiency plus large Triggered Spell Damage.', grade:'S', status:'CORE', instill:['Isolation','Envy','Paranoia']},
    {name:'Dynamism', bucket:'Highest DPS gain', effect:'40% increased Damage after triggering a Skill; also helps Meta Skill Energy.', grade:'S', status:'RECOMMENDED', instill:['Isolation','Greed','Ire']},
    {name:'Triggered Spell Damage', bucket:'Highest DPS gain', effect:'Normal-tree small passives that directly scale Mana Flare as a Triggered Spell.', grade:'A', status:'RECOMMENDED'},
    {name:'Critical Overload', bucket:'Highest DPS gain', effect:'Spell Critical Hit Chance plus Critical Damage Bonus.', grade:'A', status:'RECOMMENDED'},
    {name:'Shredding Force', bucket:'Highest DPS gain', effect:'Spell Critical Hit Chance plus Critical Damage Bonus.', grade:'A', status:'RECOMMENDED'},
    {name:'Controlling Magic', bucket:'Additional considerations', effect:'Spell Crit with defensive enemy-critical reduction.', grade:'A', status:'RECOMMENDED'},
    {name:'Pure Chaos', bucket:'Highest DPS gain', effect:'Gain 11% of Damage as Extra Chaos Damage.', grade:'A', status:'INSTILL', instill:['Envy','Isolation','Guilt']},
    {name:'Evocational Practitioner', bucket:'Highest DPS gain', effect:'Critical Hit Chance after triggering; also helps Meta Skill Energy.', grade:'B', status:'OPTIONAL'},
    {name:'Energise', bucket:'Additional considerations', effect:'Chance for Trigger skills to refund half of Energy spent.', grade:'B', status:'OPTIONAL'},

    {name:'Mana Blessing', bucket:'Mana', effect:'+20 maximum Mana plus additional Mana scaling.', grade:'A', status:'RECOMMENDED', instill:['Guilt','Despair','Guilt']},
    {name:'Sturdy Mind', bucket:'Mana', effect:'+30 maximum Mana and 14% increased Mana Regeneration Rate.', grade:'A', status:'RECOMMENDED', instill:['Isolation','Envy','Guilt']},
    {name:'Eldritch Will', bucket:'Mana', effect:'Hybrid Life/Mana/ES scaling; mainly valuable for Mana after Eldritch Battery.', grade:'B', status:'OPTIONAL'},
    {name:'Insightfulness', bucket:'Mana', effect:'INT / ES / Mana-regeneration hybrid; compare point efficiency before routing.', grade:'B', status:'OPTIONAL'},

    {name:'Mental Toughness', bucket:'Mana Regen', effect:'18% increased Mana Regeneration Rate plus Mana Cost relief while not on Low Mana.', grade:'S', status:'RECOMMENDED', instill:['Envy','Fear','Greed']},
    {name:'Conservative Casting', bucket:'Mana Regen', effect:'Mana Regeneration plus Mana Cost Efficiency.', grade:'S', status:'RECOMMENDED', instill:['Disgust','Disgust','Ire']},
    {name:'Efficient Casting', bucket:'Mana Regen', effect:'Mana Regeneration plus strong Mana Cost Efficiency.', grade:'S', status:'RECOMMENDED', instill:['Greed','Envy','Paranoia']},
    {name:'Aspiring Genius', bucket:'Mana Regen', effect:'20% Mana Regeneration Rate and chance to gain Arcane Surge on Crit.', grade:'A', status:'RECOMMENDED', instill:['Suffering','Greed','Greed']},
    {name:'Arcane Blossom', bucket:'Mana Regen', effect:'15% increased Mana Recovery Rate.', grade:'S', status:'RECOMMENDED'},
    {name:'Open Mind', bucket:'Mana Regen', effect:'25% increased Mana Regeneration Rate.', grade:'A', status:'RECOMMENDED', instill:['Guilt','Guilt','Ire']},
    {name:'Refocus', bucket:'Mana Regen', effect:'Mana Regeneration plus additional regeneration while stationary.', grade:'A', status:'OPTIONAL'},
    {name:'Ether Flow', bucket:'Mana Regen', effect:'Strong regeneration while moving with a stationary trade-off.', grade:'B', status:'OPTIONAL'},
    {name:'Adverse Growth', bucket:'Additional considerations', effect:'20% of Damage taken Recouped as Mana with a Life-regeneration downside.', grade:'B', status:'OPTIONAL', instill:['Ire','Paranoia','Disgust']},
    {name:'Altered Brain Chemistry', bucket:'Mana Regen', effect:'Mana Flask recovery plus Mana Recovery Rate during Mana Flask effect.', grade:'B', status:'OPTIONAL', instill:['Ire','Envy','Guilt']},
    {name:'Arcane Remnants', bucket:'Mana Regen', effect:'Improves the Mana Remnants recovery engine.', grade:'A', status:'RECOMMENDED'},
    {name:'Empowering Remnants', bucket:'Mana Regen', effect:'Improves Remnant effect.', grade:'A', status:'RECOMMENDED'},
    {name:'Remnant Attraction', bucket:'Additional considerations', effect:'Collect Mana Remnants from farther away.', grade:'B', status:'OPTIONAL'},

    {name:'Temporal Mastery', bucket:'CDR', effect:'Cooldown Recovery Speed.', grade:'A', status:'LATE'},
    {name:'Multitasking', bucket:'CDR', effect:'Cooldown Recovery plus duration.', grade:'A', status:'LATE'},
    {name:'Volatile Catalyst', bucket:'CDR', effect:'Cooldown Recovery plus Area of Effect.', grade:'A', status:'LATE'},

    {name:'Ruinic Helm', bucket:'Mana Conversion', effect:'+1 maximum Energy Shield per 8 Item Armour on equipped Helmet; EB can then convert that ES to Mana.', grade:'A', status:'OPTIONAL'},
    {name:'Spectral Ward', bucket:'Mana Conversion', effect:'+1 maximum Energy Shield per 12 Item Evasion on equipped Body Armour; EB can then convert that ES to Mana.', grade:'B', status:'OPTIONAL'},
    {name:'Lucidity', bucket:'Mana Conversion', effect:'8% of Damage taken from Mana before Life and +15 Intelligence.', grade:'A', status:'RECOMMENDED', instill:['Envy','Disgust','Suffering']},
    {name:'Mental Perseverance', bucket:'Mana Conversion', effect:'10% of Damage taken from Mana before Life and +15 Intelligence.', grade:'A', status:'RECOMMENDED', instill:['Ire','Disgust','Greed']},
    {name:'Mind Over Matter', bucket:'Mana Conversion', effect:'All damage taken from Mana before Life, but 50% less Mana Recovery.', grade:'B', status:'EARLY'},

    {name:'Wisdom of the Maji', bucket:'CORE', effect:'Gain Bonded benefits of Runes and Idols.', grade:'S', status:'CORE'},
    {name:'Sacred Flow', bucket:'CORE', effect:'+40 Spirit per empty Charm slot.', grade:'S', status:'CORE'},
    {name:'Furious Wellspring', bucket:'Rage', effect:'Mana-Regeneration modifiers also scale Rage regeneration; Skills gain a Rage cost.', grade:'S', status:'CORE'},
    {name:'Druidic Champion', bucket:'Rage', effect:'Every 2 Rage grants 1% more Spell Damage.', grade:'S', status:'CORE'},
    {name:'Mystical Rage', bucket:'Rage', effect:'2% increased Spell Damage per Rage; strong Strugglescream candidate.', grade:'S', status:'INSTILL'},

    {name:'Reactive Growth', bucket:'Additional considerations', effect:'Defensive Shaman option once damage is already excessive.', grade:'A', status:'LATE'},
    {name:'Avatar of Evolution', bucket:'Additional considerations', effect:'High-end defensive Shaman branch; compare only after the Rage package is no longer needed for damage.', grade:'A', status:'LATE'},
    {name:'Pain Attunement', bucket:'Additional considerations', effect:'Low-Life damage branch; only if Low Life is actually stable.', grade:'B', status:'EXPERIMENT'},
    {name:'Overload', bucket:'Additional considerations', effect:'Lightning penetration branch with Low-Mana interaction.', grade:'B', status:'OPTIONAL'},
    {name:'Chakra of Thought', bucket:'Additional considerations', effect:'Mana / recovery defensive cluster; compare point efficiency.', grade:'B', status:'OPTIONAL'},
    {name:'Warding Fetish / Dreamcatcher ES line', bucket:'Additional considerations', effect:'Potential EB trap: generic %ES scaling may not give the Mana you expect from local-item ES conversion.', grade:'C', status:'CAUTION'}
  ],

  questRewards: [
    {name:"Navali's Rest", area:'Eye of Hinekora', effect:'5% increased maximum Mana', rec:'TAKE', note:'Direct core-resource scaling.'},
    {name:'Venom Draught of Clarity', area:'The Slithering Dead', effect:'25% increased Mana Regeneration Rate', rec:'TAKE', note:'Excellent for Flare recovery and Furious Wellspring.'},
    {name:'Goddess of Justice', area:'Abandoned Prison', effect:'30% increased Mana Recovery from Flasks', rec:'GOOD', note:'Best when Waistgate/Uhtred or a strong rare Mana Flask is part of the engine.'},
    {name:'Great White One — Global Defences', area:'Whakapanu Island', effect:'30% increased Armour, Evasion and Energy Shield', rec:'DEFENCE', note:'Broad defensive choice.'},
    {name:'Great White One — Hybrid Defences', area:'Whakapanu Island', effect:'15% of Armour also applies to Elemental Damage + hybrid defensive bonuses', rec:'DEFENCE', note:'Better if committing to Armour / mixed-defence gear.'},
    {name:"Seven Pillars — Halani's Boon", area:'Qimah', effect:'12% increased Cooldown Recovery Rate', rec:'LATE', note:'Take only once Mana recovery can support the extra Flare rate.'},
    {name:"Seven Pillars — Kochai's Boon", area:'Qimah', effect:'+5 to all Attributes', rec:'GOOD', note:'Adds Intelligence, requirements and some Mana.'},
    {name:"Seven Pillars — Ahkeli's Boon", area:'Qimah', effect:'15% increased Global Defences', rec:'DEFENCE', note:'Safe general-purpose choice.'},
    {name:"Seven Pillars — Tabana's Boon", area:'Qimah', effect:'+5% to all Elemental Resistances', rec:'DEFENCE', note:'Useful when resistances are squeezing gear choices.'}
  ],

  progression: [
    {stage:'ACT 1', level:'1–15', goal:'Build the Mana/crit shell', items:['Rare Wand: Spell Damage / Crit / Mana','Rare ES pieces with Mana or Intelligence','Dream Fragments from level 12 if affordable'], notes:'Do not overpay for damage. Mana, resistances and a reliable crit carrier matter more.'},
    {stage:'ACT 2', level:'16–30', goal:'Turn on the real Mana-Flare engine', items:['Sands of Silk (16) as a cheap bridge','Serpent’s Lesson (22) only as an experiment','Crest of Ardura (28) for CDR + recovery','Second Dream Fragments when it clearly beats the rare ring'], notes:'This is where Entangle/Frost Darts + Mana Flare starts to feel like the build.'},
    {stage:'ACT 3', level:'31–45', goal:'Eldritch Battery + real Mana stacking', items:['High-ES helmet/body upgrades','Rare Wand with gain-as-extra / Spell Damage / Crit','Visage of Ayah only while it is the cleanest EB enabler','Nightscale / Maligaro’s at 45 only if they beat a strong rare'], notes:'Start judging gear by final Mana + recovery + crit together, not by one flashy affix.'},
    {stage:'ACT 4', level:'46–64', goal:'Solve sustain before buying more CDR', items:['Lavianga’s Spirits (49) only for comfort','Waistgate (50)','Uhtred’s Chalice (50)','Waveshaper (51) as a defensive bridge','Strugglescream (52) once four instills beat Astramentis'], notes:'Archmage becomes permanent only when current Mana stays healthy through a real fight.'},
    {stage:'EARLY ATLAS', level:'65–80', goal:'Choose the endgame chassis', items:['Cloak of Defiance (65) defensive route','Adonia’s Ego (65) hybrid wand option','Exceptional 2-socket rare Wand','Cultivated Rathpith when the Mana cultivations are good','Morior vs high-ES + %Mana rare chest: compare final Mana'], notes:'Aim for 4k → 6k permanent Mana while raising repeatable recovery toward 35–40% of maximum Mana per second.'},
    {stage:'ENDGAME', level:'80+', goal:'Push 7.5–10k+ without Runeseeker', items:['Huge pure-ES helmet','Exceptional augment-effect gloves/boots','High-end Mana/%Mana/INT/regen jewellery','Morior socket-max or high-ES rare chest','Jiquani + Darkness Enthroned only as aspirational BIS'], notes:'At this point the build should work without Runeseeker. Rune Seeker is an economic/farming objective, not the chassis.'}
  ]
};