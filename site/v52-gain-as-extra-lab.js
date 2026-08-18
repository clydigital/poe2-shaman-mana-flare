(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=x=>Math.round(x).toLocaleString();

const WAND_PRESETS={
  none:{label:'No gain-as-extra wand prefix',value:0},
  t3:{label:'T3 wand · ~23% as extra (22–24%)',value:.23},
  t2:{label:'T2 wand · ~26% as extra (25–27%)',value:.26},
  t1:{label:'T1 wand · ~29% as extra (28–30%)',value:.29}
};
const ELS=['fire','cold','lightning','chaos'];
const pretty={fire:'Fire',cold:'Cold',lightning:'Lightning',chaos:'Chaos'};

function num(id,f=0){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}
function on(id){return !!$(id)?.checked}
function clampRes(v){return Math.max(-.50,Math.min(.90,v/100))}

function packageCfg(){
  if(!window.v44GetCfg||!window.v44Model)return null;
  const c=clone(window.v44GetCfg());
  // Own the Strugglescream package here to avoid double-counting IE from the main calculator checkbox.
  c.inv=false;
  if(on('v52UseIE'))c.inv=true;
  if(on('v52UseDynamism'))c.inc=(c.inc||0)+.40;
  if(on('v52UseTemporal'))c.cdr=(c.cdr||0)+.16;
  return c;
}

function baseSplit(c,r){
  const archRatio=c.arch?.0004*Math.max(1,c.mana):0;
  const fire=r.hit/(1+archRatio);
  const lightning=r.hit-fire;
  return {fire,cold:0,lightning,chaos:0,total:r.hit};
}

function extras(c,r){
  const out={fire:0,cold:0,lightning:0,chaos:0};
  const original=r.hit;

  // Generic global Gain X% of Damage as Extra Y. These are intentionally calculated from the
  // original hit rather than recursively from other gained damage, keeping the model conservative.
  for(const el of ELS) out[el]+=original*Math.max(0,num(`v52Extra_${el}`,0))/100;

  // Cremation: Gain 6% of Elemental Damage as Extra Fire. The current Mana-Flare model is Fire + Archmage Lightning.
  if(on('v52UseCremation')) out.fire+=original*.06;

  // Against the Darkness helper: one selected notable-line, multiplied by actual notable count in radius.
  const atdCount=Math.max(0,num('v52AtdCount',0));
  const atdPct=Math.max(0,num('v52AtdPct',4))/100;
  const atdEl=$('v52AtdElement')?.value||'fire';
  out[atdEl]+=original*atdCount*atdPct;

  // Rare wand prefix helper. T1 = midpoint 29% of Damage as Extra Fire/Cold/Lightning.
  const wp=WAND_PRESETS[$('v52WandPreset')?.value||'none']||WAND_PRESETS.none;
  const wandEl=$('v52WandElement')?.value||'fire';
  if(wandEl!=='chaos')out[wandEl]+=original*wp.value;

  return out;
}

function simulate(){
  const c=packageCfg();
  if(!c)return null;
  const r=window.v44Model(c),base=baseSplit(c,r),gain=extras(c,r);
  const parts={};
  for(const el of ELS)parts[el]=base[el]+gain[el];
  const pre=ELS.reduce((s,k)=>s+parts[k],0);

  const res={
    fire:clampRes(num('v52Res_fire',30)),
    cold:clampRes(num('v52Res_cold',30)),
    lightning:clampRes(num('v52Res_lightning',30)),
    chaos:clampRes(num('v52Res_chaos',0))
  };
  // Cremation penetration only applies to Fire and cannot push positive resistance below 0 in this model.
  const fireRes=on('v52UseCremation')?Math.max(0,res.fire-.18):res.fire;
  const effectiveRes={...res,fire:fireRes};
  const post=ELS.reduce((s,k)=>s+parts[k]*(1-effectiveRes[k]),0);

  const noExtras=base.fire*(1-(on('v52UseCremation')?Math.max(0,res.fire-.18):res.fire))+
                 base.lightning*(1-res.lightning);
  return {c,r,base,gain,parts,pre,post,noExtras,effectiveRes};
}

function sourceGainPct(sim){
  const base=sim.base.total;
  return base>0?(sim.pre/base-1)*100:0;
}

function render(){
  const host=$('v52GainLab');if(!host)return;
  const s=simulate();if(!s)return;
  const preGain=sourceGainPct(s);
  const postBase=Math.max(1,s.noExtras*s.r.real);
  const postDps=s.post*s.r.real;
  const postGain=(postDps/postBase-1)*100;
  const wp=WAND_PRESETS[$('v52WandPreset')?.value||'none']||WAND_PRESETS.none;
  const atdTotal=Math.max(0,num('v52AtdCount',0))*Math.max(0,num('v52AtdPct',4));

  $('v52Stats').innerHTML=`
    <div class="v52Stat"><b>+${preGain.toFixed(1)}%</b><span>Extra damage · pre-res</span></div>
    <div class="v52Stat"><b>${fmt(s.pre)}</b><span>Flare hit incl. gained damage</span></div>
    <div class="v52Stat"><b>${fmt(postDps)}</b><span>Realised DPS after resists</span></div>
    <div class="v52Stat"><b>+${postGain.toFixed(1)}%</b><span>Post-res gain vs same package</span></div>`;

  $('v52Breakdown').innerHTML=ELS.map(el=>{
    const g=s.gain[el],pct=s.base.total>0?g/s.base.total*100:0;
    return `<div><strong>${pretty[el]}</strong><b>${fmt(s.parts[el])}</b><span>+${pct.toFixed(1)}% of original hit gained · ${(s.effectiveRes[el]*100).toFixed(0)}% effective res</span></div>`;
  }).join('');

  $('v52Read').innerHTML=`<strong>Why this matters:</strong> Rathpith + Arcane Intensity + Dynamism + IE already create a very large <em>increased-damage</em> bucket. `+
    `“Gain as Extra” creates additional base damage instead, so a ${wp.value?Math.round(wp.value*100)+'% wand roll':'good gain-as-extra source'} can be far more valuable than another ordinary +damage line. `+
    `${atdTotal>0?`Your Against the Darkness helper is currently modelling <b>${atdTotal.toFixed(0)}% of the original hit as extra ${pretty[$('v52AtdElement')?.value||'fire']}</b> from notables in radius. `:''}`+
    `This lab deliberately does <b>not</b> recursively chain gained damage into further gained damage, so it errs conservative rather than producing fantasy numbers.`;
}

function preset(type){
  if(type==='clear'){
    for(const el of ELS){const e=$(`v52Extra_${el}`);if(e)e.value=0}
    if($('v52AtdCount'))$('v52AtdCount').value=0;
    if($('v52WandPreset'))$('v52WandPreset').value='none';
  }
  if(type==='wandT1'){
    if($('v52WandPreset'))$('v52WandPreset').value='t1';
  }
  if(type==='atd4x4'){
    if($('v52AtdCount'))$('v52AtdCount').value=4;
    if($('v52AtdPct'))$('v52AtdPct').value=4;
  }
  render();
}
window.v52GainPreset=preset;

function css(){
  if(document.getElementById('v52GainCss'))return;
  const s=document.createElement('style');s.id='v52GainCss';s.textContent=`
  #v52GainLab{margin-top:18px;border:1px solid rgba(217,179,112,.25);border-radius:17px;padding:15px;background:linear-gradient(180deg,rgba(38,26,18,.97),rgba(19,13,10,.98))}
  .v52Head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.v52Head h3{margin:0 0 5px}.v52Head p{margin:0;color:#aa9c87;font-size:9px;line-height:1.45;max-width:760px}
  .v52Stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.v52Stat{border:1px solid var(--line);border-radius:12px;padding:10px;background:#15100c}.v52Stat b{display:block;font-size:20px;color:#ead8b9}.v52Stat span{font-size:7.5px;text-transform:uppercase;letter-spacing:.08em;color:#8f816d}
  .v52Grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.v52Ctl{border:1px solid var(--line);border-radius:11px;padding:9px;background:#120d0a}.v52Ctl label{font-size:7.5px;text-transform:uppercase;letter-spacing:.08em;color:#9f907a;display:block;margin-bottom:5px}.v52Ctl input,.v52Ctl select{width:100%;background:#0c0907;color:#eadfcb;border:1px solid var(--line);border-radius:8px;padding:7px;font-size:9px}
  .v52Checks{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}.v52Checks label{font-size:8px;border:1px solid var(--line);border-radius:999px;padding:6px 8px;background:#15100c}.v52Checks input{accent-color:#d9b370;vertical-align:middle;margin-right:4px}
  .v52Breakdown{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}.v52Breakdown div{border:1px solid var(--line);border-radius:11px;padding:9px}.v52Breakdown strong,.v52Breakdown b,.v52Breakdown span{display:block}.v52Breakdown strong{font-size:8px;color:#d6b87f}.v52Breakdown b{font-size:16px;margin:2px 0}.v52Breakdown span{font-size:7.7px;color:#918572;line-height:1.35}
  .v52Btns{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}.v52Btns button{border:1px solid var(--line);background:#1c130e;color:#d8bd89;border-radius:999px;padding:6px 8px;font-size:8px;cursor:pointer}.v52Read{font-size:9px;line-height:1.5;color:#afa18d;border-left:3px solid #b88c52;padding:9px 11px;background:#120d0a;margin-top:10px}.v52Read strong{color:#ead7b5}
  @media(max-width:900px){.v52Stats,.v52Grid,.v52Breakdown{grid-template-columns:1fr 1fr}.v52Head{display:block}}
  `;document.head.appendChild(s);
}

function mount(){
  if($('v52GainLab'))return;
  const anchor=$('v51PackageLab')||$('anoints')||document.querySelector('.page.active');
  if(!anchor)return setTimeout(mount,250);
  css();
  const sec=document.createElement('section');sec.id='v52GainLab';sec.innerHTML=`
    <div class="v52Head"><div><h3>GAIN AS EXTRA · DAMAGE LAB</h3><p>Model global “Gain X% of Damage as Extra Y” separately from increased Spell/Fire damage. Includes rare-wand prefixes, Against the Darkness notable scaling, Cremation and manual weird-tech inputs.</p></div></div>
    <div id="v52Stats" class="v52Stats"></div>
    <div class="v52Checks">
      <label><input id="v52UseIE" type="checkbox" checked> Invocated Efficiency</label>
      <label><input id="v52UseDynamism" type="checkbox" checked> Dynamism</label>
      <label><input id="v52UseTemporal" type="checkbox" checked> Temporal Mastery</label>
      <label><input id="v52UseCremation" type="checkbox" checked> Cremation</label>
    </div>
    <h4>Manual global gain-as-extra</h4>
    <div class="v52Grid">
      ${ELS.map(el=>`<div class="v52Ctl"><label>Damage as extra ${pretty[el]} %</label><input id="v52Extra_${el}" type="number" min="0" max="200" step="1" value="0"></div>`).join('')}
    </div>
    <h4>Source helpers</h4>
    <div class="v52Grid">
      <div class="v52Ctl"><label>Rare wand prefix</label><select id="v52WandPreset">${Object.entries(WAND_PRESETS).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}</select></div>
      <div class="v52Ctl"><label>Wand extra element</label><select id="v52WandElement"><option value="fire">Fire</option><option value="cold">Cold</option><option value="lightning">Lightning</option></select></div>
      <div class="v52Ctl"><label>Against Darkness · notables in radius</label><input id="v52AtdCount" type="number" min="0" max="12" step="1" value="0"></div>
      <div class="v52Ctl"><label>ATD gain per notable %</label><input id="v52AtdPct" type="number" min="0" max="4" step="1" value="4"></div>
      <div class="v52Ctl"><label>ATD extra element</label><select id="v52AtdElement">${ELS.map(el=>`<option value="${el}">${pretty[el]}</option>`).join('')}</select></div>
      ${ELS.map(el=>`<div class="v52Ctl"><label>Enemy ${pretty[el]} resistance %</label><input id="v52Res_${el}" type="number" min="-50" max="90" step="1" value="${el==='chaos'?0:30}"></div>`).join('')}
    </div>
    <div class="v52Btns"><button onclick="v52GainPreset('wandT1')">Preset · T1 wand</button><button onclick="v52GainPreset('atd4x4')">Preset · ATD 4 notables × 4%</button><button onclick="v52GainPreset('clear')">Clear extra sources</button></div>
    <div id="v52Breakdown" class="v52Breakdown"></div>
    <div id="v52Read" class="v52Read"></div>
    <div class="v52Read"><strong>Current high-value sources to remember:</strong> rare wand prefixes reach 28–30% of Damage as Extra Fire/Cold/Lightning at T1; Against the Darkness can make each notable in radius grant 2–4% of Damage as Extra Fire/Cold/Lightning/Chaos; Cremation adds 6% of Elemental Damage as Extra Fire plus Fire penetration. Treat these as separate multiplicative-ish base-damage layers when comparing gear and instils.</div>`;
  anchor.insertAdjacentElement('afterend',sec);
  sec.querySelectorAll('input,select').forEach(e=>{e.addEventListener('input',render);e.addEventListener('change',render)});
  window.addEventListener('v44calc',render);
  render();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
