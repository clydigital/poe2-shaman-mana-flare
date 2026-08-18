(() => {
'use strict';
const $=id=>document.getElementById(id);
const PROFILE='https://poe.ninja/poe2/profile/DaSilkRoad-5508/runesofaldur/character/ToaBBMcy';
let allocated=new Set();

const bumpSpellCrit=(c,m)=>{
  c.carrierCrit=Math.min(.99,(c.carrierCrit??c.crit??0)*m);
  c.flareCrit=Math.min(.99,(c.flareCrit??c.crit??0)*m);
};

function addCalcLabel(afterId,id,label,value,attrs=''){
  if($(id))return $(id);
  const after=$(afterId)?.closest('label'); if(!after)return null;
  const lab=document.createElement('label');
  lab.innerHTML=`${label}<input id="${id}" type="number" value="${value}" ${attrs}>`;
  after.insertAdjacentElement('afterend',lab);
  return $(id);
}
function relabel(id,text,micro){
  const input=$(id),lab=input?.closest('label'); if(!lab)return;
  const first=[...lab.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
  if(first)first.nodeValue=text+' '; else lab.insertBefore(document.createTextNode(text+' '),input);
  if(micro&&!lab.querySelector('.calcMicro')){
    const s=document.createElement('small');s.className='calcMicro';s.textContent=micro;lab.insertBefore(s,input);
  }
}
function addStat(beforeId,id,label){
  if($(id))return;
  const before=$(beforeId)?.closest('div'); if(!before)return;
  const d=document.createElement('div');d.innerHTML=`<span>${label}</span><b id="${id}">—</b>`;before.insertAdjacentElement('beforebegin',d);
}
function upgradeCalc(){
  relabel('cCrit','Carrier crit %','triggers Mana Flare');
  relabel('cCdb','CDB %','Mana Flare payload only');
  const carrier=+($('cCrit')?.value||42);
  addCalcLabel('cCrit','cCarrierHits','Eligible carrier hits / sec <small class="calcMicro">single-target estimate</small>',4,'min="0" step="0.1"');
  addCalcLabel('cCarrierHits','cFlareCrit','Mana Flare crit % <small class="calcMicro">7% base before modifiers</small>',Math.max(0,Math.min(99,Math.round(carrier*7/13))),'min="0" max="99"');
  addCalcLabel('cRecoveryRate','cLeech','Mana leech recovery / sec <small class="calcMicro">manual · attack-leech experiment only</small>',0,'min="0"');
  addStat('oFlask','oRecNeed','Recovery needed @ CDR cap');
  addStat('oFlask','oTrigger','Trigger-limited Flare/s');
  addStat('oFlask','oSat','Trigger saturation');
  addStat('oFlask','oHits95','Hits/s for 95% saturation');
  addStat('oFlask','oLeech','Mana leech recovery/s');
  const note=document.querySelector('.calcNote');
  if(note)note.textContent="Transparent comparison model, not PoB. Carrier crit/hit rate controls trigger saturation; Mana Flare has its own 7% base crit and CDB only affects the payload. Realised Flare/s is capped by cooldown, trigger saturation and Mana recovery. Put Remnants/recoup in Other Recovery. Mana leech stays at 0 unless a real attack-based leech side-engine exists.";
  ['cCarrierHits','cFlareCrit','cLeech'].forEach(id=>$(id)?.addEventListener('input',()=>window.v44RenderCalc?.()));
  window.v44RenderCalc?.();
}

function cardByTitle(sectionId,title){
  return [...document.querySelectorAll(`#${sectionId} .card`)].find(c=>c.querySelector('h3')?.textContent.trim()===title);
}
function upgradeTips(){
  const r=cardByTitle('tricks','Ruinic Helm is a conversion trick');
  if(r)r.innerHTML='<h3>Ruinic vs Spectral Ward</h3><p>Armour is easier on the current character, but Spectral Ward can return more EB Mana if Body Item Evasion is more than 1.5× Helmet Item Armour. Compare the actual items, not the node text in isolation.</p>';
  const c=cardByTitle('tricks','CDR can be fake damage');
  if(c)c.innerHTML='<h3>Smooth Flare ladder</h3><p>Carrier crit + hit rate fills the trigger window; recovery refills the 25%-current-Mana spend; CDR raises the ceiling. CDB only enlarges the Flare itself. Buy whichever layer the calculator labels as the bottleneck.</p>';
}

function upgradeDamageResearch(){
  const sec=$('rDamage'); if(!sec||sec.dataset.v46)return;sec.dataset.v46='1';
  sec.innerHTML=`<div class="kicker">DAMAGE + CRIT</div><h2>Trigger crit and Mana-Flare crit are two different jobs</h2>
  <div class="grid3">
    <article class="card accentBlue"><h3>Carrier crit → frequency</h3><p>Mana Flare triggers when the <strong>supported carrier</strong> crits. Frost Darts has 13% base crit; Entangle and Orb of Storms have 10%. More carrier crit and more eligible hits raise the chance that a crit is waiting when Flare finishes its cooldown.</p></article>
    <article class="card"><h3>Flare crit → payload</h3><p>Mana Flare is its own triggered spell with <strong>7% base crit</strong>. Do not copy Frost Darts' displayed crit into the payload. Generic spell/global crit can scale both, but carrier-specific support effects can make the two values diverge.</p></article>
    <article class="card"><h3>CDB → payload only</h3><p>Critical Damage Bonus only matters when <strong>Mana Flare itself</strong> crits. It does not make Mana Flare trigger more often. Once trigger saturation and recovery are healthy, CDB becomes a clean way to enlarge each proc.</p></article>
  </div>
  <div class="formula">Cooldown ceiling = 1 + increased Cooldown Recovery
Cooldown window = 1 / Cooldown ceiling
Trigger saturation ≈ 1 − (1 − carrierCrit)^(eligibleHitsPerSecond × cooldownWindow)
Trigger-limited Flare/s ≈ Cooldown ceiling × Trigger saturation
Recovery-limited Flare/s = total Mana recovery/s ÷ (0.25 × current Mana)
Realised Flare/s ≈ min(trigger-limited Flare/s, recovery-limited Flare/s)

Expected Flare crit factor = 1 + ManaFlareCrit × CDB</div>
  <div class="callout"><strong>Smoother-play rule:</strong> first get enough carrier crit/hits to approach 95% trigger saturation, then enough recovery to feed the cooldown ceiling, then buy more CDR. CDB is a hit-size stat, not a smoothing stat.</div>`;
}
function upgradeTriggerResearch(){
  const sec=$('rTrigger');if(!sec)return;
  const f=sec.querySelector('.formula');
  if(f)f.textContent=`P(at least one carrier crit in a cooldown window) = 1 − (1 − carrierCrit)^(eligibleHitEventsPerSecond × cooldownSeconds)
At 42% carrier crit and 4 eligible events in a 1s window ≈ 88.7%
At 8 events ≈ 98.7%

The calculator converts this into a trigger-limited Flare/s ceiling and shows the eligible hits/s needed for 95% saturation at your current CDR.`;
  const call=sec.querySelector('.callout');
  if(call)call.innerHTML='<strong>BRRR recipe:</strong> carrier hit-rate + crit saturation → enough recovery to refill the next 25%-current-Mana cost → CDR. Once trigger saturation is high, extra carrier hits stop being a useful Mana-Flare stat.';
}
function upgradeLeechResearch(){
  const sec=$('rRegen');if(!sec||sec.querySelector('.manaLeechResearch'))return;
  const d=document.createElement('div');d.className='deepGrid manaLeechResearch';d.style.marginTop='12px';
  d.innerHTML=`<article class="deepCard"><h3>Mana leech: not a default spell engine</h3><p>The Mana Leech support is an <b>Attack / Physical</b> support and leeches 8% of Physical Attack Damage as Mana. A qualifying hit is treated as no more than 40,000 damage for leech calculation, monsters have level-based Leech Resistance, and only one Mana-leech instance recovers at a time.</p></article>
  <article class="deepCard highlightBlue"><h3>How it enters the calculator</h3><p>The <b>Mana leech recovery / sec</b> field is manual and defaults to zero. Only fill it when the character really has an attack-based leech side-engine. Oisín's Oath can change which damage types existing Mana Leech is based on; it does not by itself turn Mana Flare or an ordinary spell into a leech source.</p></article>`;
  sec.appendChild(d);
}
function upgradeDefenceResearch(){
  const sec=$('rDefence');if(!sec||sec.querySelector('.armourEvasionResearch'))return;
  const wrap=document.createElement('div');wrap.className='armourEvasionResearch';
  wrap.innerHTML=`<h3 class="subhead">Armour or Evasion — which is easier here?</h3>
  <div class="grid2"><article class="card accentBlue"><h3>Current lean: Armour</h3><p>The deployed snapshot already reports <b><span id="routeArmourNow">2,487</span> Armour</b><span id="routeEvasionText"></span>, so Armour/ES asks for less of a rebuild right now. Physical mitigation also helps preserve the current-Mana pool when damage is taken from Mana before Life, while Rakiata / Tempered Defences can make part of Armour apply to elemental damage.</p></article>
  <article class="card"><h3>Evasion's upside: body-slot recycling</h3><p>Spectral Ward grants +1 maximum ES per 12 <b>Item Evasion on the body armour</b>. Ruinic Helm grants +1 maximum ES per 8 <b>Item Armour on the helmet</b>. Because the body slot can carry far more rating, Spectral Ward can win the EB-Mana conversion despite its weaker ratio.</p></article></div>
  <div class="formula">Ruinic Helm extra ES = Helmet Item Armour ÷ 8
Spectral Ward extra ES = Body Item Evasion ÷ 12

Spectral Ward beats Ruinic Helm on extra ES/Mana when:
Body Item Evasion > 1.5 × Helmet Item Armour</div>
  <div class="tableWrap" style="margin-top:12px"><table><thead><tr><th>Route</th><th>Node candidates</th><th>Why they fit</th><th>Current grade</th></tr></thead><tbody>
    <tr><td><b>Armour / ES</b></td><td>Ruinic Helm · Ancient Aegis · Spiral into Depression · Sturdy Metal · Tempered Defences</td><td>Recycles Armour into EB Mana, scales Armour/ES body values, and can extend Armour into elemental mitigation.</td><td><span class="tier s">EASIER NOW</span></td></tr>
    <tr><td><b>Evasion / ES</b></td><td>Spectral Ward · Beastial Skin · Mindful Awareness / Inner Faith · Enhanced Reflexes · Knight of Chitus</td><td>Large body Evasion can become extra ES/Mana; Deflection conversions make Evasion useful against hits that would otherwise drain current Mana.</td><td><span class="tier test">SWAP TEST</span></td></tr>
    <tr><td><b>Pure ES</b></td><td>Dampening Shield · Heavy Buffer · high-ES item scaling</td><td>Still the cleanest raw EB-Mana ceiling, but gives up the extra mitigation/avoidance layer.</td><td><span class="tier a">MAX MANA</span></td></tr>
  </tbody></table></div>
  <div class="callout"><strong>Decision rule:</strong> stay Armour-first while it is already on the character. Test Evasion/ES only when a body piece is strong enough that Spectral Ward's body-slot conversion clearly beats the Armour alternative after lost ES, resistances and travel points are counted. Tree-distance is not scored here yet.</div>`;
  sec.appendChild(wrap);
}
function upgradeSources(){
  const list=document.querySelector('#rSources .sourceList');if(!list)return;
  const sources=[
    ['https://poe2db.tw/us/Mana_Leech','PoE2DB — Mana Leech','Attack-only support restriction, 8% Physical Attack Damage leech, one-instance rule and 40k hit cap.'],
    ['https://poe2db.tw/Frost_Darts','PoE2DB — Frost Darts','13% base carrier crit and multi-projectile trigger context.'],
    ['https://poe2db.tw/us/Entangle','PoE2DB — Entangle','10% base carrier crit.'],
    ['https://poe2db.tw/Orb_of_Storms','PoE2DB — Orb of Storms','10% base carrier crit and repeated-hit behaviour.'],
    ['https://poe2db.tw/Ruinic_Helm','PoE2DB — Ruinic Helm','+1 maximum ES per 8 Item Armour on equipped Helmet.'],
    ['https://poe2db.tw/us/Spectral_Ward','PoE2DB — Spectral Ward','+1 maximum ES per 12 Item Evasion on equipped Body Armour.']
  ];
  sources.forEach(([href,title,small])=>{
    if([...list.querySelectorAll('a')].some(a=>a.href===href))return;
    const a=document.createElement('a');a.href=href;a.target='_blank';a.innerHTML=`${title}<small>${small}</small>`;list.appendChild(a);
  });
}
function upgradeNodeCatalogue(){
  const D=window.MANA_GEYSER_V44;if(!D?.nodes)return;
  const rows=[
    ['Ancient Aegis','60% increased Armour from Equipped Body Armour; 60% increased Energy Shield from Equipped Body Armour.','Defence','A','Verified'],
    ['Spiral into Depression','25% increased Armour; 25% increased maximum Energy Shield.','Defence','A','Verified'],
    ['Sturdy Metal','80% increased Armour from Equipped Body Armour.','Defence','B','Verified'],
    ['Tempered Defences','25% increased Armour; +15% of Armour also applies to Elemental Damage.','Defence','A','Verified'],
    ['Beastial Skin','100% increased Evasion Rating from Equipped Body Armour.','Defence','A','Verified'],
    ['Mindful Awareness','24% increased Evasion Rating; 24% increased maximum Energy Shield.','Defence','A','Verified'],
    ['Inner Faith','20% increased Evasion Rating; 20% increased maximum Energy Shield; 25% reduced effect of Curses on you.','Defence','A','Verified'],
    ['Enhanced Reflexes','20% increased Evasion Rating; gain Deflection Rating equal to 5% of Evasion Rating; 8% increased Dexterity.','Defence','A','Verified'],
    ['Knight of Chitus','Gain Deflection Rating equal to 12% of Evasion Rating; 15% increased Block chance.','Defence','B','Verified'],
    ['Suffusion','30% increased amount of Mana Leeched; unaffected by Chill while Leeching Mana. Requires an actual Mana-leech source.','Recovery','NICHE','Verified'],
    ['Siphon','Recover 2% of maximum Mana on Kill; 25% increased amount of Mana Leeched.','Recovery','NICHE','Verified'],
    ['Manifold Method','50% increased amount of Mana Leeched. Dead unless the build has a qualifying Mana-leech source.','Recovery','NICHE','Verified'],
    ['Walker of the Wilds','Mana Leech recovers based on Elemental Damage Types instead of Physical Damage. Does not itself grant Mana Leech.','Recovery','TEST','Verified']
  ];
  rows.forEach(r=>{if(!D.nodes.some(x=>x[0]===r[0]))D.nodes.push(r)});
  $('nodeSearch')?.dispatchEvent(new Event('input',{bubbles:true}));
}

function installV46(){
  upgradeCalc();upgradeTips();upgradeDamageResearch();upgradeTriggerResearch();upgradeLeechResearch();upgradeDefenceResearch();upgradeSources();upgradeNodeCatalogue();
}
installV46();

const ANOINTS=[
  {name:'Dynamism',liquids:['Concentrated Liquid Isolation','Diluted Liquid Greed','Diluted Liquid Ire'],effect:'40% increased Damage if you have Triggered a Skill Recently.',apply:c=>{c.inc+=.40}},
  {name:'Controlling Magic',liquids:['Liquid Envy','Concentrated Liquid Fear','Concentrated Liquid Isolation'],effect:'25% increased Critical Hit Chance for Spells; improves both carrier trigger reliability and Mana Flare crit chance.',apply:c=>bumpSpellCrit(c,1.25)},
  {name:'Shredding Force',liquids:['Diluted Liquid Guilt','Concentrated Liquid Isolation','Diluted Liquid Greed'],effect:'15% Spell Critical Hit Chance + 15% Critical Spell Damage Bonus.',apply:c=>{bumpSpellCrit(c,1.15);c.cdb+=.15}},
  {name:'Desensitisation',liquids:['Liquid Envy','Concentrated Liquid Suffering','Diluted Liquid Greed'],effect:'+25% Critical Damage Bonus; raises payload damage but does not create more trigger opportunities.',apply:c=>{c.cdb+=.25}},
  {name:'Throatseeker',liquids:['Diluted Liquid Greed','Liquid Envy','Concentrated Liquid Isolation'],effect:'+60% Critical Damage Bonus, but 20% reduced Critical Hit Chance. The crit penalty affects both trigger and payload sides.',apply:c=>{bumpSpellCrit(c,.80);c.cdb+=.60}}
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
  allocated=new Set(d?.knownNodes||[]);
  if($('routeArmourNow')&&d?.armour!=null)$('routeArmourNow').textContent=Number(d.armour).toLocaleString();
  if($('routeEvasionText'))$('routeEvasionText').textContent=d?.evasion!=null?` versus ${Number(d.evasion).toLocaleString()} Evasion`:' and no comparable Evasion number';
  if($('cFlareCrit')&&d?.crit?.frostDarts?.chance!=null)$('cFlareCrit').value=Math.round(Math.min(.99,d.crit.frostDarts.chance*(7/13))*100);
  window.v44RenderCalc?.();
  renderAnoints()
}).catch(()=>renderAnoints());
window.addEventListener('v44calc',renderAnoints);
renderAnoints();
})();
