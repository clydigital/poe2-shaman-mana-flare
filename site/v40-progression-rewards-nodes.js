(() => {
'use strict';

const V40_REWARDS = [
  {
    act:'ACT 1',area:'Freythorn',access:'From Hunting Grounds',target:'The King in the Mists',tag:'MUST GET',tone:'must',reward:'+30 Maximum Spirit',
    how:'Complete the Freythorn encounter, kill the King in the Mists, pick up the Gembloom Skull at the altar and consume it.',
    take:'Automatic Spirit reward. Do not leave the skull sitting on the altar.',
    why:'First permanent Spirit breakpoint. It helps fund Archmage, Mana Remnants and later Eternal Rage experiments.'
  },
  {
    act:'ACT 1 → ENDGAME',area:'Campaign side objectives',access:'Check each Act/interlude map for +passive rewards',target:'Every +2 passive / Weapon Set point objective',tag:'MUST GET',tone:'must',reward:'24 campaign passive points total',
    how:'Complete every campaign objective that awards passive or Weapon Set passive points instead of rushing only the main story.',
    take:'All of them. This build is point-hungry because Mana, crit, recovery and CDR compete for tree budget.',
    why:'Missing two points can delay an entire notable cluster or force you to sacrifice recovery for damage.'
  },
  {
    act:'ACT 3',area:'The Venom Crypts',access:'Entrance near the Waypoint in Jungle Ruins',target:'The Slithering Dead / Servi',tag:'TAKE CLARITY',tone:'must',reward:'+25% Mana Regeneration Rate',
    how:'Find the Corpse-snake Venom inside the Venom Crypts, then return it to Servi.',
    take:'Choose Venom Draught of Clarity. This choice cannot be changed later.',
    why:'One of the strongest free permanent rewards for this build: more Mana refill and more Furious Wellspring Rage regeneration.'
  },
  {
    act:'ACT 3',area:'The Azak Bog',access:'Side zone connected from Infested Barrens',target:'Ignagduk, the Bog Witch',tag:'MUST GET',tone:'must',reward:'+30 Maximum Spirit',
    how:'Enter the Azak Bog, defeat Ignagduk, pick up the Gembloom Skull and consume it.',
    take:'Automatic Spirit reward.',
    why:'Takes the permanent Spirit total to +60 before the Interludes.'
  },
  {
    act:'ACT 4',area:'Eye of Hinekora',access:"Silent Hall → Navali's Rest",target:"Navali's Rest",tag:'HUGE FOR BUILD',tone:'hinekora',reward:'+5% increased Maximum Mana',
    how:"Explore the Eye of Hinekora until you reach the Silent Hall. Find Navali's Rest and choose ‘Pay Your Respects’.",
    take:'+5% maximum Mana. There is no competing reward here.',
    why:'Directly scales Mana Flare base damage, Archmage, Arcane Intensity, EB Mana and Rathpith-style Mana scaling.'
  },
  {
    act:'ACT 4',area:'Trial of the Ancestors',access:'After the Eye of Hinekora sequence',target:'Hinekora reward',tag:'MUST GET',tone:'hinekora',reward:'+2 Weapon Set Passive Skill Points',
    how:'Complete the Trial of the Ancestors and claim the Hinekora/Tattoo reward at the end of the trial.',
    take:'Tattoo of Hinekora / +2 Weapon Set passive points.',
    why:"Separate from Navali's Rest. Eye of Hinekora gives +5% max Mana; this trial gives passive points. Grab both."
  },
  {
    act:'ACT 4',area:'Abandoned Prison',access:'The Chapel',target:'Goddess of Justice',tag:'RECOMMENDED',tone:'good',reward:'+30% Mana Recovery from Flasks',
    how:'Kill monsters in the Abandoned Prison until the Chapel Key drops, open the Chapel, clear it and interact with the Goddess of Justice.',
    take:'Choose Mana Recovery from Flasks over Life Recovery for the Mana-overflow/refill version of this build.',
    why:'Strong for overflow, Runeseeker preparation and recovering the 25% current-Mana chunk consumed by each Flare.'
  },
  {
    act:'ACT 4',area:'Halls of the Dead',access:'Trial of Ngkanu',target:"Tasalio's Test",tag:'MIN-MAX CHOICE',tone:'choice',reward:'+5 Intelligence OR +5% Cold Resistance',
    how:"Complete Tasalio's portion of the Trial of Ngkanu and use the corresponding tattoo reward.",
    take:'+5 INT if resistances are solved; otherwise +5% Cold Resistance is usually the easier progression choice.',
    why:'INT gives a small permanent Mana gain. The resistance option can free a gear affix elsewhere.'
  },
  {
    act:'ACT 4',area:'Whakapanu Island',access:'Shark Pit',target:'Great White One',tag:'DEFENCE BRANCH',tone:'choice',reward:"Kaom's Lesson OR Rakiata's Lesson",
    how:'Kill the Great White One in the Shark Pit, take the Shark Fin and return it to Kaimana.',
    take:"Armour/ES Mana route: favour Rakiata's Lesson. Pure generic defence: compare Kaom's Lesson.",
    why:'Rakiata: 15% of Armour also applies to Elemental Damage plus the hybrid-defence package. Kaom: 30% increased global Armour/Evasion/ES.'
  },
  {
    act:'INTERLUDE',area:'Kriar Village',access:'Main Kriar Village zone',target:'Lythara, the Wayward Spear',tag:'MUST GET',tone:'must',reward:'+40 Maximum Spirit',
    how:'Find and defeat Lythara, pick up the Gemcrust Skull and consume it.',
    take:'Automatic Spirit reward.',
    why:'Completes the major permanent Spirit package: +30 King +30 Ignagduk +40 Lythara = +100 Spirit.'
  },
  {
    act:'INTERLUDE',area:'Qimah',access:'The Seven Pillars',target:'Choose a Pillar boon',tag:'SWAPPABLE',tone:'good',reward:'Swappable permanent boon',
    how:'Reach the Seven Pillars in Qimah and interact with the Pillar corresponding to the boon you want. Return later to change it.',
    take:'Early gearing: Tabana +5% all Elemental Resists. Mature engine: Halani +12% CDR. Armour defence: Ahkeli +15% Global Defences.',
    why:'Do not force Halani early. CDR is only damage when Mana recovery and Rage can feed the extra Flare windows.'
  }
];

const V40_NODES = [
  {tier:'S',stage:'EARLY / CORE',name:'Raw Mana',effect:'8% increased maximum Mana · 10% increased Mana Cost',why:'One of the cleanest direct resource multipliers. Mana is damage, Archmage gain, Rathpith scaling and defensive fuel.'},
  {tier:'S',stage:'CORE SCALING',name:'Arcane Intensity',effect:'3% increased Spell Damage per 100 maximum Mana',why:'Mandatory once Mana becomes large. At 5,000 Mana this is +150% increased Spell Damage; at 10,000 it is +300%.'},
  {tier:'S',stage:'TRIGGER DAMAGE',name:'Invocated Efficiency',effect:'Triggered Spells deal 40% increased Spell Damage · 10% Mana Cost Efficiency',why:'Mana Flare is triggered. This is unusually efficient damage for the actual payload rather than only the carrier spell.'},
  {tier:'A',stage:'CRIT PACKAGE',name:'Critical Overload',effect:'15% increased Spell Crit · 15% increased Critical Spell Damage Bonus',why:'A compact crit + CDB package. CDB becomes much more valuable once carrier and Flare crit rates are already reliable.'},
  {tier:'A',stage:'CRIT PACKAGE',name:'Shredding Force',effect:'15% increased Spell Crit · 15% increased Critical Spell Damage Bonus · crit ailment magnitude',why:'Another efficient mixed crit/CDB node. Particularly nice if Frost Darts or Entangle becomes meaningful native damage too.'},
  {tier:'A',stage:'CRIT / DEFENCE',name:'Controlling Magic',effect:'25% increased Spell Crit · enemy Hits have 25% reduced Crit Chance against you',why:'Good once trigger reliability is the limiter; unlike pure offence it also reduces incoming spike risk.'},
  {tier:'A',stage:'RECOVERY / HYBRID DEFENCE',name:'Lucidity',effect:'8% of Damage taken from Mana before Life · +15 Intelligence',why:'Excellent transition node when moving away from full MoM toward partial Mana-before-Life. INT also adds base Mana.'},
  {tier:'A',stage:'RECOVERY',name:'Mental Toughness',effect:'18% increased Mana Regen · 25% Mana Cost Efficiency while on Low Mana',why:'Recovery decides whether CDR is real DPS or just makes each successive Mana Flare weaker.'},
  {tier:'A',stage:'REMNANTS',name:'Arcane / Empowering Remnants + Remnant Attraction',effect:'Better Remnant reach, effect and collection reliability',why:'Do not judge these as tooltip DPS. Their value is keeping current Mana high enough for the next 25%-current-Mana Flare.'},
  {tier:'LATE',stage:'CDR',name:'Temporal Mastery',effect:'16% increased Cooldown Recovery Rate',why:'Excellent only after the build can refill Mana and sustain Rage quickly enough to use the extra trigger windows.'},
  {tier:'LATE',stage:'CDR',name:'Multitasking',effect:'12% increased CDR · 15% increased Skill Effect Duration',why:'Very attractive for persistent carriers, but same rule: buy recovery first if realised Flare/s is recovery-capped.'},
  {tier:'ASC',stage:'SHAMAN',name:'Furious Wellspring → Druidic Champion',effect:'Rage regeneration engine → 1% more Spell Damage per 2 Rage',why:'This is the Shaman damage engine. Keep Rage positive; extra Rage costs are bad if they stall Mana Flare.'},
  {tier:'ASC',stage:'SHAMAN / SPIRIT',name:'Sacred Flow',effect:'+40 Spirit per empty Charm slot',why:'A powerful reservation lever if Eternal Rage or another Spirit buff is worth more than filling every Charm slot.'},
  {tier:'ASC',stage:'SHAMAN / ENDGAME',name:'Wisdom of the Maji',effect:'Enables Bonded modifiers on Runes / Idols',why:'The weird-tech node. Treat it as a build-engine unlock rather than flat DPS.'}
];

function v40Css(){
  const s=document.createElement('style');
  s.textContent=`
  #v40ProgressionIntel{scroll-margin-top:90px}.v40Intro{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;margin-bottom:12px}.v40Intro p{margin:0;max-width:720px}
  .v40Rewards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.v40Reward{border:1px solid var(--line);border-radius:14px;padding:12px;background:linear-gradient(180deg,rgba(31,22,16,.98),rgba(18,13,10,.98));position:relative;overflow:hidden}.v40Reward:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(#5a88aa,#b89558);opacity:.75}.v40Reward.must{border-color:rgba(185,151,87,.48)}.v40Reward.good{border-color:rgba(123,166,174,.34)}.v40Reward.choice{border-color:rgba(144,123,178,.35)}.v40Reward.hinekora{border-color:rgba(89,158,194,.6);box-shadow:inset 0 0 28px rgba(37,105,145,.08)}
  .v40Top{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:5px}.v40Stage,.v40Tag,.v40Tier{font-size:7px;text-transform:uppercase;letter-spacing:.09em;border-radius:999px;padding:3px 6px;border:1px solid rgba(217,179,112,.28);color:#d7bd8a}.v40Tag{color:#9ec5cb;border-color:rgba(105,166,176,.32)}.v40Path{font-size:8px;letter-spacing:.07em;text-transform:uppercase;color:#91b9d3;margin-bottom:6px}.v40Reward h4,.v40Node h4{font-size:11px;margin:2px 0 4px;color:#f0e4cf}.v40RewardAmt{display:block;font-size:11px;color:#d9bd82;margin-bottom:7px}.v40Reward.hinekora .v40RewardAmt{color:#9ed7ff}.v40Line{display:grid;grid-template-columns:54px 1fr;gap:7px;margin-top:6px;font-size:8.8px;line-height:1.45}.v40Line b{color:#d9bd82;text-transform:uppercase;font-size:7px;letter-spacing:.07em}.v40Line span{color:#aaa08d}.v40Take{color:#d9e7d5!important}.v40Why{color:#9ea9b0!important}
  .v40Summary{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:10px 0 10px}.v40Summary div{border:1px solid var(--line);border-radius:11px;padding:9px;background:#15100c}.v40Summary b{font-size:15px;display:block;color:#ead8b9}.v40Summary span{font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#8f816d}.v40Quick{margin:0 0 16px;border:1px solid rgba(91,154,190,.32);border-radius:13px;background:rgba(15,27,34,.55);padding:11px;font-size:9px;line-height:1.5;color:#a9b8be}.v40Quick strong{color:#b9dff4}
  .v40Nodes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v40Node{border:1px solid var(--line);border-radius:13px;padding:11px;background:#19120e}.v40Node .v40Effect{font-size:8.6px;color:#d8c7aa;margin:5px 0}.v40Node p{font-size:8.8px;line-height:1.45;color:#a99c88;margin:0}.v40Tier.s{color:#f2cf83}.v40Tier.a{color:#a9d5c3}.v40Tier.late{color:#aab7db}.v40Tier.asc{color:#d0a8e0}.v40Find{margin-top:8px;border:1px solid rgba(217,179,112,.25);background:#100b08;color:#d9bd82;border-radius:8px;padding:6px 8px;font-size:8px;cursor:pointer}.v40Find:hover{border-color:#d9bd82;color:#fff0d1}
  .v40Order{margin-top:10px;padding:11px;border:1px solid rgba(217,179,112,.28);border-radius:13px;background:rgba(26,18,14,.92);font-size:9px;line-height:1.55;color:#b7aa96}.v40Order strong{color:#ead5af}
  @media(max-width:900px){.v40Rewards,.v40Nodes,.v40Summary{grid-template-columns:1fr}.v40Intro{display:block}.v40Line{grid-template-columns:48px 1fr}}
  `;
  document.head.appendChild(s);
}

function rewardCard(r){
  return `<article class="v40Reward ${r.tone}"><div class="v40Top"><span class="v40Stage">${r.act}</span><span class="v40Tag">${r.tag}</span></div><div class="v40Path">${r.area} → ${r.access}</div><h4>${r.target}</h4><strong class="v40RewardAmt">${r.reward}</strong><div class="v40Line"><b>DO THIS</b><span>${r.how}</span></div><div class="v40Line"><b>TAKE</b><span class="v40Take">${r.take}</span></div><div class="v40Line"><b>WHY</b><span class="v40Why">${r.why}</span></div></article>`;
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
    <div class="v40Intro"><div><h3>Campaign rewards to nab — exact Act + location</h3><p class="small">Use this as the campaign checklist. Every card tells you where the reward is, what to kill or interact with, which choice Mana Geyser wants, and why.</p></div></div>
    <div class="v40Summary"><div><b>+100</b><span>campaign Spirit to collect</span></div><div><b>+5%</b><span>permanent max Mana</span></div><div><b>+25%</b><span>permanent Mana regen</span></div><div><b>24</b><span>campaign passive points</span></div></div>
    <div class="v40Quick"><strong>Hinekora has TWO separate rewards you care about:</strong> <b>Eye of Hinekora → Navali's Rest = +5% maximum Mana.</b> Then <b>Trial of the Ancestors = +2 Weapon Set passive points.</b> Grab both.</div>
    <div class="v40Rewards">${V40_REWARDS.map(rewardCard).join('')}</div>
    <div class="v40Order"><strong>Fast route:</strong> Act 1 Freythorn Spirit → Act 3 Venom Crypts Clarity → Act 3 Azak Bog Spirit → Act 4 Eye of Hinekora +5% Mana → Trial of the Ancestors +2 points → Abandoned Prison Mana-flask recovery → Halls of the Dead Tasalio choice → Whakapanu defence blessing → Interlude Kriar Village +40 Spirit → Qimah boon.</div>
    <h3 style="margin-top:22px">Key nodes to nab</h3><p class="small">Build the engine in this order: Mana → trigger-specific damage → reliable crit/CDB → recovery → CDR. CDR before recovery is one of the easiest ways to make the tooltip look better while real sustained damage gets worse.</p>
    <div class="v40Nodes">${V40_NODES.map(n=>`<article class="v40Node"><div class="v40Top"><span class="v40Tier ${n.tier.toLowerCase()}">${n.tier}</span><span class="v40Stage">${n.stage}</span></div><h4>${n.name}</h4><div class="v40Effect">${n.effect}</div><p>${n.why}</p><button class="v40Find" onclick='v40OpenNode(${JSON.stringify(n.name)})'>Find in Planner</button></article>`).join('')}</div>
    <div class="v40Order"><strong>Practical node order:</strong> Raw Mana + Arcane Intensity → Invocated Efficiency → enough crit to saturate Mana Flare triggers → add CDB through Critical Overload / Shredding Force → solve recovery with regen/Remnants → only then take Temporal Mastery / Multitasking. Keep Furious Wellspring + Druidic Champion Rage-positive throughout.</div>`;

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
