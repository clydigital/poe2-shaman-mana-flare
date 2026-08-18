(() => {
'use strict';
const $=id=>document.getElementById(id);
let topo=null;
const EFFECT={
  'Ruinic Helm':4.5,'Arcane Blossom':5.0,'Dynamism':4.5,'Controlling Magic':4.0,
  'Invocated Efficiency':5.0,'Throatseeker':4.0,'Shredding Force':4.0,'Desensitisation':3.5
};
const ORDER=['Ruinic Helm','Arcane Blossom','Dynamism','Controlling Magic','Invocated Efficiency','Throatseeker','Shredding Force','Desensitisation'];
const clone=x=>JSON.parse(JSON.stringify(x));

function utility(node){
  const name=String(node?.name||'').toLowerCase();
  const stats=(node?.stats||[]).join(' ').toLowerCase();
  if(name.includes('jewel')&&name.includes('socket'))return 1.00;
  if(stats.includes('mana regeneration'))return 1.00;
  if(stats.includes('triggered')&&stats.includes('spell')&&stats.includes('damage'))return 1.00;
  if(stats.includes('critical hit chance')&&stats.includes('spell'))return .85;
  if(stats.includes('critical spell damage')||stats.includes('critical damage bonus'))return .75;
  const armour=stats.includes('armour'),maxEs=stats.includes('maximum')&&stats.includes('energy shield');
  const elemental=armour&&stats.includes('elemental damage'),recharge=stats.includes('energy shield recharge');
  if(armour&&maxEs&&elemental)return .95;
  if(armour&&maxEs)return .75;
  if(armour&&recharge)return .30;
  if(name==='attribute'||stats.includes('+5 to any'))return .35;
  if(stats.includes('physical damage'))return 0;
  return .20;
}
function quality(t){
  const lead=t?.leadIns||[];
  if(!lead.length)return{dead:0,pct:1,label:'DIRECT'};
  const useful=lead.reduce((s,n)=>s+utility(n),0),dead=Math.max(0,lead.length-useful),pct=useful/lead.length;
  return{dead,pct,label:pct>=.72?'HIGH-VALUE PATH':pct>=.42?'MIXED PATH':'DEAD-HEAVY PATH'};
}
function rawGain(name){
  const row=[...document.querySelectorAll('#frontAnointTable tbody tr')].find(r=>r.querySelector('td:nth-child(2) b')?.textContent.trim()===name);
  if(row)return Number.parseFloat(row.querySelector('td:nth-child(4)')?.textContent||'0')||0;
  if(!window.v44GetCfg||!window.v44Model)return 0;
  try{
    const cfg=clone(window.v44GetCfg()),before=window.v44Model(cfg);
    if(name==='Arcane Blossom')cfg.rr=(cfg.rr||0)+.15;
    else if(name==='Invocated Efficiency')cfg.inc=(cfg.inc||0)+.40;
    else return 0;
    const after=window.v44Model(cfg);
    return before?.dps>0?Math.max(0,(after.dps/before.dps-1)*100):0;
  }catch(e){return 0}
}
function score(name,t){
  if(!t?.reachable||t.allocated||t.classification==='allocated'||t.classification==='natural')return null;
  const q=quality(t);return (EFFECT[name]||0)+Math.min(q.dead,10)*.45+Math.min(rawGain(name),25)*.08;
}
function action(t,q){
  if(!t)return 'Topology unavailable.';
  if(t.allocated||t.classification==='allocated')return '<strong>TREE — DO NOT INSTIL.</strong> Spend the Strugglescream slot elsewhere.';
  if(t.classification==='natural')return `<strong>PATH IT — DO NOT INSTIL.</strong> Only ${t.newPoints} new passive point${t.newPoints===1?'':'s'} from the current tree.`;
  if(t.classification==='nearby'&&q.pct>=.65)return `<strong>PATH LEAN.</strong> ${t.newPoints} points including the notable, and ${Math.round(q.pct*100)}% of the intervening travel is useful to this EB build.`;
  if(t.classification==='nearby')return `<strong>COMPARE.</strong> ${t.newPoints} points including the notable with ${q.dead.toFixed(1)} dead-equivalent travel points.`;
  if(t.classification==='remote'&&q.pct>=.72)return `<strong>REMOTE, BUT VALUE-RICH.</strong> ${t.newPoints} points away; much of the route itself is useful.`;
  if(t.classification==='remote')return `<strong>INSTIL CANDIDATE.</strong> ${t.newPoints} points away and ${q.dead.toFixed(1)} dead-equivalent travel points are actually skipped.`;
  return 'No topology bonus assigned.';
}
function apply(){
  if(!topo?.candidates)return;
  for(const name of ORDER){
    const t=topo.candidates[name],row=document.querySelector(`tr[data-topology-name="${CSS.escape(name)}"]`);if(!row||!t)continue;
    const cells=row.querySelectorAll('td'),q=quality(t),s=score(name,t),gain=rawGain(name);
    if(cells[4]){
      const cls=t.classification==='natural'?'a':t.classification==='allocated'?'b':t.classification==='remote'?'s':'test';
      const badge=t.classification==='natural'?'NATURAL':t.classification==='allocated'?'TREE':String(t.classification||'check').toUpperCase();
      const scoreText=s==null?(t.classification==='natural'?'PATH IT':t.allocated?'INELIGIBLE':'—'):`${s.toFixed(2)} · ${q.dead.toFixed(1)} dead-eq · ${gain.toFixed(1)}% model`;
      cells[4].innerHTML=`<span class="tier ${cls}">${badge}</span><br><small>${q.label} · ${Math.round(q.pct*100)}% useful travel</small><br><small>${scoreText}</small>`;
    }
    if(cells[5])cells[5].innerHTML=action(t,q);
  }
  const ranked=ORDER.map(name=>({name,s:score(name,topo.candidates[name])})).filter(x=>x.s!=null).sort((a,b)=>b.s-a.s).slice(0,4);
  if($('v47EffNames'))$('v47EffNames').textContent=ranked.map(x=>x.name).join(' · ');
  if($('v47EffCombo'))$('v47EffCombo').textContent=`${ranked.length}/4 slots · topology-filtered`;
  if($('v47TopoRule'))$('v47TopoRule').textContent=`${topo.matchedAllocatedNodeCount??'—'} / ${topo.allocatedNodeCount??'—'} current PoB node IDs matched to GGG's graph. Route distance is exact; equal-length routes are tie-broken for this EB build, preferring Mana regen, Triggered Spell Damage, useful crit/CDB, maximum ES and Armour→Elemental over ES recharge/dead travel.`;
  if($('v47TopoCallout'))$('v47TopoCallout').innerHTML='<strong>Topology result:</strong> Controlling Magic is directly adjacent to the allocated tree — 1 point, so path it. Ruinic Helm is 4 points, but its equal-length route now correctly uses the +maximum ES / Armour-applies-to-Elemental branch instead of the EB-useless recharge branch.';
}
async function load(){
  try{const r=await fetch(`./data/topology.json?t=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw 0;topo=await r.json();apply()}catch(e){}
}
function loadBodyLab(){
  if(document.querySelector('script[data-v49-body-lab]'))return;
  const s=document.createElement('script');
  s.src='./v49-body-lab.js';
  s.dataset.v49BodyLab='1';
  document.head.appendChild(s);
}
load();
loadBodyLab();
window.addEventListener('v44calc',()=>setTimeout(apply,0));
setTimeout(()=>{if(topo)apply()},250);
})();
