(() => {
'use strict';
const D=window.MANA_GEYSER_GUIDE;
const $=s=>document.querySelector(s);
const itemArt={
  wand:'https://assets-ng.maxroll.gg/poe2/icons/weapons/onehandweapons/wands/basetypes/wand06.webp',
  rath:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvUmF0aHBpdGhHbG9iZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/51e4da7cb9/RathpithGlobe.png',
  morior:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL01vcmlvckludmljdHVzX00iLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/6674aa4ff6/MoriorInvictus_M.png',
  waist:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQmVsdHMvVW5pcXVlcy9XYWlzdGdhdGUiLCJ3IjoyLCJoIjoxLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/02bb2a2fb4/Waistgate.png',
  dream:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUmluZ3MvVW5pcXVlcy9EcmVhbUZyYWdtZW50cyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/9cec05becb/DreamFragments.png',
  struggle:'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQW11bGV0cy9VbmlxdWVzL0RlbGlyaXVtQW11bGV0IiwidyI6MSwiaCI6MSwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/9e8a23019a/DeliriumAmulet.png'
};
const liquid=name=>`<span class="liquid" data-l="${name}">${name}</span>`;
const mainItems=[
  ['MAIN HAND','Exceptional rare Wand','wand','2 sockets if possible. Prioritise Mana, useful caster damage/crit, then Perfect/Bonded Mind runes.','W'],
  ['OFFHAND','Cultivated Rathpith','rath','Endgame payload piece when it has the Mana-based spell-damage and crit cultivations.','F'],
  ['BODY — ROUTE A','Morior Invictus','morior','Socket/defence route. Best when Mana-per-socket, attributes and Bonded runes are doing real work.','B'],
  ['BODY — ROUTE B','High-ES + %Mana rare chest',null,'Raw-Mana route. Huge local ES + % maximum Mana can beat Morior for pure Mana.','B'],
  ['HELMET','Huge pure-ES rare',null,'Default raw-Mana choice under Eldritch Battery. Jiquani is aspirational, not required.','H'],
  ['BELT','Waistgate → premium belt later','waist','Excellent progression sustain because it supports two Mana flasks and boosts flask recovery.','B'],
  ['RINGS','Dream Fragments → rare/Kalandra route','dream','Dream Fragments is a strong bridge. Endgame wants flat Mana, %Mana, INT and regen together.','R'],
  ['AMULET','Astramentis → Strugglescream','struggle','Keep Astramentis while requirements/INT matter. Swap when four instills beat the total loss.','A'],
  ['GLOVES / BOOTS','Exceptional socket rares',null,'High ES/Mana/INT/resists plus extra sockets and augment effect. Shaman Bonded effects make these premium.','G']
];
const recCats=[
  ['CORE',['Eldritch Battery','Wisdom of the Maji','Sacred Flow','Raw Mana','Arcane Intensity','Invocated Efficiency','Furious Wellspring','Druidic Champion']],
  ['Highest DPS gain',['Arcane Intensity','Invocated Efficiency','Dynamism','Triggered Spell Damage','Critical Overload','Shredding Force','Pure Chaos']],
  ['CDR',['Temporal Mastery','Multitasking','Volatile Catalyst']],
  ['Mana',['Raw Mana','Mana Blessing','Sturdy Mind','Eldritch Will','Insightfulness']],
  ['Mana Regen',['Mental Toughness','Conservative Casting','Efficient Casting','Aspiring Genius','Arcane Blossom','Open Mind','Refocus','Altered Brain Chemistry']],
  ['Remnants',['Arcane Remnants','Empowering Remnants','Remnant Attraction']],
  ['Mana Conversion',['Eldritch Battery','Ruinic Helm','Spectral Ward','Lucidity','Mental Perseverance','Mind Over Matter']],
  ['Rage',['Furious Wellspring','Druidic Champion','Mystical Rage']],
  ['Additional considerations',['Reactive Growth','Avatar of Evolution','Controlling Magic','Adverse Growth','Pain Attunement','Overload','Chakra of Thought']]
];
const categoryAccent=['accentBlue','accentPink','accentGreen'];
function renderItems(){const host=$('#itemGrid');host.innerHTML=mainItems.map(([tag,name,key,body,glyph],i)=>`<article class="itemCard ${categoryAccent[i%3]}">${key?`<img src="${itemArt[key]}" alt="${name}" onerror="this.style.display='none'">`:`<div class="itemGlyph" aria-hidden="true">${glyph}</div>`}<div><span>${tag}</span><h3>${name}</h3><p>${body}</p></div></article>`).join('')}
function renderNodeRecommendations(){const host=$('#recommendedNodes');host.innerHTML=recCats.map(([cat,names],i)=>`<div class="categoryBlock ${categoryAccent[i%3]}"><h3>${cat}</h3><div class="nodeChips">${names.map(name=>{const n=D.nodes.find(x=>x.name===name);return `<span class="nodeChip"><b>${name}</b>${n?` · ${n.effect}`:''}</span>`}).join('')}</div></div>`).join('')}
let instillOnly=false;
function renderNodes(){const q=($('#nodeSearch')?.value||'').trim().toLowerCase(),cat=$('#nodeCategory')?.value||'All';const rows=D.nodes.filter(n=>{if(instillOnly&&!n.instill)return false;if(cat!=='All'&&n.bucket!==cat)return false;const hay=`${n.name} ${n.bucket} ${n.effect} ${n.grade} ${n.status}`.toLowerCase();return !q||hay.includes(q)});$('#nodeCount').textContent=`${rows.length} nodes`;$('#nodeRows').innerHTML=rows.map(n=>`<tr><td>${n.name}</td><td>${n.bucket}</td><td>${n.effect}</td><td><span class="grade">${n.grade}</span></td><td>${n.instill?`<div class="liquids">${n.instill.map(liquid).join('')}</div>`:'—'}</td></tr>`).join('')}
function renderQuests(){const host=$('#questGrid');host.innerHTML=D.questRewards.map((q,i)=>`<article class="questCard ${categoryAccent[i%3]}"><span class="rec">${q.rec}</span><h3>${q.name}</h3><div class="area">${q.area}</div><p><strong>${q.effect}</strong></p><p>${q.note}</p></article>`).join('')}
function renderProgression(){const host=$('#timeline');host.innerHTML=D.progression.map((s,i)=>`<article class="stage ${categoryAccent[i%3]}"><div class="act">${s.stage}</div><div class="level">LV ${s.level}</div><div><h3>${s.goal}</h3><ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul><p>${s.notes}</p></div></article>`).join('')}
function bind(){renderItems();renderNodeRecommendations();renderQuests();renderProgression();renderNodes();$('#nodeSearch').addEventListener('input',renderNodes);$('#nodeCategory').addEventListener('change',renderNodes);$('#instillToggle').addEventListener('click',e=>{instillOnly=!instillOnly;e.currentTarget.classList.toggle('active',instillOnly);e.currentTarget.textContent=instillOnly?'Showing instillable only':'Instillable only';renderNodes()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();