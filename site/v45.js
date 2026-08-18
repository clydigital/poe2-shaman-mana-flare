(() => {
'use strict';
const $=id=>document.getElementById(id);
const PROFILE='https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy';
let allocated=new Set();

const bumpSpellCrit=(c,m)=>{
  c.carrierCrit=Math.min(.99,(c.carrierCrit??c.crit??0)*m);
  c.flareCrit=Math.min(.99,(c.flareCrit??c.crit??0)*m);
};

const ANOINTS=[
  {
    name:'Dynamism',
    liquids:['Concentrated Liquid Isolation','Diluted Liquid Greed','Diluted Liquid Ire'],
    effect:'40% increased Damage if you have Triggered a Skill Recently.',
    apply:c=>{c.inc+=.40}
  },
  {
    name:'Controlling Magic',
    liquids:['Liquid Envy','Concentrated Liquid Fear','Concentrated Liquid Isolation'],
    effect:'25% increased Critical Hit Chance for Spells; improves both carrier trigger reliability and Mana Flare crit chance.',
    apply:c=>bumpSpellCrit(c,1.25)
  },
  {
    name:'Shredding Force',
    liquids:['Diluted Liquid Guilt','Concentrated Liquid Isolation','Diluted Liquid Greed'],
    effect:'15% Spell Critical Hit Chance + 15% Critical Spell Damage Bonus.',
    apply:c=>{bumpSpellCrit(c,1.15);c.cdb+=.15}
  },
  {
    name:'Desensitisation',
    liquids:['Liquid Envy','Concentrated Liquid Suffering','Diluted Liquid Greed'],
    effect:'+25% Critical Damage Bonus; raises payload damage but does not create more trigger opportunities.',
    apply:c=>{c.cdb+=.25}
  },
  {
    name:'Throatseeker',
    liquids:['Diluted Liquid Greed','Liquid Envy','Concentrated Liquid Isolation'],
    effect:'+60% Critical Damage Bonus, but 20% reduced Critical Hit Chance. The crit penalty affects both trigger and payload sides.',
    apply:c=>{bumpSpellCrit(c,.80);c.cdb+=.60}
  }
];

const clone=o=>({...o});
function resultFor(a){
  if(!window.v44GetCfg||!window.v44Model)return null;
  const cfg=window.v44GetCfg(),base=window.v44Model(cfg),postCfg=clone(cfg);a.apply(postCfg);const post=window.v44Model(postCfg);
  return{base,post,gain:(post.dps/base.dps-1)*100,hit:(post.hit/base.hit-1)*100}
}
function combined(list){
  if(!window.v44GetCfg||!window.v44Model)return null;
  const cfg=clone(window.v44GetCfg()),base=window.v44Model(cfg);list.forEach(x=>x.apply(cfg));const post=window.v44Model(cfg);
  return{gain:(post.dps/base.dps-1)*100,hit:(post.hit/base.hit-1)*100}
}
function renderAnoints(){
  const host=$('frontAnointTable');if(!host)return;
  const rows=ANOINTS.map(a=>({a,r:resultFor(a)})).filter(x=>x.r).sort((x,y)=>y.r.gain-x.r.gain);
  const viable=rows.filter(x=>!allocated.has(x.a.name));
  const top=viable.slice(0,4).map(x=>x.a),combo=combined(top);
  if($('frontAnointCombo'))$('frontAnointCombo').textContent=combo?`+${combo.gain.toFixed(1)}% model DPS`:'—';
  if($('frontAnointNames'))$('frontAnointNames').textContent=top.map(x=>x.name).join(' · ');
  host.innerHTML=`<table><thead><tr><th>#</th><th>Notable</th><th>Liquid Emotions — use these exact tiers</th><th>Expected DPS Δ</th><th>Expected hit Δ</th><th>Why</th></tr></thead><tbody>${rows.map(({a,r},i)=>{
    const onTree=allocated.has(a.name);
    return `<tr><td>${i+1}</td><td><b>${a.name}</b>${onTree?' <span class="anointAllocated">TREE — SKIP ON AMULET</span>':''}</td><td><div class="liquidStack">${a.liquids.map(x=>`<i>${x}</i>`).join('')}</div></td><td><span class="anointGain">+${r.gain.toFixed(2)}%</span></td><td>+${r.hit.toFixed(2)}%</td><td>${a.effect}</td></tr>`
  }).join('')}</tbody></table>`;
}

const PROMPT=`Update the Mana Geyser Shaman calculator with the latest information on ${PROFILE}. Read the current poe.ninja character snapshot and compare it with the guide baseline. Update Maximum Mana, Intelligence, Life, Armour, Evasion if exposed, Spirit, Runic Ward, elemental/chaos resistances, Frost Darts / Entangle / Orb of Storms carrier critical chance and Critical Damage Bonus where exposed, allocated key passives, Mana regeneration/recovery inputs, and any changed gear that materially affects Mana Flare DPS or sustainable Mana recovery. Keep carrier crit separate from Mana Flare's own 7% base critical chance. Re-estimate Mana Flare crit only from generic spell/global crit modifiers when possible; do not blindly copy Frost Darts crit to Mana Flare. Keep poe.ninja as the canonical character snapshot. Do not guess fields poe.ninja does not expose; label those as unavailable or preserved from the last verified snapshot. Recalculate the compact DPS + Mana Recovery calculator, the three throughput caps (cooldown, trigger saturation, recovery), and the Strugglescream DPS ranking after the update.`;

window.v45ChatRefresh=async()=>{
  const status=$('chatRefreshStatus');
  try{await navigator.clipboard.writeText(PROMPT);if(status)status.textContent='Prompt copied'}catch(e){if(status)status.textContent='Opening ChatGPT'}
  window.open(`https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}`,'_blank','noopener')
};

fetch(`./data/character.json?t=${Date.now()}`,{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{
  allocated=new Set(d?.knownNodes||[]);renderAnoints()
}).catch(()=>renderAnoints());
window.addEventListener('v44calc',renderAnoints);
renderAnoints();
})();
