(() => {
'use strict';
const $=id=>document.getElementById(id);
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=x=>Math.round(x).toLocaleString();

const PRESETS=[
  {id:'vile',name:'Vile Robe rare',es:610,direct:40,int:0,regen:0,utility:'Highest average rare raw ES · 2× Perfect Iron assumed'},
  {id:'flowing',name:'Flowing Raiment rare',es:562,direct:40,int:0,regen:.45,utility:'+45% Mana regen implicit · 2× Perfect Iron assumed'},
  {id:'feathered',name:'Feathered Raiment rare',es:562,direct:40,int:0,regen:0,mbl:.075,utility:'~7.5% damage taken from Mana before Life · 2× Perfect Iron assumed'},
  {id:'waveshaper',name:'Waveshaper',es:358,direct:40,int:0,regen:0,utility:'~40% max Mana gained as Armour + Spirit/resists · 2× Perfect Iron assumed'},
  {id:'morior4',name:'Morior Invictus · 4 sockets',es:333,direct:310,int:26,regen:0,utility:'75% rolls: +57.5 Mana/socket +6.5 all Attributes/socket + 4× Perfect Iron'},
  {id:'morior5',name:'Morior Invictus · corrupted 5 sockets',es:345,direct:387.5,int:32.5,regen:0,utility:'75% rolls: +57.5 Mana/socket +6.5 all Attributes/socket + 5× Perfect Iron'}
];

function rawManaEq(p){return p.es+p.direct+p.int*2}
function input(id,f){const e=$(id),v=e?Number(e.value):NaN;return Number.isFinite(v)?v:f}

function configFor(p){
  if(!window.v44GetCfg||!window.v44Model)return null;
  const c=clone(window.v44GetCfg());
  const pre=Math.max(1,input('v49PreBodyMana',8000));
  const scale=Math.max(0,input('v49ManaScale',1.25));
  c.mana=pre+rawManaEq(p)*scale;
  c.cp=Math.max(.1,input('v49CurrentMana',90)/100);
  c.cdr=Math.max(0,input('v49CdrElse',70)/100);
  c.regen=Math.max(-.95,input('v49RegenElse',500)/100+(p.regen||0));
  c.other=Math.max(0,input('v49OtherRecovery',2500));
  c.mom=!!$('v49Mom')?.checked;
  c.rath=true;c.arch=true;c.arc=true;c.inv=true;c.druid=true;
  return c;
}

function resultFor(p){
  const c=configFor(p);if(!c)return null;
  const r=window.v44Model(c);
  return {p,c,r,raw:rawManaEq(p),dps2:r.hit*2};
}

function render(){
  const host=$('v49BodyRows'),summary=$('v49BodySummary');if(!host)return;
  const results=PRESETS.map(resultFor).filter(Boolean).sort((a,b)=>b.r.dps-a.r.dps);
  host.innerHTML=results.map((x,i)=>`<tr${i===0?' style="background:rgba(217,179,112,.08)"':''}>
    <td><strong>${i+1}. ${x.p.name}</strong><br><small>${x.p.utility}</small></td>
    <td>${fmt(x.p.es)}</td><td>${fmt(x.raw)}</td><td>${fmt(x.c.mana)}</td>
    <td>${fmt(x.r.hit)}</td><td>${x.r.real.toFixed(2)}/s</td><td><strong>${fmt(x.r.dps)}</strong></td><td>${fmt(x.dps2)}</td><td>${x.r.cap}</td>
  </tr>`).join('');
  if(summary&&results.length){
    const w=results[0],runner=results[1],gain=runner?.r.dps?((w.r.dps/runner.r.dps-1)*100):0;
    summary.innerHTML=`<strong>Current winner: ${w.p.name}.</strong> At these controls it models ${fmt(w.c.mana)} maximum Mana, ${fmt(w.r.hit)} expected Flare hit and ${fmt(w.r.dps)} realised Flare DPS. That is ${gain.toFixed(1)}% ahead of ${runner?.p.name||'the runner-up'}. <b>2.00/s DPS</b> is shown separately so you can see the chest's pure payload ceiling even when recovery or trigger saturation is currently limiting the live rate.`;
  }
}

function build(){
  const page=document.querySelector('.appPage[data-page="experiments"]');
  if(!page||$('v49BodyLab'))return;
  const wrap=document.createElement('div');wrap.className='card';wrap.id='v49BodyLab';wrap.style.marginTop='12px';
  wrap.innerHTML=`
    <div class="kicker">BODY ARMOUR LAB · EB + RATHPITH</div>
    <h2 style="font-size:38px">Rare raiments vs Morior sockets.</h2>
    <p class="small">Same Rathpith/Mana-Flare chassis for every row. Rare defaults are realistic average-ish 20%-quality bodies with two Perfect Iron Runes. Morior uses a 75%-roll local defence mod, 20% quality, Perfect Iron in every socket, and assumes two of its three random socket modifiers are +Mana/socket and +All Attributes/socket.</p>
    <div class="controls" style="grid-template-columns:repeat(3,minmax(0,1fr));margin:10px 0">
      <div class="control"><label>Max Mana excluding body</label><input id="v49PreBodyMana" type="number" value="8000" step="100"></div>
      <div class="control"><label>Existing max-Mana multiplier on chest contribution</label><input id="v49ManaScale" type="number" value="1.25" min="0" step="0.05"></div>
      <div class="control"><label>Current Mana before Flare %</label><input id="v49CurrentMana" type="number" value="90" min="10" max="150" step="1"></div>
      <div class="control"><label>CDR from non-body sources %</label><input id="v49CdrElse" type="number" value="70" min="0" step="5"></div>
      <div class="control"><label>Non-body increased Mana regen %</label><input id="v49RegenElse" type="number" value="500" min="0" step="25"></div>
      <div class="control"><label>Other recovery / sec</label><input id="v49OtherRecovery" type="number" value="2500" min="0" step="100"></div>
    </div>
    <label class="v39Toggle" style="margin:4px 0 10px"><input id="v49Mom" type="checkbox"> Keep Mind Over Matter (applies the simulator's 50% recovery penalty)</label>
    <div class="tableWrap"><table><thead><tr><th>Body preset</th><th>Displayed ES*</th><th>Raw Mana-equivalent*</th><th>Model max Mana</th><th>Expected Flare hit</th><th>Realised Flare/s</th><th>Realised DPS</th><th>DPS @ 2.00/s</th><th>Current cap</th></tr></thead><tbody id="v49BodyRows"></tbody></table></div>
    <div class="callout" id="v49BodySummary"></div>
    <div class="formula">Rare assumptions: 20% quality · ~+65 flat ES · ~75% local increased ES · 2× Perfect Iron (+40% local defences, +40 Bonded maximum Mana with Wisdom of the Maji).
Morior 4: base 50 ES × (1 + 375% unique + 80% runes) × 1.20 quality ≈ 333 ES; +230 Mana/socket line total; +26 all Attributes; +80 Bonded Mana.
Morior 5: base 50 ES × (1 + 375% unique + 100% runes) × 1.20 quality ≈ 345 ES; +287.5 Mana/socket line total; +32.5 all Attributes; +100 Bonded Mana.

Raw Mana-equivalent = displayed ES converted by EB + direct Mana + 2 Mana per INT. The separate multiplier input represents your existing % increased maximum Mana applying to that chest contribution.</div>
    <div class="small" style="margin-top:8px">*Morior always has 4 sockets and can gain a fifth by corruption. The 5-socket preset assumes the fifth filled socket contributes to its per-filled-socket modifiers. Old 2025 bug reports existed around certain socket interactions, so verify the exact item in-game before paying a premium.</div>
    <div class="sourceList" style="margin-top:10px"><a href="https://poe2db.tw/us/Morior_Invictus" target="_blank">PoE2DB · Morior Invictus<small>300–400% local defences; 3 random socket modifiers; +50–60 Mana/socket; +5–7 Attributes/socket.</small></a><a href="https://www.poe2wiki.net/wiki/Augment_socket" target="_blank">PoE2 Wiki · Augment sockets<small>Morior has 4 hidden sockets; corruption can add another beyond the usual limit.</small></a><a href="https://poe2db.tw/us/Perfect_Iron_Rune" target="_blank">PoE2DB · Perfect Iron Rune<small>20% increased local Armour/Evasion/ES; Bonded armour line gives +20 maximum Mana.</small></a></div>`;
  page.appendChild(wrap);
  wrap.querySelectorAll('input').forEach(el=>{el.addEventListener('input',render);el.addEventListener('change',render)});
  render();
}

build();
window.addEventListener('v44calc',()=>setTimeout(render,0));
})();
