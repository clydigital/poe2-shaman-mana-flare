(() => {
'use strict';
const $=id=>document.getElementById(id),D=window.MANA_GEYSER_V44||{nodes:[],items:[],flasks:[]};
const core=new Set(['Eldritch Battery','Mind Over Matter','Raw Mana','Arcane Intensity','Invocated Efficiency','Druidic Champion','Furious Wellspring','Sacred Flow','Wisdom of the Maji']);
const EXTRA_NODES=[
 ['Mystical Rage','Every Rage also grants 2% increased Spell Damage.','Damage','S','Verified'],
 ['Electric Amplification','Damage Penetrates 18% Lightning Resistance; Gain 6% of Elemental Damage as Extra Lightning.','Damage','S','Verified'],
 ['Pure Chaos','Gain 11% of Damage as Extra Chaos Damage.','Damage','A','Verified'],
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
 ['Morior Invictus','Body','65','300–400% local Armour/Evasion/ES; 4 hidden sockets; 3 random per-socket modifiers including +50–60 Mana/socket.','ENDGAME','Verified'],
 ['Leopold\'s Applause','Gloves','52','ES +60–100 Mana + 10% Elemental penetration; strong payload glove once recovery is solved.','ENDGAME','Verified'],
 ['Ghostmarch','Boots','16','15% movement, +30–50 Mana, Chaos res, Evasion/ES, dodge-roll phasing.','BUDGET','Verified'],
 ['Wondertrap','Boots','27','10–20% movement, +30–50 ES, +10–20 STR/DEX/INT; excellent requirement fixer.','BUDGET','Verified'],
 ['Sekhema Sandals rare','Boots','80','83 base ES; premium pure-INT rare boot base for local ES/Mana/Chronomancy crafting.','ENDGAME','Verified'],
 ['Uhtred\'s Sidereus','Augment','—','Boots can roll Chronomancy modifiers; Bonded: 10% increased CDR.','ENDGAME','Verified'],
 ['Legacy of Greymake','Augment','65','Helmets: +50 to all Attributes; Bonded: +1 Maximum Life per Level.','STAT FIX','Verified'],
 ['Cloak of Defiance','Body','65','+100–150 Mana, Mana regen, ES, 50% damage taken from Mana before Life.','DEFENCE','Verified'],
 ['Adonia\'s Ego','Wand','65','+100–150 Mana, +3 Spell Skills, cast speed; hybrid native-spell route.','HYBRID','Verified'],
 ['Powertread','Boots','—','Power-charge/CDB boot experiment; compare expected crit payload against rare CDR boots.','TEST','Research'],
 ['Ab Aeterno','Boots','—','High defensive boot; trades Mana/CDR flexibility for broad mitigation/roll utility.','DEFENCE','Research'],
 ['Wake of Destruction','Boots','—','Creates Shocked Ground while moving; Stormwalker self-ground interaction requires live proof.','TEST','Research']
];
const tag=c=>`<span class="tagPill ${String(c).toLowerCase().replace(/[^a-z]+/g,'')}">${c}</span>`;
function normNode(x){
 if(x.length>=6)return{name:x[0],kind:x[1],effect:x[2],cat:x[3],grade:x[4],status:x[5]};
 return{name:x[0],kind:'',effect:x[1],cat:x[2],grade:x[3],status:x[4]};
}
function nodeRows(){
 const h=$('nodeLibrary');if(!h)return;
 const q=($('nodeSearch')?.value||'').toLowerCase(),cat=$('nodeCat')?.value||'All';
 const all=D.nodes.map(normNode).concat(EXTRA_NODES.map(normNode));
 const a=all.filter(x=>(cat==='All'||x.cat===cat)&&(!q||`${x.name} ${x.kind} ${x.effect} ${x.cat} ${x.grade}`.toLowerCase().includes(q)));
 if($('nodeCount'))$('nodeCount').textContent=`${a.length} / ${all.length} nodes`;
 h.innerHTML=a.map(x=>`<tr><td><b>${x.name}</b>${core.has(x.name)?' <span class="tier test">CURRENT CORE</span>':''}${x.kind?`<small style="display:block;color:#7f7463;margin-top:3px">${x.kind}</small>`:''}</td><td>${tag(x.cat)}</td><td>${x.effect}</td><td><b>${x.grade}</b></td><td class="${x.status==='Verified'?'statusVerified':'statusResearch'}">${x.status}</td></tr>`).join('');
}
function itemRows(){
 const h=$('itemLibrary');if(!h)return;
 const q=($('itemSearch')?.value||'').toLowerCase(),slot=$('itemSlot')?.value||'All';
 const all=D.items.concat(EXTRA_ITEMS);
 const a=all.map(x=>({name:x[0],slot:x[1],level:x[2],role:x[3],grade:x[4],status:x[5]})).filter(x=>(slot==='All'||x.slot===slot)&&(!q||`${x.name} ${x.slot} ${x.role} ${x.grade}`.toLowerCase().includes(q)));
 if($('itemCount'))$('itemCount').textContent=`${a.length} / ${all.length} items`;
 h.innerHTML=a.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.slot}</td><td>${x.level}</td><td>${x.role}</td><td><b>${x.grade}</b></td><td class="${x.status==='Verified'?'statusVerified':'statusResearch'}">${x.status}</td></tr>`).join('');
}
function flaskRows(){const h=$('flaskLibrary');if(!h)return;h.innerHTML=D.flasks.map(x=>`<article class="${x[4]==='S'?'best':''}"><span>REQ ${x[1]} · ${x[4]}</span><b>${x[0]}</b><p><strong>${x[2]}</strong><br>${x[3]}</p></article>`).join('')}
['nodeSearch','nodeCat'].forEach(id=>$(id)?.addEventListener(id==='nodeCat'?'change':'input',nodeRows));['itemSearch','itemSlot'].forEach(id=>$(id)?.addEventListener(id==='itemSlot'?'change':'input',itemRows));
nodeRows();itemRows();flaskRows();
})();
