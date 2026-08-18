(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));

const NODES=[
 {k:'electric',name:'Electric Amplification',recipe:'Concentrated Isolation · Concentrated Fear · Disgust',kind:'gain+pen',effect:'Gain 6% of Elemental Damage as Extra Lightning · 18% Lightning penetration'},
 {k:'pureChaos',name:'Pure Chaos',recipe:'Envy · Concentrated Isolation · Diluted Guilt',kind:'gain',effect:'Gain 11% of Damage as Extra Chaos'},
 {k:'wildStorm',name:'Wild Storm',recipe:'Concentrated Isolation · Concentrated Fear · Concentrated Isolation',kind:'gain',effect:'Gain 4% as Extra Cold + 4% as Extra Lightning · +10 Dex'},
 {k:'crem',name:'Cremation',recipe:'Concentrated Isolation · Disgust · Concentrated Isolation',kind:'gain+pen',effect:'Gain 6% Elemental as Extra Fire · 18% Fire penetration'},
 {k:'glaciation',name:'Glaciation',recipe:'Paranoia · Diluted Guilt · Concentrated Isolation',kind:'gain+pen',effect:'Gain 6% Elemental as Extra Cold · 18% Cold penetration'},
 {k:'molten',name:'Molten Being',recipe:'Diluted Guilt · Concentrated Isolation · Disgust',kind:'gain',effect:'Gain 5% of Damage as Extra Fire · 5% Physical taken as Fire'},
 {k:'owl',name:'Bond of the Owl',recipe:'Diluted Guilt · Diluted Ire · Despair',kind:'gain',effect:'Gain 6% of Damage as Extra Cold'},
 {k:'dynamism',name:'Dynamism',recipe:'Concentrated Isolation · Diluted Greed · Diluted Ire',kind:'inc',effect:'40% increased Damage after you Trigger a Skill'},
 {k:'temporal',name:'Temporal Mastery',recipe:'Paranoia · Concentrated Fear · Disgust',kind:'cdr',effect:'16% increased Cooldown Recovery Rate'},
 {k:'marked',name:'Marked for Sickness',recipe:'Diluted Guilt · Disgust · Concentrated Isolation',kind:'taken',effect:'Marked enemies take 10% increased Damage'},
 {k:'melting',name:'Melting Flames',recipe:'Concentrated Fear · Paranoia · Paranoia',kind:'taken-fire',effect:'Ignited enemies permanently take +1% Fire Damage per second ever Ignited, up to 10%'},
 {k:'harmonic',name:'Harmonic Generator',recipe:'Paranoia · Concentrated Fear · Despair',kind:'shock',effect:'15% increased Crit Chance vs Shocked · 40% increased Shock Magnitude with Critical Hits'},
 {k:'breaking',name:'Breaking Point',recipe:'Concentrated Fear · Paranoia · Concentrated Fear',kind:'shock',effect:'30% increased Magnitude of non-Damaging Ailments'},
 {k:'conduction',name:'Power Conduction',recipe:'Diluted Guilt · Concentrated Suffering · Concentrated Suffering',kind:'shock',effect:'25% increased Shock Magnitude · 25% Shock Duration'},
 {k:'stormwalker',name:'Stormwalker',recipe:'Concentrated Suffering · Diluted Greed · Concentrated Fear',kind:'ground',effect:'Gain 15% of Damage as Extra Lightning while on Shocked Ground'},
 {k:'flamewalker',name:'Flamewalker',recipe:'Concentrated Suffering · Concentrated Fear · Diluted Greed',kind:'ground',effect:'Gain 15% of Damage as Extra Fire while on Ignited Ground'},
 {k:'exposedStorm',name:'Exposed to the Storm',recipe:'Envy · Concentrated Isolation · Despair',kind:'pen+crit',effect:'18% Lightning penetration · 15% increased Crit Chance vs enemies with Exposure'},
 {k:'purePower',name:'Pure Power',recipe:'Concentrated Suffering · Diluted Guilt · Concentrated Suffering',kind:'special',effect:'10% more Maximum Lightning Damage · roll-dependent average value'},
 {k:'lightningRod',name:'Lightning Rod',recipe:'Concentrated Suffering · Concentrated Isolation · Concentrated Isolation',kind:'special',effect:'30% chance for Lightning Damage with Hits to be Lucky · spread-dependent'}
];

let topo=null;
function num(id,f=0){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}
function on(id){return !!$(id)?.checked}
function clampRes(v){return Math.max(-.5,Math.min(.9,v/100))}
function baseCfg(){if(!window.v44GetCfg||!window.v44Model)return null;return clone(window.v44GetCfg())}
function resistances(){return {fire:clampRes(num('v53FireRes',30)),cold:clampRes(num('v53ColdRes',30)),lightning:clampRes(num('v53LightRes',30)),chaos:clampRes(num('v53ChaosRes',0))}}
function split(c,r){const ar=c.arch?.0004*Math.max(1,c.mana):0,fire=r.hit/(1+ar),lightning=r.hit-fire;return{fire,cold:0,lightning,chaos:0,original:r.hit}}
function addCritAgainst(c,pct){
  const gi=Math.max(0,c.genericCritInc||0),baseCarrier=c.carrierCrit/(1+gi),baseFlare=c.flareCrit/(1+gi);
  c.genericCritInc=gi+pct;
  c.carrierCrit=Math.min(.99,baseCarrier*(1+c.genericCritInc));
  c.flareCrit=Math.min(.99,baseFlare*(1+c.genericCritInc));
}
function post(parts,rr,pen={},taken=0,fireTaken=0,shock=0){
  const eff={...rr};
  for(const el of ['fire','cold','lightning'])eff[el]=Math.max(0,eff[el]-(pen[el]||0));
  let d=parts.fire*(1-eff.fire)*(1+fireTaken)+parts.cold*(1-eff.cold)+parts.lightning*(1-eff.lightning)+parts.chaos*(1-eff.chaos);
  return d*(1+taken+shock);
}
function simulate(key){
  const c=baseCfg();if(!c)return null;
  const n=NODES.find(x=>x.k===key);if(!n)return null;
  let pen={},taken=0,fireTaken=0,shockMag=on('v53Shock') ? .20 : 0;
  if(key==='dynamism')c.inc=(c.inc||0)+.40;
  if(key==='temporal')c.cdr=(c.cdr||0)+.16;
  if(key==='exposedStorm'&&on('v53Exposure'))addCritAgainst(c,.15);
  if(key==='harmonic'&&on('v53Shock'))addCritAgainst(c,.15);
  const r=window.v44Model(c),p=split(c,r),orig=p.original;
  if(key==='electric'){p.lightning+=orig*.06;pen.lightning=.18}
  if(key==='pureChaos')p.chaos+=orig*.11;
  if(key==='wildStorm'){p.cold+=orig*.04;p.lightning+=orig*.04}
  if(key==='crem'){p.fire+=orig*.06;pen.fire=.18}
  if(key==='glaciation'){p.cold+=orig*.06;pen.cold=.18}
  if(key==='molten')p.fire+=orig*.05;
  if(key==='owl')p.cold+=orig*.06;
  if(key==='marked'&&on('v53Mark'))taken+=.10;
  if(key==='melting'&&on('v53Ignite'))fireTaken+=Math.min(10,Math.max(0,num('v53IgniteSecs',10)))/100;
  if(key==='breaking'&&on('v53Shock'))shockMag=.20*1.30;
  if(key==='conduction'&&on('v53Shock'))shockMag=.20*1.25;
  if(key==='harmonic'&&on('v53Shock')&&on('v53CritShock'))shockMag=.20*1.40;
  if(key==='stormwalker'&&on('v53ShockGround'))p.lightning+=orig*.15;
  if(key==='flamewalker'&&on('v53IgniteGround'))p.fire+=orig*.15;
  if(key==='exposedStorm'&&on('v53Exposure'))pen.lightning=.18;
  if(key==='purePower'||key==='lightningRod')return{n,r,manual:true};
  const totalPost=post(p,resistances(),pen,taken,fireTaken,shockMag);
  return{n,r,p,totalPost,dps:totalPost*r.real,shockMag};
}
function baseline(){
  const c=baseCfg();if(!c)return null;
  const r=window.v44Model(c),p=split(c,r),shock=on('v53Shock') ? .20 : 0;
  const d=post(p,resistances(),{},0,0,shock);
  return{c,r,p,dps:d*r.real};
}
function gainPct(s,b){return s?.manual?null:(b?.dps>0?(s.dps/b.dps-1)*100:0)}
function route(name){const t=topo?.candidates?.[name];if(!t)return 'route pending';if(t.allocated)return 'TREE';if(!t.reachable)return 'unreachable';return `${t.newPoints} pts · ${String(t.classification||'').toUpperCase()}`}
function render(){
  const host=$('v53NodeLab'),b=baseline();if(!host||!b)return;
  const rows=NODES.map(n=>({n,s:simulate(n.k)})).map(x=>({...x,g:gainPct(x.s,b)}));
  const ranked=rows.filter(x=>x.g!=null).sort((a,b)=>b.g-a.g);
  $('v53Top').innerHTML=ranked.slice(0,5).map((x,i)=>`<div><span>#${i+1}</span><b>${x.n.name}</b><strong>+${x.g.toFixed(1)}%</strong><small>${route(x.n.name)}</small></div>`).join('');
  $('v53Rows').innerHTML=rows.map(x=>`<tr><td><b>${x.n.name}</b><small>${x.n.kind}</small></td><td>${x.n.effect}</td><td>${x.g==null?'POB / manual':`+${x.g.toFixed(1)}%`}</td><td>${route(x.n.name)}</td><td><small>${x.n.recipe}</small></td></tr>`).join('');
  const ar=b.c.arch?.0004*Math.max(1,b.c.mana):0,lightShare=b.r.hit>0?b.p.lightning/b.r.hit*100:0;
  $('v53Read').innerHTML=`<strong>Current split:</strong> Archmage contributes ${(ar*100).toFixed(1)}% of the Fire-base amount as extra Lightning; the live model is therefore about <b>${lightShare.toFixed(1)}% Lightning</b> before new gain-as-extra nodes. That is why Electric Amplification rises as Mana rises, while Cremation becomes relatively less important. <strong>Dynamism is additive</strong>, so its marginal value shrinks as Rathpith + Arcane Intensity inflate the increased-damage bucket.`;
}
async function loadTopo(){try{const r=await fetch(`./data/topology.json?t=${Date.now()}`,{cache:'no-store'});if(r.ok){topo=await r.json();render()}}catch(e){}}
function css(){
  if($('v53Css'))return;
  const s=document.createElement('style');s.id='v53Css';s.textContent=`
  #v53NodeLab{margin-top:18px;border:1px solid rgba(126,174,200,.25);border-radius:17px;padding:15px;background:linear-gradient(180deg,rgba(24,31,35,.96),rgba(17,13,10,.98))}.v53Head h3{margin:0 0 5px}.v53Head p{font-size:9px;color:#a7a093;line-height:1.45;margin:0;max-width:850px}.v53Controls{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:11px 0}.v53Ctl{border:1px solid var(--line);border-radius:10px;padding:8px;background:#120d0a}.v53Ctl label{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#9e907c;margin-bottom:4px}.v53Ctl input[type=number]{width:100%;background:#0b0807;color:#eadfcf;border:1px solid var(--line);border-radius:7px;padding:6px}.v53Checks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.v53Checks label{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:6px 8px;background:#15100c}.v53Top{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin:10px 0}.v53Top div{border:1px solid var(--line);border-radius:11px;padding:9px;background:#15100c}.v53Top span,.v53Top b,.v53Top strong,.v53Top small{display:block}.v53Top span{font-size:7px;color:#89b4c8}.v53Top b{font-size:9px;margin:2px 0}.v53Top strong{font-size:17px;color:#d8c087}.v53Top small{font-size:7px;color:#8f8374}.v53Read{font-size:9px;line-height:1.5;color:#b5a993;border-left:3px solid #6b9db3;padding:9px 11px;background:#120d0a;margin-top:9px}.v53Read strong{color:#e3d3b8}#v53NodeLab table{min-width:920px}#v53NodeLab td small{display:block;color:#8d8273;margin-top:3px}@media(max-width:900px){.v53Controls{grid-template-columns:1fr 1fr}.v53Top{grid-template-columns:1fr 1fr}}
  `;document.head.appendChild(s);
}
function mount(){
  if($('v53NodeLab'))return;
  const anchor=$('v52GainLab')||$('v51PackageLab')||$('anoints');if(!anchor)return setTimeout(mount,250);
  css();
  const sec=document.createElement('section');sec.id='v53NodeLab';sec.innerHTML=`
  <div class="v53Head"><h3>ADVANCED DAMAGE NOTABLES · MANA FLARE</h3><p>Ranks unusual damage buckets against the live calculator: gain-as-extra, penetration, enemy damage-taken, Shock magnitude, CDR and conditional ground tech. Route distance is pulled from the current PoB topology when available.</p></div>
  <div class="v53Controls"><div class="v53Ctl"><label>Enemy Fire res %</label><input id="v53FireRes" type="number" value="30"></div><div class="v53Ctl"><label>Enemy Cold res %</label><input id="v53ColdRes" type="number" value="30"></div><div class="v53Ctl"><label>Enemy Lightning res %</label><input id="v53LightRes" type="number" value="30"></div><div class="v53Ctl"><label>Enemy Chaos res %</label><input id="v53ChaosRes" type="number" value="0"></div><div class="v53Ctl"><label>Ignited boss seconds</label><input id="v53IgniteSecs" type="number" min="0" max="10" value="10"></div></div>
  <div class="v53Checks"><label><input id="v53Shock" type="checkbox" checked> Shock active</label><label><input id="v53CritShock" type="checkbox"> Shock came from crit</label><label><input id="v53Exposure" type="checkbox"> Exposure active</label><label><input id="v53Mark" type="checkbox"> Enemy Marked</label><label><input id="v53Ignite" type="checkbox"> Enemy Ignited</label><label><input id="v53ShockGround" type="checkbox"> Standing on Shocked Ground</label><label><input id="v53IgniteGround" type="checkbox"> Standing on Ignited Ground</label></div>
  <div id="v53Top" class="v53Top"></div><div class="tableWrap"><table><thead><tr><th>Node</th><th>Damage mechanism</th><th>Marginal DPS</th><th>Current tree distance</th><th>Liquid recipe</th></tr></thead><tbody id="v53Rows"></tbody></table></div><div id="v53Read" class="v53Read"></div>`;
  anchor.insertAdjacentElement('afterend',sec);
  sec.querySelectorAll('input').forEach(e=>{e.addEventListener('input',render);e.addEventListener('change',render)});
  window.addEventListener('v44calc',render);loadTopo();render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
