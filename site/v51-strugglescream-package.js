(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=x=>Math.round(x).toLocaleString();

const INSTILS={
  ie:{name:'Invocated Efficiency',recipe:['Concentrated Liquid Isolation','Liquid Envy','Liquid Paranoia'],effect:'10% Mana Cost Efficiency · Triggered Spells deal 40% increased Spell Damage',locked:true},
  dyn:{name:'Dynamism',recipe:['Concentrated Liquid Isolation','Diluted Liquid Greed','Diluted Liquid Ire'],effect:'40% increased Damage if you have Triggered a Skill Recently'},
  temp:{name:'Temporal Mastery',recipe:['Liquid Paranoia','Concentrated Liquid Fear','Liquid Disgust'],effect:'16% increased Cooldown Recovery Rate'},
  crem:{name:'Cremation',recipe:['Concentrated Liquid Isolation','Liquid Disgust','Concentrated Liquid Isolation'],effect:'Damage Penetrates 18% Fire Resistance · Gain 6% of Elemental Damage as Extra Fire Damage'}
};

const SHOPPING=[
  ['Concentrated Liquid Isolation',4],['Liquid Paranoia',2],['Liquid Disgust',2],['Liquid Envy',1],
  ['Diluted Liquid Greed',1],['Diluted Liquid Ire',1],['Concentrated Liquid Fear',1]
];

function checked(key){return $(`v51_${key}`)?.checked!==false}
function num(id,f){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}

function strippedBase(){
  if(!window.v44GetCfg)return null;
  const c=clone(window.v44GetCfg());
  // The package simulator owns these four instils so the comparison never double-counts IE.
  c.inv=false;
  return c;
}

function simulate(flags){
  const c=strippedBase();
  if(!c||!window.v44Model)return null;
  if(flags.ie)c.inv=true;
  if(flags.dyn)c.inc=(c.inc||0)+.40;
  if(flags.temp)c.cdr=(c.cdr||0)+.16;
  const r=window.v44Model(c);

  // v44 collapses Mana Flare + Archmage into one elemental hit. Re-split it here so Cremation's
  // Fire penetration only applies to the Fire portion, while its 6% gain-as-extra reads all elemental damage.
  const archRatio=c.arch?.0004*Math.max(1,c.mana):0;
  const fireOriginal=r.hit/(1+archRatio);
  const lightning=r.hit-fireOriginal;
  const extraFire=flags.crem?r.hit*.06:0;
  const fireTotal=fireOriginal+extraFire;
  const preHit=fireTotal+lightning;

  const fireRes=Math.max(0,Math.min(.90,num('v51FireRes',30)/100));
  const lightRes=Math.max(0,Math.min(.90,num('v51LightRes',30)/100));
  const fireAfterPen=Math.max(0,fireRes-(flags.crem?.18:0));
  const postHit=fireTotal*(1-fireAfterPen)+lightning*(1-lightRes);
  return {c,r,fireOriginal,lightning,extraFire,preHit,preDps:preHit*r.real,postHit,postDps:postHit*r.real,fireAfterPen};
}

function flagsFromUi(){return {ie:checked('ie'),dyn:checked('dyn'),temp:checked('temp'),crem:checked('crem')}}
function fullFlags(){return {ie:true,dyn:true,temp:true,crem:true}}
function offOne(key){const f=fullFlags();f[key]=false;return f}

function recipeHtml(item){return item.recipe.map((x,i)=>`<span class="v51Liquid ${/Concentrated/.test(x)?'conc':/Diluted/.test(x)?'dil':'mid'}">${i+1}. ${x}</span>`).join('')}

function render(){
  if(!$('v51PackageLab')||!window.v44GetCfg||!window.v44Model)return;
  const current=simulate(flagsFromUi()),base=simulate({ie:false,dyn:false,temp:false,crem:false}),full=simulate(fullFlags());
  if(!current||!base||!full)return;
  const gain=base.postDps>0?(current.postDps/base.postDps-1)*100:0;
  const fullGain=base.postDps>0?(full.postDps/base.postDps-1)*100:0;

  $('v51Stats').innerHTML=`
    <div class="v51Stat"><b>${fmt(current.preHit)}</b><span>Package Flare hit · pre-res</span></div>
    <div class="v51Stat"><b>${current.r.real.toFixed(2)}/s</b><span>Realised Flare rate</span></div>
    <div class="v51Stat"><b>${fmt(current.postDps)}</b><span>DPS after chosen resists</span></div>
    <div class="v51Stat"><b>+${gain.toFixed(1)}%</b><span>vs same build · no 4 instils</span></div>`;

  $('v51Read').innerHTML=`<strong>Current four-slot model:</strong> ${Object.entries(flagsFromUi()).filter(([,v])=>v).map(([k])=>INSTILS[k].name).join(' · ')||'none'}. `+
    `With your live calculator inputs this reaches <b>${current.r.theo.toFixed(2)}/s cooldown capacity</b>, ${current.r.triggerSat*100<99?(current.r.triggerSat*100).toFixed(1)+'% trigger saturation':'~99%+ trigger saturation'}, and <b>${current.r.cap}</b>. `+
    `The full recommended four is <b>+${fullGain.toFixed(1)}%</b> post-res DPS versus no Strugglescream instils at the resistance assumptions below.`;

  $('v51Marginals').innerHTML=Object.keys(INSTILS).map(key=>{
    const without=simulate(offOne(key));
    const marginal=without?.postDps>0?(full.postDps/without.postDps-1)*100:0;
    const rateDelta=without?full.r.real-without.r.real:0;
    return `<tr><td><strong>${INSTILS[key].name}</strong>${INSTILS[key].locked?'<br><small>USER-CONFIRMED CURRENT INSTIL</small>':''}</td><td>${marginal.toFixed(1)}%</td><td>${rateDelta>=.005?'+'+rateDelta.toFixed(2)+'/s':'payload / mitigation'}</td><td>${INSTILS[key].effect}</td></tr>`;
  }).join('');

  $('v51Split').textContent=`Cremation split at current inputs: original Fire ${fmt(current.fireOriginal)} + Archmage/Lightning ${fmt(current.lightning)}${flagsFromUi().crem?' + extra Fire '+fmt(current.extraFire):''}. Fire resistance after Cremation penetration: ${(current.fireAfterPen*100).toFixed(0)}%. Penetration is never applied to the Lightning portion.`;
}

function build(){
  const sec=$('anoints');
  if(!sec||$('v51PackageLab'))return;
  const style=document.createElement('style');
  style.textContent=`
    .v51Lab{margin-top:18px}.v51Grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin:10px 0}.v51Pick{border:1px solid var(--line);border-radius:14px;padding:11px;background:#1a120e;position:relative}.v51Pick label{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:900}.v51Pick input{accent-color:#d9b370}.v51Pick p{font-size:8.5px;line-height:1.4;color:#a99c88;margin:7px 0}.v51Liquid{display:block;font-size:8px;padding:4px 6px;border-radius:7px;margin-top:4px;border:1px solid rgba(217,179,112,.18);color:#d7c5a5;background:#120d0a}.v51Liquid.conc{border-color:rgba(197,146,215,.34);color:#dab8e8}.v51Liquid.dil{border-color:rgba(118,166,190,.30);color:#afd0df}.v51Stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}.v51Stat{border:1px solid var(--line);border-radius:12px;padding:10px;background:#15100c}.v51Stat b{display:block;font-size:18px;color:#ead8b9}.v51Stat span{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.08em;color:#8f816d;margin-top:3px}.v51Shop{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px}.v51Shop span{font-size:8.5px;border:1px solid var(--line);background:#17100c;border-radius:999px;padding:6px 8px;color:#d8c6a6}.v51Controls{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:9px 0}.v51Controls label{font-size:8px;text-transform:uppercase;letter-spacing:.08em;color:#968772}.v51Controls input{width:100%;margin-top:5px;background:#100b08;color:#eadfca;border:1px solid var(--line);border-radius:8px;padding:8px}.v51Locked{position:absolute;right:9px;top:9px;font-size:7px;color:#9ed3aa;border:1px solid rgba(120,190,140,.3);padding:3px 5px;border-radius:999px}.v51Formula{font-size:8.5px;color:#998b77;line-height:1.5;margin-top:8px}
    @media(max-width:900px){.v51Grid,.v51Stats,.v51Controls{grid-template-columns:1fr 1fr}}@media(max-width:600px){.v51Grid,.v51Stats,.v51Controls{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const wrap=document.createElement('div');wrap.className='v51Lab card';wrap.id='v51PackageLab';
  wrap.innerHTML=`
    <div class="kicker">CURRENT STRUGGLESCREAM PACKAGE · LIVE CALC</div>
    <h3 style="font-size:25px">IE + Dynamism + Temporal Mastery + Cremation</h3>
    <p class="small">This package is modelled mechanically, not as four generic damage notables. IE and Dynamism enter the increased-damage bucket; Temporal adds 16% CDR and therefore must pass the trigger/recovery caps; Cremation gains 6% of Elemental Damage as extra Fire and penetrates 18% Fire resistance only on the Fire portion.</p>
    <div class="v51Grid">
      ${Object.entries(INSTILS).map(([key,x])=>`<article class="v51Pick">${x.locked?'<span class="v51Locked">CURRENT</span>':''}<label><input id="v51_${key}" type="checkbox" checked> ${x.name}</label><p>${x.effect}</p>${recipeHtml(x)}</article>`).join('')}
    </div>
    <h4 style="margin:12px 0 4px">Combined shopping list · all 4 instils</h4>
    <div class="v51Shop">${SHOPPING.map(([n,q])=>`<span><b>${q}×</b> ${n}</span>`).join('')}</div>
    <div class="v51Controls"><label>Enemy Fire resistance %<input id="v51FireRes" type="number" value="30" min="0" max="90" step="5"></label><label>Enemy Lightning resistance %<input id="v51LightRes" type="number" value="30" min="0" max="90" step="5"></label></div>
    <div class="v51Stats" id="v51Stats"></div>
    <div class="callout" id="v51Read"></div>
    <h4 style="margin:13px 0 6px">What each slot is actually worth · remove-one test</h4>
    <div class="tableWrap"><table><thead><tr><th>Instil</th><th>Marginal DPS in full package</th><th>Rate effect</th><th>Mechanic</th></tr></thead><tbody id="v51Marginals"></tbody></table></div>
    <div class="formula v51Formula" id="v51Split"></div>
    <div class="small" style="margin-top:8px">Recipes verified against current PoE2DB data. Liquid tiers are shown with their full current item names so you can buy the correct Diluted / Liquid / Concentrated versions.</div>`;
  const anchor=sec.querySelector('.v47PathScore')||sec.lastElementChild;
  if(anchor)anchor.insertAdjacentElement('afterend',wrap);else sec.appendChild(wrap);
  wrap.querySelectorAll('input').forEach(x=>{x.addEventListener('input',render);x.addEventListener('change',render)});
  render();
}

function start(){build();render()}
start();
window.addEventListener('v44calc',()=>setTimeout(render,0));
setTimeout(start,350);
})();
