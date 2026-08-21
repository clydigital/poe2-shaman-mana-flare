// Current-league PoE2 additions (Runes of Aldur).
// These are live rare-target presets and jewel metadata, kept separate from the core planner data.
(function(){
  const P0=(note='')=>P(null,null,'PoE2DB live affix data','2026-08-21',note);

  // Rare gear targets based on current live affix ranges. Values use conservative midpoints.
  ITEMS.weapon1.push({id:'runeseekerWand',name:'Runeseeker-style rare wand · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:10,flatMana:165,int:29,price:P0('Celestial Alloy midpoint +165 Mana; high-tier INT suffix modelled at +29.'),desc:'+165 Mana +29 INT target. Keep spell levels/cast/crit affixes around this core.'});

  ITEMS.helmet.push({id:'runeseekerHelm',name:'Runeseeker-style Ancestral Tiara · ES + Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:10,flatMana:137,int:29,defSpec:{baseS:109,flatS:28,localPct:40.5},price:P0('Mazarine Mana midpoint +137; high-tier INT +29; T1-style ES midpoint.'),desc:'High ES + ~137 Mana + ~29 INT. Strong EB/Jiquani chassis.'});

  ITEMS.ring1.push({id:'runeseekerRingA',name:'Runeseeker-style rare ring · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:9,flatMana:172,int:29,price:P0('Zaffre Mana midpoint +172; high-tier INT +29.'),desc:'~172 Mana + ~29 INT before catalyst/corruption.'});
  ITEMS.ring2.push({id:'runeseekerRingB',name:'Runeseeker-style rare ring · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:9,flatMana:172,int:29,price:P0('Zaffre Mana midpoint +172; high-tier INT +29.'),desc:'~172 Mana + ~29 INT before catalyst/corruption.'});

  ITEMS.amulet.push({id:'runeseekerAmulet',name:'Runeseeker-style rare amulet · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:10,flatMana:185,int:29,price:P0('Ultramarine Mana midpoint +184.5; high-tier INT +29. All-attribute suffix is intentionally not double-counted.'),desc:'~185 Mana + ~29 INT. All-Attributes/ES can be layered only when actually present on the item.'});

  ITEMS.gloves.push({id:'runeseekerGloves',name:'Runeseeker-style ES gloves · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:10,flatMana:115,int:29,defSpec:{baseS:54,localPct:40.5},price:P0('Chalybeous Mana midpoint +114.5; high-tier INT +29.'),desc:'ES + ~115 Mana + ~29 INT; keeps Arcane-Surge-on-crit as a premium suffix target where legal.'});

  ITEMS.boots.push({id:'runeseekerBoots',name:'Runeseeker-style ES boots · Mana + INT',level:82,status:'LIVE RARE TARGET',value:10,ceiling:10,flatMana:115,int:29,defSpec:{baseS:83,localPct:40.5},price:P0('Chalybeous Mana midpoint +114.5; high-tier INT +29.'),desc:'High ES + ~115 Mana + ~29 INT. Movement speed remains mandatory in a real purchase.'});

  window.LIVE_JEWEL_OPTIONS={
    heroic:{
      forceOfWill:{label:'Force of Will',manaPct:2,note:'2% increased maximum Mana'},
      naturalEnergies:{label:'Natural Energies',esPct:40,note:'40% increased maximum Energy Shield'},
      runicTattoos:{label:'Runic Tattoos',regenPct:30,note:'30% increased Mana Regeneration Rate'},
      warTactics:{label:'War Tactics',regenPct:20,note:'20% increased Mana Regeneration Rate'},
      survivalPlan:{label:'Survival Plan',flaskRecoveryPct:40,note:'40% increased Mana Recovery from Flasks'},
      scorchedEarth:{label:'Scorched Earth',int:15,note:'+15 Intelligence'},
      corruptedVision:{label:'Corrupted Vision',note:'30% increased Critical Hit Chance for Spells'},
      runeKnight:{label:'Rune Knight',note:'15% increased Critical Spell Damage Bonus'},
      druidicTraining:{label:'Druidic Training',note:'40% increased Spell Damage'}
    },
    undying:{
      sacrificeOfMind:{label:'Kurgal · Sacrifice of Mind',note:'Mana regen overflows max Mana; 50% less Mana Regeneration Rate'},
      lavishSoul:{label:'Lavish Soul',manaPct:5,note:'5% increased maximum Mana at 100+ Tribute'},
      ravenousMind:{label:'Ravenous Mind',note:'2% increased Mana Recovery Rate per 10 Tribute'},
      unrestrainedIntellect:{label:'Unrestrained Intellect',note:'+2 INT per 25 Tribute; 1% CDR per 10 Tribute'},
      ancientBastion:{label:'Ancient Bastion',note:'4% increased maximum ES per 10 Tribute'},
      worthyTithes:{label:'Worthy Tithes',note:'2% increased Remnant effect per 10 Tribute'}
    }
  };
})();
