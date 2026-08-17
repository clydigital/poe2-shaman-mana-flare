(() => {
'use strict';

const ART='https://www.poe2wiki.net/wiki/Special:Redirect/file/Shaman_official_art.jpg';
const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
const fmt=n=>Math.round(n).toLocaleString();

function calc(p){
  const M=p.mana, current=M*p.currentPct, arch=1+0.0004*M;
  const inc=1+(0.0003*M)+(p.otherInc||0)+(p.rath?0.0006*M:0);
  const critMult=1+p.crit*p.cdb;
  const druid=1+Math.floor((p.rage||43)/2)/100;
  const rf=p.rageforged?1.35:1;
  const flareHit=.25*current*arch*inc*critMult*druid*rf;
  const flareRate=1+(p.cdr||0);
  const flareDps=flareHit*flareRate;
  let entHit=0, entDps=0;
  if(p.entLv){
    const bases={31:680,32:758,33:846,34:942,35:1011,36:1091.5};
    const b=bases[p.entLv]||bases[36];
    entHit=b*arch*inc*critMult*druid*(p.entSupport||1.2);
    entDps=entHit*(p.entHits||1.25);
  }
  const baseRegen=.04*M;
  const effectiveRegen=baseRegen*(1+(p.regenInc||0))*(p.mom?.5:1);
  const flareManaNeed=.25*current*flareRate;
  const rageFromWellspring=.06*43*(1+(p.regenInc||0));
  const eternal=p.eternal? (p.eternalRate||4.5):0;
  const rfRage=p.rageforged?7*flareRate:0;
  const castRage=5*(p.deliveryCasts||0);
  const rageNeed=rfRage+castRage;
  const rageSupply=rageFromWellspring+eternal;
  const reqRegenNoMom=(flareManaNeed/baseRegen)-1;
  const reqRegenMom=(flareManaNeed/(baseRegen*.5))-1;
  return {M,current,arch,inc,critMult,druid,flareHit,flareRate,flareDps,entHit,entDps,totalDps:flareDps+entDps,effectiveRegen,flareManaNeed,rageSupply,rageNeed,rageDelta:rageSupply-rageNeed,reqRegenNoMom,reqRegenMom};
}

const builds={
 b1:{
   title:'Build 1',name:'L36 Entangle / Mana Flare',hue:'sepia(.22) hue-rotate(-14deg) saturate(.78)',
   summary:'A +levels staff route where Entangle stops being only a trigger and becomes a second real damage engine. Lower peak Mana-Flare scaling than Rathpith, but much better damage between Flare cooldowns.',
   preset:{mana:7000,currentPct:.90,crit:.68,cdb:2.5,cdr:.45,otherInc:1.4,rath:false,entLv:36,entHits:1.3,entSupport:1.2,rage:43,regenInc:4.0,mom:false,eternal:true,eternalRate:4.5,rageforged:false,deliveryCasts:.6},
   skills:[['Entangle','Main mapper + native damage at L36'],['Mana Flare','Triggered nuke'],['Frost Darts','Boss trigger option'],['Archmage','100 Spirit; 4% damage as extra Lightning per 100 max Mana'],['Mana Remnants','Recovery package'],['Eternal Rage','Preferred Rage stabiliser once Spirit allows']],
   gear:[
    ['NOW · Lv49-60','Keep Visage of Ayah / EB, 2× Dream Fragments, Mana + INT + regen rares, current wand/offhand. Do not buy a staff until the +levels package reaches a meaningful checkpoint.'],
    ['L31 PROOF','Lv20 Entangle + +6 staff + Hedgewitch +1 + +3 amulet + +1 Prism. Staff automatically means no offhand. Treat this as the cheap proof that native Entangle feels worth scaling.'],
    ['L33-34','Corrupted Lv21 Entangle, push staff toward +7 and amulet toward +4. Upgrade body into high-ES or Armour/ES hybrid rather than chasing pure offence everywhere.'],
    ['L35','Add +2 Prism. This is where Prism price becomes the volatile part of the branch; do not overpay if B2 Rathpith is still a serious alternative.'],
    ['L36 TARGET','Lv21 + +7 staff + Hedgewitch +1 + +4 amulet + +2 Prism + Physical Mastery. This is the native-Entangle endpoint.'],
    ['LATE DEFENCE','Hybrid Armour/ES helmet + Ruinic Helm if the Mana loss versus pure ES is small; Waveshaper / strong ES body are the balanced choices. Keep resistances capped before buying CDR.']
   ],
   notes:['Best if you want smoother all-the-time damage instead of putting everything into Mana Flare.','Staff route gives up Rathpith and every offhand stat; that opportunity cost is the core comparison.','Rageforged II is more realistic here than on B2 because the useful Flare rate is lower and Entangle keeps dealing damage while Rage recovers.'],
 },
 b2:{
   title:'Build 2',name:'Wand + Offhand Mana Flare',hue:'sepia(.10) hue-rotate(20deg) saturate(.70)',
   summary:'The pure Mana-Flare route. Keep a wand, use a real offhand, push Mana + cooldown recovery + crit, and let Rathpith turn maximum Mana into both increased spell damage and increased spell crit. Detonate Dead stays because corpse-life scaling gives excellent clear without demanding a +levels weapon.',
   preset:{mana:9000,currentPct:.90,crit:.90,cdb:2.7,cdr:.90,otherInc:1.2,rath:true,entLv:null,entHits:0,rage:43,regenInc:5.0,mom:false,eternal:true,eternalRate:4.5,rageforged:false,deliveryCasts:1.3},
   skills:[['Entangle','Mapping trigger; levels are not the priority'],['Frost Darts','Boss Mana-Flare trigger'],['Mana Flare','Main boss nuke'],['Detonate Dead','Keep it. Corpse-life explosion is great clear and is not dependent on the same +spell-level route'],['Archmage','Core Mana scaling'],['Eternal Rage','Preferred if pushing high CDR / Rageforged']],
   gear:[
    ['NOW · Lv49-60','Keep the current EB shell, 2× Dream Fragments, Mana/INT/regen wand, and a useful offhand. Detonate Dead should stay in the active skill package.'],
    ['BUDGET OFFHAND','Crest of Ardura is the clean budget CDR/recovery focus: 30–50% Mana regen and 30–50% CDR. This is the easiest way to test whether more CDR actually helps before buying Rathpith.'],
    ['BODY STEP','Sands of Silk if you cheaply need CDR; Waveshaper for Mana→Armour defence; high-ES rare for pure EB Mana. Temporalis is not a prerequisite.'],
    ['RATHPITH · Lv75+','Cultivated Rathpith with Mana-based 6% increased spell damage / 100 Mana and ideally 3% increased spell crit / 100 Mana. Remember the additional Life cost; Vigorous Remnants / life recovery must be solved.'],
    ['HIGH MANA','Aim 8–10k Mana before paying heavily for extreme CDR. The build becomes much more efficient once Rathpith + Arcane Intensity + Archmage are all reading the same large Mana pool.'],
    ['LUXURY CDR','Temporalis or very high Time-Lost/jewel CDR only after recovery supports the theoretical Flare rate. Otherwise you buy cooldown and simply fire weaker Flares more often.']
   ],
   notes:['Best raw Mana-Flare ceiling of the two routes.','Detonate Dead is a feature, not filler: its corpse-life component makes it excellent map cleanup even without a +levels setup.','Rathpith is the main reason B2 exists: maximum Mana simultaneously increases damage and crit on the same offhand.'],
 }
};

function cardStat(label,value,sub=''){return `<div class="mfStat"><span>${label}</span><b>${value}</b>${sub?`<small>${sub}</small>`:''}</div>`}
function gearChecklist(rows){return `<div class="mfChecklist">${rows.map((r,i)=>`<label><input type="checkbox"><div><strong>${r[0]}</strong><p>${r[1]}</p></div></label>`).join('')}</div>`}

function buildPage(key){
 const b=builds[key], c=calc(b.preset);
 const rf=calc({...b.preset,rageforged:true});
 const noER=calc({...b.preset,eternal:false,rage:30});
 const defensiveDps=calc({...b.preset,eternal:false,rage:30,rageforged:false}).totalDps;
 const loss=(1-defensiveDps/c.totalDps)*100;
 const rfGain=(rf.totalDps/c.totalDps-1)*100;
 return `<section class="mfPage" data-page="${key}">
   <header class="mfHero" style="--hero-filter:${b.hue}"><div class="mfHeroArt"></div><div class="mfHeroShade"></div><div class="mfHeroText"><span>${b.title}</span><h1>${b.name}</h1><p>${b.summary}</p><div class="mfHeroPills"><i>${fmt(b.preset.mana)} Mana model</i><i>${Math.round(b.preset.crit*100)}% crit</i><i>${Math.round(b.preset.cdb*100)}% CDB</i><i>${c.flareRate.toFixed(2)} Flare/s</i></div></div></header>
   <div class="mfSection"><h2>What I would build</h2><div class="mfStatGrid">${cardStat('Mana',fmt(c.M))}${cardStat('Expected Flare hit*',fmt(c.flareHit),'pre-mitigation planner model')}${cardStat('Mana-Flare DPS*',fmt(c.flareDps))}${key==='b1'?cardStat('Native Entangle hit*',fmt(c.entHit)):cardStat('Total DPS model*',fmt(c.totalDps))}${cardStat('Mana needed / sec',fmt(c.flareManaNeed),'to hold 90% current Mana from Flare consumption alone')}${cardStat('Modelled regen / sec',fmt(c.effectiveRegen))}${cardStat('Rage supply / sec',c.rageSupply.toFixed(1))}${cardStat('Rage delta / sec',c.rageDelta.toFixed(1))}</div><p class="mfFine">*These are transparent comparison estimates, not PoB promises. They model Mana Flare's 25% current-Mana base, Archmage, Arcane Intensity, crit/CDB, Druidic Champion and the stated route assumptions. Real damage changes with supports, enemy mitigation, shock/exposure, hit overlap and actual gear.</p></div>
   <div class="mfSection mfTwo"><div><h2>Core skills</h2><div class="mfSkills">${b.skills.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></div><div><h2>Why this route</h2><ul class="mfNotes">${b.notes.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
   <div class="mfSection"><h2>Gear progression checklist</h2><p class="mfLead">Use this as the shopping order. A later step is not automatically better if it breaks Mana recovery, resistances or Rage sustain.</p>${gearChecklist(b.gear)}</div>
   <div class="mfSection mfTwo"><div><h2>Eternal Rage vs defensive Spirit</h2><div class="mfCompare"><div><strong>Eternal Rage</strong><b>${fmt(c.totalDps)} model DPS*</b><p>At this preset it keeps average Rage near 43, preserving the full Druidic Champion layer and making Rageforged much more realistic.</p></div><div><strong>Defensive Spirit package</strong><b>${fmt(defensiveDps)} model DPS*</b><p>Assumes average Rage falls to ~30. Direct loss is about <em>${loss.toFixed(1)}%</em> before counting any Rageforged downtime. In exchange, use the Spirit budget for defensive reservations / supports.</p></div></div></div><div><h2>Rageforged II test</h2><div class="mfCall"><strong>+${rfGain.toFixed(1)}% model DPS if sustained.</strong><p>Rageforged II is 35% more damage and is free 30% of the time, so average extra demand is ~7 Rage per supported proc.</p><p>At ${c.flareRate.toFixed(2)} Flares/s that is <b>${(7*c.flareRate).toFixed(1)} Rage/s</b> from Rageforged alone. Add Furious Wellspring's +5 Rage on delivery casts and this preset needs roughly <b>${rf.rageNeed.toFixed(1)} Rage/s</b>. Current model supply with Eternal Rage is ${rf.rageSupply.toFixed(1)}/s.</p></div></div></div>
   <div class="mfSection mfTwo"><div><h2>Mana-recovery wall</h2><p class="mfLead">To hold 90% current Mana using regeneration alone, this preset needs roughly <b>+${Math.max(0,c.reqRegenNoMom*100).toFixed(0)}% increased Mana regeneration</b> before other recovery sources. With full MoM's 50% less Mana Recovery, the equivalent rises to roughly <b>+${Math.max(0,c.reqRegenMom*100).toFixed(0)}%</b>.</p><p class="mfFine">This is intentionally conservative because it excludes Archmage's additional Mana costs and incoming damage; Remnants, flasks, overflow and on-kill recovery reduce the practical regen burden.</p></div><div><h2>Defensive layers</h2><ul class="mfNotes"><li>Cap elemental resistances first.</li><li>Use Armour or Armour/ES hybrid so enemy hits do not eat the same Mana pool used by Flare.</li><li>Ruinic Helm is attractive when a high-Armour/ES helmet loses little EB Mana versus pure ES.</li><li>Runic Ward is bonus lethal-hit protection; do not make it the primary stat.</li><li>Long term, partial damage-taken-from-Mana-before-Life can be better than full MoM because MoM halves Mana recovery.</li></ul></div></div>
 </section>`;
}

function comparePage(){
 const a=calc(builds.b1.preset), b=calc(builds.b2.preset);
 return `<section class="mfPage" data-page="compare"><div class="mfSimpleHero"><span>ROUTE DECISION</span><h1>Entangle staff or Rathpith?</h1><p>These are not the same build with one item swapped. They want different weapon geometry, different recovery headroom and different sources of damage.</p></div><div class="mfSection"><div class="mfRouteTable"><div></div><strong>B1 · L36 Entangle</strong><strong>B2 · Wand + Rathpith</strong><span>Main damage</span><b>Entangle + Mana Flare</b><b>Mana Flare + Detonate Dead clear</b><span>Mana target</span><b>~6–8k comfortable</b><b>~8–10k+ preferred</b><span>CDR appetite</span><b>Moderate</b><b>High, once recovery is solved</b><span>Offhand</span><b>None — staff consumes both hands</b><b>Core build slot; Rathpith is the endgame reason</b><span>Rageforged II</span><b>More realistic</b><b>Very demanding at high Flare rate</b><span>Defence</span><b>Easier to keep balanced</b><b>Mana can become both offence and defence, but recovery pressure is higher</b><span>Planner DPS*</span><b>${fmt(a.totalDps)}</b><b>${fmt(b.totalDps)}</b></div></div><div class="mfSection"><h2>My recommendation</h2><div class="mfCall"><strong>For the character right now: develop B2's Mana/regen chassis while keeping B1 cheap to test.</strong><p>B2 has the cleaner high-end synergy because cultivated Rathpith reads the same maximum Mana already powering Archmage and Arcane Intensity. But do not lock into expensive Rathpith/CDR until the recovery numbers support it. B1 is the better experiment if a +levels staff/amulet/Prism package reaches L31–36 cheaply enough.</p><p>Keep Detonate Dead either way during progression; it is especially natural in B2.</p></div></div></section>`;
}

function makeFront(){
 const existing=[...document.body.children].filter(n=>n.tagName!=='SCRIPT'&&n.id!=='mfFront'&&n.id!=='mfBackend');
 const backend=document.createElement('div');backend.id='mfBackend';backend.style.display='none';existing.forEach(n=>backend.appendChild(n));document.body.prepend(backend);
 const front=document.createElement('div');front.id='mfFront';front.innerHTML=`<nav class="mfNav"><b>Mana Flare Shaman</b><button data-go="b1">Build 1</button><button data-go="b2">Build 2</button><button data-go="compare">Compare</button><button data-go="backend">Backend / Research</button></nav><main>${buildPage('b1')}${buildPage('b2')}${comparePage()}</main><footer class="mfFooter"><b>Mana Flare / Entangle Shaman</b><span>Front guide simplified. Old planner, JSON-derived research and experiment tools are preserved in Backend / Research.</span></footer>`;document.body.prepend(front);
 qsa('#mfFront .mfPage').forEach((p,i)=>p.style.display=i===0?'block':'none');
 qsa('#mfFront [data-go]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.go)));
}
function show(page){
 const front=qs('#mfFront'),back=qs('#mfBackend');
 if(page==='backend'){front.style.display='none';back.style.display='block';window.scrollTo({top:0,behavior:'instant'});return;}
 back.style.display='none';front.style.display='block';qsa('#mfFront .mfPage').forEach(p=>p.style.display=p.dataset.page===page?'block':'none');window.scrollTo({top:0,behavior:'smooth'});
}
window.mfReturnToFront=()=>{qs('#mfBackend').style.display='none';qs('#mfFront').style.display='block';show('b1')};

function style(){const s=document.createElement('style');s.textContent=`
#mfFront{--bg:#100b08;--panel:#1c130e;--line:rgba(214,173,106,.18);--gold:#d6ad6a;--text:#efe5d3;--mut:#a99b84;min-height:100vh;background:radial-gradient(circle at 70% 0,rgba(118,73,36,.16),transparent 35%),#100b08;color:var(--text);font-family:Inter,system-ui,sans-serif}.mfNav{position:sticky;top:0;z-index:100;display:flex;gap:8px;align-items:center;padding:12px max(18px,calc((100vw - 1180px)/2));background:rgba(16,11,8,.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}.mfNav b{margin-right:auto;text-transform:uppercase;letter-spacing:.12em;font-size:10px}.mfNav button{background:#24170f;color:#d6c6aa;border:1px solid var(--line);border-radius:999px;padding:8px 11px;font-weight:800;font-size:9px;cursor:pointer}.mfHero{position:relative;min-height:620px;overflow:hidden;display:flex;align-items:flex-end}.mfHeroArt{position:absolute;inset:0;background-image:url('${ART}');background-size:cover;background-position:center 28%;filter:var(--hero-filter);transform:scale(1.02)}.mfHeroShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,8,6,.96) 0%,rgba(13,8,6,.80) 43%,rgba(13,8,6,.15) 74%,rgba(13,8,6,.65)),linear-gradient(0deg,#100b08 0%,transparent 38%)}.mfHeroText{position:relative;z-index:2;width:min(760px,75vw);margin-left:max(22px,calc((100vw - 1180px)/2));padding:80px 0 70px}.mfHeroText>span,.mfSimpleHero>span{font-size:10px;letter-spacing:.18em;color:#c7a46e;font-weight:950;text-transform:uppercase}.mfHero h1,.mfSimpleHero h1{font-size:clamp(48px,7vw,92px);line-height:.9;letter-spacing:-.055em;margin:10px 0 16px}.mfHero p,.mfSimpleHero p{max-width:720px;color:#c6b9a5;font-size:16px;line-height:1.55}.mfHeroPills{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}.mfHeroPills i{font-style:normal;border:1px solid var(--line);border-radius:999px;padding:7px 9px;background:rgba(28,19,14,.72);font-size:9px;color:#dfc99f}.mfSection{width:min(1180px,calc(100% - 36px));margin:0 auto;padding:54px 0;border-top:1px solid var(--line)}.mfSection h2{font-size:clamp(27px,4vw,48px);letter-spacing:-.04em;margin:0 0 18px}.mfLead{color:#bcae99;line-height:1.55;max-width:820px}.mfFine{font-size:10px;color:#817561;line-height:1.5;margin-top:10px}.mfStatGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.mfStat{background:linear-gradient(180deg,#21160f,#17100c);border:1px solid var(--line);border-radius:14px;padding:14px}.mfStat span{display:block;font-size:8px;text-transform:uppercase;letter-spacing:.11em;color:#8f806b;font-weight:900}.mfStat b{display:block;font-size:25px;margin-top:5px}.mfStat small{display:block;font-size:8px;color:#776c5c;margin-top:4px}.mfTwo{display:grid;grid-template-columns:1fr 1fr;gap:28px}.mfSkills{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mfSkills div,.mfCompare>div{border:1px solid var(--line);background:#1b120d;border-radius:13px;padding:12px}.mfSkills b{display:block}.mfSkills span{display:block;color:#9f927d;font-size:10px;line-height:1.4;margin-top:4px}.mfNotes{margin:0;padding-left:18px}.mfNotes li{color:#b8aa95;line-height:1.55;margin:8px 0}.mfChecklist{display:grid;gap:8px}.mfChecklist label{display:grid;grid-template-columns:22px 1fr;gap:9px;align-items:start;background:#1a120d;border:1px solid var(--line);border-radius:13px;padding:13px}.mfChecklist input{margin-top:3px;accent-color:#c89c59}.mfChecklist strong{font-size:12px}.mfChecklist p{margin:4px 0 0;color:#a99b86;font-size:10.5px;line-height:1.45}.mfCompare{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mfCompare strong{display:block;font-size:11px;color:#d5b987}.mfCompare b{display:block;font-size:20px;margin:6px 0}.mfCompare p{font-size:10px;color:#9e907c;line-height:1.45}.mfCall{border-left:3px solid #c99f61;background:#1b120d;padding:14px 16px}.mfCall strong{font-size:15px}.mfCall p{font-size:10.5px;color:#ad9f8a;line-height:1.5}.mfSimpleHero{width:min(1180px,calc(100% - 36px));margin:0 auto;padding:100px 0 55px}.mfRouteTable{display:grid;grid-template-columns:190px 1fr 1fr;border:1px solid var(--line);border-radius:14px;overflow:hidden}.mfRouteTable>*{padding:12px;border-bottom:1px solid var(--line);border-right:1px solid var(--line);font-size:10.5px}.mfRouteTable strong{background:#26180f;color:#dabd8c}.mfRouteTable span{color:#8e816d}.mfRouteTable b{color:#c7baa5}.mfFooter{width:min(1180px,calc(100% - 36px));margin:0 auto;padding:30px 0 60px;display:flex;justify-content:space-between;gap:20px;border-top:1px solid var(--line);font-size:9px;color:#766a59}.mfFooter b{color:#b49c79}#mfBackend{background:#100b08;min-height:100vh}#mfBackend:before{content:'← Return to simplified build guide';display:block;position:sticky;top:0;z-index:999;background:#d1b27d;color:#1b1009;padding:10px 14px;font:bold 11px Inter,system-ui;cursor:pointer}
@media(max-width:850px){.mfNav{overflow:auto}.mfNav b{display:none}.mfHero{min-height:540px}.mfHeroText{width:calc(100% - 36px);margin-left:18px}.mfStatGrid,.mfTwo,.mfSkills,.mfCompare{grid-template-columns:1fr 1fr}.mfRouteTable{grid-template-columns:110px 1fr 1fr}.mfSection{padding:38px 0}}@media(max-width:560px){.mfStatGrid,.mfTwo,.mfSkills,.mfCompare{grid-template-columns:1fr}.mfHero{min-height:500px}.mfHero h1{font-size:48px}.mfRouteTable{grid-template-columns:92px 1fr 1fr}.mfRouteTable>*{padding:9px;font-size:8.5px}.mfNav button{padding:7px 9px;font-size:8px}}
`;
document.head.appendChild(s);document.addEventListener('click',e=>{if(e.target.closest('#mfBackend')&&e.clientY<55&&getComputedStyle(qs('#mfBackend')).display!=='none')window.mfReturnToFront()})}

function init(){style();makeFront()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();