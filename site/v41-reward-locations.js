(() => {
'use strict';

const REWARDS = [
  {
    act:'ACT 1', area:'Freythorn', access:'From Hunting Grounds',
    target:'The King in the Mists', reward:'+30 Maximum Spirit', tag:'MUST GET',
    how:'Complete the Freythorn encounter, kill the King in the Mists, pick up the Gembloom Skull at the altar and consume it.',
    take:'Automatic Spirit reward. Do not leave the skull sitting on the altar.',
    why:'First permanent Spirit breakpoint. It helps fund Archmage, Mana Remnants and later Eternal Rage experiments.'
  },
  {
    act:'ACT 3', area:'The Venom Crypts', access:'Entrance near the Waypoint in Jungle Ruins',
    target:'The Slithering Dead / Servi', reward:'+25% Mana Regeneration Rate', tag:'TAKE CLARITY',
    how:'Find the Corpse-snake Venom inside the Venom Crypts, then return it to Servi.',
    take:'Choose Venom Draught of Clarity. This choice cannot be changed later.',
    why:'One of the strongest free permanent rewards for this build: more Mana refill and more Furious Wellspring Rage regeneration.'
  },
  {
    act:'ACT 3', area:'The Azak Bog', access:'Side zone connected from Infested Barrens',
    target:'Ignagduk, the Bog Witch', reward:'+30 Maximum Spirit', tag:'MUST GET',
    how:'Enter the Azak Bog, defeat Ignagduk, pick up the Gembloom Skull and consume it.',
    take:'Automatic Spirit reward.',
    why:'Takes the campaign Spirit total to +60 before the Interludes.'
  },
  {
    act:'ACT 4', area:'Eye of Hinekora', access:'Silent Hall / Navali\'s Rest',
    target:'Navali\'s Rest', reward:'+5% increased Maximum Mana', tag:'HUGE FOR BUILD',
    how:'Explore the Eye of Hinekora until you reach the Silent Hall. Find Navali\'s Rest and choose “Pay Your Respects”.',
    take:'+5% maximum Mana. There is no competing reward here.',
    why:'This directly scales Mana Flare base damage, Archmage, Arcane Intensity, EB Mana and Rathpith-style Mana scaling.'
  },
  {
    act:'ACT 4', area:'Trial of the Ancestors', access:'After Yama the White / Eye of Hinekora sequence',
    target:'Hinekora reward', reward:'+2 Weapon Set Passive Skill Points', tag:'MUST GET',
    how:'Complete the Trial of the Ancestors and claim the Hinekora/Tattoo reward at the end of the trial.',
    take:'Tattoo of Hinekora / +2 Weapon Set passive points.',
    why:'Separate from Navali’s Rest. The Mana reward is +5% max Mana; this reward is the +2 passive-point reward.'
  },
  {
    act:'ACT 4', area:'Abandoned Prison', access:'The Chapel',
    target:'Goddess of Justice', reward:'+30% Mana Recovery from Flasks', tag:'RECOMMENDED',
    how:'Kill monsters in the Abandoned Prison until the Chapel Key drops, open the Chapel, clear it and interact with the Goddess of Justice.',
    take:'Choose Mana Recovery from Flasks over Life Recovery for this build. You can return and swap later.',
    why:'Strong for overflow, Runeseeker preparation and recovering the 25% current-Mana chunk consumed by each Flare.'
  },
  {
    act:'ACT 4', area:'Halls of the Dead', access:'Trial of Ngkanu',
    target:'Tasalio’s Test', reward:'+5 Intelligence OR +5% Cold Resistance', tag:'MIN-MAX CHOICE',
    how:'Complete Tasalio’s portion of the Trial of Ngkanu and use the corresponding tattoo reward.',
    take:'Take +5 INT if resistances are already solved; otherwise +5% Cold Resistance is the easier progression choice.',
    why:'INT gives a small permanent Mana gain. The resistance option can free an affix elsewhere.'
  },
  {
    act:'ACT 4', area:'Whakapanu Island', access:'Shark Pit',
    target:'Great White One', reward:'Kaom’s Lesson OR Rakiata’s Lesson', tag:'DEFENCE BRANCH',
    how:'Kill the Great White One in the Shark Pit, take the Shark Fin and return it to Kaimana.',
    take:'Armour/ES Mana build: favour Rakiata’s Lesson. Pure generic defence: compare Kaom’s Lesson.',
    why:'Rakiata: 15% of Armour also applies to Elemental Damage + Evasion→Deflection + faster ES recharge. Kaom: 30% increased global Armour/Evasion/ES.'
  },
  {
    act:'INTERLUDE', area:'Kriar Village', access:'Main Kriar Village zone',
    target:'Lythara, the Wayward Spear', reward:'+40 Maximum Spirit', tag:'MUST GET',
    how:'Find and defeat Lythara, pick up the Gemcrust Skull and consume it.',
    take:'Automatic Spirit reward.',
    why:'Completes the major permanent Spirit package: +30 King +30 Ignagduk +40 Lythara = +100 Spirit.'
  },
  {
    act:'INTERLUDE', area:'Qimah', access:'The Seven Pillars',
    target:'Choose a Pillar boon', reward:'Swappable permanent boon', tag:'SWAPPABLE',
    how:'Reach the Seven Pillars in Qimah and interact with the Pillar corresponding to the boon you want. Return later to change it.',
    take:'Early gearing: Tabana +5% all Elemental Resists. Mature engine: Halani +12% CDR. Armour defence: Ahkeli +15% Global Defences.',
    why:'Do not force Halani early. CDR is only damage when Mana recovery and Rage can actually feed the extra Flare windows.'
  }
];

function css(){
 const s=document.createElement('style');
 s.textContent=`
 #v40ProgressionIntel .v40Rewards{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
 .v41Reward{border:1px solid var(--line);border-radius:14px;padding:12px;background:linear-gradient(180deg,rgba(31,22,16,.98),rgba(18,13,10,.98));position:relative;overflow:hidden}
 .v41Reward:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(#5a88aa,#b89558);opacity:.85}
 .v41Path{font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#91b9d3;margin-bottom:5px}.v41Target{font-size:12px;color:#f0e4cf;margin:0 0 4px}.v41RewardAmt{font-size:11px;color:#e0c287;font-weight:700;margin-bottom:8px}.v41Badge{display:inline-block;font-size:7px;letter-spacing:.08em;text-transform:uppercase;padding:3px 6px;border:1px solid rgba(101,158,190,.35);border-radius:999px;color:#abd0e7;margin-left:6px}
 .v41Line{display:grid;grid-template-columns:54px 1fr;gap:7px;margin-top:6px;font-size:8.8px;line-height:1.45}.v41Line b{color:#d9bd82;text-transform:uppercase;font-size:7px;letter-spacing:.07em}.v41Line span{color:#aaa08d}.v41Take{color:#d9e7d5!important}.v41Why{color:#9ea9b0!important}
 .v41Hinekora{border-color:rgba(89,158,194,.6);box-shadow:inset 0 0 28px rgba(37,105,145,.08)}
 .v41Hinekora .v41RewardAmt{color:#9ed7ff}
 .v41Quick{margin:12px 0 16px;border:1px solid rgba(91,154,190,.32);border-radius:13px;background:rgba(15,27,34,.55);padding:11px;font-size:9px;line-height:1.5;color:#a9b8be}.v41Quick strong{color:#b9dff4}
 @media(max-width:900px){#v40ProgressionIntel .v40Rewards{grid-template-columns:1fr}.v41Line{grid-template-columns:48px 1fr}}
 `;
 document.head.appendChild(s);
}

function renderCard(r){
 const special=/Eye of Hinekora|Trial of the Ancestors/.test(r.area)?' v41Hinekora':'';
 return `<article class="v41Reward${special}">
  <div class="v41Path">${r.act} → ${r.area} → ${r.access}<span class="v41Badge">${r.tag}</span></div>
  <h4 class="v41Target">${r.target}</h4>
  <div class="v41RewardAmt">${r.reward}</div>
  <div class="v41Line"><b>DO THIS</b><span>${r.how}</span></div>
  <div class="v41Line"><b>TAKE</b><span class="v41Take">${r.take}</span></div>
  <div class="v41Line"><b>WHY</b><span class="v41Why">${r.why}</span></div>
 </article>`;
}

function upgrade(){
 const host=document.getElementById('v40ProgressionIntel');
 if(!host){setTimeout(upgrade,250);return;}
 if(host.dataset.v41==='1')return;
 host.dataset.v41='1';
 const intro=host.querySelector('.v40Intro');
 if(intro) intro.innerHTML=`<div><h3>Campaign rewards to nab — exact Act + location</h3><p class="small">Use this as the campaign checklist. Every card tells you where the reward is, what to interact with or kill, and which choice Mana Geyser wants.</p></div>`;
 const summary=host.querySelector('.v40Summary');
 if(summary) summary.insertAdjacentHTML('afterend',`<div class="v41Quick"><strong>Hinekora has TWO separate things you care about:</strong> <b>Eye of Hinekora → Navali's Rest = +5% maximum Mana.</b> Then <b>Trial of the Ancestors = +2 Weapon Set passive points.</b> Grab both.</div>`);
 const grid=host.querySelector('.v40Rewards');
 if(grid) grid.innerHTML=REWARDS.map(renderCard).join('');
 const firstOrder=host.querySelector('.v40Order');
 if(firstOrder) firstOrder.innerHTML=`<strong>Fast route:</strong> Act 1 Freythorn Spirit → Act 3 Venom Crypts Clarity → Act 3 Azak Bog Spirit → Act 4 Eye of Hinekora +5% Mana → Trial of the Ancestors +2 points → Abandoned Prison Mana-flask recovery → Halls of the Dead Tasalio choice → Whakapanu defence blessing → Interlude Kriar Village +40 Spirit → Qimah boon.`;
}

function init(){css();upgrade();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900));else setTimeout(init,900);
})();
