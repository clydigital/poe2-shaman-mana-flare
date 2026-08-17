(() => {
'use strict';
const $=id=>document.getElementById(id),allocated=new Set(['Raw Mana','Arcane Intensity','Invocated Efficiency']);
const mods=[
 ['Dynamism','40% increased Damage after triggering.',c=>c.inc+=.40],
 ['Critical Overload','Approx +15% final Spell Crit and +15% CDB.',c=>{c.crit=Math.min(.99,c.crit*1.15);c.cdb+=.15}],
 ['Shredding Force','Approx +15% final Spell Crit and +15% CDB.',c=>{c.crit=Math.min(.99,c.crit*1.15);c.cdb+=.15}],
 ['Controlling Magic','Approx +25% final Spell Crit.',c=>c.crit=Math.min(.99,c.crit*1.25)],
 ['Desensitisation','+25% CDB.',c=>c.cdb+=.25],
 ['Temporal Mastery','+16% CDR.',c=>c.cdr+=.16],
 ['Multitasking','+12% CDR.',c=>c.cdr+=.12],
 ['Volatile Catalyst','+10% CDR.',c=>c.cdr+=.10],
 ['Mental Toughness','+18% Mana Regen.',c=>c.regen+=.18],
 ['Conservative Casting','+20% Mana Regen.',c=>c.regen+=.20],
 ['Arcane Blossom','+15% Mana Recovery rate.',c=>c.rr+=.15],
 ['Raw Mana','8% max Mana; raw contribution only if already on tree.',c=>c.mana*=1.08],
 ['Arcane Intensity','Raw contribution only if already on tree.',c=>c.arc?c.inc+=.0003*c.mana:c.arc=true],
 ['Invocated Efficiency','Raw contribution only if already on tree.',c=>c.inv?c.inc+=.40:c.inv=true]
];
let chosen=[];
function one(m){const base=window.v44GetCfg(),b=window.v44Model({...base}),p={...base};m[2](p);const a=window.v44Model(p);return{gain:(a.dps/b.dps-1)*100,hit:(a.hit/b.hit-1)*100,recovery:(a.recovery/b.recovery-1)*100}}
function combo(){const base=window.v44GetCfg(),b=window.v44Model({...base}),p={...base};chosen.forEach(n=>mods.find(x=>x[0]===n)?.[2](p));return(window.v44Model(p).dps/b.dps-1)*100}
function render(){const h=$('instilTable');if(!h||!window.v44Model)return;const rows=mods.map(m=>({m,r:one(m)})).sort((a,b)=>b.r.gain-a.r.gain);h.innerHTML=`<div style="padding:10px;display:flex;gap:7px;align-items:center;flex-wrap:wrap"><b style="font-size:10px">Strugglescream: ${chosen.length}/4</b><button class="miniBtn" onclick="v44Best4()">Best 4</button><button class="miniBtn" onclick="v44Clear4()">Clear</button>${chosen.length?`<span style="font-size:9px;color:#9fcbe3">Combined forecast: +${combo().toFixed(2)}% model DPS</span>`:''}</div><table><thead><tr><th>Use</th><th>Instil</th><th>Raw DPS</th><th>Hit Δ</th><th>Recovery Δ</th><th>Comment</th></tr></thead><tbody>${rows.map(({m,r})=>{const tree=allocated.has(m[0]),on=chosen.includes(m[0]);return `<tr><td>${tree?'<span class="tier test">TREE</span>':`<button class="miniBtn" onclick="v44Instil('${m[0].replaceAll("'","\\'")}')">${on?'Uninstil':'Instil'}</button>`}</td><td><b>${m[0]}</b></td><td>${r.gain.toFixed(2)}%</td><td>${r.hit.toFixed(2)}%</td><td>${r.recovery.toFixed(2)}%</td><td>${m[1]}${tree?' <strong>Raw standalone value shown; no duplicate stacking.</strong>':''}</td></tr>`}).join('')}</tbody></table>`}
window.v44Instil=n=>{if(allocated.has(n))return;chosen.includes(n)?chosen=chosen.filter(x=>x!==n):chosen.length<4&&chosen.push(n);render()};window.v44Best4=()=>{chosen=mods.filter(x=>!allocated.has(x[0])).map(m=>({m,r:one(m)})).sort((a,b)=>b.r.gain-a.r.gain).slice(0,4).map(x=>x.m[0]);render()};window.v44Clear4=()=>{chosen=[];render()};window.addEventListener('v44calc',render);render();
})();
