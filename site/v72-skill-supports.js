(() => {
'use strict';
const byId=id=>document.getElementById(id);
function css(){
  if(byId('v72SkillCss')) return;
  const s=document.createElement('style');
  s.id='v72SkillCss';
  s.textContent=`
    #v72SkillSupports{scroll-margin-top:112px}
    .v72Grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:16px}
    .v72Card{border:1px solid var(--v64-border,var(--line));border-radius:16px;background:linear-gradient(145deg,var(--v64-surface1,#1b130e),var(--v64-surface2,#100b09));padding:14px;min-width:0}
    .v72Card.core{border-color:color-mix(in srgb,var(--v64-accent,#7fc4e9) 48%,transparent);box-shadow:inset 0 0 34px color-mix(in srgb,var(--v64-glow,#3286b4) 10%,transparent)}
    .v72Head{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}.v72Icon{width:42px;height:42px;border-radius:10px;object-fit:contain;background:rgba(0,0,0,.18);padding:3px}.v72Head span{display:block;font-size:7px;letter-spacing:.11em;text-transform:uppercase;color:var(--v64-accent,#82c3e7);font-weight:950}.v72Head h3{font-size:16px;margin:3px 0 0}.v72Chips{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0}.v72Chip{font-size:8px;border:1px solid var(--v64-border,var(--line));border-radius:999px;padding:6px 8px;background:rgba(0,0,0,.16);color:var(--v64-text,#eadfce)}.v72Chip.hot{border-color:rgba(125,196,235,.44);color:#dff4ff}.v72Card p{font-size:9px;line-height:1.52;color:var(--v64-muted,#a79a86);margin:7px 0 0}.v72Card strong{color:var(--v64-warm,#e5c88f)}.v72Note{margin-top:14px;border-left:3px solid var(--v64-accent,#78bee5);padding:11px 13px;background:linear-gradient(135deg,color-mix(in srgb,var(--v64-glow,#3788b4) 10%,var(--v64-surface1,#17100c)),var(--v64-surface2,#0f0b09));font-size:9px;line-height:1.55;color:var(--v64-muted,#a79a86)}
    @media(max-width:760px){.v72Grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}
const W='https://www.poe2wiki.net/wiki/Special:Redirect/file/';
const icon=n=>W+encodeURIComponent(n);
const chip=(x,hot=false)=>`<span class="v72Chip ${hot?'hot':''}">${x}</span>`;
const card=(x)=>`<article class="v72Card ${x.core?'core':''}"><div class="v72Head"><img class="v72Icon" src="${icon(x.icon||x.name+'.png')}" alt="${x.name}" onerror="this.style.display='none'"><div><span>${x.tag}</span><h3>${x.name}</h3></div></div><div class="v72Chips">${x.supports.map((g,i)=>chip(g,i===0||g==='Mana Flare')).join('')}</div><p>${x.why}</p>${x.swap?`<p><strong>Swap / flex:</strong> ${x.swap}</p>`:''}</article>`;
function mount(){
  css();
  const guide=byId('guidePage');
  if(!guide || byId('v72SkillSupports')) return;
  const sec=document.createElement('section');
  sec.id='v72SkillSupports';
  sec.className='v60Section';
  const skills=[
    {name:'Entangle — mapping',tag:'CORE · SWEDGE-DERIVED',core:true,supports:['Mana Flare','Magnified Area II','Branching Fissures II',"Eonyr's Thunder",'Pinpoint Critical'],why:'This is Swedge’s mapping delivery package: huge coverage, persistent vine hits, crit reliability and corpse-chain amplification. For our build, Entangle remains the default screen-clear carrier.'},
    {name:'Frost Darts — bossing',tag:'CORE · SWEDGE-DERIVED',core:true,supports:['Mana Flare','Pinpoint Critical','Concentrated Area','Execute III','Lightning Penetration'],why:'Swedge uses Frost Darts as the single-target carrier. Concentrated Area and Execute III trade coverage for boss payload; Lightning Penetration becomes more valuable because Archmage pushes so much of Mana Flare into Lightning.',swap:'Before Execute III / low-life becomes affordable, use a cheaper damage or efficiency support and keep the Rage package.'},
    {name:'Arctic Armour',tag:'SPIRIT · SWEDGE-DERIVED',core:true,supports:['Mana Flare','Pinpoint Critical','Magnified Area II','Cooldown Recovery II','Execute III'],why:'This is not just defence. Swedge deliberately lets Arctic Armour retaliations trigger Mana Flare when melee enemies touch you, turning anti-stunlock protection into automatic close-range burst.',swap:'Execute III is premium/low-life leaning; treat it as the fifth slot, not mandatory.'},
    {name:'Mana Remnants',tag:'SPIRIT · CORE RECOVERY',core:true,supports:['Remnant Potency III','Harmonic Remnants II',"Khatal's Rejuvenation",'Clarity II','Vitality II'],why:'Swedge’s recovery package. Potency and Harmonic improve the Remnants themselves, Khatal converts pickups into Mana Flare CDR, and Clarity II is one of the cleanest regeneration supports available.',swap:'Vitality II is mainly for Rathpith / low-life life-cost recovery. If life is comfortable, this is the easiest slot to repurpose.'},
    {name:'Archmage',tag:'SPIRIT · CORE DAMAGE',core:true,supports:['Lightning Mastery',"Atziri's Communion"],why:'Swedge supports Archmage around its Lightning conversion and premium low-life setup. Lightning Mastery is the transferable piece for us; Atziri’s Communion belongs to the expensive low-life branch rather than the normal progression path.',swap:'Do not force Atziri’s Communion. Our default route keeps the normal life pool and uses Rage until the low-life package is genuinely better.'},
    {name:'Eternal Rage',tag:'SPIRIT · OUR SHAMAN FLEX',supports:['Clarity II','Vitality II','Cannibalism II','Direstrike II'],why:'Swedge’s final ultra-premium setup moves away from this, but Eternal Rage is still our best simple Rage stabiliser before Cast on Critical or low-life takes over. Persistent supports are utility choices; Clarity II is the most relevant if it is not already occupied elsewhere.',swap:'Remember support categories cannot be duplicated freely across skills. If Clarity II lives on Mana Remnants, use Eternal Rage mainly as the base Spirit skill rather than forcing filler supports.'},
    {name:'Cast on Critical → Comet',tag:'SPIRIT · PREMIUM FLEX',supports:['Comet','Boundless Energy II','Mysticism II','Energy Retention','Fluke'],why:'This is our premium alternative to Eternal Rage. CoC turns the same crit engine that triggers Mana Flare into a second spell engine. The important supports are the Energy-generation/retention tools; Comet itself is the payload and deals 20% less damage when triggered by CoC.',swap:'Only graduate into this after Mana recovery is strong enough to absorb another triggered spell cost.'},
    {name:'Blasphemy → Temporal Chains',tag:'SPIRIT · SWEDGE UTILITY',supports:['Temporal Chains','Ritualistic Curse','Magnified Area II','Slow Potency','Cannibalism II'],why:'Swedge uses this primarily to keep enemies from reaching and repeatedly stunning the character, not as a damage aura. It is a defensive/QoL reservation and therefore sits below Archmage, Mana Remnants and the chosen 100-Spirit flex for us.'},
    {name:'Detonate Dead — optional mapping',tag:'OPTIONAL · SWEDGE MAPPING',supports:['Magnified Area II','Pinpoint Critical','Lightning Penetration','Efficiency II','Rapid Casting II'],why:'Swedge pairs corpse explosions with the mapping package to extend clear. We do not need this for the core Entangle + Mana Flare loop, but it is the cleanest Swedge-derived optional mapper if screen clear becomes the bottleneck.'},
    {name:'Orb of Storms — utility trigger',tag:'OPTIONAL · OUR TRIGGER TOOL',supports:['Mana Flare','Pinpoint Critical','Magnified Area','Efficiency'],why:'Not a Swedge centerpiece, but still useful for us because one cast can generate repeated hit/crit checks while saving manual casts. Keep it as a utility carrier rather than spending premium sockets on native Orb damage.'}
  ];
  sec.innerHTML=`<div class="kicker">SKILLS · SUPPORT GEM PACKAGES</div><h2>Support gems for every skill</h2><p class="v60Intro">Front-page recommendation set. <b>Swedge-derived</b> packages are copied from the current 20k Mana Flare Shaman setup where they transfer cleanly; the Rage and CoC entries are adjusted for our Runeseeker-free Shaman path rather than copied blindly.</p><div class="v72Grid">${skills.map(card).join('')}</div><div class="v72Note"><strong>Priority:</strong> Entangle + Mana Flare for mapping, Frost Darts + Mana Flare for bosses, Archmage + Mana Remnants as the permanent engine, then choose <strong>Eternal Rage</strong> for stability or <strong>Cast on Critical → Comet</strong> once recovery can support it. Arctic Armour is the first defensive luxury because it can also retaliate into Mana Flare.</div>`;
  const anchor=guide.querySelector('#progression,#gear,#v70BuildLock,#verdict');
  if(anchor) guide.insertBefore(sec,anchor); else guide.appendChild(sec);
  const nav=guide.querySelector('.sectionNav');
  if(nav && !nav.querySelector('a[href="#v72SkillSupports"]')){
    const a=document.createElement('a');a.href='#v72SkillSupports';a.textContent='Skills';nav.appendChild(a);
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
new MutationObserver(()=>{if(!byId('v72SkillSupports')) mount();}).observe(document.documentElement,{childList:true,subtree:true});
})();
