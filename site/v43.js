(() => {
'use strict';
const $=id=>document.getElementById(id);
const n=(id,f=0)=>{const v=+($(id)?.value);return Number.isFinite(v)?v:f};
const fmt=x=>Math.round(x).toLocaleString();
const knownAllocated=new Set(['Raw Mana','Arcane Intensity','Invocated Efficiency']);

function readCfg(){return{
 mana:n('cMana',2497),currentPct:n('cCurrent',90)/100,regenInc:n('cRegen',89)/100,otherRecovery:n('cOtherRec',0),cdr:n('cCdr',0)/100,
 crit:n('cCrit',42)/100,cdb:n('cCdb',191)/100,otherInc:n('cInc',0)/100,rage:n('cRage',43),arch:$('cArch').checked,arcane:$('cArcane').checked,
 invoc:$('cInvoc').checked,druid:$('cDruid').checked,mom:$('cMom').checked,rath:$('cRath').checked,recoveryRate:0
}}
function model(c){
 const M=Math.max(1,c.mana), current=Math.max(1,M*c.currentPct), fire=.25*current, archRatio=c.arch?.0004*M:0, raw=fire*(1+archRatio);
 let inc=c.otherInc+(c.arcane?.0003*M:0)+(c.invoc?.40:0)+(c.rath?.0006*M:0);
 const crit=Math.min(.99,Math.max(0,c.crit)), cdb=Math.max(0,c.cdb), critFactor=1+crit*cdb, druid=c.druid?1+Math.floor(Math.max(0,c.rage)/2)/100:1;
 const hit=raw*(1+inc)*critFactor*druid, theo=1+Math.max(0,c.cdr);
 const regenRaw=.04*M*Math.max(0,1+c.regenInc), totalRaw=regenRaw+Math.max(0,c.otherRecovery), recovery=(totalRaw*(1+Math.max(-.95,c.recoveryRate)))*(c.mom?.5:1);
 const regenEff=regenRaw*(1+Math.max(-.95,c.recoveryRate))*(c.mom?.5:1), need=.25*current, sustain=recovery/Math.max(1,need), realised=Math.max(0,Math.min(theo,sustain)), dps=hit*realised;
 return{M,current,fire,raw,inc,critFactor,druid,hit,theo,regenEff,recovery,need,sustain,realised,dps};
}
function renderCalc(){const r=model(readCfg());$('oBase').textContent=fmt(r.fire);$('oHit').textContent=fmt(r.hit);$('oTheo').textContent=r.theo.toFixed(2);$('oReal').textContent=r.realised.toFixed(2);$('oRegen').textContent=fmt(r.regenEff);$('oRecovery').textContent=fmt(r.recovery);$('oNeed').textContent=fmt(r.need);$('oDps').textContent=fmt(r.dps);renderInstils()}

const instils=[
 {name:'Dynamism',note:'40% increased Damage after triggering.',apply:c=>c.otherInc+=.40},
 {name:'Critical Overload',note:'15% increased Spell Crit + 15% CDB. Crit effect is approximated from current final crit.',apply:c=>{c.crit=Math.min(.99,c.crit*1.15);c.cdb+=.15}},
 {name:'Shredding Force',note:'15% increased Spell Crit + 15% CDB.',apply:c=>{c.crit=Math.min(.99,c.crit*1.15);c.cdb+=.15}},
 {name:'Controlling Magic',note:'25% increased Spell Crit; defensive anti-crit not priced into DPS.',apply:c=>c.crit=Math.min(.99,c.crit*1.25)},
 {name:'Desensitisation',note:'+25% Critical Damage Bonus.',apply:c=>c.cdb+=.25},
 {name:'Temporal Mastery',note:'16% CDR; can be zero-value when recovery is the cap.',apply:c=>c.cdr+=.16},
 {name:'Multitasking',note:'12% CDR plus duration; duration value is outside Flare DPS.',apply:c=>c.cdr+=.12},
 {name:'Volatile Catalyst',note:'10% CDR plus AoE.',apply:c=>c.cdr+=.10},
 {name:'Mental Toughness',note:'18% Mana Regen; Low-Mana cost efficiency excluded.',apply:c=>c.regenInc+=.18},
 {name:'Conservative Casting',note:'20% Mana Regen; cost efficiency excluded.',apply:c=>c.regenInc+=.20},
 {name:'Arcane Blossom',note:'15% Mana Recovery rate.',apply:c=>c.recoveryRate+=.15},
 {name:'Raw Mana',note:'8% max Mana. Raw standalone approximation; already allocated on current tree.',apply:c=>c.mana*=1.08},
 {name:'Arcane Intensity',note:'3% Spell Damage per 100 max Mana. Already allocated; raw standalone value shown.',apply:c=>{if(!c.arcane)c.arcane=true;else c.otherInc+=.0003*c.mana}},
 {name:'Invocated Efficiency',note:'40% increased Triggered Spell Damage. Already allocated; raw standalone value shown.',apply:c=>{if(!c.invoc)c.invoc=true;else c.otherInc+=.40}}
];
let chosen=[];
function cloneCfg(c){return{...c}}
function singleResult(item){const baseCfg=readCfg(),base=model(baseCfg),postCfg=cloneCfg(baseCfg);item.apply(postCfg);const post=model(postCfg);return{base,post,gain:(post.dps/base.dps-1)*100,hit:(post.hit/base.hit-1)*100,recovery:(post.recovery/base.recovery-1)*100}}
function combined(names){const cfg=cloneCfg(readCfg()),base=model(cfg);names.forEach(name=>instils.find(x=>x.name===name)?.apply(cfg));const post=model(cfg);return{base,post,gain:(post.dps/base.dps-1)*100}}
function toggleInstil(name){if(knownAllocated.has(name))return;if(chosen.includes(name))chosen=chosen.filter(x=>x!==name);else if(chosen.length<4)chosen.push(name);renderInstils()}
window.v43ToggleInstil=toggleInstil;
window.v43BestFour=()=>{chosen=instils.filter(x=>!knownAllocated.has(x.name)).map(x=>({x,r:singleResult(x)})).sort((a,b)=>b.r.gain-a.r.gain).slice(0,4).map(x=>x.x.name);renderInstils()};
window.v43ClearInstils=()=>{chosen=[];renderInstils()};
function renderInstils(){const host=$('instilTable');if(!host)return;const rows=instils.map(x=>({x,r:singleResult(x)})).sort((a,b)=>b.r.gain-a.r.gain);const combo=combined(chosen);host.innerHTML=`<div style="padding:10px;display:flex;gap:7px;align-items:center;flex-wrap:wrap"><b style="font-size:10px">Strugglescream slots: ${chosen.length}/4</b><button onclick="v43BestFour()" class="miniBtn">Select best 4</button><button onclick="v43ClearInstils()" class="miniBtn">Clear</button>${chosen.length?`<span style="font-size:9px;color:#9fcbe3">Combined selected forecast: +${combo.gain.toFixed(2)}% model DPS</span>`:''}</div><table><thead><tr><th>Use</th><th>Instil</th><th>Raw DPS contribution</th><th>Hit Δ</th><th>Recovery Δ</th><th>Comment</th></tr></thead><tbody>${rows.map(({x,r})=>{const allocated=knownAllocated.has(x.name),selected=chosen.includes(x.name);return `<tr><td>${allocated?'<span class="tier test">TREE</span>':`<button class="miniBtn ${selected?'on':''}" onclick="v43ToggleInstil('${x.name.replaceAll("'","\\'")}')">${selected?'Instilled':'Instil'}</button>`}</td><td><b>${x.name}</b></td><td>${r.gain.toFixed(2)}%</td><td>${r.hit.toFixed(2)}%</td><td>${r.recovery.toFixed(2)}%</td><td>${x.note}${allocated?' <strong>Raw value only — do not duplicate this tree notable.</strong>':''}</td></tr>`}).join('')}</tbody></table>`}

function switchPage(page){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(page==='research'?'researchPage':'guidePage').classList.add('active');window.scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',page==='research'?'#research':'#guide')}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>switchPage(b.dataset.page)));
document.querySelectorAll('.calcBody input').forEach(e=>e.addEventListener('input',renderCalc));document.querySelectorAll('.calcBody input[type=checkbox]').forEach(e=>e.addEventListener('change',renderCalc));
$('calcCollapse').addEventListener('click',()=>{const rail=$('calcRail');rail.classList.toggle('collapsed');$('calcCollapse').textContent=rail.classList.contains('collapsed')?'+':'−'});
fetch('./data/character.json').then(r=>r.ok?r.json():null).then(d=>{if(!d)return;$('cMana').value=d.mana||2497;$('cCrit').value=Math.round((d.crit?.frostDarts?.chance||.42)*100);$('cCdb').value=Math.round((d.crit?.frostDarts?.cdb||1.91)*100);$('cRegen').value=Math.round((d.treeStats?.manaRegen||.89)*100);renderCalc()}).catch(()=>{});
if(location.hash==='#research')switchPage('research');renderCalc();
})();