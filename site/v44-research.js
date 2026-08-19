(() => {
'use strict';
const $=id=>document.getElementById(id),D=window.MANA_GEYSER_V44||{nodes:[],items:[],flasks:[]};
const core=new Set(['Eldritch Battery','Mind Over Matter','Raw Mana','Arcane Intensity','Invocated Efficiency','Druidic Champion','Furious Wellspring','Sacred Flow','Wisdom of the Maji']);
const EXTRA_NODES=[
 ['Mystical Rage','Every Rage also grants 2% increased Spell Damage.','Damage','S','Verified'],
 ['Electric Amplification','Damage Penetrates 18% Lightning Resistance; Gain 6% of Elemental Damage as Extra Lightning.','Damage','S','Verified'],
 ['Pure Chaos','Gain 11% of Damage as Extra Chaos Damage.','Damage','A','Verified'],
 ['Aspiring Genius','20% increased Mana Regeneration Rate; 10% chance to Gain Arcane Surge when you deal a Critical Hit. Best temporary Surge source before Kurgal gloves.','Recovery','S*','Verified'],
 ['Touch the Arcane','40% increased effect of Arcane Surge on you. Strong only after Surge uptime is reliable.','Recovery','A*','Verified'],
 ['Arcane Nature','12% increased Area of Effect and 30% increased Spell Damage while you have Arcane Surge. Useful but usually below the Surge-enabling notable itself.','Damage','B','Verified'],
 ['Jack of all Trades','2% increased Damage per 5 of your lowest Attribute.','Damage','A*','Verified'],
 ['Cooked','60% increased Critical Damage Bonus; 25% reduced Armour, Evasion and Energy Shield.','Damage','A*','Verified'],
 ['Desensitisation','25% increased Critical Damage Bonus; Hits against you have 25% reduced Critical Damage Bonus.','Damage','A','Verified'],
 ['Throatseeker','60% increased Critical Damage Bonus; 20% reduced Critical Hit Chance.','Damage','TEST','Verified'],
 ['Battle Trance','+8 to Maximum Rage.','Damage','TEST','Verified'],
 ['Stormwalker','Gain 15% of Damage as Extra Lightning while on Shocked Ground.','Weird','TEST','Verified'],
 ['Storm\'s Rebuke','Fully Broken Armour you inflict also increases Cold and Lightning Damage Taken from Hits.','Weird','TEST','Verified'],
 ['The Molten One\'s Gift','Fully Broken Armour you inflict also increases Fire Damage Taken from Hits; increases effect of Fully Broken Armour.','Weird','TEST','Verified'],
 ['Material Solidification','Gain 8% of Damage as Extra Physical; increased effect of Fully Broken Armour.','Weird','TEST','Verified']
];
const EXTRA_ITEMS=[
 ['Exceptional 2-socket rare Wand','Wand','Endgame','Preferred non-Runeseeker weapon ceiling. Buy a strong existing 2-socket base/item rather than attempting a chase craft with the last ~15d.','CORE RARE','Verified'],
 ['Celestial Alloy wand','Wand','52+','Guaranteed crafted prefix: +142–188 maximum Mana and +1 to all Spell Skills. Premium Mana explicit.','ENDGAME','Verified'],
 ['Sovereign Alloy wand','Wand','52+','Guaranteed crafted suffix: 20–30% increased effect of Socketed Augment Items. Multiplies both rune sockets.','ENDGAME','Verified'],
 ['Transcendent Alloy wand','Wand','65+','Current 0.5.3+ Wand values: 26–31% Cast Speed and Gain 7–11% Elemental Damage as Extra Cold. Restored to Wands at lower values than Staves.','CHASE','Verified'],
 ['Perfect Inspiration Rune','Augment','50','Wand: +60 Mana +35% Mana Regeneration; Bonded: 5% increased maximum Mana. Preferred first rune when recovery is binding.','S','Verified'],
 ['Perfect Mind Rune','Augment','50','Wand: +90 Mana; Bonded: 5% increased maximum Mana. Preferred second rune for balanced Mana/payload.','S','Verified'],
 ['Perfect Storm Rune','Augment','50','Wand: Gain 12% Damage as Extra Lightning; Bonded: 30% increased Shock magnitude. Payload option after Mana/recovery are healthy.','A*','Verified'],
 ['Kurgal Arcane-Surge rare gloves','Gloves','65+','Desecrated suffix: 10–15% chance to Gain Arcane Surge when you deal a Critical Hit. Best budget-endgame Surge source.','CORE RARE','Verified'],
 ['Guiding Palm of the Mind','Sceptre','65','100 Spirit; Gain 25% Damage as Extra Lightning; +20–30 DEX. Strong Spirit experiment, but fixed gain-as-extra is diluted as Archmage grows.','TEST+','Verified'],
 ['Morior Invictus','Body','65','300–400% local Armour/Evasion/ES; 4 hidden sockets; 3 random per-socket modifiers including +50–60 Mana/socket.','ENDGAME','Verified'],
 ['Leopold\'s Applause','Gloves','52','ES +60–100 Mana + 10% Elemental penetration; payload glove only after Arcane Surge/recovery are solved.','ENDGAME','Verified'],
 ['Ghostmarch','Boots','16','15% movement, +30–50 Mana, Chaos res, Evasion/ES, dodge-roll phasing.','BUDGET','Verified'],
 ['Wondertrap','Boots','27','10–20% movement, +30–50 ES, +10–20 STR/DEX/INT; excellent requirement fixer.','BUDGET','Verified'],
 ['Sekhema Sandals rare','Boots','80','83 base ES; premium pure-INT rare boot base for local ES/Mana/Chronomancy crafting.','ENDGAME','Verified'],
 ['Uhtred\'s Sidereus','Augment','—','Boots can roll Chronomancy modifiers; Bonded: 10% increased CDR.','ENDGAME','Verified'],
 ['Legacy of Greymake','Augment','65','Helmets: +50 to all Attributes; Bonded: +1 Maximum Life per Level.','STAT FIX','Verified'],
 ['Cloak of Defiance','Body','65','+100–150 Mana, 50–100% Mana regen, ES, 50% damage taken from Mana before Life. Serious budget fake-MoM bridge.','DEFENCE','Verified'],
 ['Adonia\'s Ego','Wand','65','+100–150 Mana, +3 Spell Skills, 15–30% cast speed; best cheap Wand bridge when native carrier damage matters.','HYBRID','Verified'],
 ['Darkness Enthroned · Helmet variant','Belt','62','50–100% increased effect of socketed Augments; socketed items act as Helmet; 2 hidden augment sockets. Premium Mana-engine platform, outside current budget.','CHASE','Verified'],
 ['Jiquani\'s Thesis','Augment','60','Helmet: +1 maximum Mana per 2 Item Energy Shield on equipped Helmet. Ancient Augment; limited to one; outside current budget.','CHASE','Verified'],
 ['Soul Core of Zalatl','Augment','35','Helmet: 3% increased maximum Mana. Strong second socket in the Helmet-version Darkness Enthroned.','HIGH','Verified'],
 ['Powertread','Boots','—','Power-charge/CDB boot experiment; compare expected crit payload against rare CDR boots.','TEST','Research'],
 ['Ab Aeterno','Boots','—','High defensive boot; trades Mana/CDR flexibility for broad mitigation/roll utility.','DEFENCE','Research'],
 ['Wake of Destruction','Boots','—','Creates Shocked Ground while moving; Stormwalker self-ground interaction requires live proof.','TEST','Research']
];
const tag=c=>`<span class="tagPill ${String(c).toLowerCase().replace(/[^a-z]+/g,'')}">${c}</span>`;
function normNode(x){
 if(x.length>=6)return{name:x[0],kind:x[1],effect:x[2],cat:x[3],grade:x[4],status:x[5]};
 return{name:x[0],kind:'',effect:x[1],cat:x[2],grade:x[3],status:x[4]};
}
function ensureItemFilters(){
 const sel=$('itemSlot');if(!sel)return;
 const slots=[...new Set(D.items.concat(EXTRA_ITEMS).map(x=>x[1]).filter(Boolean))].sort();
 slots.forEach(v=>{if(![...sel.options].some(o=>o.value===v)){const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o)}});
}
function nodeRows(){
 const h=$('nodeLibrary');if(!h)return;
 const q=($('nodeSearch')?.value||'').toLowerCase(),cat=$('nodeCat')?.value||'All';
 const all=D.nodes.map(normNode).concat(EXTRA_NODES.map(normNode));
 const seen=new Set();
 const uniq=all.filter(x=>{const k=x.name.toLowerCase();if(seen.has(k))return false;seen.add(k);return true});
 const a=uniq.filter(x=>(cat==='All'||x.cat===cat)&&(!q||`${x.name} ${x.kind} ${x.effect} ${x.cat} ${x.grade}`.toLowerCase().includes(q)));
 if($('nodeCount'))$('nodeCount').textContent=`${a.length} / ${uniq.length} nodes`;
 h.innerHTML=a.map(x=>`<tr><td><b>${x.name}</b>${core.has(x.name)?' <span class="tier test">CURRENT CORE</span>':''}${x.kind?`<small style="display:block;color:#7f7463;margin-top:3px">${x.kind}</small>`:''}</td><td>${tag(x.cat)}</td><td>${x.effect}</td><td><b>${x.grade}</b></td><td class="${x.status==='Verified'?'statusVerified':'statusResearch'}">${x.status}</td></tr>`).join('');
}
function itemRows(){
 const h=$('itemLibrary');if(!h)return;
 ensureItemFilters();
 const q=($('itemSearch')?.value||'').toLowerCase(),slot=$('itemSlot')?.value||'All';
 const all=D.items.concat(EXTRA_ITEMS);
 const seen=new Set();
 const uniq=all.filter(x=>{const k=x[0].toLowerCase();if(seen.has(k))return false;seen.add(k);return true});
 const a=uniq.map(x=>({name:x[0],slot:x[1],level:x[2],role:x[3],grade:x[4],status:x[5]})).filter(x=>(slot==='All'||x.slot===slot)&&(!q||`${x.name} ${x.slot} ${x.role} ${x.grade}`.toLowerCase().includes(q)));
 if($('itemCount'))$('itemCount').textContent=`${a.length} / ${uniq.length} items`;
 h.innerHTML=a.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.slot}</td><td>${x.level}</td><td>${x.role}</td><td><b>${x.grade}</b></td><td class="${x.status==='Verified'?'statusVerified':'statusResearch'}">${x.status}</td></tr>`).join('');
}
function flaskRows(){const h=$('flaskLibrary');if(!h)return;h.innerHTML=D.flasks.map(x=>`<article class="${x[4]==='S'?'best':''}"><span>REQ ${x[1]} · ${x[4]}</span><b>${x[0]}</b><p><strong>${x[2]}</strong><br>${x[3]}</p></article>`).join('')}
ensureItemFilters();
['nodeSearch','nodeCat'].forEach(id=>$(id)?.addEventListener(id==='nodeCat'?'change':'input',nodeRows));['itemSearch','itemSlot'].forEach(id=>$(id)?.addEventListener(id==='itemSlot'?'change':'input',itemRows));
window.v44ResearchRenderItems=itemRows;
window.v44ResearchRenderNodes=nodeRows;
nodeRows();itemRows();flaskRows();
})();
