(() => {
  'use strict';
  const KEY='manaGeyserDisplayV2';
  const OLD_KEY='manaGeyserDisplayV1';
  const $=id=>document.getElementById(id);
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const defaults={fontScale:1,brightness:'dark',hue:'brown'};
  const hues={
    brown:{label:'Brown',accent:'#d4ad73',deep:'#714629',soft:'rgba(181,126,76,.18)',warm:'#e0c18e'},
    blue:{label:'Blue',accent:'#72c5ef',deep:'#285f86',soft:'rgba(72,160,214,.18)',warm:'#b7d6e7'},
    green:{label:'Green',accent:'#80c99b',deep:'#356e4d',soft:'rgba(73,156,105,.18)',warm:'#bdd7b4'},
    purple:{label:'Purple',accent:'#b69bda',deep:'#674d8e',soft:'rgba(137,103,184,.18)',warm:'#d0b8df'}
  };
  const brightnesses={
    lighter:{label:'Lighter'},light:{label:'Light'},dark:{label:'Dark'},darker:{label:'Darker'}
  };
  let state=load();
  let fontQueued=false;

  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      if(saved)return{...defaults,...saved};
      const old=JSON.parse(localStorage.getItem(OLD_KEY)||'null');
      if(old){
        const map={mana:'blue',gold:'brown',ember:'brown',verdant:'green',amethyst:'purple'};
        return{fontScale:clamp(+old.fontScale||1,.8,2),brightness:old.mode==='light'?'light':'dark',hue:map[old.accent]||'brown'};
      }
    }catch{}
    return{...defaults};
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}

  function injectCss(){
    if($('v64DisplayCss'))return;
    const s=document.createElement('style');
    s.id='v64DisplayCss';
    s.textContent=`
      :root{
        --v64-accent:#d4ad73;--v64-deep:#714629;--v64-soft:rgba(181,126,76,.18);--v64-warm:#e0c18e;
        --v64-bg1:#090706;--v64-bg2:#140d09;--v64-bg3:#080706;--v64-surface:rgba(24,16,12,.92);--v64-surface2:rgba(16,11,9,.94);
        --v64-text:#eadfce;--v64-muted:#aa9d88;--v64-border:rgba(217,179,112,.16);--v64-nav:rgba(10,7,6,.94);--v64-table:#15100c;
      }
      body{
        --blue:var(--v64-accent)!important;--blue2:var(--v64-deep)!important;--gold:var(--v64-warm)!important;
        color:var(--v64-text)!important;
        background:
          radial-gradient(circle at 16% 12%,var(--v64-soft),transparent 30%),
          radial-gradient(circle at 87% 34%,color-mix(in srgb,var(--v64-accent) 10%,transparent),transparent 34%),
          linear-gradient(145deg,var(--v64-bg1),color-mix(in srgb,var(--v64-bg2) 86%,var(--v64-deep)) 48%,var(--v64-bg3))!important;
        color-scheme:dark;
      }
      body:before{opacity:.05!important;filter:saturate(.72) contrast(1.04) brightness(.7)!important}
      body:after{background:linear-gradient(90deg,color-mix(in srgb,var(--v64-bg1) 86%,transparent),color-mix(in srgb,var(--v64-deep) 18%,transparent) 52%,color-mix(in srgb,var(--v64-bg3) 82%,transparent)),linear-gradient(180deg,transparent,color-mix(in srgb,var(--v64-bg3) 94%,transparent))!important}

      #v64DisplayBtn{display:inline-flex;align-items:center;gap:5px}
      #v64DisplayBtn .v64Aa{font-weight:950;font-size:10px;letter-spacing:-.04em}
      #v64DisplayPanel{position:fixed;right:max(12px,calc((100vw - 1180px)/2));top:62px;z-index:230;width:min(370px,calc(100vw - 24px));padding:14px;border:1px solid var(--v64-border);border-radius:17px;background:linear-gradient(145deg,color-mix(in srgb,var(--v64-surface) 94%,var(--v64-deep)),var(--v64-surface2));backdrop-filter:blur(22px);box-shadow:0 22px 70px rgba(0,0,0,.42);color:var(--v64-text)}
      #v64DisplayPanel[hidden]{display:none}
      .v64PanelHead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px}.v64PanelHead span{display:block;font-size:7px;letter-spacing:.13em;text-transform:uppercase;color:var(--v64-accent);font-weight:950}.v64PanelHead b{display:block;font-size:15px;margin-top:3px}.v64Close{border:1px solid var(--v64-border);background:transparent;color:inherit;border-radius:9px;width:32px;height:32px;cursor:pointer}
      .v64Group{padding:11px 0;border-top:1px solid var(--v64-border)}.v64Group:first-of-type{border-top:0;padding-top:0}.v64GroupLabel{font-size:7px;text-transform:uppercase;letter-spacing:.11em;color:var(--v64-muted);font-weight:950;margin-bottom:8px}
      .v64FontRow{display:grid;grid-template-columns:48px 1fr 48px;gap:7px;align-items:center}.v64FontBtn,.v64Choice,.v64Hue,.v64Reset{border:1px solid var(--v64-border);background:linear-gradient(145deg,var(--v64-surface),var(--v64-surface2));color:var(--v64-text);border-radius:10px;cursor:pointer;font-weight:900}.v64FontBtn{height:44px;font-size:18px}.v64FontReadout{text-align:center;border:1px solid var(--v64-border);border-radius:10px;padding:9px;background:var(--v64-surface2)}.v64FontReadout b{display:block;font-size:13px}.v64FontReadout span{font-size:7px;color:var(--v64-muted)}
      .v64ChoiceGrid,.v64HueGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.v64Choice{min-height:42px;font-size:7.5px;padding:7px 4px}.v64Choice.active,.v64Hue.active{border-color:var(--v64-accent);box-shadow:inset 0 0 0 1px var(--v64-soft),0 5px 15px color-mix(in srgb,var(--v64-deep) 18%,transparent);background:linear-gradient(145deg,color-mix(in srgb,var(--v64-accent) 18%,var(--v64-surface)),color-mix(in srgb,var(--v64-deep) 36%,var(--v64-surface2)));color:var(--v64-text)}
      .v64Hue{display:grid;place-items:center;gap:5px;min-height:58px;padding:6px 3px;font-size:7px}.v64Swatch{width:27px;height:27px;border-radius:50%;border:2px solid rgba(255,255,255,.18);background:linear-gradient(135deg,var(--sw1),var(--sw2));box-shadow:0 4px 11px rgba(0,0,0,.26)}.v64Reset{width:100%;padding:10px;font-size:8px;color:var(--v64-muted)}.v64Hint{font-size:7px;line-height:1.45;color:var(--v64-muted);margin-top:7px}

      .eyebrow,.kicker,.v60Verdict span,.v60Math span,.v60ItemBody span,.v60Instill span,.v60Sell span,.tagPill.mana,.libCount{color:var(--v64-accent)!important}
      .v60Verdict.rec,.v60Item.best,.highlightBlue{border-color:color-mix(in srgb,var(--v64-accent) 45%,transparent)!important;box-shadow:inset 0 0 32px var(--v64-soft),0 12px 32px rgba(0,0,0,.12)!important}
      .v60Formula,.callout,.formula{border-left-color:var(--v64-accent)!important;background:linear-gradient(135deg,color-mix(in srgb,var(--v64-soft) 70%,transparent),color-mix(in srgb,var(--v64-deep) 12%,transparent))!important}
      .v62BrandMark{border-color:color-mix(in srgb,var(--v64-accent) 52%,transparent)!important;background:radial-gradient(circle at 40% 34%,var(--v64-accent),var(--v64-deep) 75%)!important}
      .v62Mode.research,button[data-page='research'],.v62ResearchButton{border-color:color-mix(in srgb,var(--v64-accent) 58%,transparent)!important;background:linear-gradient(145deg,color-mix(in srgb,var(--v64-deep) 88%,#111),color-mix(in srgb,var(--v64-accent) 32%,#111))!important}
      .v62Mode.research.active{background:linear-gradient(145deg,var(--v64-deep),var(--v64-accent))!important;border-color:var(--v64-accent)!important;color:white!important}
      .sectionNav a:hover{background:var(--v64-soft)!important;border-color:color-mix(in srgb,var(--v64-accent) 34%,transparent)!important}
      #v62Topbar,.sectionNav{background:var(--v64-nav)!important;border-color:var(--v64-border)!important}
      .v60Verdict,.v60Item,.v60Math article,.v60Compare article,.v60Stage,.v60Instill article,.v60Skill,.v60Sell,.steps,.card,.deepCard,.price{background:linear-gradient(145deg,var(--v64-surface),color-mix(in srgb,var(--v64-surface2) 92%,var(--v64-deep)))!important;border-color:var(--v64-border)!important;color:var(--v64-text)!important}
      .v60Verdict p,.v60Verdict li,.v60ItemBody p,.v60Swap,.v60Compare p,.v60Stage p,.v60Instill p,.v60Sell p,.steps p,.card p,.deepCard p,.deepCard li,.v60Intro,.sectionIntro,.researchHero p{color:var(--v64-muted)!important}
      .tableWrap{background:linear-gradient(145deg,var(--v64-table),color-mix(in srgb,var(--v64-table) 90%,var(--v64-deep)))!important;border-color:var(--v64-border)!important}.libraryToolbar input,.libraryToolbar select{background:var(--v64-surface2)!important;color:var(--v64-text)!important;border-color:var(--v64-border)!important}

      body[data-v64-brightness='lighter']{--v64-bg1:#faf8f3;--v64-bg2:#f1ece2;--v64-bg3:#fcfaf6;--v64-surface:rgba(255,253,249,.94);--v64-surface2:rgba(246,241,233,.96);--v64-text:#2a241e;--v64-muted:#665d52;--v64-border:rgba(77,58,39,.15);--v64-nav:rgba(252,249,243,.96);--v64-table:#fffdf9;color-scheme:light}
      body[data-v64-brightness='light']{--v64-bg1:#f2ede4;--v64-bg2:#e8dfd2;--v64-bg3:#f7f3eb;--v64-surface:rgba(250,246,239,.93);--v64-surface2:rgba(238,230,218,.95);--v64-text:#312920;--v64-muted:#6c6154;--v64-border:rgba(80,59,39,.17);--v64-nav:rgba(244,238,228,.95);--v64-table:#f9f5ee;color-scheme:light}
      body[data-v64-brightness='dark']{--v64-bg1:#0b0807;--v64-bg2:#18100c;--v64-bg3:#090706;--v64-surface:rgba(28,19,14,.92);--v64-surface2:rgba(17,12,10,.95);--v64-text:#eadfce;--v64-muted:#aa9d88;--v64-border:rgba(217,179,112,.16);--v64-nav:rgba(10,7,6,.94);--v64-table:#15100c;color-scheme:dark}
      body[data-v64-brightness='darker']{--v64-bg1:#030303;--v64-bg2:#080605;--v64-bg3:#020202;--v64-surface:rgba(10,8,7,.95);--v64-surface2:rgba(5,4,4,.97);--v64-text:#eee5d8;--v64-muted:#9e9383;--v64-border:rgba(217,179,112,.12);--v64-nav:rgba(3,3,3,.97);--v64-table:#080606;color-scheme:dark}

      body[data-v64-brightness='light']:before,body[data-v64-brightness='lighter']:before{opacity:.035!important;filter:saturate(.55) contrast(.9) brightness(1.25)!important}
      body[data-v64-brightness='light'] #guidePage .heroCopy,body[data-v64-brightness='lighter'] #guidePage .heroCopy{color:white!important;text-shadow:0 2px 10px rgba(0,0,0,.42)}
      body[data-v64-brightness='light'] #guidePage .heroCopy .lede,body[data-v64-brightness='lighter'] #guidePage .heroCopy .lede,body[data-v64-brightness='light'] #guidePage .subtitle,body[data-v64-brightness='lighter'] #guidePage .subtitle{color:#f0e8dc!important}
      body[data-v64-brightness='light'] .v62BrandText b,body[data-v64-brightness='lighter'] .v62BrandText b,body[data-v64-brightness='light'] .v62Mode,body[data-v64-brightness='lighter'] .v62Mode,body[data-v64-brightness='light'] .sectionNav a,body[data-v64-brightness='lighter'] .sectionNav a{color:var(--v64-text)!important}
      body[data-v64-brightness='light'] table th,body[data-v64-brightness='lighter'] table th{background:color-mix(in srgb,var(--v64-deep) 8%,#efe7da)!important;color:#5f5345!important}body[data-v64-brightness='light'] table td,body[data-v64-brightness='lighter'] table td{color:#493f35!important}
      body[data-v64-brightness='darker']:before{opacity:.026!important;filter:saturate(.72) contrast(1.08) brightness(.48)!important}

      @media(max-width:700px){#v64DisplayPanel{top:56px;right:8px;width:calc(100vw - 16px);max-height:calc(100vh - 66px);overflow:auto}#v64DisplayBtn .v64Label{display:none}.v64ChoiceGrid,.v64HueGrid{grid-template-columns:repeat(4,minmax(58px,1fr))}}
      @media(max-width:430px){.v64ChoiceGrid,.v64HueGrid{grid-template-columns:repeat(2,1fr)}.v64Hue{min-height:52px;grid-template-columns:30px 1fr;text-align:left}.v64Swatch{width:25px;height:25px}}
    `;
    document.head.appendChild(s);
  }

  function applyHue(){
    const h=hues[state.hue]||hues.brown,root=document.documentElement;
    root.style.setProperty('--v64-accent',h.accent);root.style.setProperty('--v64-deep',h.deep);root.style.setProperty('--v64-soft',h.soft);root.style.setProperty('--v64-warm',h.warm);
    document.querySelectorAll('.v64Hue').forEach(b=>b.classList.toggle('active',b.dataset.hue===state.hue));
  }
  function applyBrightness(){
    if(!brightnesses[state.brightness])state.brightness='dark';
    document.body.dataset.v64Brightness=state.brightness;
    document.querySelectorAll('.v64Choice').forEach(b=>b.classList.toggle('active',b.dataset.brightness===state.brightness));
  }

  const textSelector=[
    '.content h1','.content h2','.content h3','.content p','.content li','.content td','.content th','.content label','.content input','.content select',
    '.content .kicker','.content .eyebrow','.content .subtitle','.content .lede','.content .v60Swap','.content .v60Footer','.content .v60Liquids',
    '#v62Topbar b','#v62Topbar span','#v62Topbar button','.sectionNav a','.sectionNav button'
  ].join(',');
  function scaleElement(el){
    if(!el||el.closest('#v64DisplayPanel'))return;
    if(!el.dataset.v64BaseFont){const px=parseFloat(getComputedStyle(el).fontSize);if(!Number.isFinite(px)||px<=0)return;el.dataset.v64BaseFont=String(px)}
    el.style.fontSize=`${(+el.dataset.v64BaseFont*state.fontScale).toFixed(2)}px`;
  }
  function applyFont(){
    document.querySelectorAll(textSelector).forEach(scaleElement);
    const read=$('v64FontValue');if(read)read.textContent=`${Math.round(state.fontScale*100)}%`;
  }
  function queueFont(){if(fontQueued)return;fontQueued=true;requestAnimationFrame(()=>{fontQueued=false;applyFont()})}
  function setFont(next){state.fontScale=clamp(Math.round(next*10)/10,.8,2);save();applyFont()}
  function setBrightness(v){state.brightness=v;save();applyBrightness()}
  function setHue(v){state.hue=v;save();applyHue()}

  function panelHtml(){return `<div class="v64PanelHead"><div><span>Display settings</span><b>Read it your way</b></div><button type="button" class="v64Close" aria-label="Close display settings">×</button></div>
    <div class="v64Group"><div class="v64GroupLabel">Text size</div><div class="v64FontRow"><button type="button" class="v64FontBtn" data-font="minus">A−</button><div class="v64FontReadout"><b id="v64FontValue">100%</b><span>80–200% · saved</span></div><button type="button" class="v64FontBtn" data-font="plus">A+</button></div><div class="v64Hint">10% steps. The guide's fixed-size mobile text scales too.</div></div>
    <div class="v64Group"><div class="v64GroupLabel">Brightness</div><div class="v64ChoiceGrid">${Object.entries(brightnesses).map(([k,v])=>`<button type="button" class="v64Choice" data-brightness="${k}">${v.label}</button>`).join('')}</div></div>
    <div class="v64Group"><div class="v64GroupLabel">Hue</div><div class="v64HueGrid">${Object.entries(hues).map(([k,v])=>`<button type="button" class="v64Hue" data-hue="${k}"><i class="v64Swatch" style="--sw1:${v.accent};--sw2:${v.deep}"></i><span>${v.label}</span></button>`).join('')}</div><div class="v64Hint">Every hue uses a subtle two-tone gradient across the page, cards and controls.</div></div>
    <div class="v64Group"><button type="button" class="v64Reset">Reset to Dark + Brown + 100%</button></div>`}

  function addUi(){
    const top=$('v62Topbar')?.querySelector('.v62TopbarInner');if(!top||$('v64DisplayBtn'))return;
    $('v63DisplayBtn')?.remove();$('v63DisplayPanel')?.remove();
    const btn=document.createElement('button');btn.type='button';btn.id='v64DisplayBtn';btn.className='v62Mode';btn.setAttribute('aria-expanded','false');btn.innerHTML='<span class="v64Aa">Aa</span><span class="v64Label">Display</span>';top.appendChild(btn);
    const panel=document.createElement('aside');panel.id='v64DisplayPanel';panel.hidden=true;panel.innerHTML=panelHtml();document.body.appendChild(panel);
    const toggle=force=>{const open=force??panel.hidden;panel.hidden=!open;btn.setAttribute('aria-expanded',String(open))};
    btn.addEventListener('click',()=>toggle());panel.querySelector('.v64Close').addEventListener('click',()=>toggle(false));
    panel.querySelector('[data-font="minus"]').addEventListener('click',()=>setFont(state.fontScale-.1));panel.querySelector('[data-font="plus"]').addEventListener('click',()=>setFont(state.fontScale+.1));
    panel.querySelectorAll('.v64Choice').forEach(b=>b.addEventListener('click',()=>setBrightness(b.dataset.brightness)));
    panel.querySelectorAll('.v64Hue').forEach(b=>b.addEventListener('click',()=>setHue(b.dataset.hue)));
    panel.querySelector('.v64Reset').addEventListener('click',()=>{state={...defaults};save();applyHue();applyBrightness();applyFont()});
    document.addEventListener('click',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!btn.contains(e.target))toggle(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  }

  function enhance(){
    injectCss();addUi();applyHue();applyBrightness();applyFont();
    new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length))queueFont()}).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
