(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=x=>Number.isFinite(x)?Math.round(x).toLocaleString():'—';

const INSTILLS=[
  {k:'mystical',name:'Mystical Rage',tier:'S',group:'RAGE',recipe:'Concentrated Isolation · Diluted Greed · Envy',effect:'Every Rage also grants 2% increased Spell Damage',note:'Huge on Shaman if Rage is actually held. At 43 Rage this is +86% increased Spell Damage before diminishing returns from the existing increased-damage bucket.'},
  {k:'electric',name:'Electric Amplification',tier:'S',group:'ARCHMAGE',recipe:'Concentrated Isolation · Concentrated Fear · Disgust',effect:'18% Lightning penetration · Gain 6% of Elemental Damage as Extra Lightning',note:'Top Archmage payload candidate while effective Lightning resistance is still above 0.'},
  {k:'inv',name:'Invocated Efficiency',tier:'S',group:'TRIGGER',recipe:'Concentrated Isolation · Envy · Paranoia',effect:'10% Mana Cost Efficiency · Triggered Spells deal 40% increased Spell Damage',note:'Mana Flare is a triggered spell. Lab strips this from baseline so its slot value is visible even if the main calculator has it enabled.'},
  {k:'temporal',name:'Temporal Mastery',tier:'S/A',group:'RATE',recipe:'Paranoia · Concentrated Fear · Disgust',effect:'16% increased Cooldown Recovery Rate',note:'Only strong when CDR is the active bottleneck. If recovery or carrier saturation caps Flare rate, payload instills win.'},
  {k:'battle',name:'Battle Trance',tier:'A',group:'RAGE',recipe:'Concentrated Isolation · Disgust · Concentrated Fear',effect:'+8 to Maximum Rage',note:'Compound Shaman node: +8 Rage can add +4% MORE Spell Damage through Druidic Champion and +16% increased Spell Damage when paired with Mystical Rage.'},
  {k:'cooked',name:'Cooked',tier:'A',group:'CRIT',recipe:'Concentrated Suffering · Diluted Ire · Envy',effect:'60% increased Critical Damage Bonus · 25% reduced Armour, Evasion and Energy Shield',note:'EB quirk: the global reduced ES does not reduce Mana already created by EB. Damage value rises sharply as Mana Flare crit rises; Armour/Evasion penalty remains real.'},
  {k:'stormwalker',name:'Stormwalker',tier:'A*',group:'ARCHMAGE',recipe:'Concentrated Suffering · Diluted Greed · Concentrated Fear',effect:'Gain 15% of Damage as Extra Lightning while on Shocked Ground · 40% reduced Shock effect on you',note:'Enormous conditional slot. Only rank it when Shocked Ground uptime is real.'},
  {k:'exposedStorm',name:'Exposed to the Storm',tier:'A*',group:'ARCHMAGE',recipe:'Envy · Concentrated Isolation · Despair',effect:'18% Lightning penetration · 15% increased Critical Hit Chance vs enemies with Exposure',note:'Excellent if Exposure is reliable. Set enemy resistance to the post-Exposure value; penetration cannot push ordinary resistance below zero.'},
  {k:'brainstorm',name:'Brain Storm',tier:'A/B',group:'ARCHMAGE',recipe:'Concentrated Suffering · Diluted Guilt · Diluted Guilt',effect:'20% increased Lightning Damage · 15% increased Mana Cost Efficiency',note:'Hybrid Archmage slot. Damage estimate is an upper-bound approximation because the calculator does not know your existing Lightning-specific increased-damage bucket.'},
  {k:'pureChaos',name:'Pure Chaos',tier:'A/B',group:'GAIN',recipe:'Envy · Concentrated Isolation · Diluted Guilt',effect:'Gain 11% of Damage as Extra Chaos',note:'Strong unconditional gain-as-extra if target Chaos resistance is not high.'},
  {k:'dynamism',name:'Dynamism',tier:'B+',group:'TRIGGER',recipe:'Concentrated Isolation · Diluted Greed · Diluted Ire',effect:'40% increased Damage if you have Triggered a Skill Recently',note:'Easy uptime after first Mana Flare, but additive with Rathpith / Arcane Intensity / other increased damage.'},
  {k:'stormbreaker',name:'Stormbreaker',tier:'B+/A',group:'AILMENT',recipe:'Concentrated Isolation · Despair · Diluted Guilt',effect:'20% increased Damage per Elemental Ailment on Enemy',note:'Can become excellent with Shock + Chill + Ignite. Use the ailment-count control.'},
  {k:'arcaneBlossom',name:'Arcane Blossom',tier:'B+/Sustain',group:'RECOVERY',recipe:'Envy · Despair · Despair',effect:'15% increased Mana Recovery Rate',note:'Not glamorous, but can beat damage notables whenever Mana recovery is the real Flare/s cap.'},
  {k:'alteredBrain',name:'Altered Brain Chemistry',tier:'B+/Sustain',group:'RECOVERY',recipe:'Diluted Ire · Envy · Diluted Guilt',effect:'25% increased Mana Recovery from Flasks · 10% increased Mana Recovery Rate during Mana Flask effect',note:'Very strong only with genuine Mana Flask uptime. Toggle flask active to model it.'},
  {k:'flashStorm',name:'Flash Storm',tier:'B',group:'ARCHMAGE',recipe:'Paranoia · Diluted Ire · Concentrated Isolation',effect:'30% increased chance to Shock · 15% Lightning penetration',note:'Hybrid penetration/Shock setup. Lab models penetration, not the extra Shock reliability.'},
  {k:'unforgiving',name:'Unforgiving',tier:'B-',group:'RAGE',recipe:'Concentrated Isolation · Diluted Greed · Diluted Greed',effect:'+4 Maximum Rage · 20% slower inherent Rage loss',note:'Furious Wellspring already removes inherent Rage loss, so half the notable is dead. +4 max Rage still compounds with Druidic Champion + Mystical Rage.'},
  {k:'stormsRebuke',name:"Storm's Rebuke",tier:'EXPERIMENT',group:'ARMOUR BREAK',recipe:'Potent Melancholy · Concentrated Suffering · Concentrated Suffering',effect:'Fully Broken Armour you inflict also increases Cold and Lightning Damage Taken from Hits',note:'The Archmage version of Molten One’s Gift. Potentially ~20% increased Lightning hit damage taken, or ~23% with Material Solidification, but only after you actually Fully Break boss Armour.'},
  {k:'moltenGift',name:"The Molten One's Gift",tier:'EXPERIMENT',group:'ARMOUR BREAK',recipe:'Diluted Guilt · Concentrated Suffering · Diluted Greed',effect:'+10% Fire Res · 15% increased effect of Fully Broken Armour · Fully Broken Armour also increases Fire Damage Taken from Hits',note:'Better for Fire-heavy / Archmage-off Mana Flare. Its 15% effect raises the normal 20% Fully Broken value to about 23% for the Fire hit.'},
  {k:'material',name:'Material Solidification',tier:'EXPERIMENT',group:'ARMOUR BREAK',recipe:'Envy · Envy · Concentrated Isolation',effect:'Gain 8% of Damage as Extra Physical · 15% increased effect of Fully Broken Armour',note:'Armour-break enabler / amplifier. Pair with Cut to the Bone or a Bonded spell-crit armour-break source; boss break speed is the bottleneck.'},
  {k:'cutBone',name:'Cut to the Bone',tier:'EXPERIMENT',group:'ARMOUR BREAK',recipe:'Despair · Envy · Concentrated Isolation',effect:'Spell Critical Hits Break Armour equal to 10% of Physical Damage dealt · 20% increased Physical Damage',note:'Makes spell crits break Armour, but only from Physical damage. Needs Material Solidification / another Physical source to matter.'},
  {k:'redblade',name:'Redblade Discipline',tier:'DEFENCE',group:'DEFENCE',recipe:'Despair · Despair · Diluted Greed',effect:'+8% Fire Res · 20% Stun Threshold · +30% of Armour also applies to Fire Damage',note:'No direct DPS. Useful only if incoming Fire hits are draining your shared Mana defence / killing you.'},
  {k:'lightningRod',name:'Lightning Rod',tier:'TRAP?',group:'ARCHMAGE',recipe:'Concentrated Suffering · Concentrated Isolation · Concentrated Isolation',effect:'30% chance for Lightning Damage with Hits to be Lucky',note:'Mana Flare spends an exact Mana amount, and Archmage gains a fixed percentage of that amount as Lightning. With no Lightning damage range to reroll, Lucky is likely zero payload value for Mana Flare itself.'},
  {k:'prolonged',name:'Prolonged Fury',tier:'DEAD',group:'RAGE',recipe:'Diluted Ire · Diluted Greed · Despair',effect:'25% slower inherent Rage loss',note:'Furious Wellspring already gives No Inherent loss of Rage. Do not spend a Strugglescream slot here.'},
  {k:'rawMana',name:'Raw Mana',tier:'NO DOUBLE-DIP',group:'MANA',recipe:'Concentrated Suffering · Diluted Ire · Concentrated Isolation',effect:'8% increased Maximum Mana · 10% increased Mana Cost',note:'Already allocated in the current tree snapshot. Instilling an allocated notable does not grant it again.'},
  {k:'arcaneIntensity',name:'Arcane Intensity',tier:'NO DOUBLE-DIP',group:'MANA',recipe:'Disgust · Concentrated Fear · Despair',effect:'3% increased Spell Damage per 100 Maximum Mana',note:'Already allocated in the current tree snapshot. Only consider as an instill if you later refund it from the tree.'}
];

function num(id,f=0){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}
function on(id){return !!$(id)?.checked}
function baseCfg(){
  if(!window.v44GetCfg||!window.v44Model)return null;
  const c=clone(window.v44GetCfg());
  c.inv=false; // fair slot comparison
  if(on('v55Arch'))c.arch=true;
  c.rage=Math.max(0,num('v55Rage',c.rage||43));
  return c;
}
function clampRes(v){return Math.max(-.5,Math.min(.9,v/100))}
function resists(){return{fire:clampRes(num('v55FireRes',30)),lightning:clampRes(num('v55LightRes',30)),chaos:clampRes(num('v55ChaosRes',0))}}
function addCritAgainst(c,pct){
  const gi=Math.max(0,c.genericCritInc||0),bc=c.carrierCrit/(1+gi),bf=c.flareCrit/(1+gi);
  c.genericCritInc=gi+pct;
  c.carrierCrit=Math.min(.99,bc*(1+c.genericCritInc));
  c.flareCrit=Math.min(.99,bf*(1+c.genericCritInc));
}
function split(c,r){
  const ar=c.arch?.0004*Math.max(1,c.mana):0;
  const fire=r.hit/(1+ar),lightning=r.hit-fire;
  return{fire,lightning,chaos:0,physical:0,original:r.hit};
}
function post(p,rr,pen={},taken={}){
  const fr=Math.max(0,rr.fire-(pen.fire||0));
  const lr=Math.max(0,rr.lightning-(pen.lightning||0));
  const cr=rr.chaos;
  return p.fire*(1-fr)*(1+(taken.fire||0))+p.lightning*(1-lr)*(1+(taken.lightning||0))+p.chaos*(1-cr)*(1+(taken.chaos||0));
}
function applyPre(c,keys){
  const full=on('v55FullRage');
  if(full){
    if(keys.includes('battle'))c.rage+=8;
    if(keys.includes('unforgiving'))c.rage+=4;
  }
  if(keys.includes('mystical'))c.inc=(c.inc||0)+.02*c.rage;
  if(keys.includes('inv'))c.inv=true;
  if(keys.includes('dynamism'))c.inc=(c.inc||0)+.40;
  if(keys.includes('temporal'))c.cdr=(c.cdr||0)+.16;
  if(keys.includes('cooked'))c.cdb=(c.cdb||0)+.60;
  if(keys.includes('stormbreaker'))c.inc=(c.inc||0)+.20*Math.max(0,Math.min(3,num('v55Ailments',1)));
  if(keys.includes('arcaneBlossom'))c.rr=(c.rr||0)+.15;
  if(keys.includes('alteredBrain')&&on('v55Flask')){
    c.rr=(c.rr||0)+.10;
    const bonus=(c.flask||0)*.25;
    c.flask=(c.flask||0)*1.25;
    c.other=(c.other||0)+bonus;
  }
  if(keys.includes('exposedStorm')&&on('v55Exposure'))addCritAgainst(c,.15);
  return c;
}
function evaluate(keys){
  const c=baseCfg();if(!c)return null;
  applyPre(c,keys);
  const r=window.v44Model(c),p=split(c,r),rr=resists(),pen={},taken={};
  if(keys.includes('electric')){p.lightning+=p.original*.06;pen.lightning=Math.max(pen.lightning||0,.18)}
  if(keys.includes('stormwalker')&&on('v55ShockGround'))p.lightning+=p.original*.15;
  if(keys.includes('brainstorm'))p.lightning*=1.20;
  if(keys.includes('pureChaos'))p.chaos+=p.original*.11;
  if(keys.includes('exposedStorm')&&on('v55Exposure'))pen.lightning=Math.max(pen.lightning||0,.18);
  if(keys.includes('flashStorm'))pen.lightning=Math.max(pen.lightning||0,.15);
  if(on('v55FullBreak')){
    const mat=keys.includes('material')?.15:0;
    if(keys.includes('stormsRebuke'))taken.lightning=.20*(1+mat);
    if(keys.includes('moltenGift'))taken.fire=.20*(1+.15+mat);
  }
  const hit=post(p,rr,pen,taken),dps=hit*r.real;
  return{c,r,p,hit,dps,pen,taken};
}
function baseline(){return evaluate([])}
function gain(keys,b){const x=evaluate(keys);return x&&b?.dps>0?(x.dps/b.dps-1)*100:null}
function rowGain(k,b){
  if(['redblade','lightningRod','prolonged','rawMana','arcaneIntensity','material','cutBone'].includes(k))return null;
  if(k==='battle'&&!on('v55FullRage'))return null;
  if(k==='unforgiving'&&!on('v55FullRage'))return null;
  if(k==='stormwalker'&&!on('v55ShockGround'))return 0;
  if(k==='exposedStorm'&&!on('v55Exposure'))return 0;
  if(k==='stormsRebuke'&&!on('v55FullBreak'))return 0;
  if(k==='moltenGift'&&!on('v55FullBreak'))return 0;
  if(k==='alteredBrain'&&!on('v55Flask'))return 0;
  return gain([k],b);
}
function packageGain(keys,b){const g=gain(keys,b);return g==null?'manual':`+${g.toFixed(1)}%`;}
function packageCard(title,keys,desc,b,cls=''){
  return `<article class="v55Pack ${cls}"><div class="v55PackHead"><b>${title}</b><strong>${packageGain(keys,b)}</strong></div><div class="v55Chips">${keys.map(k=>`<span>${INSTILLS.find(x=>x.k===k)?.name||k}</span>`).join('')}</div><p>${desc}</p></article>`;
}
function rageRead(c,r){
  const max=Math.max(1,c.rage),regen=max*.06*Math.max(0,1+(c.regen||0));
  const flareDrain=5*r.real;
  const ratio=regen>0?flareDrain/regen:Infinity;
  return `<b>Rage budget:</b> Furious Wellspring gives no inherent Rage loss, but Skills have +5 Rage cost. Using only the calculator's +${((c.regen||0)*100).toFixed(0)}% Mana Regen, estimated Rage regen is <strong>${regen.toFixed(1)}/s</strong>. Mana Flare alone would spend about <strong>${flareDrain.toFixed(1)} Rage/s</strong> at ${r.real.toFixed(2)} Flares/s before any cost-efficiency interaction — and your carrier casts can spend Rage too. ${ratio>1?'<em>So max-Rage Mystical numbers are a ceiling unless Rage recovery is solved.</em>':'Carrier costs still need to be added before calling Rage sustainable.'}`;
}
function render(){
  const host=$('v55InstillLab'),b=baseline();if(!host||!b)return;
  const rows=INSTILLS.map(n=>({n,g:rowGain(n.k,b)}));
  const rank=rows.filter(x=>x.g!=null).sort((a,b)=>b.g-a.g);
  $('v55Top').innerHTML=rank.slice(0,6).map((x,i)=>`<div><span>#${i+1}</span><b>${x.n.name}</b><strong>+${x.g.toFixed(1)}%</strong><small>${x.n.group}</small></div>`).join('');
  $('v55Rows').innerHTML=rows.map(({n,g})=>{
    let val=g==null?'SETUP / SPECIAL':`+${g.toFixed(1)}%`;
    if(n.k==='lightningRod')val='~0% FLARE';
    if(n.k==='prolonged')val='0%';
    if(n.k==='rawMana'||n.k==='arcaneIntensity')val='TREE';
    return `<tr><td><b>${n.name}</b><small>${n.tier} · ${n.group}</small></td><td>${n.effect}<small>${n.note}</small></td><td data-sort-value="${g==null?-999:g}"><strong>${val}</strong></td><td><small>${n.recipe}</small></td></tr>`;
  }).join('');
  const payload=['inv','mystical','electric','cooked'];
  const rage=['inv','mystical','battle','electric'];
  const ground=['inv','mystical','electric','stormwalker'];
  const sustain=['inv','temporal','arcaneBlossom','alteredBrain'];
  $('v55Packages').innerHTML=
    packageCard('ARCHMAGE PAYLOAD',payload,'Best four-slot payload test when Rage is stable and CDR/recovery are supplied elsewhere. Cooked gets better as Flare crit rises.',b)+
    packageCard('RAGE COMPOUND',rage,'Battle Trance is mediocre alone but compounds Druidic Champion + Mystical Rage. Treat this as a max-Rage ceiling until the +5 Rage costs are sustainable.',b)+
    packageCard('SHOCKED-GROUND GREED',ground,'Potentially absurd burst package, but Stormwalker is dead without real Shocked Ground uptime.',b,'conditional')+
    packageCard('2/S SUSTAIN',sustain,'Use when the calculator says RECOVERY-LIMITED or CDR-limited. Once recovery is solved, swap sustain slots back into payload.',b,'sustain')+
    `<article class="v55Pack experimental"><div class="v55PackHead"><b>ARMOUR-BREAK EXPERIMENT</b><strong>SETUP</strong></div><div class="v55Chips"><span>Material Solidification</span><span>Cut to the Bone</span><span>Storm's Rebuke</span><span>Invocated Efficiency / Mystical Rage</span></div><p>Material creates Physical damage; Cut to the Bone lets spell crits break Armour; Storm's Rebuke makes Fully Broken Armour amplify Lightning hits. High theoretical payoff, but boss break speed must be proven before sacrificing three instill slots.</p></article>`;
  const ar=b.c.arch?.0004*Math.max(1,b.c.mana):0;
  const lightShare=b.r.hit?b.p.lightning/b.r.hit*100:0;
  $('v55Read').innerHTML=`<div>${rageRead(b.c,b.r)}</div><div style="margin-top:8px"><b>Archmage scenario:</b> ${(ar*100).toFixed(1)}% gained-as-extra Lightning from ${fmt(b.c.mana)} max Mana, giving roughly <strong>${lightShare.toFixed(1)}% Lightning</strong> of the current modelled Mana Flare hit before new gain-as-extra instills. This is why Electric Amplification / Stormwalker / Lightning penetration can outrank Fire-only options.</div><div style="margin-top:8px"><b>Resistance input rule:</b> enter the enemy's effective resistance <em>before penetration</em>. If Exposure or a curse already lowered resistance, enter that lower value. Penetration only helps the portion of the hit matching that element.</div>`;
}
function css(){
  if($('v55Css'))return;
  const s=document.createElement('style');s.id='v55Css';s.textContent=`
  #v55InstillLab{margin-top:18px;border:1px solid rgba(217,179,112,.25);border-radius:18px;padding:15px;background:linear-gradient(180deg,rgba(31,22,16,.98),rgba(17,12,9,.98))}.v55Head{display:flex;justify-content:space-between;gap:15px;align-items:end}.v55Head h3{font-size:26px;margin:0}.v55Head p{font-size:9px;line-height:1.45;color:#a89a87;max-width:760px}.v55Controls{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:11px 0}.v55Ctl{border:1px solid var(--line);border-radius:10px;padding:8px;background:#120d0a}.v55Ctl label{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#9e907c;margin-bottom:5px}.v55Ctl input[type=number]{width:100%;background:#0b0807;color:#eadfcf;border:1px solid var(--line);border-radius:7px;padding:6px}.v55Checks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.v55Checks label{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:6px 8px;background:#15100c}.v55Top{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin:10px 0}.v55Top div{border:1px solid var(--line);border-radius:11px;padding:9px;background:#15100c}.v55Top span,.v55Top b,.v55Top strong,.v55Top small{display:block}.v55Top span{font-size:7px;color:#b88c52}.v55Top b{font-size:9px;margin:2px 0}.v55Top strong{font-size:17px;color:#ead0a1}.v55Top small{font-size:7px;color:#8f8374}.v55Packages{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0}.v55Pack{border:1px solid var(--line);border-radius:13px;padding:11px;background:#15100c}.v55Pack.conditional{border-color:rgba(123,174,201,.35)}.v55Pack.sustain{border-color:rgba(139,181,136,.35)}.v55Pack.experimental{grid-column:1/-1;border-color:rgba(191,125,92,.38)}.v55PackHead{display:flex;justify-content:space-between;gap:8px}.v55PackHead b{font-size:10px}.v55PackHead strong{font-size:15px;color:#d8bd8c}.v55Chips{display:flex;flex-wrap:wrap;gap:4px;margin:7px 0}.v55Chips span{font-size:7.5px;border:1px solid var(--line);border-radius:999px;padding:4px 6px;color:#cfbea3}.v55Pack p{font-size:8.5px;line-height:1.45;color:#9f927f;margin:5px 0 0}.v55Read{font-size:9px;line-height:1.5;color:#b5a993;border-left:3px solid #b88c52;padding:10px 12px;background:#120d0a;margin-top:10px}.v55Read strong{color:#ead5b0}.v55Read em{color:#e4ae87}#v55InstillLab table{min-width:980px}#v55InstillLab td small{display:block;color:#8d8273;margin-top:4px;max-width:650px}#v55InstillLab td strong{color:#e3c58f}@media(max-width:950px){.v55Controls{grid-template-columns:1fr 1fr}.v55Top{grid-template-columns:repeat(3,1fr)}.v55Packages{grid-template-columns:1fr}}@media(max-width:600px){.v55Top{grid-template-columns:1fr 1fr}.v55Controls{grid-template-columns:1fr 1fr}}
  `;document.head.appendChild(s);
}
function mount(){
  if($('v55InstillLab'))return;
  const anchor=$('v53NodeLab')||$('v51PackageLab')||$('anoints');
  if(!anchor)return setTimeout(mount,250);
  css();
  const sec=document.createElement('section');sec.id='v55InstillLab';sec.innerHTML=`
    <div class="v55Head"><div><div class="kicker">STRUGGLESCREAM · INSTILL-FIRST VIEW</div><h3>4-SLOT INSTILL OPTIMIZER</h3></div><p>Ranks the off-tree notables specifically as Strugglescream slots. Marginal DPS uses the live Mana Flare calculator; setup-only, defensive and no-double-dip nodes are deliberately not given fake damage scores.</p></div>
    <div class="v55Checks"><label><input id="v55Arch" type="checkbox" checked> Force Archmage scenario</label><label><input id="v55FullRage" type="checkbox" checked> Assume Rage held at cap</label><label><input id="v55Exposure" type="checkbox"> Exposure active</label><label><input id="v55ShockGround" type="checkbox"> Standing on Shocked Ground</label><label><input id="v55FullBreak" type="checkbox"> Fully Broken Armour maintained</label><label><input id="v55Flask" type="checkbox"> Mana Flask active</label></div>
    <div class="v55Controls"><div class="v55Ctl"><label>Actual Rage / assumed cap</label><input id="v55Rage" type="number" min="0" value="43"></div><div class="v55Ctl"><label>Elemental ailments on target</label><input id="v55Ailments" type="number" min="0" max="3" value="1"></div><div class="v55Ctl"><label>Enemy Fire res % · before pen</label><input id="v55FireRes" type="number" value="30"></div><div class="v55Ctl"><label>Enemy Lightning res % · before pen</label><input id="v55LightRes" type="number" value="30"></div><div class="v55Ctl"><label>Enemy Chaos res %</label><input id="v55ChaosRes" type="number" value="0"></div></div>
    <div id="v55Top" class="v55Top"></div>
    <h4 style="margin:13px 0 5px">Four-slot packages</h4><div id="v55Packages" class="v55Packages"></div>
    <h4 style="margin:13px 0 5px">Instill library · live marginal value</h4><div class="tableWrap"><table><thead><tr><th>Instill</th><th>What it actually does here</th><th>Marginal DPS</th><th>Liquid recipe</th></tr></thead><tbody id="v55Rows"></tbody></table></div>
    <div id="v55Read" class="v55Read"></div>`;
  anchor.insertAdjacentElement('afterend',sec);
  sec.querySelectorAll('input').forEach(e=>{e.addEventListener('input',render);e.addEventListener('change',render)});
  render();
}
function start(){mount();render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('v44calc',()=>setTimeout(render,0));
setTimeout(start,400);
})();
