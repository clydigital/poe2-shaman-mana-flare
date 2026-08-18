(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=n=>Number.isFinite(n)?Math.round(n).toLocaleString():'—';
const pct=n=>Number.isFinite(n)?`${n>=0?'+':''}${n.toFixed(1)}%`:'—';
const C=[
 {k:'inv',n:'Invocated Efficiency',g:'TRIGGER',r:'Concentrated Isolation · Envy · Paranoia',e:'Triggered Spells deal 40% increased Spell Damage',q:'core'},
 {k:'mystical',n:'Mystical Rage',g:'RAGE',r:'Concentrated Isolation · Diluted Greed · Envy',e:'Every Rage also grants 2% increased Spell Damage',q:'core'},
 {k:'electric',n:'Electric Amplification',g:'ARCHMAGE',r:'Concentrated Isolation · Concentrated Fear · Disgust',e:'18% Lightning penetration · gain 6% Elemental as extra Lightning',q:'core'},
 {k:'temporal',n:'Temporal Mastery',g:'CDR',r:'Paranoia · Concentrated Fear · Disgust',e:'16% increased Cooldown Recovery Rate',q:'core'},
 {k:'pureChaos',n:'Pure Chaos',g:'GAIN',r:'Envy · Concentrated Isolation · Diluted Guilt',e:'Gain 11% of Damage as Extra Chaos',q:'core'},
 {k:'dynamism',n:'Dynamism',g:'TRIGGER',r:'Concentrated Isolation · Diluted Greed · Diluted Ire',e:'40% increased Damage after triggering',q:'core'},
 {k:'cooked',n:'Cooked',g:'CRIT',r:'Concentrated Suffering · Diluted Ire · Envy',e:'60% increased Critical Damage Bonus · defensive penalty',q:'core'},
 {k:'shredding',n:'Shredding Force',g:'CRIT',r:'Diluted Guilt · Concentrated Isolation · Diluted Greed',e:'15% Spell crit · 15% Critical Spell Damage Bonus',q:'core'},
 {k:'battle',n:'Battle Trance',g:'RAGE',r:'Concentrated Isolation · Disgust · Concentrated Fear',e:'+8 Maximum Rage',q:'rage'},
 {k:'unforgiving',n:'Unforgiving',g:'RAGE',r:'Concentrated Isolation · Diluted Greed · Diluted Greed',e:'+4 Maximum Rage · slower inherent loss (dead with Wellspring)',q:'rage'},
 {k:'jack',n:'Jack of all Trades',g:'ATTRIBUTE',r:'Greed · Fear · Envy',e:'2% increased Damage per 5 of your lowest Attribute',q:'attr'},
 {k:'polymathy',n:'Polymathy',g:'ATTRIBUTE',r:'Isolation · Suffering · Paranoia',e:'7% increased Attributes',q:'attr'},
 {k:'spaghetti',n:'Spaghettification',g:'ATTRIBUTE',r:'Isolation · Despair · Fear',e:'+13 all Attributes · 3% Movement Speed · 29% Chaos Damage · -7% Chaos Res',q:'attr'},
 {k:'beef',n:'Beef',g:'ATTRIBUTE',r:'Fear · Disgust · Fear',e:'+25 Strength',q:'attr'},
 {k:'proficiency',n:'Proficiency',g:'ATTRIBUTE',r:'Fear · Guilt · Paranoia',e:'+25 Dexterity',q:'attr'},
 {k:'ingenuity',n:'Ingenuity',g:'ATTRIBUTE',r:'Ire · Isolation · Suffering',e:'+25 Intelligence',q:'attr'},
 {k:'insight',n:'Insightfulness',g:'ATTRIBUTE/MANA',r:'Diluted Guilt · Disgust · Concentrated Fear',e:'6% increased Intelligence · 12% Mana regen · global ES does not add EB Mana',q:'mana'},
 {k:'spectral',n:'Spectral Ward',g:'MORIOR/MANA',r:'Envy · Concentrated Fear · Concentrated Suffering',e:'+1 max ES per 12 Item Evasion on body; EB turns it into base Mana',q:'mana'},
 {k:'lucidity',n:'Lucidity',g:'MANA/DEFENCE',r:'Envy · Disgust · Suffering',e:'8% Damage taken from Mana before Life · +15 Intelligence',q:'mana'},
 {k:'mentalPerseverance',n:'Mental Perseverance',g:'MANA/DEFENCE',r:'Ire · Disgust · Greed',e:'10% Damage taken from Mana before Life · +15 Intelligence',q:'mana'},
 {k:'arcaneBlossom',n:'Arcane Blossom',g:'RECOVERY',r:'Envy · Despair · Despair',e:'15% increased Mana Recovery Rate',q:'sustain'},
 {k:'alteredBrain',n:'Altered Brain Chemistry',g:'RECOVERY',r:'Diluted Ire · Envy · Diluted Guilt',e:'25% increased Mana Recovery from Flasks · 10% Recovery Rate during Mana Flask',q:'sustain'},
 {k:'mentalToughness',n:'Mental Toughness',g:'RECOVERY',r:'Envy · Fear · Greed',e:'18% Mana regeneration · Mana Cost Efficiency while Low Mana',q:'sustain'},
 {k:'multitasking',n:'Multitasking',g:'CDR',r:'Paranoia · Disgust · Fear',e:'12% CDR · 15% Skill Effect Duration',q:'cdr'},
 {k:'forthcoming',n:'Forthcoming',g:'CDR',r:'Despair · Greed · Suffering',e:'10% CDR · 16% reduced Skill Effect Duration',q:'cdr'},
 {k:'authority',n:'Authority',g:'CDR',r:'Diluted Greed · Envy · Concentrated Suffering',e:'10% CDR · attack AoE line irrelevant',q:'cdr'},
 {k:'distracting',n:'Distracting Presence',g:'CDR',r:'Envy · Diluted Guilt · Concentrated Suffering',e:'10% CDR · enemies have reduced CDR in your Presence',q:'cdr'},
 {k:'sigil',n:'Sigil of Lightning',g:'SHOCK',r:'Paranoia · Suffering · Paranoia',e:'30% increased Damage with Hits against Shocked Enemies',q:'conditional'},
 {k:'giantslayer',n:'Giantslayer',g:'BOSS',r:'Despair · Isolation · Despair',e:'25% increased Damage with Hits vs Rare/Unique · ailment chance',q:'conditional'},
 {k:'firstApproach',n:'First Approach',g:'OPENER',r:'Paranoia · Ire · Fear',e:'80% increased Hit Damage + 40% Crit vs Full-Life enemies',q:'conditional'},
 {k:'finality',n:'Finality',g:'EXECUTE',r:'Isolation · Guilt · Envy',e:'120% increased Hit Damage vs Low-Life enemies · 5% increased damage taken while Low Life',q:'conditional'},
 {k:'stormwalker',n:'Stormwalker',g:'GROUND',r:'Concentrated Suffering · Diluted Greed · Concentrated Fear',e:'Gain 15% of Damage as Extra Lightning while on Shocked Ground',q:'conditional'},
 {k:'exposedStorm',n:'Exposed to the Storm',g:'EXPOSURE',r:'Envy · Concentrated Isolation · Despair',e:'18% Lightning penetration · 15% crit vs Exposed enemies',q:'conditional'},
 {k:'stormsRebuke',n:"Storm's Rebuke",g:'ARMOUR BREAK',r:'Potent Melancholy · Concentrated Suffering · Concentrated Suffering',e:'Fully Broken Armour also increases Cold/Lightning hit damage taken',q:'experimental'},
 {k:'moltenGift',n:"The Molten One's Gift",g:'ARMOUR BREAK',r:'Diluted Guilt · Concentrated Suffering · Diluted Greed',e:'Fully Broken Armour also increases Fire hit damage taken · +15% effect',q:'experimental'},
 {k:'redblade',n:'Redblade Discipline',g:'DEFENCE',r:'Despair · Despair · Diluted Greed',e:'+30% of Armour also applies to Fire Damage · no direct DPS',q:'defence'}
];
const byKey=k=>C.find(x=>x.k===k);
function num(id,f=0){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}
function on(id){return !!$(id)?.checked}
function baseCfg(){if(!window.v44GetCfg||!window.v44Model)return null;const c=clone(window.v44GetCfg());c.inv=false;if(on('v56Arch'))c.arch=true;return c}
function clampRes(x){return Math.max(-.5,Math.min(.9,x/100))}
function attrs(){return {str:num('v56Str',175),dex:num('v56Dex',130),int:num('v56Int',299)}}
function addCrit(c,p){const gi=Math.max(0,c.genericCritInc||0),bc=c.carrierCrit/(1+gi),bf=c.flareCrit/(1+gi);c.genericCritInc=gi+p;c.carrierCrit=Math.min(.99,bc*(1+c.genericCritInc));c.flareCrit=Math.min(.99,bf*(1+c.genericCritInc))}
function applyAttrs(c,keys,a){
  let x={...a};
  if(on('v56Greymake'))x={str:x.str+50,dex:x.dex+50,int:x.int+50};
  if(keys.includes('spaghetti'))x={str:x.str+13,dex:x.dex+13,int:x.int+13};
  if(keys.includes('beef'))x.str+=25;
  if(keys.includes('proficiency'))x.dex+=25;
  if(keys.includes('ingenuity'))x.int+=25;
  if(keys.includes('lucidity')||keys.includes('mentalPerseverance'))x.int+=15;
  if(keys.includes('polymathy'))x={str:x.str*1.07,dex:x.dex*1.07,int:x.int*1.07};
  if(keys.includes('insight'))x.int*=1.06;
  const deltaInt=x.int-a.int;
  c.mana+=Math.max(0,deltaInt*2);
  return x;
}
function evaluate(keys){
  const c=baseCfg();if(!c)return null;
  keys=[...new Set(keys.filter(Boolean))];
  let a=applyAttrs(c,keys,attrs());
  c.rage=Math.max(0,num('v56Rage',c.rage||43));
  if(on('v56FullRage')){if(keys.includes('battle'))c.rage+=8;if(keys.includes('unforgiving'))c.rage+=4}
  if(keys.includes('mystical'))c.inc=(c.inc||0)+.02*c.rage;
  if(keys.includes('jack'))c.inc=(c.inc||0)+Math.floor(Math.min(a.str,a.dex,a.int)/5)*.02;
  if(keys.includes('inv'))c.inv=true;
  if(keys.includes('dynamism'))c.inc=(c.inc||0)+.40;
  if(keys.includes('temporal'))c.cdr=(c.cdr||0)+.16;
  if(keys.includes('multitasking'))c.cdr=(c.cdr||0)+.12;
  if(keys.includes('forthcoming')||keys.includes('authority')||keys.includes('distracting'))c.cdr=(c.cdr||0)+.10;
  if(keys.includes('cooked'))c.cdb=(c.cdb||0)+.60;
  if(keys.includes('shredding')){c.cdb=(c.cdb||0)+.15;addCrit(c,.15)}
  if(keys.includes('insight'))c.regen=(c.regen||0)+.12;
  if(keys.includes('mentalToughness'))c.regen=(c.regen||0)+.18;
  if(keys.includes('arcaneBlossom'))c.rr=(c.rr||0)+.15;
  if(keys.includes('alteredBrain')&&on('v56Flask')){c.rr=(c.rr||0)+.10;const bonus=(c.flask||0)*.25;c.flask=(c.flask||0)*1.25;c.other=(c.other||0)+bonus}
  if(keys.includes('spectral')){const raw=num('v56BodyEva',693)/12,mm=Math.max(1,num('v56ManaMult',1.25));c.mana+=raw*mm}
  if(keys.includes('sigil')&&on('v56Shock'))c.inc=(c.inc||0)+.30;
  if(keys.includes('giantslayer')&&on('v56Boss'))c.inc=(c.inc||0)+.25;
  if(keys.includes('firstApproach')&&on('v56FullLifeEnemy')){c.inc=(c.inc||0)+.80;addCrit(c,.40)}
  if(keys.includes('finality')&&on('v56LowLifeEnemy'))c.inc=(c.inc||0)+1.20;
  if(keys.includes('exposedStorm')&&on('v56Exposure'))addCrit(c,.15);
  const r=window.v44Model(c);
  const ar=c.arch?.0004*Math.max(1,c.mana):0,fire=r.hit/(1+ar),lightning=r.hit-fire;
  const p={fire,lightning,chaos:0,original:r.hit};
  const pen={fire:0,lightning:0},taken={fire:0,lightning:0};
  if(keys.includes('electric')){p.lightning+=p.original*.06;pen.lightning=Math.max(pen.lightning,.18)}
  if(keys.includes('pureChaos'))p.chaos+=p.original*.11;
  if(keys.includes('stormwalker')&&on('v56ShockGround'))p.lightning+=p.original*.15;
  if(keys.includes('exposedStorm')&&on('v56Exposure'))pen.lightning=Math.max(pen.lightning,.18);
  if(on('v56FullBreak')){if(keys.includes('stormsRebuke'))taken.lightning=.20;if(keys.includes('moltenGift'))taken.fire=.23}
  const fr=Math.max(0,clampRes(num('v56FireRes',30))-pen.fire),lr=Math.max(0,clampRes(num('v56LightRes',30))-pen.lightning),cr=clampRes(num('v56ChaosRes',0));
  const hit=p.fire*(1-fr)*(1+taken.fire)+p.lightning*(1-lr)*(1+taken.lightning)+p.chaos*(1-cr);
  return {c,r,a,p,hit,dps:hit*r.real,keys};
}
function selected(){return [0,1,2,3].map(i=>$(`v56Slot${i}`)?.value).filter(Boolean)}
function liquidList(keys){const map=new Map();keys.forEach(k=>{const rec=byKey(k)?.r||'';rec.split(' · ').filter(Boolean).forEach(x=>map.set(x,(map.get(x)||0)+1))});return [...map.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))}
function warn(keys,x){const w=[];if(new Set(keys).size!==keys.length)w.push('Duplicate instills are blocked; pick four different notables.');if(keys.includes('temporal')&&x.r.real+1e-4<x.r.theo)w.push('Temporal is not fully realised because another cap is below the cooldown ceiling.');if(keys.includes('stormwalker')&&!on('v56ShockGround'))w.push('Stormwalker is currently dead: Shocked Ground is off.');if(keys.includes('exposedStorm')&&!on('v56Exposure'))w.push('Exposed to the Storm is currently dead: Exposure is off.');if((keys.includes('stormsRebuke')||keys.includes('moltenGift'))&&!on('v56FullBreak'))w.push('Armour-break instill selected without maintained Fully Broken Armour.');if(keys.includes('mystical')&&!on('v56FullRage'))w.push('Mystical Rage is using the entered current Rage, not a max-Rage ceiling.');if(keys.includes('redblade'))w.push('Redblade Discipline is defensive; the DPS model intentionally gives it no payload bonus.');return w}
function render(){
 const host=$('v56Flex');if(!host)return;const keys=selected(),x=evaluate(keys),b=evaluate([]);if(!x||!b)return;
 const gain=b.dps>0?(x.dps/b.dps-1)*100:0,low=Math.min(x.a.str,x.a.dex,x.a.int),jack=Math.floor(low/5)*2;
 $('v56Stats').innerHTML=`<div><b>${pct(gain)}</b><span>combined DPS</span></div><div><b>${x.r.real.toFixed(2)}/s</b><span>realised Flares</span></div><div><b>${fmt(x.c.mana)}</b><span>model max Mana</span></div><div><b>${Math.round(low)}</b><span>lowest Attribute</span></div>`;
 $('v56Mix').innerHTML=keys.map(k=>`<span>${byKey(k)?.n||k}</span>`).join('');
 $('v56Shop').innerHTML=liquidList(keys).map(([n,q])=>`<span><b>${q}×</b> ${n}</span>`).join('')||'<span>No instills selected</span>';
 const ws=warn(keys,x);$('v56Warn').innerHTML=ws.length?ws.map(s=>`<div>⚠ ${s}</div>`).join(''):`<div>✓ No active-condition warning for this package.</div>`;
 $('v56AttrRead').innerHTML=`Model attributes after selected fixes: <b>${Math.round(x.a.str)} STR / ${Math.round(x.a.dex)} DEX / ${Math.round(x.a.int)} INT</b>. Grand Regalia / Morior requires <b>41 / 41 / 41</b>. Jack of all Trades would be worth <b>${jack}% increased Damage</b> at this lowest-attribute value.`;
}
function options(selected){return `<option value="">— empty slot —</option>`+C.map(x=>`<option value="${x.k}" ${x.k===selected?'selected':''}>${x.n} · ${x.g}</option>`).join('')}
function attrRows(){return [
 ['Legacy of Greymake','Helmet augment','+50 all Attributes','Best clean fix. Level 65. Bonded with Wisdom of the Maji: +1 max Life per level.'],
 ['Rare belt / ring / gloves / boots','Rare suffix','Up to ~31–36 one Attribute','Best if only STR or DEX is short; preserves the Strugglescream amulet.'],
 ['Strugglescream itself','Amulet implicit','+5–7 all Attributes','Already on the amulet; Adaptive Catalyst can enhance Attribute modifiers.'],
 ["Safrin / Eshtera / Zaida ring",'Unique ring','+10–20 all Attributes','Also has a hidden jewel socket; costs a ring slot, so compare against Dream Fragments.'],
 ['Perandus Seal','Unique ring','+5–10 all Attributes +30–50 Mana','Cheap bridge if a ring slot is available.'],
 ["Legacy of Erian's Cobble",'Helmet augment','+5 all Attributes','Also +10 Life/Mana, +5% all res, +10% crit; weaker stat fix but broad utility.'],
 ['Polymathy','Instill','7% increased Attributes','Scales all three and adds Mana through Intelligence. Better when your raw attributes are already high.'],
 ['Spaghettification','Instill','+13 all Attributes','Emergency all-stat bridge with movement speed; -7% Chaos res is the price.'],
 ['Beef / Proficiency / Ingenuity','Instill','+25 STR / DEX / INT','Emergency one-stat fixes. Usually too expensive as a permanent Strugglescream slot.'],
 ['Jack of all Trades','Instill payoff','2% damage per 5 lowest Attribute','Not a fix itself; converts the stat investment into damage and gets stronger with Greymake.']
 ].map(r=>`<tr>${r.map((x,i)=>`<td${i===0?' data-sort-value="'+x+'"':''}>${x}</td>`).join('')}</tr>`).join('')}
function css(){if($('v56Css'))return;const s=document.createElement('style');s.id='v56Css';s.textContent=`
#v56Flex{margin-top:18px;border:1px solid rgba(217,179,112,.28);border-radius:18px;padding:15px;background:linear-gradient(180deg,rgba(31,22,16,.98),rgba(16,11,8,.99))}.v56Head h3{font-size:26px;margin:0 0 5px}.v56Head p{font-size:9px;color:#a99b88;line-height:1.5;max-width:900px}.v56Slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.v56Slot{background:#130d0a;border:1px solid var(--line);border-radius:11px;padding:8px}.v56Slot label,.v56Ctl label{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#9d8f7b;margin-bottom:5px}.v56Slot select,.v56Ctl input{width:100%;background:#0b0807;color:#eadfcf;border:1px solid var(--line);border-radius:7px;padding:7px;font-size:9px}.v56Controls{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin:9px 0}.v56Checks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.v56Checks label{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:6px 8px;background:#15100c}.v56Stats{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:10px 0}.v56Stats div{border:1px solid var(--line);border-radius:11px;background:#15100c;padding:9px}.v56Stats b,.v56Stats span{display:block}.v56Stats b{font-size:18px;color:#ead1a3}.v56Stats span{font-size:7px;text-transform:uppercase;color:#8f8374}.v56Mix,.v56Shop{display:flex;flex-wrap:wrap;gap:5px;margin:7px 0}.v56Mix span,.v56Shop span{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:5px 7px;background:#15100c}.v56Warn{font-size:8.5px;line-height:1.5;color:#c9b89b;margin:8px 0}.v56Attr{margin-top:15px;border-top:1px solid var(--line);padding-top:14px}.v56AttrRead{font-size:9px;line-height:1.5;border-left:3px solid #b88c52;padding:9px 11px;background:#120d0a;margin:9px 0}.v56AttrRead b{color:#ead4ad}#v56Flex table{min-width:940px}@media(max-width:950px){.v56Slots{grid-template-columns:1fr 1fr}.v56Controls{grid-template-columns:1fr 1fr}.v56Stats{grid-template-columns:1fr 1fr}}@media(max-width:600px){.v56Slots,.v56Controls,.v56Stats{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
async function loadSnapshot(){try{const r=await fetch(`./data/character.json?t=${Date.now()}`,{cache:'no-store'});if(!r.ok)return;const d=await r.json(),a=d.attributesDisplayed||[];if(a.length>=3){$('v56Str').value=a[0];$('v56Dex').value=a[1];$('v56Int').value=d.intelligence??a[2]}render()}catch(e){}}
function mount(){if($('v56Flex'))return;const anchor=$('v55InstillLab')||$('v53NodeLab')||$('anoints');if(!anchor)return setTimeout(mount,250);css();const sec=document.createElement('section');sec.id='v56Flex';sec.innerHTML=`
<div class="v56Head"><div class="kicker">STRUGGLESCREAM · CUSTOM 4-SLOT LAB</div><h3>MIX + MATCH ANY FOUR</h3><p>Build your own four-instilled package instead of choosing a fixed preset. Combined calculations handle Rage, CDR, Archmage Lightning, gain-as-extra, penetration, attributes, Spectral Ward and recovery where the live model can support them. Conditional nodes stay conditional rather than receiving fake uptime.</p></div>
<div class="v56Slots">${['inv','mystical','electric','temporal'].map((k,i)=>`<div class="v56Slot"><label>Instill slot ${i+1}</label><select id="v56Slot${i}">${options(k)}</select></div>`).join('')}</div>
<div id="v56Mix" class="v56Mix"></div><div id="v56Stats" class="v56Stats"></div>
<div class="v56Checks"><label><input id="v56Arch" type="checkbox" checked> Archmage scenario</label><label><input id="v56FullRage" type="checkbox" checked> Rage held at cap</label><label><input id="v56Shock" type="checkbox" checked> Enemy Shocked</label><label><input id="v56Boss" type="checkbox" checked> Rare / Unique</label><label><input id="v56Exposure" type="checkbox"> Exposure active</label><label><input id="v56ShockGround" type="checkbox"> Shocked Ground uptime</label><label><input id="v56FullBreak" type="checkbox"> Fully Broken Armour</label><label><input id="v56Flask" type="checkbox"> Mana Flask active</label><label><input id="v56FullLifeEnemy" type="checkbox"> Enemy Full Life</label><label><input id="v56LowLifeEnemy" type="checkbox"> Enemy Low Life</label><label><input id="v56Greymake" type="checkbox"> Legacy of Greymake (+50 all)</label></div>
<div class="v56Controls"><div class="v56Ctl"><label>Strength</label><input id="v56Str" type="number" value="175"></div><div class="v56Ctl"><label>Dexterity</label><input id="v56Dex" type="number" value="130"></div><div class="v56Ctl"><label>Intelligence</label><input id="v56Int" type="number" value="299"></div><div class="v56Ctl"><label>Actual / cap Rage</label><input id="v56Rage" type="number" value="43"></div><div class="v56Ctl"><label>Morior item Evasion</label><input id="v56BodyEva" type="number" value="693"></div><div class="v56Ctl"><label>Max-Mana multiplier on new base Mana</label><input id="v56ManaMult" type="number" step="0.05" value="1.25"></div><div class="v56Ctl"><label>Enemy Fire res %</label><input id="v56FireRes" type="number" value="30"></div><div class="v56Ctl"><label>Enemy Lightning res %</label><input id="v56LightRes" type="number" value="30"></div><div class="v56Ctl"><label>Enemy Chaos res %</label><input id="v56ChaosRes" type="number" value="0"></div></div>
<h4 style="margin:12px 0 4px">Combined Liquid shopping list</h4><div id="v56Shop" class="v56Shop"></div><div id="v56Warn" class="v56Warn"></div>
<div class="v56Attr"><div class="kicker">GRAND REGALIA / MORIOR · ATTRIBUTE FIXES</div><h3 style="font-size:22px">41 STR / 41 DEX / 41 INT WITHOUT SACRIFICING THE BUILD</h3><div id="v56AttrRead" class="v56AttrRead"></div><div class="tableWrap"><table><thead><tr><th>Option</th><th>Slot</th><th>Attribute value</th><th>Why / cost</th></tr></thead><tbody>${attrRows()}</tbody></table></div></div>`;anchor.insertAdjacentElement('afterend',sec);sec.querySelectorAll('input,select').forEach(e=>{e.addEventListener('input',render);e.addEventListener('change',render)});loadSnapshot();render()}
function start(){mount();render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('v44calc',()=>setTimeout(render,0));
setTimeout(start,550);
})();