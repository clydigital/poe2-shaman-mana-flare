(() => {
'use strict';

const V40_REWARDS = [
  {stage:'ACT 1',tag:'MUST',name:'King in the Mists · Freythorn',reward:'+30 Maximum Spirit',why:'Take this immediately. It is the first major reservation breakpoint and helps fund Archmage / Mana Remnants later.',tone:'must'},
  {stage:'ACT 1 → ENDGAME',tag:'MUST',name:'Every +2 passive / weapon-set point objective',reward:'24 campaign passive points total',why:'Do not skip these. This build is point-hungry because Mana, crit, recovery and CDR all compete for the same tree budget.',tone:'must'},
  {stage:'ACT 3',tag:'MUST',name:'Venom Draught of Clarity',reward:'+25% Mana Regeneration Rate',why:'Best permanent Venom Draught for Mana Geyser. It feeds Flare recovery and also improves Furious Wellspring Rage generation.',tone:'must'},
  {stage:'ACT 3',tag:'MUST',name:'Ignagduk · The Azak Bog',reward:'+30 Maximum Spirit',why:'Second major Spirit breakpoint. Combined with Act 1, this gives +60 Spirit before the Interludes.',tone:'must'},
  {stage:'ACT 4',tag:'MUST',name:"Navali's Rest · Eye of Hinekora",reward:'+5% Maximum Mana',why:'Directly scales the central resource, Archmage, Arcane Intensity, Rathpith scaling and Mana Flare base damage.',tone:'must'},
  {stage:'ACT 4',tag:'RECOMMENDED',name:'Goddess of Justice · Abandoned Prison',reward:'+30% Mana Recovery from Flasks',why:'Choose Mana recovery over Life recovery for the overflow / refill version of this build. Especially useful for Runeseeker prep and burst recovery.',tone:'good'},
  {stage:'ACT 4',tag:'CHOICE',name:"Tasalio's Test · Halls of the Dead",reward:'+5 Intelligence OR +5% Cold Resistance',why:'For pure min-max Mana, +5 INT is a small permanent gain. During progression, +5% Cold Resistance is usually the more valuable choice if gearing is tight. This tattoo choice is permanent.',tone:'choice'},
  {stage:'ACT 4',tag:'BRANCH',name:'Great White One · Whakapanu Island',reward:'30% Global Defences OR hybrid defence blessing',why:'Armour/ES route: strongly consider the hybrid blessing with 15% of Armour also applying to Elemental Damage. Pure-Mana/low-Armour route: compare the global-defence option instead.',tone:'choice'},
  {stage:'INTERLUDE',tag:'MUST',name:'Lythara · Kriar Village',reward:'+40 Maximum Spirit',why:'This completes the campaign Spirit package: +100 Spirit total from King in the Mists, Ignagduk and Lythara. This is what makes Eternal Rage experiments much less painful.',tone:'must'},
  {stage:'INTERLUDE',tag:'SWAPPABLE',name:'Seven Pillars · Qimah',reward:'Choose one changeable permanent boon',why:'Progression: Tabana +5% all Elemental Resists. Damage-engine mature: Halani +12% CDR. Armour defence: Ahkeli +15% Global Defences. You can return to Qimah and change it later.',tone:'good'}
];

const V40_NODES = [
  {tier:'S',stage:'EARLY / CORE',name:'Raw Mana',effect:'8% increased maximum Mana · 10% increased Mana Cost',why:'One of the cleanest direct resource multipliers. Mana is damage, Archmage gain, Rathpith scaling and defensive fuel.'},
  {tier:'S',stage:'CORE SCALING',name:'Arcane Intensity',effect:'3% increased Spell Damage per 100 maximum Mana',why:'Mandatory once Mana becomes large. At 5,000 Mana this is +150% increased Spell Damage; at 10,000 it is +300%.'},
  {tier:'S',stage:'TRIGGER DAMAGE',name:'Invocated Efficiency',effect:'Triggered Spells deal 40% increased Spell Damage · 10% Mana Cost Efficiency',why:'Mana Flare is triggered. This is unusually efficient damage for the actual payload rather than only the carrier spell.'},
  {tier:'A',stage:'CRIT PACKAGE',name:'Critical Overload',effect:'15% increased Spell Crit · 15% increased Critical Spell Damage Bonus',why:'A compact crit + CDB package. CDB becomes much more valuable once the carrier and Flare crit rates are already reliable.'},
  {tier:'A',stage:'CRIT PACKAGE',name:'Shredding Force',effect:'15% increased Spell Crit · 15% increased Critical Spell Damage Bonus · crit ailment magnitude',why:'Another efficient mixed crit/CDB node. Particularly nice if Frost Darts or Entangle becomes meaningful native damage too.'},
  {tier:'A',stage:'CRIT / DEFENCE',name:'Controlling Magic',effect:'25% increased Spell Crit · enemy Hits have 25% reduced Crit Chance against you',why:'Good once trigger reliability is the limiter; unlike pure offence it also reduces incoming spike risk.'},
  {tier:'A',stage:'RECOVERY / HYBRID DEFENCE',name:'Lucidity',effect:'8% of Damage taken from Mana before Life · +15 Intelligence',why:'Excellent transition node when moving away from full MoM toward partial Mana-before-Life. INT also adds base Mana.'},
  {tier:'A',stage:'RECOVERY',name:'Mental Toughness',effect:'18% increased Mana Regen · 25% Mana Cost Efficiency while on Low Mana',why:'Recovery is what decides whether CDR is real DPS or just makes each successive Mana Flare weaker.'},
  {tier:'A',stage:'REMNANTS',name:'Arcane / Empowering Remnants + Remnant Attraction',effect:'Better Remnant reach, effect and collection reliability',why:'Do not judge these as tooltip DPS. Their value is keeping current Mana high enough for the next 25%-current-Mana Flare.'},
  {tier:'LATE',stage:'CDR',name:'Temporal Mastery',effect:'16% increased Cooldown Recovery Rate',why:'Excellent only after the build can refill Mana and sustain Rage quickly enough to use the extra trigger windows.'},
  {tier:'LATE',stage:'CDR',name:'Multitasking',effect:'12% increased CDR · 15% increased Skill Effect Duration',why:'Very attractive for persistent carriers, but same rule: buy recovery first if realised Flare/s is recovery-capped.'},
  {tier:'ASC',stage:'SHAMAN',name:'Furious Wellspring → Druidic Champion',effect:'Rage regeneration engine → 1% more Spell Damage per 2 Rage',why:'This is the Shaman damage engine. Keep Rage positive; Rageforged-style extra Rage costs are bad if they stall Mana Flare.'},
  {tier:'ASC',stage:'SHAMAN / SPIRIT',name:'Sacred Flow',effect:'+40 Spirit per empty Charm slot',why:'A powerful reservation lever if Eternal Rage or another Spirit buff is worth more than filling every Charm slot.'},
  {tier:'ASC',stage:'SHAMAN / ENDGAME',name:'Wisdom of the Maji',effect:'Enables Bonded modifiers on Runes / Idols',why:'The weird-tech node. Its value depends entirely on the Bonded modifiers you can actually exploit, so treat it as a build-engine unlock rather than flat DPS.'}
];

function v40Css(){
  const s=document.createElement('style');
  s.textContent=`
  #v40ProgressionIntel{scroll-margin-top:90px}.v40Intro{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;margin-bottom:12px}.v40Intro p{margin:0;max-width:680px}
  .v40Rewards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v40Reward{border:1px solid var(--line);border-radius:13px;padding:11px;background:linear-gradient(180deg,rgba(31,22,16,.97),rgba(20,14,11,.97))}.v40Reward.must{border-color:rgba(185,151,87,.48)}.v40Reward.good{border-color:rgba(123,166,174,.34)}.v40Reward.choice{border-color:rgba(144,123,178,.35)}
  .v40Top{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:5px}.v40Stage,.v40Tag,.v40Tier{font-size:7px;text-transform:uppercase;letter-spacing:.09em;border-radius:999px;padding:3px 6px;border:1px solid rgba(217,179,112,.28);color:#d7bd8a}.v40Tag{color:#9ec5cb;border-color:rgba(105,166,176,.32)}.v40Reward h4,.v40Node h4{font-size:11px;margin:2px 0 4px;color:#f0e4cf}.v40Reward strong{display:block;font-size:10px;color:#d9bd82;margin-bottom:5px}.v40Reward p,.v40Node p{font-size:8.8px;line-height:1.45;color:#a99c88;margin:0}
  .v40Summary{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:10px 0 18px}.v40Summary div{border:1px solid var(--line);border-radius:11px;padding:9px;background:#15100c}.v40Summary b{font-size:15px;display:block;color:#ead8b9}.v40Summary span{font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#8f816d}
  .v40Nodes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v40Node{border:1px solid var(--line);border-radius:13px;padding:11px;background:#19120e}.v40Node .v40Effect{font-size:8.6px;color:#d8c7aa;margin:5px 0}.v40Tier.s{color:#f2cf83}.v40Tier.a{color:#a9d5c3}.v40Tier.late{color:#aab7db}.v40Tier.asc{color:#d0a8e0}.v40Find{margin-top:8px;border:1px solid rgba(217,179,112,.25);background:#100b08;color:#d9bd82;border-radius:8px;padding:6px 8px;font-size:8px;cursor:pointer}.v40Find:hover{border-color:#d9bd82;color:#fff0d1}
  .v40Order{margin-top:10px;padding:11px;border:1px solid rgba(217,179,112,.28);border-radius:13px;background:rgba(26,18,14,.92);font-size:9px;line-height:1.55;color:#b7aa96}.v40Order strong{color:#ead5af}
  @media(max-width:900px){.v40Rewards,.v40Nodes,.v40Summary{grid-template-columns:1fr}.v40Intro{display:block}}
  `;
  document.head.appendChild(s);
}

function v40OpenNode(name){
  document.querySelector('.modebtn[data-mode="build"]')?.click();
  setTimeout(()=>{
    const q=document.getElementById('nodeLibrarySearch');
    if(q){q.value=name;q.dispatchEvent(new Event('input',{bubbles:true}));q.scrollIntoView({behavior:'smooth',block:'center'});}
  },120);
}
window.v40OpenNode=v40OpenNode;

function v40Inject(){
  const guide=document.querySelector('.appPage[data-page="guide"]');
  if(!guide||document.getElementById('v40ProgressionIntel'))return;
  const sec=document.createElement('div');sec.className='sectionBlock';sec.id='v40ProgressionIntel';
  sec.innerHTML=`
    <div class="v40Intro"><div><h3>Progression rewards to nab</h3><p class="small">These are the permanent campaign rewards that matter most to Mana Geyser. The short version: never miss Spirit, Mana, regen or passive points. Defensive choices depend on whether you commit to Armour/ES.</p></div></div>
    <div class="v40Summary"><div><b>+100</b><span>campaign Spirit to collect</span></div><div><b>+5%</b><span>permanent max Mana</span></div><div><b>+25%</b><span>permanent Mana regen</span></div><div><b>24</b><span>campaign passive points</span></div></div>
    <div class="v40Rewards">${V40_REWARDS.map(r=>`<article class="v40Reward ${r.tone}"><div class="v40Top"><span class="v40Stage">${r.stage}</span><span class="v40Tag">${r.tag}</span></div><h4>${r.name}</h4><strong>${r.reward}</strong><p>${r.why}</p></article>`).join('')}</div>
    <div class="v40Order"><strong>Recommended reward path for this build:</strong> King in the Mists → every passive-point side boss → Clarity Venom Draught → Ignagduk → Navali's Rest → Mana Flask recovery at Goddess of Justice → Great White One defence choice → Lythara +40 Spirit → use Tabana at Qimah while gearing, then swap to Halani once the simulator says recovery is no longer the bottleneck.</div>
    <h3 style="margin-top:22px">Key nodes to nab</h3><p class="small">Priority is not simply “all damage first.” Build the engine in this order: Mana → trigger-specific damage → reliable crit/CDB → recovery → CDR. CDR before recovery is one of the easiest ways to make the tooltip look better while real sustained damage gets worse.</p>
    <div class="v40Nodes">${V40_NODES.map(n=>`<article class="v40Node"><div class="v40Top"><span class="v40Tier ${n.tier.toLowerCase()}">${n.tier}</span><span class="v40Stage">${n.stage}</span></div><h4>${n.name}</h4><div class="v40Effect">${n.effect}</div><p>${n.why}</p><button class="v40Find" onclick='v40OpenNode(${JSON.stringify(n.name)})'>Find in Planner</button></article>`).join('')}</div>
    <div class="v40Order"><strong>Practical node order:</strong> Raw Mana + Arcane Intensity first → Invocated Efficiency → enough crit to saturate Mana Flare triggers → add CDB through Critical Overload / Shredding Force → solve recovery with regen/Remnants → only then take Temporal Mastery / Multitasking. Keep Furious Wellspring + Druidic Champion Rage-positive throughout.</div>`;

  const progressionHeading=[...guide.querySelectorAll('h2,h3')].find(x=>/progression|level.*guide|roadmap/i.test(x.textContent||''));
  const progressionBlock=progressionHeading?.closest('.sectionBlock');
  if(progressionBlock) progressionBlock.insertAdjacentElement('afterend',sec);
  else if(document.getElementById('v32EntangleRoute')) document.getElementById('v32EntangleRoute').insertAdjacentElement('beforebegin',sec);
  else guide.appendChild(sec);

  const nav=document.querySelector('.v32Left');
  if(nav&&!nav.querySelector('a[href="#v40ProgressionIntel"]')){
    const first=nav.querySelector('a');
    const a=document.createElement('a');a.href='#v40ProgressionIntel';a.textContent='Rewards & key nodes';
    if(first) first.insertAdjacentElement('afterend',a); else nav.appendChild(a);
  }
}

function init(){v40Css();v40Inject();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,520));else setTimeout(init,520);
})();
