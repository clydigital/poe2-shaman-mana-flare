(() => {
'use strict';

const I={
 dream:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUmluZ3MvVW5pcXVlcy9EcmVhbUZyYWdtZW50cyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/9cec05becb/DreamFragments.png',
 ayah:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9IZWxtZXRzL1VuaXF1ZXMvVmlzYWdlT2ZBeWFoIiwidyI6MiwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/2dca37cc27/VisageOfAyah.png',
 sands:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1NhbmRzT2ZTaWxrIiwidyI6MiwiaCI6Mywic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/eff6f483c9/SandsOfSilk.png',
 serpent:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvVG9uZXNPZkZhdGUiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/99973e1794/TonesOfFate.png',
 crest:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9TaGllbGRzL1VuaXF1ZXMvQ3Jlc3RPZkFyZHVyYSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/00dd22db9d/CrestOfArdura.png',
 uhtred:'https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtcy9GbGFza3MvVW5pcXVlcy9VaHRyZWRzTGVnYWN5IiwidyI6MSwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiIsImxldmVsIjoxfV0/870f4285f3/UhtredsLegacy.png',
 wave:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1dhdmVzaGFwZXIiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/73f7dcf704/Waveshaper.png',
 cloak:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL0Nsb2FrT2ZEZWZpYW5jZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/a7be13f435/CloakOfDefiance.png',
 rath:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvUmF0aHBpdGhHbG9iZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/51e4da7cb9/RathpithGlobe.png',
 temp:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1BpbGdyaW1zSW1hZ2UiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/69db95b9aa/PilgrimsImage.png'
};

const S={
 entangle:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Entangle_skill_icon.png',
 flare:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Mana_Flare_skill_icon.png',
 frost:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Frost_Darts_skill_icon.png',
 archmage:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Archmage_skill_icon.png',
 eternal:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Eternal_Rage_skill_icon.png',
 orb:'https://www.poe2wiki.net/wiki/Special:Redirect/file/Orb_of_Storms_skill_icon.png'
};

const phases={
 b1:[
  {phase:'ACT 1',range:'Lv 1–17',steps:[
   {lv:'12',name:'Dream Fragments',img:I.dream,note:'First real Mana identity piece. Cheap enough to buy early; one is enough until the second ring is affordable.',budget:'BUY CHEAP · do not overpay'},
   {lv:'16',name:'Visage of Ayah',img:I.ayah,note:'Turns Eldritch Battery on without spending tree travel. This is the clean early transition into ES → Mana.',budget:'HIGH PRIORITY'},
   {lv:'16',name:'Sands of Silk · optional',img:I.sands,note:'Useful if a very cheap copy appears: flat Mana + CDR. Do not force it over a good defensive chest.',budget:'OPTIONAL BARGAIN'}]},
  {phase:'ACT 2',range:'Lv 18–31',steps:[
   {lv:'22',name:"Serpent's Lesson · experiment",img:I.serpent,note:'Cheap focus experiment for flat Mana and Low-Mana/Low-Life crosswiring. B1 will eventually abandon the offhand for a staff.',budget:'ONLY IF VERY CHEAP'},
   {lv:'27',name:'Mana + INT rares',note:'No mandatory unique here. Upgrade wand, rings/amulet and armour only when you gain meaningful Mana, INT, regen or resistances.',budget:'SAVE CURRENCY'}]},
  {phase:'ACT 3',range:'Lv 32–44',steps:[
   {lv:'38',name:'First +levels shopping pass',note:'Start watching +Physical/+Spell-level staff and amulet bases, but do not switch unless the package reaches a real Entangle breakpoint.',budget:'SHOP, DON’T COMMIT'},
   {lv:'40',name:'Crit / CDB cleanup',note:'Bring trigger crit toward reliability. After that, CDB becomes a better damage-per-slot stat than endlessly buying more crit.',budget:'RARES FIRST'}]},
  {phase:'ACT 4',range:'Lv 45–55',steps:[
   {lv:'49',name:'Current Mana/regen chassis',note:'Keep the existing EB + Dream Fragments shell. The goal is Atlas viability, not forcing L36 immediately.',budget:'CURRENT BASELINE'},
   {lv:'50',name:"Uhtred's Chalice · quest/overflow tool",img:I.uhtred,note:'Overflow can help the 10k-current-Mana Runeseeker requirement and burst testing. It is not automatically the permanent flask.',budget:'UTILITY BUY'},
   {lv:'51',name:'Waveshaper · defensive option',img:I.wave,note:'Excellent if cheap: local ES plus Mana gained as Armour makes the Mana stack defend itself.',budget:'GOOD VALUE IF CHEAP'}]},
  {phase:'INTERLUDE',range:'Lv 56–67',steps:[
   {lv:'58',name:'L31 Entangle proof package',note:'Target Lv20 gem + +6 staff + Hedgewitch +1 + +3 amulet + +1 Prism. Only pivot if the whole package is affordable.',budget:'TARGET ~10–40d + STAFF'},
   {lv:'65',name:'Cloak of Defiance · defensive alternative',img:I.cloak,note:'Flat Mana, regen and 50% damage taken from Mana before Life. Compare against high-ES/Armour-ES rather than buying by name.',budget:'MIDGAME DEFENCE'}]},
  {phase:'ENDGAME',range:'Lv 68–79',steps:[
   {lv:'70',name:'L33–35 Entangle',note:'Lv21 gem, +7 staff, +4 amulet and +2 Prism are the meaningful upgrades. Upgrade one breakpoint at a time.',budget:'SPEND ONLY FOR +LEVEL BREAKPOINTS'},
   {lv:'75',name:'Decision point: stay staff or prepare B2',note:'Do not sink premium currency into +levels if Rathpith B2 is looking stronger for your actual Mana/recovery state.',budget:'ROUTE DECISION'}]},
  {phase:'ATLAS',range:'Lv 80–89',steps:[
   {lv:'80',name:'L36 Entangle endpoint',note:'Lv21 + +7 staff + Hedgewitch +1 + +4 amulet + +2 Prism + Physical Mastery. This is the real B1 payoff.',budget:'~70–150d+ PLANNING BAND'},
   {lv:'84',name:'Armour/ES + Ruinic Helm refinement',note:'Only choose the hybrid helmet if the Mana loss versus pure ES is modest. Defence per lost Mana is the comparison.',budget:'CRAFT/BUY EFFICIENTLY'}]},
  {phase:'LATE ATLAS',range:'Lv 90+',steps:[
   {lv:'90',name:'Stop buying +levels blindly',note:'At this point improve CDB, recovery, defences and jewels. Native Entangle is already online; the weakest system should get the next div.',budget:'EFFICIENCY > PRESTIGE'}]}
 ],
 b2:[
  {phase:'ACT 1',range:'Lv 1–17',steps:[
   {lv:'12',name:'Dream Fragments',img:I.dream,note:'Core early Mana ring. Two copies are valid if the budget allows; one is enough to start.',budget:'BUY CHEAP'},
   {lv:'16',name:'Visage of Ayah',img:I.ayah,note:'Fastest clean EB activation for this route. It lets every good ES upgrade become a Mana upgrade.',budget:'HIGH PRIORITY'},
   {lv:'16',name:'Sands of Silk · optional',img:I.sands,note:'Early Mana + CDR body. Good bargain, but B2 should not trade away resistances or survivability just to force CDR.',budget:'OPTIONAL'}]},
  {phase:'ACT 2',range:'Lv 18–31',steps:[
   {lv:'22',name:"Serpent's Lesson · lab option",img:I.serpent,note:'Flat Mana and threshold tech. Useful to test; not the long-term offhand if Rathpith is the destination.',budget:'CHEAP EXPERIMENT'},
   {lv:'27',name:'Mana/INT wand + second Dream Fragments',img:I.dream,note:'This is the cheap core: wand stats + two Mana rings. Detonate Dead stays active because it does not require the +levels staff route.',budget:'LOW-COST CORE'}]},
  {phase:'ACT 3',range:'Lv 32–44',steps:[
   {lv:'38',name:'Crest of Ardura',img:I.crest,note:'Budget offhand test for Mana regen + CDR + INT. Excellent way to learn whether recovery or cooldown is the real bottleneck.',budget:'BEST BUDGET B2 TEST'},
   {lv:'40',name:'High ES / Armour-ES rares',note:'Prefer gear that raises Mana through EB while fixing resistances. Armour/ES is often worth a small Mana sacrifice.',budget:'RARES > FLASHY UNIQUES'}]},
  {phase:'ACT 4',range:'Lv 45–55',steps:[
   {lv:'49',name:'Current live shell',note:'Keep 1H wand + offhand, 2× Dream Fragments, Archmage, Mana Flare, Detonate Dead and the Shaman Rage engine.',budget:'CURRENT BASELINE'},
   {lv:'50',name:"Uhtred's Chalice",img:I.uhtred,note:'Useful for overflow and the Runeseeker 10k-current-Mana requirement. Also a real burst-recovery experiment.',budget:'UTILITY / QUEST TECH'},
   {lv:'51',name:'Waveshaper',img:I.wave,note:'Strong balanced chest: Mana becomes Armour while local ES still feeds EB. Excellent if your current chest is weak.',budget:'GOOD VALUE'}]},
  {phase:'INTERLUDE',range:'Lv 56–67',steps:[
   {lv:'60',name:'5–6k Mana target',note:'Do not chase luxury CDR yet. Raise Mana, regen, INT, local ES and CDB while keeping elemental resistances capped.',budget:'SAVE FOR RATHPITH'},
   {lv:'64',name:'Temporalis exists — ignore for now',img:I.temp,note:'The level requirement is not the problem; the price and recovery demand are. Treat it as a future cap-breaker.',budget:'DO NOT BUY EARLY'},
   {lv:'65',name:'Cloak of Defiance option',img:I.cloak,note:'Recovery/partial-MoM shell. Compare it with Waveshaper or a strong high-ES rare using actual Mana + defence deltas.',budget:'DEFENSIVE BRANCH'}]},
  {phase:'ENDGAME',range:'Lv 68–79',steps:[
   {lv:'70',name:'7–8k Mana + positive Rage budget',note:'Before Rathpith, prove that Mana recovery and Furious Wellspring can support the CDR you already have.',budget:'SYSTEM CHECK'},
   {lv:'75',name:'Cultivated Rathpith Globe',img:I.rath,note:'This is the B2 identity item. Prefer the Mana-based damage line; Mana-based crit is the premium partner. Solve the added Life cost.',budget:'MAIN ENDGAME PURCHASE'}]},
  {phase:'ATLAS',range:'Lv 80–89',steps:[
   {lv:'80',name:'8–10k Mana + Rathpith',img:I.rath,note:'Now Archmage + Arcane Intensity + Rathpith all read the same huge Mana pool. This is where CDR becomes worth paying for.',budget:'CORE ENDGAME'},
   {lv:'84',name:'CDR jewels / Time-Lost / better focus tuning',note:'Buy CDR only until realised Flare/s stops improving. If current Mana falls, the next div belongs in recovery instead.',budget:'MEASURED CDR'}]},
  {phase:'LATE ATLAS',range:'Lv 90+',steps:[
   {lv:'90',name:'Temporalis only if the engine earns it',img:I.temp,note:'Luxury endpoint. If Rage, Mana recovery or Life-cost recovery cannot feed the new Flare rate, Temporalis is a DPS trap.',budget:'LUXURY ONLY'},
   {lv:'90',name:'Keep Detonate Dead',note:'Do not delete a skill that is already doing the job. DD remains excellent map cleanup while Mana Flare handles the high-value hit.',budget:'FREE POWER'}]}
 ]
};

function style(){
 const s=document.createElement('style');
 s.textContent=`
 .mfPage{position:relative;isolation:isolate}.mfPage:after{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background-image:linear-gradient(rgba(204,158,92,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(204,158,92,.025) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,transparent,black 15%,black 80%,transparent)}
 .mfMilestoneGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px}.mfPhase{background:linear-gradient(180deg,rgba(45,29,18,.92),rgba(22,14,10,.95));border:1px solid rgba(221,178,105,.2);border-radius:18px;overflow:hidden;box-shadow:0 22px 50px rgba(0,0,0,.18)}
 .mfPhaseHead{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:linear-gradient(90deg,rgba(154,100,48,.18),transparent);border-bottom:1px solid rgba(221,178,105,.16)}.mfPhaseHead strong{font-size:11px;letter-spacing:.16em;color:#dec08c}.mfPhaseHead span{font-size:9px;color:#9d8d77}
 .mfStep{display:grid;grid-template-columns:48px 54px minmax(0,1fr);gap:12px;padding:16px;border-bottom:1px solid rgba(221,178,105,.11);align-items:center}.mfStep:last-child{border-bottom:0}.mfLevel{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#6d4b2c,#27180f 72%);border:1px solid rgba(236,194,122,.32);font-size:10px;font-weight:950;color:#f3d9a7;box-shadow:inset 0 0 0 4px rgba(0,0,0,.18)}
 .mfItemArt{width:48px;height:58px;object-fit:contain;filter:drop-shadow(0 9px 12px rgba(0,0,0,.5))}.mfItemBlank{width:48px;height:48px;border-radius:10px;border:1px dashed rgba(221,178,105,.18);display:grid;place-items:center;color:#6f5e4c;font-size:15px}.mfStepText strong{display:block;font-size:12px;color:#eee1cb}.mfStepText p{margin:5px 0 0;font-size:10px;line-height:1.48;color:#aa9c87}.mfBudget{display:inline-block;margin-top:8px;padding:4px 7px;border:1px solid rgba(168,177,122,.22);border-radius:999px;font-size:7px;font-weight:900;letter-spacing:.08em;color:#b8c48c;background:rgba(87,96,55,.13)}
 .mfProgressIntro{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:end}.mfProgressIntro .mfRule{max-width:340px;padding:10px 12px;border-left:2px solid #c6985c;background:rgba(198,152,92,.07);font-size:9px;line-height:1.45;color:#a99a84}
 .mfSkillIconRow{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.mfSkillIconRow div{display:flex;align-items:center;gap:7px;padding:6px 8px 6px 6px;border:1px solid rgba(221,178,105,.16);border-radius:10px;background:rgba(20,13,9,.68);font-size:9px;color:#c9baa3}.mfSkillIconRow img{width:30px;height:30px;border-radius:6px;object-fit:cover}.mfHero:before{content:"";position:absolute;inset:auto 4% 0 auto;width:38%;height:2px;background:linear-gradient(90deg,transparent,rgba(228,185,111,.65),transparent);z-index:3}.mfPage[data-page="b1"]{--route:#9c7849}.mfPage[data-page="b2"]{--route:#556f72}.mfPage[data-page="b1"] .mfSection h2:after,.mfPage[data-page="b2"] .mfSection h2:after{content:"";display:block;width:55px;height:2px;margin-top:8px;background:var(--route)}
 .mfPage[data-page="b1"] .mfPhase{border-top:2px solid rgba(171,123,66,.48)}.mfPage[data-page="b2"] .mfPhase{border-top:2px solid rgba(91,129,134,.48)}
 @media(max-width:900px){.mfMilestoneGrid{grid-template-columns:1fr;gap:12px}.mfStep{grid-template-columns:44px 46px minmax(0,1fr);gap:9px;padding:13px}.mfItemArt{width:42px;height:48px}.mfProgressIntro{grid-template-columns:1fr}.mfProgressIntro .mfRule{max-width:none}}
 `;
 document.head.appendChild(s);
}

function skillRow(key){const arr=key==='b1'?[[S.entangle,'Entangle'],[S.flare,'Mana Flare'],[S.archmage,'Archmage'],[S.eternal,'Eternal Rage']]:[[S.flare,'Mana Flare'],[S.frost,'Frost Darts'],[S.archmage,'Archmage'],[S.eternal,'Eternal Rage']];return `<div class="mfSkillIconRow">${arr.map(([src,n])=>`<div><img src="${src}" onerror="this.style.display='none'"><span>${n}</span></div>`).join('')}</div>`}
function milestoneHTML(key){return `<div class="mfProgressIntro"><div><h2>Gear progression · key breakpoints</h2><p class="mfLead">Only change gear when the upgrade is meaningful. This route is meant to farm toward Runeseeker cheaply while still doing real damage — not burn divines on every ten-level refresh.</p>${skillRow(key)}</div><div class="mfRule"><b>Budget rule</b><br>Mana / INT / recovery / resistances first. A named unique is not automatically an upgrade. Save premium currency for the item that defines the route.</div></div><div class="mfMilestoneGrid">${phases[key].map(ph=>`<section class="mfPhase"><header class="mfPhaseHead"><strong>${ph.phase}</strong><span>${ph.range}</span></header>${ph.steps.map(x=>`<article class="mfStep"><div class="mfLevel">LV ${x.lv}</div>${x.img?`<img class="mfItemArt" src="${x.img}" alt="${x.name}">`:`<div class="mfItemBlank">◇</div>`}<div class="mfStepText"><strong>${x.name}</strong><p>${x.note}</p><span class="mfBudget">${x.budget}</span></div></article>`).join('')}</section>`).join('')}</div>`}

function apply(){
 style();
 ['b1','b2'].forEach(key=>{
  const page=document.querySelector(`.mfPage[data-page="${key}"]`);if(!page)return;
  const section=[...page.querySelectorAll('.mfSection')].find(s=>s.querySelector('h2')?.textContent.includes('Gear progression checklist'));
  if(section)section.innerHTML=milestoneHTML(key);
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));else setTimeout(apply,0);
})();