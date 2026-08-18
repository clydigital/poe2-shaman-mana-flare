(() => {
'use strict';
const $=id=>document.getElementById(id);
const fmt=x=>Math.round(x).toLocaleString();

const PRESETS={
  none:{name:'No Mana flask',total:0,duration:0,useRate:0,recInc:0,overflow:false,charges:0,note:'No flask recovery in the Mana-Flare model.'},
  rare:{name:'Lv53 · Saturated Transcendent',total:285*1.78,duration:3.5,useRate:.18,recInc:12,overflow:false,charges:6.9,note:'Current-level sustained default. Saturated midpoint = 78% increased amount. Chemist midpoint = 31% reduced charges used.'},
  rarequest:{name:'Lv53 · Saturated Transcendent + Act 4 Mana reward',total:285*1.78,duration:3.5,useRate:.18,recInc:42,overflow:false,charges:6.9,note:'Same flask after taking Goddess of Justice: +30% Mana Recovery from Flasks, added to the current ~12% flask-recovery baseline.'},
  ultimate:{name:'Lv60 · Saturated Ultimate + Act 4 Mana reward',total:310*1.78,duration:3,useRate:.18,recInc:42,overflow:false,charges:6.9,note:'Preferred sustained endgame baseline before exotic flask/belt tech.'},
  lowmana:{name:'Lv60 · Prolonged Ultimate · Low-Mana burst',total:310*1.955,duration:3,useRate:.18,recInc:42,overflow:false,charges:6.9,note:'Uses the midpoint of 91–100% MORE recovery while on Low Mana. Conditional burst option; do not count it while above Low Mana.'},
  uhtred:{name:"Uhtred's Chalice · overflow burst",total:285*3.50,duration:3.5/.30,useRate:.10,recInc:42,overflow:true,charges:10,note:'250% increased amount midpoint, but 70% reduced recovery rate. Best as an overflow/opening-hit flask, not the sustained default.'},
  double:{name:'Waistgate lab · rare + Uhtred',total:(310*1.78)+(285*3.50),duration:0,useRate:.10,recInc:67,overflow:true,charges:0,note:'Experimental combined-average model only. Assumes ~25% Waistgate Mana-flask recovery plus the Act 4 reward/current baseline; actual two-flask timing must be tested manually.'}
};

const LIFE=[
  {stage:'Now · Lv53',name:'Seething Transcendent Life Flask',base:'840 Life / 4s base',why:'50% amount but Instant Recovery. With your Mana pool doing defensive/offensive work, the Life slot should be a panic button.'},
  {stage:'Lv60+',name:'Seething Ultimate Life Flask',base:'920 Life / 3s base',why:'Same emergency role on the higher base. Prefer charge efficiency on the suffix.'},
  {stage:'Alternative',name:'Bubbling Life Flask',base:'28–30% recovery applied instantly',why:'Use this if half-value Seething feels too small; part lands immediately and the rest continues over time.'}
];

function questOn(){const e=$('v51Quest');return e?e.checked:true}
function currentGlobalInc(p){
  let x=p.recInc;
  if((p===PRESETS.rare)&&questOn())x+=30;
  return x;
}
function burstPerSecond(p){
  if(!p.total||!p.duration)return 0;
  return p.total*(1+currentGlobalInc(p)/100)/p.duration;
}
function averagePerSecond(p){return p.total*(1+currentGlobalInc(p)/100)*p.useRate}
function startingUses(p){return p.charges?75/p.charges:0}

function applyPreset(key){
  const p=PRESETS[key]||PRESETS.none;
  const inc=currentGlobalInc(p);
  if($('cFlaskPerUse'))$('cFlaskPerUse').value=Math.round(p.total);
  if($('cFlaskRecInc'))$('cFlaskRecInc').value=inc;
  if($('cFlaskUseRate'))$('cFlaskUseRate').value=p.useRate;
  if($('cOverflow'))$('cOverflow').checked=!!p.overflow;
  window.v44RenderCalc?.();
  renderLab(key);
}
window.v51ApplyFlask=applyPreset;
window.v44PresetFlask=name=>{
  const map={none:'none',rare:'rarequest',uhtred:'uhtred',double:'double'};
  applyPreset(map[name]||name);
};

function renderLab(active='rarequest'){
  const host=$('v51FlaskRows');if(!host)return;
  const rows=['rare','rarequest','ultimate','lowmana','uhtred','double'].map(k=>[k,PRESETS[k]]);
  host.innerHTML=rows.map(([k,p])=>`<tr${k===active?' class="v51Active"':''}>
    <td><strong>${p.name}</strong><br><small>${p.note}</small></td>
    <td>${fmt(p.total)}</td>
    <td>${p.duration?`${p.duration.toFixed(2)}s`:'mixed'}</td>
    <td>${fmt(burstPerSecond(p))}/s</td>
    <td>${fmt(averagePerSecond(p))}/s</td>
    <td>${p.charges?`${p.charges.toFixed(1)} · ~${startingUses(p).toFixed(1)} starts`:'mixed'}</td>
    <td><button type="button" onclick="v51ApplyFlask('${k}')">Use preset</button></td>
  </tr>`).join('');
  const p=PRESETS[active]||PRESETS.rarequest;
  const read=$('v51FlaskRead');if(read)read.innerHTML=`<strong>${p.name}</strong> contributes about <b>${fmt(averagePerSecond(p))} Mana/s</b> to the compact sustained model at the preset use-rate, while one active effect restores roughly <b>${fmt(burstPerSecond(p))} Mana/s</b>${p.overflow?' and can Overflow maximum Mana':''}. Adjust the main calculator's uses/sec for your real boss/map charge economy.`;
}

function addCss(){
  if($('v51FlaskCss'))return;
  const s=document.createElement('style');s.id='v51FlaskCss';s.textContent=`
  #v51FlaskEngine{margin-top:14px}.v51Grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:10px 0}.v51Choice{border:1px solid var(--line);border-radius:13px;padding:11px;background:#19120e}.v51Choice b{display:block;font-size:11px;color:#ead8b9;margin:3px 0}.v51Choice span{font-size:7px;color:#9f8c72;text-transform:uppercase;letter-spacing:.09em}.v51Choice p{font-size:9px;line-height:1.45;color:#a99c88;margin:5px 0 0}.v51Active{background:rgba(217,179,112,.07)}#v51FlaskRows button{background:#2b1d13;border:1px solid rgba(217,179,112,.3);color:#e5c892;border-radius:8px;padding:6px 8px;font:inherit;font-size:8px;font-weight:900;cursor:pointer}.v51Quest{display:flex;align-items:center;gap:7px;margin:9px 0;font-size:9px;color:#c7b79f}.v51Quest input{accent-color:#d9b370}.v51Call{border-left:3px solid #d9b370;background:#17100c;border-radius:0 11px 11px 0;padding:10px 12px;font-size:9px;line-height:1.5;color:#b9aa93}.v51Call strong{color:#ead3a9}@media(max-width:900px){.v51Grid{grid-template-columns:1fr}}
  `;document.head.appendChild(s);
}

function build(){
  if($('v51FlaskEngine'))return;
  const page=document.querySelector('.appPage[data-page="guide"]')||document.querySelector('.appPage[data-page="experiments"]');
  if(!page)return;
  const sec=document.createElement('div');sec.className='card';sec.id='v51FlaskEngine';
  sec.innerHTML=`<div class="kicker">FLASK ENGINE · CURRENT RECOMMENDATION</div><h2 style="font-size:38px">Mana flask is part of the damage engine.</h2><p class="small">Mana Flare consumes 25% of <em>current</em> Mana, so a faster refill raises realised Flare/s and keeps later Flares from shrinking. The table separates <b>one-active-effect recovery speed</b> from the compact calculator's <b>average sustained contribution</b>.</p>
    <div class="v51Grid">
      <article class="v51Choice"><span>NOW · LV53</span><b>Saturated Transcendent Mana Flask</b><p>Default sustained flask. Aim Saturated (76–80% increased amount) + Chemist (30–32% reduced charges/use). For very long bosses, of the Sylvan gives 0.25 charges/sec instead.</p></article>
      <article class="v51Choice"><span>LV60+</span><b>Saturated Ultimate Mana Flask</b><p>Same affix plan on the 310 Mana / 3s base. This is the normal endgame flask unless the build specifically wants overflow.</p></article>
      <article class="v51Choice"><span>BURST SWAP</span><b>Uhtred's Chalice</b><p>Overflow lets recovery exceed max Mana, which can juice the next Mana Flare. 70% reduced recovery rate makes it worse as the repeated-refill flask.</p></article>
    </div>
    <label class="v51Quest"><input id="v51Quest" type="checkbox" checked> Include Act 4 Goddess of Justice: +30% Mana Recovery from Flasks</label>
    <div class="tableWrap"><table><thead><tr><th>Mana-flask preset</th><th>Total / use*</th><th>Duration*</th><th>Active recovery</th><th>Avg model recovery</th><th>Charge cost</th><th></th></tr></thead><tbody id="v51FlaskRows"></tbody></table></div>
    <div id="v51FlaskRead" class="v51Call" style="margin-top:9px"></div>
    <div class="v51Grid">
      ${LIFE.map(x=>`<article class="v51Choice"><span>${x.stage}</span><b>${x.name}</b><p>${x.base}. ${x.why}</p></article>`).join('')}
    </div>
    <div class="formula">Sustained calculator contribution = total Mana recovered per use × (1 + increased Mana recovery from flasks) × realistic uses/sec.\n\nOne-active-effect recovery/s = total per use × recovery modifiers ÷ effect duration. Uhtred uses a ~250% increased-amount midpoint and its 70% reduced recovery rate. Low-Mana Prolonged is conditional and should only be selected when the flask is actually used on Low Mana.\n\nThe compact calculator still applies global Mana Recovery Rate and the MoM 50% less Mana Recovery penalty after flask recovery, matching the rest of the recovery engine.</div>
    <div class="sourceList" style="margin-top:9px"><a href="https://poe2db.tw/us/Mana_Flasks" target="_blank">PoE2DB · Mana Flasks<small>Ultimate/Transcendent bases; Saturated, Prolonged, Chemist, Sylvan.</small></a><a href="https://poe2db.tw/us/Uhtreds_Chalice" target="_blank">PoE2DB · Uhtred's Chalice<small>Overflow, amount, recovery-rate and charge penalties.</small></a><a href="https://poe2db.tw/us/Abandoned_Prison" target="_blank">PoE2DB · Goddess of Justice<small>30% Mana Recovery from Flasks is the build choice.</small></a></div>`;
  page.appendChild(sec);
  $('v51Quest')?.addEventListener('change',()=>{renderLab();if($('cFlaskRecInc'))$('cFlaskRecInc').value=questOn()?42:12;window.v44RenderCalc?.()});
  renderLab('rarequest');
}

addCss();
build();
})();
