const MARKET={exPerDiv:338.1,snapshot:'2026-08-21',source:'Divindex',sourceClock:'06:48 PM source refresh',url:'https://divindex.com/'};
const BASE={int:200,treeFlatMana:30,treeIncMana:8,manaAtLevel0:34,manaPerLevel:4,budgetDiv:50};
const CURRENT={level:53,recovery:319,ward:119};
const REF_ITEM_REGEN=126; // Crest 46 + two Dream Fragments midpoint 40 each
const state={mode:'value',charLevel:82,preset:'pureES',mechanics:{eb:true,spectral:true,runic:true,wisdom:true},gear:{weapon1:'exwand',helmet:'helmES',weapon2:'rathpith',ring1:'dreamA',body:'moriorCombined',amulet:'strugglescream',ring2:'dreamB',gloves:'surgeRare',belt:'waistgate',boots:'rareBoots',flask1:'lifeflask',flask2:'uhtred'},augmentTarget:'body',augmentConfigs:{weapon1:{mode:'normal',runes:['mind','mind']},body:{mode:'normal',runes:['mind','mind','mind','mind']}},darknessEffect:75,customRecovery:319,khatalStacks:0};
const P=(ex=null,div=null,source='',asOf='',note='')=>({ex,div,source,asOf,note});
const ITEMS={
weapon1:[
{id:'bramble',name:'Bramble Scratch',level:53,status:'CURRENT',value:8,ceiling:6,owned:true,price:P(null,null,'Current character','2026-08-19','Owned'),desc:'Verified current gain-as-extra/crit benchmark; damage package is not converted into fake Mana.'},
{id:'exwand',name:'Exceptional Mana Wand · Celestial Alloy',level:65,status:'ENDGAME RARE',value:10,ceiling:10,flatMana:165,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare; Celestial Alloy itself trades separately'),desc:'Celestial Alloy midpoint +165 maximum Mana before augments.'},
{id:'adonia',name:"Adonia's Ego",level:60,status:'OLD RECOMMENDATION',value:7,ceiling:6,flatMana:125,price:P(null,null,'No trustworthy snapshot','','Unpriced'),desc:'+100–150 Mana midpoint +125, +3 Spell Skills and cast speed.'},
{id:'lifesprig',name:'Lifesprig',level:1,status:'LEVELING',value:3,ceiling:2,price:P(null,null,'No trustworthy snapshot','','Unpriced'),desc:'Levelling fallback.'}],
helmet:[
{id:'helmES',name:'ilvl82 Ancestral Tiara · T1 pure ES',level:80,status:'ENDGAME RARE',value:10,ceiling:10,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),helmetType:'es',defSpec:{baseS:109,flatS:28,localPct:40.5},flatMana:0,desc:'Ancestral Tiara 109 ES. T1 Divine local: +26–30 ES and 39–42% increased ES, both midpoint; 20% quality.'},
{id:'helmArmES',name:'ilvl82 Cryptic Crown · T1 Armour/ES',level:80,status:'ENDGAME RARE',value:9,ceiling:9,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),helmetType:'armourES',defSpec:{baseA:206,baseS:57,flatA:47,flatS:14,localPct:40.5},desc:'Cryptic Crown 206 Armour / 57 ES. T1 Grand local: +42–52 Armour, +13–15 ES, 39–42% Armour/ES; midpoint; 20% quality.'},
{id:'helmArmour',name:'ilvl82 Imperial Greathelm · T1 pure Armour',level:80,status:'ENDGAME RARE',value:7,ceiling:8,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),helmetType:'armour',defSpec:{baseA:374,flatA:85.5,localPct:40.5},desc:'Imperial Greathelm 374 Armour. T1 Hardened local: +76–95 Armour and 39–42% increased Armour, midpoint; 20% quality.'},
{id:'helmRunicArmES',name:'Runeforged Cryptic Crown · Ward hybrid',level:80,status:'RUNIC WARD BRANCH',value:7,ceiling:8,price:P(null,null,'Modelled base','','Unpriced'),helmetType:'armourES',defFinal:{a:86,s:24,ward:254},desc:'Runeforged Cryptic Crown base: 86 Armour / 24 ES / 254 Runic Ward before further modifiers.'},
{id:'currenthelm',name:'Current Ruinic Helm',level:53,status:'CURRENT',value:6,ceiling:5,owned:true,price:P(null,null,'Current character','2026-08-19','Owned'),desc:'Current zero-data reference; no unverified ES/Armour invented.'},
{id:'ayah',name:'Visage of Ayah',level:16,status:'BRIDGE',value:5,ceiling:4,esFinal:80,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Old Eldritch Battery enabler.'},
{id:'atziriDisdain',name:"Atziri's Disdain",level:40,status:'LAB',value:4,ceiling:5,flatMana:80,price:P(null,null,'No live snapshot','','Unpriced'),desc:'+60–100 Mana plus Life→extra ES experiment.'},
{id:'scolds',name:"Scold's Bridle",level:50,status:'JANK',value:3,ceiling:6,flatMana:90,esFinal:100,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Mana/ES + self-hit loop.'},
{id:'indigon',name:'Indigon',level:65,status:'JANK HIGH',value:4,ceiling:8,flatMana:100,esFinal:200,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Mana-spent damage/cost loop.'}],
weapon2:[
{id:'rathpith',name:'Cultivated Rathpith Globe',level:75,status:'ENDGAME CORE',value:10,ceiling:10,price:P(null,null,'No current equipment snapshot','','Unpriced'),defSpec:{baseS:81,localPct:80},desc:'Mana supplies spell damage + crit. No fake direct Mana.'},
{id:'crest',name:'Crest of Ardura · current roll',level:28,status:'CURRENT',value:10,ceiling:7,owned:true,int:10,regenPct:46,cdr:50,price:P(4,null,'MeetTheMarket older snapshot','','Owned / stale market reference'),defSpec:{baseS:17,localPct:100},desc:'+10 INT, +46% Mana regeneration, +50% cooldown recovery.'},
{id:'threaded',name:'Threaded Light',level:6,status:'BRANCH',value:7,ceiling:7,regenPct:35,price:P(null,null,'No live snapshot','','Unpriced'),defSpec:{baseS:15,localPct:60},desc:'Spirit→spell damage with 35% midpoint Mana regeneration.'},
{id:'serpent',name:"Serpent's Lesson",level:22,status:'LAB',value:5,ceiling:7,flatMana:80,price:P(null,null,'No live snapshot','','Unpriced'),desc:'+60–100 maximum Mana midpoint +80.'},
{id:'effigy',name:'Effigy of Cruelty',level:10,status:'LEVELING',value:4,ceiling:4,int:10,esFinal:25,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Spell damage + INT + Critical Weakness utility.'}],
ring1:[
{id:'dreamA',name:'Dream Fragments · 18% catalysed max',level:12,status:'CORE',value:10,ceiling:9,incMana:18,regenPct:40,owned:true,price:P(6116,null,'MeetTheMarket median snapshot','2026-08-19','Generic ring median; catalyst premium not captured'),desc:'Live base roll is 10–15% max Mana. Planner uses 18% after a max 15% roll is enhanced by Mana-focused catalyst quality; regen uses 40% midpoint.'},
{id:'seedA',name:'Seed of Cataclysm',level:40,status:'CRIT BRANCH',value:5,ceiling:7,price:P(92,null,'MeetTheMarket snapshot','2026-08-19','Recent indexed median'),desc:'Crit/CDB branch; sacrifices Dream mana/regen.'},
{id:'veilA',name:'Veilpiercer',level:20,status:'CHEAP MANA',value:7,ceiling:5,flatMana:80,int:20,price:P(null,null,'No live snapshot','','Unpriced'),desc:'+80 Mana +20 INT midpoints.'},
{id:'rareRingA',name:'ilvl82 T1 Mana rare ring',level:65,status:'ENDGAME RARE',value:6,ceiling:6,flatMana:172,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Zaffre +165–179 maximum Mana midpoint = 172.'}],
ring2:[
{id:'dreamB',name:'Dream Fragments · 18% catalysed max',level:12,status:'CORE',value:10,ceiling:9,incMana:18,regenPct:40,owned:true,price:P(6116,null,'MeetTheMarket median snapshot','2026-08-19','Generic ring median; catalyst premium not captured'),desc:'Second 18% catalysed Dream Fragment, modelled independently.'},
{id:'seedB',name:'Seed of Cataclysm',level:40,status:'CRIT BRANCH',value:5,ceiling:7,price:P(92,null,'MeetTheMarket snapshot','2026-08-19','Recent indexed median'),desc:'Second-ring crit/CDB test.'},
{id:'veilB',name:'Veilpiercer',level:20,status:'CHEAP MANA',value:7,ceiling:5,flatMana:80,int:20,price:P(null,null,'No live snapshot','','Unpriced'),desc:'+80 Mana +20 INT midpoints.'},
{id:'rareRingB',name:'ilvl82 T1 Mana rare ring',level:65,status:'ENDGAME RARE',value:6,ceiling:6,flatMana:172,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Zaffre +165–179 maximum Mana midpoint = 172.'}],
body:[
{id:'moriorDef',name:'Morior Invictus · Global Defences',level:65,status:'MORIOR A',value:9,ceiling:9,morior:true,moriorGlobal:true,price:P(null,2,'ProExile Grand Regalia','2026-08-18','Base-item market; exact roll premium varies'),desc:'9–12% increased Global Armour/Evasion/ES per filled socket. Midpoint 10.5%.'},
{id:'moriorMana',name:'Morior Invictus · Maximum Mana',level:65,status:'MORIOR B',value:10,ceiling:10,morior:true,moriorMana:true,price:P(null,2,'ProExile Grand Regalia','2026-08-18','Base-item market; exact roll premium varies'),desc:'+50–60 maximum Mana per filled socket. Midpoint +55.'},
{id:'moriorCombined',name:'Morior Invictus · Combined Mana + Defences',level:65,status:'MORIOR C',value:10,ceiling:10,morior:true,moriorMana:true,moriorGlobal:true,price:P(null,2,'ProExile Grand Regalia','2026-08-18','Base-item market; combined-roll premium not captured'),desc:'Both current Morior rolls: +55 Mana/socket and 10.5% global defences/socket at midpoint.'},
{id:'highESbody',name:'Exceptional ilvl82 Vile Robe · T1 %ES',level:65,status:'RAW EB RARE',value:9,ceiling:9,preset:'pureES',price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Pure-ES body chassis.'},
{id:'currentbody',name:'Use selected ilvl82 body preset',level:82,status:'PRESET',value:8,ceiling:8,presetFromUI:true,price:P(null,null,'Modelled preset','','Unpriced'),desc:'Generic body driven by preset bar.'},
{id:'sands',name:'Sands of Silk',level:16,status:'CDR BRIDGE',value:6,ceiling:5,flatMana:65,cdr:22.5,price:P(null,null,'No live snapshot','','Unpriced'),desc:'+65 Mana and 22.5% CDR midpoints.'},
{id:'waveshaper',name:'Waveshaper',level:50,status:'BALANCED',value:7,ceiling:7,esFinal:150,price:P(null,null,'No live snapshot','','Unpriced'),desc:'ES + Spirit + Mana→Armour branch.'},
{id:'cloak',name:'Cloak of Defiance',level:65,status:'DEFENSIVE',value:9,ceiling:8,flatMana:125,regenPct:75,esFinal:100,price:P(1819,null,'MeetTheMarket snapshot','2026-08-20','Recent indexed median'),desc:'+125 Mana, ES, regen and 50% Mana-before-Life.'},
{id:'silks',name:'Silks of Veneration',level:68,status:'SPIRIT BRANCH',value:6,ceiling:7,int:25,regenPct:50,esFinal:180,price:P(899,null,'MeetTheMarket snapshot','2026-08-20','Recent indexed median'),desc:'ES + Spirit + INT + regen.'},
{id:'temporalis',name:'Temporalis',level:64,status:'PREMIUM',value:2,ceiling:10,temporalis:true,price:P(1000000,null,'MeetTheMarket snapshot','2026-08-20','Recent indexed median'),desc:'100ms cooldown floor; recovery becomes the cap.'},
{id:'splendour',name:"Atziri's Splendour",level:65,status:'SOUL CORE LAB',value:5,ceiling:8,splendour:true,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Six hidden augment sockets.'}],
amulet:[
{id:'strugglescream',name:'Strugglescream',level:52,status:'DEFAULT ENDGAME',value:10,ceiling:9,price:P(456,null,'MeetTheMarket snapshot','2026-08-18','Recent indexed median'),desc:'Now supports 3 additional instilled modifiers.'},
{id:'astramentis',name:'Astramentis',level:24,status:'ATTRIBUTE BRIDGE',value:7,ceiling:7,int:81,price:P(3836,null,'MeetTheMarket snapshot','2026-08-18','Recent indexed median'),desc:'Current live +50–100 all Attributes plus +5–7 implicit; midpoint modeled as +81 INT total.'},
{id:'rareAmulet',name:'ilvl82 T1 Mana + %Mana rare',level:65,status:'ENDGAME RARE',value:8,ceiling:9,flatMana:185,incMana:7.5,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'184.5 flat Mana +7.5% max-Mana midpoints.'},
{id:'immaculate',name:'Immaculate Adherence',level:30,status:'LAB',value:3,ceiling:8,price:P(5501,null,'MeetTheMarket snapshot','2026-08-18','Recent indexed median'),desc:'Divinity / full Mana-before-Life branch.'}],
gloves:[
{id:'surgeRare',name:'ilvl82 Sirenscale Gloves · T1 ES + Mana',level:80,status:'ENDGAME RARE',value:10,ceiling:9,flatMana:115,defSpec:{baseS:54,localPct:40.5},price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Pure-ES rare + ~115 Mana; Arcane-Surge-on-crit target.'},
{id:'manacles',name:"The Prisoner's Manacles",level:53,status:'CURRENT',value:7,ceiling:5,owned:true,price:P(null,null,'Current character','2026-08-19','Owned'),desc:'Current checkpoint piece.'},
{id:'nightscale',name:'Nightscale',level:45,status:'HIGH',value:9,ceiling:8,int:15,regenPct:150,conditionalRegen:true,esFinal:90,price:P(null,null,'No live snapshot','','Unpriced'),desc:'150% Mana regen if you crit recently + INT + crit.'},
{id:'maligaro',name:"Maligaro's Virtuosity",level:50,status:'CRIT LAB',value:4,ceiling:7,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Crit branch; fixed 250% CDB.'},
{id:'leopold',name:"Leopold's Applause",level:52,status:'STRONG',value:8,ceiling:7,flatMana:80,esFinal:70,price:P(null,null,'No live snapshot','','Unpriced'),desc:'ES +80 Mana midpoint + penetration.'},
{id:'demon',name:'Demon Stitcher',level:33,status:'CONVERSION LAB',value:4,ceiling:7,esFinal:50,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Life→ES cast interaction.'}],
belt:[
{id:'waistgate',name:'Waistgate',level:50,status:'FLASK ENGINE',value:10,ceiling:8,flatMana:76,owned:true,price:P(null,null,'Current character','2026-08-19','Owned'),desc:'+76 Mana current roll; Life and Mana flasks can be equipped in either slot.'},
{id:'darknessHelmet',name:'Darkness Enthroned · Helmet mode',level:62,status:'JIQUANI ENGINE',value:10,ceiling:10,darkness:true,darknessType:'helmet',price:P(307,null,'MeetTheMarket snapshot','2026-08-06','Older indexed median'),desc:'2 hidden sockets. Socketed items gain Helmet bonuses; 50–100% increased effect.'},
{id:'darknessBody',name:'Darkness Enthroned · Body Armour mode',level:62,status:'AUGMENT ENGINE',value:7,ceiling:9,darkness:true,darknessType:'body',price:P(307,null,'MeetTheMarket snapshot','2026-08-06','Older indexed median'),desc:'2 hidden sockets using Body Armour bonuses.'},
{id:'midnight',name:'Midnight Braid',level:30,status:'SUSTAIN',value:8,ceiling:6,flatMana:80,price:P(85,null,'MeetTheMarket high-Mana roll snapshot','2026-08-19','High Mana roll reference'),desc:'Flat Mana + 50% damage recouped as Mana.'},
{id:'coward',name:"Coward's Legacy",level:52,status:'LOW-LIFE BRANCH',value:3,ceiling:7,price:P(null,null,'No live snapshot','','Unpriced'),desc:'Pain Attunement / low-life branch.'},
{id:'rareBelt',name:'ilvl82 T1 Mana rare belt',level:65,status:'ENDGAME RARE',value:7,ceiling:6,flatMana:115,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Chalybeous midpoint ~115 Mana.'}],
boots:[
{id:'rareBoots',name:'ilvl82 Sekhema Sandals · T1 ES + Mana',level:80,status:'ENDGAME RARE',value:9,ceiling:9,flatMana:115,defSpec:{baseS:83,localPct:40.5},price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'High pure-ES base + ~115 Mana.'},
{id:'currentboots',name:'Current boots',level:53,status:'CURRENT',value:5,ceiling:4,owned:true,price:P(null,null,'Current character','2026-08-19','Owned'),desc:'Current utility slot.'},
{id:'evaEsBoots',name:'ilvl82 Evasion/ES rare boots',level:80,status:'WARD TEST',value:7,ceiling:7,flatMana:115,esFinal:95,evasionFinal:300,price:P(null,null,'Rare craft','2026-08-21','Unpriced rare'),desc:'Spectral/Runic Ward comparison.'}],
flask1:[
{id:'lifeflask',name:'Life Flask',level:1,status:'GENERIC',value:5,ceiling:4,price:P(null,null,'Generic','','Excluded'),desc:'Generic Life Flask.'},
{id:'manaflask',name:'Rare Mana Flask',level:50,status:'WAISTGATE',value:8,ceiling:6,overflowPotential:900,price:P(15,null,'MeetTheMarket base snapshot','2026-08-07','Ultimate Mana Flask base reference'),desc:'Second Mana flask when Waistgate is equipped.'},
{id:'uhtredA',name:"Uhtred's Chalice",level:50,status:'OVERFLOW',value:8,ceiling:8,uhtred:true,price:P(680,null,'MeetTheMarket snapshot','2026-08-07','Indexed median'),desc:'Mana recovery can overflow during effect.'}],
flask2:[
{id:'uhtred',name:"Uhtred's Chalice",level:50,status:'OVERFLOW',value:10,ceiling:9,uhtred:true,price:P(680,null,'MeetTheMarket snapshot','2026-08-07','Indexed median'),desc:'855–1140 Mana over 3.5s; +200–300% amount recovered; overflow during effect.'},
{id:'manaflask2',name:'Rare Mana Flask',level:50,status:'WAISTGATE',value:7,ceiling:5,overflowPotential:900,price:P(15,null,'MeetTheMarket base snapshot','2026-08-07','Ultimate Mana Flask base reference'),desc:'Standard Mana flask.'}]
};
const PRESETS={
pureES:{name:'Vile Robe · pure ES',base:'171 ES',a:0,e:0,s:171,flatS:28,localPct:40.5,n:'20% quality + T1-style Divine local midpoint (+28 ES, +40.5% ES).'},
evaES:{name:'Sleek Jacket · Evasion/ES',base:'285 Eva / 87 ES',a:0,e:285,s:87,flatE:47,flatS:14,localPct:40.5,n:'20% quality + T1-style hybrid local midpoint.'},
armourES:{name:'Wolfskin Mantle · Armour/ES',base:'313 Armour / 87 ES',a:313,e:0,s:87,flatA:47,flatS:14,localPct:40.5,n:'20% quality + T1-style hybrid local midpoint.'},
armourEva:{name:'Death Mail · Armour/Evasion',base:'313 Armour / 285 Eva',a:313,e:285,s:0,flatA:47,flatE:45,localPct:40.5,n:'20% quality + T1-style hybrid local midpoint.'},
pureEva:{name:'Slipstrike Vest · pure Evasion',base:'519 Evasion',a:0,e:519,s:0,localPct:40.5,n:'20% quality + conservative T1 local % midpoint; flat prefix not invented.'},
pureArmour:{name:'Soldier Cuirass · pure Armour',base:'570 Armour',a:570,e:0,s:0,flatA:85.5,localPct:40.5,n:'20% quality + T1-style Hardened local midpoint.'},
tri:{name:'Sacrificial Regalia · tri-defence',base:'273 Armour / 248 Eva / 76 ES',a:273,e:248,s:76,localPct:40.5,n:'20% quality + conservative T1 tri-defence midpoint.'},
grand:{name:'Grand Regalia · tri-defence',base:'182 Armour / 165 Eva / 50 ES',a:182,e:165,s:50,localPct:40.5,n:'20% quality + conservative T1 tri-defence midpoint.'}
};
const RUNES={
none:{name:'Empty',level:0,price:P(0,null,'','', ''),kind:'none'},
mind:{name:'Perfect Mind Rune',level:50,price:P(499.9,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
iron:{name:'Perfect Iron Rune',level:50,price:P(457.0,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
inspiration:{name:'Perfect Inspiration Rune',level:50,price:P(585.1,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
vision:{name:'Perfect Vision Rune',level:50,price:P(553.5,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
storm:{name:'Perfect Storm Rune',level:50,price:P(572.0,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
resolve:{name:'Perfect Resolve Rune',level:50,price:P(702.7,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
ward:{name:'Perfect Ward Rune',level:50,price:P(622.4,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune'},
jiquani:{name:"Jiquani's Thesis",level:60,price:P(170042,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'ancient',only:['helmet']},
farrul:{name:"Farrul's Rune of the Chase",level:50,price:P(21.71,null,'Divindex','2026-08-21','Current currency snapshot'),kind:'rune',only:['boots']},
medved:{name:"Medved's Tending",level:65,price:P(null,null,'No fresh snapshot','','Unpriced'),kind:'rune',only:['body']},
greatwolf:{name:"Greatwolf's Rune of Willpower",level:50,price:P(null,null,'No fresh snapshot','','Unpriced'),kind:'rune',only:['body']}
};
const POS=['weapon1','helmet','weapon2','ring1','body','amulet','ring2','gloves','belt','boots','flask1','flask2'];
const AUGMENTABLE=['weapon1','helmet','weapon2','body','gloves','belt','boots'];
