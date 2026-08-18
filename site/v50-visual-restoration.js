(() => {
'use strict';

const GGG_TREE='https://raw.githubusercontent.com/grindinggear/poe2-skilltree-export/main/data.json';
const GGG_SKILLS='https://raw.githubusercontent.com/grindinggear/poe2-skilltree-export/main/assets/skills.json';
const GGG_SKILLS_SPRITE='https://raw.githubusercontent.com/grindinggear/poe2-skilltree-export/main/assets/skills.png';

const OLD_ITEM_ART={
  'Dream Fragments':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUmluZ3MvVW5pcXVlcy9EcmVhbUZyYWdtZW50cyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/9cec05becb/DreamFragments.png',
  'Visage of Ayah':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9IZWxtZXRzL1VuaXF1ZXMvVmlzYWdlT2ZBeWFoIiwidyI6MiwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/2dca37cc27/VisageOfAyah.png',
  'Sands of Silk':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1NhbmRzT2ZTaWxrIiwidyI6MiwiaCI6Mywic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/eff6f483c9/SandsOfSilk.png',
  "Serpent's Lesson":'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvVG9uZXNPZkZhdGUiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/99973e1794/TonesOfFate.png',
  'Crest of Ardura':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9TaGllbGRzL1VuaXF1ZXMvQ3Jlc3RPZkFyZHVyYSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/00dd22db9d/CrestOfArdura.png',
  "Uhtred's Chalice":'https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtcy9GbGFza3MvVW5pcXVlcy9VaHRyZWRzTGVnYWN5IiwidyI6MSwiaCI6Miwic2NhbGUiOjEsInJlYWxtIjoicG9lMiIsImxldmVsIjoxfV0/870f4285f3/UhtredsLegacy.png',
  'Waveshaper':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1dhdmVzaGFwZXIiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/73f7dcf704/Waveshaper.png',
  'Cloak of Defiance':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL0Nsb2FrT2ZEZWZpYW5jZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/a7be13f435/CloakOfDefiance.png',
  'Rathpith Globe':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvT2ZmaGFuZC9Gb2NpL1VuaXF1ZXMvUmF0aHBpdGhHbG9iZSIsInciOjIsImgiOjMsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/51e4da7cb9/RathpithGlobe.png',
  'Temporalis':'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1BpbGdyaW1zSW1hZ2UiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/69db95b9aa/PilgrimsImage.png'
};

const SKILL_ART={
  'Entangle':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Entangle_skill_icon.png',
  'Mana Flare':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Mana_Flare_skill_icon.png',
  'Frost Darts':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Frost_Darts_skill_icon.png',
  'Archmage':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Archmage_skill_icon.png',
  'Eternal Rage':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Eternal_Rage_skill_icon.png',
  'Orb of Storms':'https://www.poe2wiki.net/wiki/Special:Redirect/file/Orb_of_Storms_skill_icon.png'
};

const norm=s=>String(s||'').replace(/×\d+/g,'').replace(/\s+/g,' ').trim().toLowerCase();
let passiveAtlas=null;
let passiveNodes=null;
let passiveLoadStarted=false;

function existingImage(name){
  try{
    if(typeof img!=='undefined'&&img){
      if(img[name]) return img[name];
      const key=Object.keys(img).find(k=>norm(k)===norm(name));
      if(key&&img[key]) return img[key];
    }
  }catch(e){}
  const direct=OLD_ITEM_ART[name];
  if(direct) return direct;
  const fuzzy=Object.keys(OLD_ITEM_ART).find(k=>norm(name).includes(norm(k))||norm(k).includes(norm(name)));
  return fuzzy?OLD_ITEM_ART[fuzzy]:null;
}

function addCss(){
  if(document.getElementById('v50VisualCss'))return;
  const style=document.createElement('style');
  style.id='v50VisualCss';
  style.textContent=`
    @media(min-width:901px){
      .slide{padding-left:clamp(34px,3vw,54px)!important;padding-right:24px!important}
      .nav{width:min(1240px,calc(100% - 34px))}
    }
    @media(max-width:900px){.slide{padding-left:16px!important;padding-right:12px!important}}

    .v50SkillIcon{width:38px;height:38px;display:block;border-radius:9px;object-fit:cover;box-shadow:0 5px 14px rgba(0,0,0,.32)}
    .skill .skillicon.v50Restored{padding:0;overflow:hidden;background:#0d0a08;border:1px solid rgba(217,179,112,.2)}

    .nodeLibraryRow.v50NodeVisual{grid-template-columns:18px 36px minmax(0,1fr)!important;align-items:start;gap:8px!important}
    .v50NodeThumb{width:34px;height:34px;border-radius:50%;overflow:hidden;border:1px solid rgba(217,179,112,.28);background:#120d0a;box-shadow:inset 0 0 0 2px rgba(0,0,0,.25),0 4px 10px rgba(0,0,0,.24);flex:none}
    .v50NodeSprite{width:34px;height:34px;background-repeat:no-repeat;image-rendering:auto}
    .v50NodeFallback{display:grid;place-items:center;color:#d6bb88;font-size:8px;font-weight:950;letter-spacing:.02em;background:radial-gradient(circle at 36% 32%,rgba(217,179,112,.25),rgba(72,45,27,.75) 52%,#120c09 74%)}
    .nodeLibraryRow.selected .v50NodeThumb{border-color:rgba(116,221,168,.58);box-shadow:0 0 0 2px rgba(116,221,168,.08),0 5px 13px rgba(0,0,0,.3)}

    .item.v50HasArt{min-height:172px}
    .item .v50InjectedItemArt{display:block;height:82px;max-width:96%;object-fit:contain;margin:0 auto 6px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.42))}
    .guideItem.v50GuideArt{position:relative;overflow:hidden;min-height:210px;padding-right:104px!important}
    .guideItem .v50GuideArtImg{position:absolute;right:6px;bottom:5px;width:98px;height:122px;object-fit:contain;opacity:.92;filter:drop-shadow(0 9px 16px rgba(0,0,0,.5))}
    .guideItem.v50GuideArt:after{content:"";position:absolute;right:0;bottom:0;width:125px;height:135px;background:radial-gradient(circle at 72% 72%,rgba(183,134,77,.12),transparent 67%);pointer-events:none}

    .v50VisualStrip{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0 2px}
    .v50VisualStrip span{display:flex;align-items:center;gap:5px;padding:5px 7px;border:1px solid var(--line);border-radius:10px;background:rgba(18,13,10,.6);font-size:8px;color:#aa9c87}
    .v50VisualStrip img{width:24px;height:24px;object-fit:contain;border-radius:6px}
  `;
  document.head.appendChild(style);
}

function restoreSkillIcons(){
  document.querySelectorAll('.skill').forEach(card=>{
    const name=card.querySelector('h3')?.textContent?.trim();
    const src=SKILL_ART[name];
    const slot=card.querySelector('.skillicon');
    if(!src||!slot||slot.classList.contains('v50Restored'))return;
    slot.textContent='';
    slot.classList.add('v50Restored');
    const im=document.createElement('img');im.className='v50SkillIcon';im.src=src;im.alt=name;im.loading='lazy';
    slot.appendChild(im);
  });
}

function restoreItemPicker(){
  document.querySelectorAll('.item').forEach(card=>{
    if(card.querySelector('img'))return;
    const name=card.querySelector('b')?.textContent?.trim();
    if(!name)return;
    const src=existingImage(name);
    if(!src)return;
    const im=document.createElement('img');im.className='v50InjectedItemArt';im.src=src;im.alt=name;im.loading='lazy';
    card.prepend(im);card.classList.add('v50HasArt');
  });
}

function restoreGuideItems(){
  document.querySelectorAll('.guideItem').forEach(card=>{
    if(card.querySelector('img'))return;
    const name=card.querySelector('h3')?.textContent?.trim();
    if(!name)return;
    let src=existingImage(name);
    if(!src&&/high[- ]es rare/i.test(name)) src=OLD_ITEM_ART['Waveshaper'];
    if(!src)return;
    const im=document.createElement('img');im.className='v50GuideArtImg';im.src=src;im.alt=name;im.loading='lazy';
    card.appendChild(im);card.classList.add('v50GuideArt');
  });
}

function addGuideVisualStrip(){
  const hero=document.querySelector('.appPage[data-page="guide"] .guideHero');
  if(!hero||hero.querySelector('.v50VisualStrip'))return;
  const strip=document.createElement('div');strip.className='v50VisualStrip';
  ['Mana Flare','Entangle','Frost Darts','Archmage','Orb of Storms','Eternal Rage'].forEach(name=>{
    const src=SKILL_ART[name];if(!src)return;
    const pill=document.createElement('span');pill.innerHTML=`<img src="${src}" alt="${name}" loading="lazy"><b>${name}</b>`;strip.appendChild(pill);
  });
  hero.insertAdjacentElement('afterend',strip);
}

function sourceNodes(raw){
  const n=raw?.nodes;
  if(Array.isArray(n)) return n.filter(x=>x&&typeof x==='object');
  if(n&&typeof n==='object') return Object.values(n).filter(x=>x&&typeof x==='object');
  return [];
}

async function loadPassiveArt(){
  if(passiveLoadStarted)return;
  passiveLoadStarted=true;
  try{
    const [treeRes,atlasRes]=await Promise.all([
      fetch(GGG_TREE,{cache:'force-cache'}),
      fetch(GGG_SKILLS,{cache:'force-cache'})
    ]);
    if(!treeRes.ok||!atlasRes.ok)throw new Error('GGG asset fetch failed');
    const [tree,atlas]=await Promise.all([treeRes.json(),atlasRes.json()]);
    passiveAtlas=atlas?.frames||{};
    passiveNodes=new Map();
    sourceNodes(tree).forEach(node=>{
      const name=norm(node.name);if(name&&!passiveNodes.has(name)) passiveNodes.set(name,node);
    });
    restorePassiveNodes();
  }catch(e){
    passiveNodes=new Map();
    restorePassiveNodes();
  }
}

function iconPath(node){return node?.icon||node?.iconPath||node?.skillIcon||node?.art||null}
function frameForIcon(path){
  if(!path||!passiveAtlas)return null;
  const keys=[`normalActive:${path}`,`normal:${path}`,path];
  for(const k of keys){if(passiveAtlas[k]?.frame)return passiveAtlas[k].frame}
  const tail=String(path).split('/').pop();
  const key=Object.keys(passiveAtlas).find(k=>k.endsWith('/'+tail)||k.endsWith(':'+tail));
  return key?passiveAtlas[key]?.frame:null;
}

function fallbackLetters(name){
  const words=String(name||'').split(/\s+/).filter(Boolean);
  return words.slice(0,2).map(w=>w[0]).join('').toUpperCase()||'•';
}

function makePassiveThumb(name){
  const shell=document.createElement('div');shell.className='v50NodeThumb';shell.title=`${name} · official passive icon when available`;
  const node=passiveNodes?.get(norm(name));
  const frame=frameForIcon(iconPath(node));
  if(frame){
    const d=document.createElement('div');d.className='v50NodeSprite';
    d.style.backgroundImage=`url("${GGG_SKILLS_SPRITE}")`;
    d.style.backgroundPosition=`-${frame.x}px -${frame.y}px`;
    d.style.width=`${frame.w}px`;d.style.height=`${frame.h}px`;
    shell.appendChild(d);
  }else{
    shell.classList.add('v50NodeFallback');shell.textContent=fallbackLetters(name);
  }
  return shell;
}

function restorePassiveNodes(){
  document.querySelectorAll('.nodeLibraryRow').forEach(row=>{
    const name=row.querySelector('b')?.textContent?.trim();
    if(!name)return;
    row.classList.add('v50NodeVisual');
    const old=row.querySelector('.v50NodeThumb');
    const desired=makePassiveThumb(name);
    if(old){
      if(passiveNodes&&old.classList.contains('v50NodeFallback')&&!desired.classList.contains('v50NodeFallback'))old.replaceWith(desired);
      return;
    }
    const input=row.querySelector('input');
    if(input)input.insertAdjacentElement('afterend',desired);else row.prepend(desired);
  });
}

function enhance(){
  addCss();restoreSkillIcons();restoreItemPicker();restoreGuideItems();addGuideVisualStrip();restorePassiveNodes();loadPassiveArt();
}

let queued=false;
const observer=new MutationObserver(()=>{
  if(queued)return;queued=true;
  requestAnimationFrame(()=>{queued=false;enhance()});
});
observer.observe(document.documentElement,{childList:true,subtree:true});

enhance();
setTimeout(enhance,250);
setTimeout(enhance,900);
})();
