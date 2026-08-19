(() => {
  'use strict';

  const KEY='manaGeyserDisplayV2';
  const OLD_KEY='manaGeyserDisplayV1';
  const $=id=>document.getElementById(id);
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));

  const defaults={fontScale:1,brightness:'dark',hue:'brown'};
  const hues={
    brown:{label:'Brown',accent:'#d4ad73',deep:'#714629',glow:'#b97843',warm:'#e0c18e'},
    blue:{label:'Blue',accent:'#72c5ef',deep:'#245d82',glow:'#2f83b3',warm:'#b7d6e7'},
    green:{label:'Green',accent:'#80c99b',deep:'#356e4d',glow:'#449466',warm:'#bdd7b4'},
    purple:{label:'Purple',accent:'#b69bda',deep:'#674d8e',glow:'#8061aa',warm:'#d0b8df'}
  };
  const brightnesses={
    lighter:{label:'Lighter'},
    light:{label:'Light'},
    dark:{label:'Dark'},
    darker:{label:'Darker'}
  };

  let state=load();
  let fontQueued=false;

  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      if(saved){
        return {
          fontScale:clamp(+saved.fontScale||1,.8,2),
          brightness:brightnesses[saved.brightness]?saved.brightness:'dark',
          hue:hues[saved.hue]?saved.hue:'brown'
        };
      }
      const old=JSON.parse(localStorage.getItem(OLD_KEY)||'null');
      if(old){
        const hueMap={mana:'blue',gold:'brown',ember:'brown',verdant:'green',amethyst:'purple'};
        return {
          fontScale:clamp(+old.fontScale||1,.8,2),
          brightness:old.mode==='light'?'light':'dark',
          hue:hueMap[old.accent]||'brown'
        };
      }
    }catch{}
    return {...defaults};
  }

  function save(){
    try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}
  }

  function injectCss(){
    if($('v64DisplayCss'))return;
    const s=document.createElement('style');
    s.id='v64DisplayCss';
    s.textContent=`
      :root{
        --v64-accent:#d4ad73;
        --v64-deep:#714629;
        --v64-glow:#b97843;
        --v64-warm:#e0c18e;
        --v64-soft:rgba(181,126,76,.18);
        --v64-page1:#0b0807;
        --v64-page2:#18100c;
        --v64-page3:#090706;
        --v64-surface1:rgba(28,19,14,.94);
        --v64-surface2:rgba(17,12,10,.96);
        --v64-nav1:rgba(12,8,7,.96);
        --v64-nav2:rgba(18,12,9,.96);
        --v64-table1:#15100c;
        --v64-table2:#0e0a08;
        --v64-text:#eadfce;
        --v64-muted:#aa9d88;
        --v64-border:rgba(217,179,112,.16);
        --v64-image-opacity:.05;
        --v64-image-brightness:.70;
      }

      body{
        --blue:var(--v64-accent)!important;
        --blue2:var(--v64-deep)!important;
        --gold:var(--v64-warm)!important;
        color:var(--v64-text)!important;
        background:
          radial-gradient(circle at 15% 11%,color-mix(in srgb,var(--v64-glow) 24%,transparent),transparent 30%),
          radial-gradient(circle at 86% 32%,color-mix(in srgb,var(--v64-accent) 18%,transparent),transparent 34%),
          linear-gradient(145deg,var(--v64-page1) 0%,var(--v64-page2) 51%,var(--v64-page3) 100%)!important;
      }
      body:before{
        opacity:var(--v64-image-opacity)!important;
        filter:saturate(.72) contrast(1.02) brightness(var(--v64-image-brightness))!important;
      }
      body:after{
        background:
          linear-gradient(90deg,color-mix(in srgb,var(--v64-page1) 80%,transparent),color-mix(in srgb,var(--v64-glow) 13%,transparent) 54%,color-mix(in srgb,var(--v64-page3) 78%,transparent)),
          linear-gradient(180deg,transparent 0%,color-mix(in srgb,var(--v64-page3) 92%,transparent) 92%)!important;
      }

      #v62Topbar,.sectionNav{
        background:linear-gradient(120deg,var(--v64-nav1),var(--v64-nav2))!important;
        border-color:var(--v64-border)!important;
      }
      #researchPage .section{
        background:linear-gradient(145deg,color-mix(in srgb,var(--v64-surface1) 32%,transparent),color-mix(in srgb,var(--v64-surface2) 18%,transparent))!important;
      }
      .v60Verdict,.v60Item,.v60Math article,.v60Compare article,.v60Stage,.v60Instill article,.v60Skill,.v60Sell,.steps,.card,.deepCard,.price{
        background:linear-gradient(145deg,var(--v64-surface1),var(--v64-surface2))!important;
        border-color:var(--v64-border)!important;
        color:var(--v64-text)!important;
      }
      .tableWrap{
        background:linear-gradient(145deg,var(--v64-table1),var(--v64-table2))!important;
        border-color:var(--v64-border)!important;
      }
      .libraryToolbar input,.libraryToolbar select{
        background:linear-gradient(145deg,var(--v64-surface1),var(--v64-surface2))!important;
        color:var(--v64-text)!important;
        border-color:var(--v64-border)!important;
      }

      .eyebrow,.kicker,.v60Verdict span,.v60Math span,.v60ItemBody span,.v60Instill span,.v60Sell span,.tagPill.mana,.libCount{
        color:var(--v64-accent)!important;
      }
      .v60Verdict.rec,.v60Item.best,.highlightBlue{
        border-color:color-mix(in srgb,var(--v64-accent) 48%,transparent)!important;
        box-shadow:inset 0 0 34px color-mix(in srgb,var(--v64-glow) 17%,transparent),0 12px 32px rgba(0,0,0,.12)!important;
      }
      .v60Formula,.callout,.formula{
        border-left-color:var(--v64-accent)!important;
        background:linear-gradient(135deg,color-mix(in srgb,var(--v64-glow) 15%,var(--v64-surface1)),color-mix(in srgb,var(--v64-deep) 14%,var(--v64-surface2)))!important;
      }
      .v62BrandMark{
        border-color:color-mix(in srgb,var(--v64-accent) 52%,transparent)!important;
        background:radial-gradient(circle at 40% 34%,var(--v64-accent),var(--v64-deep) 75%)!important;
      }
      .v62Mode.research,button[data-page='research'],.v62ResearchButton{
        border-color:color-mix(in srgb,var(--v64-accent) 58%,transparent)!important;
        background:linear-gradient(145deg,color-mix(in srgb,var(--v64-deep) 88%,#111),color-mix(in srgb,var(--v64-accent) 32%,#111))!important;
      }
      .v62Mode.research.active{
        background:linear-gradient(145deg,var(--v64-deep),var(--v64-accent))!important;
        border-color:var(--v64-accent)!important;
        color:#fff!important;
      }
      .sectionNav a:hover{
        background:color-mix(in srgb,var(--v64-glow) 15%,transparent)!important;
        border-color:color-mix(in srgb,var(--v64-accent) 34%,transparent)!important;
      }
      #guidePage .heroBlue{
        background:
          radial-gradient(circle at 59% 43%,color-mix(in srgb,var(--v64-accent) 30%,transparent),transparent 31%),
          linear-gradient(90deg,color-mix(in srgb,var(--v64-deep) 23%,transparent),color-mix(in srgb,var(--v64-glow) 19%,transparent) 55%,color-mix(in srgb,var(--v64-accent) 12%,transparent))!important;
        mix-blend-mode:screen!important;
      }

      .v60Verdict p,.v60Verdict li,.v60ItemBody p,.v60Swap,.v60Compare p,.v60Stage p,.v60Instill p,.v60Sell p,.steps p,.card p,.deepCard p,.deepCard li,.v60Intro,.sectionIntro,.researchHero p{
        color:var(--v64-muted)!important;
      }
      .v60Section h2,.v60Section h3,.section h2,.section h3,.researchHero h1,.researchHero h2{
        color:var(--v64-text)!important;
      }
      table td{color:var(--v64-text)!important;border-color:var(--v64-border)!important}
      table th{border-color:var(--v64-border)!important}

      /* LUMINANCE LADDER — these values are deliberately non-overlapping.
         Lighter is near-paper white; Light is warm mid-light; Dark is the default;
         Darker is near-black. Hue is mixed into every level. */
      body[data-v64-brightness='lighter']{
        --v64-page1:color-mix(in srgb,#fffefb 94%,var(--v64-accent));
        --v64-page2:color-mix(in srgb,#faf7f1 90%,var(--v64-accent));
        --v64-page3:color-mix(in srgb,#ffffff 95%,var(--v64-deep));
        --v64-surface1:color-mix(in srgb,#fffefb 94%,var(--v64-accent));
        --v64-surface2:color-mix(in srgb,#f8f3eb 91%,var(--v64-deep));
        --v64-nav1:color-mix(in srgb,#fffdf9 94%,var(--v64-accent));
        --v64-nav2:color-mix(in srgb,#f8f3eb 91%,var(--v64-deep));
        --v64-table1:color-mix(in srgb,#ffffff 96%,var(--v64-accent));
        --v64-table2:color-mix(in srgb,#fbf7f0 92%,var(--v64-deep));
        --v64-text:#251f1a;
        --v64-muted:#5f574e;
        --v64-border:color-mix(in srgb,var(--v64-deep) 18%,transparent);
        --v64-image-opacity:.025;
        --v64-image-brightness:1.38;
        color-scheme:light;
      }
      body[data-v64-brightness='light']{
        --v64-page1:color-mix(in srgb,#f2ece3 86%,var(--v64-accent));
        --v64-page2:color-mix(in srgb,#e7ddd0 82%,var(--v64-accent));
        --v64-page3:color-mix(in srgb,#f6f1e9 88%,var(--v64-deep));
        --v64-surface1:color-mix(in srgb,#f8f3eb 88%,var(--v64-accent));
        --v64-surface2:color-mix(in srgb,#e9dfd2 84%,var(--v64-deep));
        --v64-nav1:color-mix(in srgb,#f4eee6 88%,var(--v64-accent));
        --v64-nav2:color-mix(in srgb,#e8ddd0 84%,var(--v64-deep));
        --v64-table1:color-mix(in srgb,#faf6ef 90%,var(--v64-accent));
        --v64-table2:color-mix(in srgb,#eae0d3 85%,var(--v64-deep));
        --v64-text:#302820;
        --v64-muted:#655b50;
        --v64-border:color-mix(in srgb,var(--v64-deep) 23%,transparent);
        --v64-image-opacity:.035;
        --v64-image-brightness:1.18;
        color-scheme:light;
      }
      body[data-v64-brightness='dark']{
        --v64-page1:color-mix(in srgb,#090807 76%,var(--v64-deep));
        --v64-page2:color-mix(in srgb,#17100c 68%,var(--v64-deep));
        --v64-page3:color-mix(in srgb,#080706 78%,var(--v64-deep));
        --v64-surface1:color-mix(in srgb,#201711 75%,var(--v64-deep));
        --v64-surface2:color-mix(in srgb,#120d0a 79%,var(--v64-deep));
        --v64-nav1:color-mix(in srgb,#0a0807 79%,var(--v64-deep));
        --v64-nav2:color-mix(in srgb,#15100c 76%,var(--v64-deep));
        --v64-table1:color-mix(in srgb,#17110d 78%,var(--v64-deep));
        --v64-table2:color-mix(in srgb,#0d0a08 82%,var(--v64-deep));
        --v64-text:#eadfce;
        --v64-muted:#aa9d88;
        --v64-border:color-mix(in srgb,var(--v64-accent) 18%,transparent);
        --v64-image-opacity:.05;
        --v64-image-brightness:.70;
        color-scheme:dark;
      }
      body[data-v64-brightness='darker']{
        --v64-page1:color-mix(in srgb,#020202 82%,var(--v64-deep));
        --v64-page2:color-mix(in srgb,#050404 78%,var(--v64-deep));
        --v64-page3:color-mix(in srgb,#010101 86%,var(--v64-deep));
        --v64-surface1:color-mix(in srgb,#090706 82%,var(--v64-deep));
        --v64-surface2:color-mix(in srgb,#040303 88%,var(--v64-deep));
        --v64-nav1:color-mix(in srgb,#020202 88%,var(--v64-deep));
        --v64-nav2:color-mix(in srgb,#070504 84%,var(--v64-deep));
        --v64-table1:color-mix(in srgb,#080605 84%,var(--v64-deep));
        --v64-table2:color-mix(in srgb,#030303 90%,var(--v64-deep));
        --v64-text:#eee5d8;
        --v64-muted:#9d9284;
        --v64-border:color-mix(in srgb,var(--v64-accent) 13%,transparent);
        --v64-image-opacity:.022;
        --v64-image-brightness:.42;
        color-scheme:dark;
      }

      body[data-v64-brightness='lighter'] #guidePage .heroCopy,
      body[data-v64-brightness='light'] #guidePage .heroCopy{
        color:#fff!important;
        text-shadow:0 2px 12px rgba(0,0,0,.46);
      }
      body[data-v64-brightness='lighter'] #guidePage .heroCopy .lede,
      body[data-v64-brightness='light'] #guidePage .heroCopy .lede,
      body[data-v64-brightness='lighter'] #guidePage .subtitle,
      body[data-v64-brightness='light'] #guidePage .subtitle{
        color:#f0e8dc!important;
      }
      body[data-v64-brightness='lighter'] .v62BrandText b,
      body[data-v64-brightness='light'] .v62BrandText b,
      body[data-v64-brightness='lighter'] .v62Mode,
      body[data-v64-brightness='light'] .v62Mode,
      body[data-v64-brightness='lighter'] .sectionNav a,
      body[data-v64-brightness='light'] .sectionNav a{
        color:var(--v64-text)!important;
      }
      body[data-v64-brightness='lighter'] table th{
        background:color-mix(in srgb,#f7f2e9 91%,var(--v64-accent))!important;
        color:#51483e!important;
      }
      body[data-v64-brightness='light'] table th{
        background:color-mix(in srgb,#e5dacb 84%,var(--v64-accent))!important;
        color:#574b3f!important;
      }

      #v64DisplayBtn{display:inline-flex;align-items:center;gap:5px}
      #v64DisplayBtn .v64Aa{font-weight:950;font-size:10px;letter-spacing:-.04em}
      #v64DisplayPanel{
        position:fixed;
        right:max(12px,calc((100vw - 1180px)/2));
        top:62px;
        z-index:230;
        width:min(370px,calc(100vw - 24px));
        padding:14px;
        border:1px solid var(--v64-border);
        border-radius:17px;
        background:linear-gradient(145deg,var(--v64-surface1),var(--v64-surface2));
        backdrop-filter:blur(22px);
        box-shadow:0 22px 70px rgba(0,0,0,.38);
        color:var(--v64-text);
      }
      #v64DisplayPanel[hidden]{display:none}
      .v64PanelHead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px}
      .v64PanelHead span{display:block;font-size:7px;letter-spacing:.13em;text-transform:uppercase;color:var(--v64-accent);font-weight:950}
      .v64PanelHead b{display:block;font-size:15px;margin-top:3px}
      .v64Close{border:1px solid var(--v64-border);background:transparent;color:inherit;border-radius:9px;width:32px;height:32px;cursor:pointer}
      .v64Group{padding:11px 0;border-top:1px solid var(--v64-border)}
      .v64Group:first-of-type{border-top:0;padding-top:0}
      .v64GroupLabel{font-size:7px;text-transform:uppercase;letter-spacing:.11em;color:var(--v64-muted);font-weight:950;margin-bottom:8px}
      .v64FontRow{display:grid;grid-template-columns:48px 1fr 48px;gap:7px;align-items:center}
      .v64FontBtn,.v64Choice,.v64Hue,.v64Reset{
        border:1px solid var(--v64-border);
        background:linear-gradient(145deg,var(--v64-surface1),var(--v64-surface2));
        color:var(--v64-text);
        border-radius:10px;
        cursor:pointer;
        font-weight:900;
      }
      .v64FontBtn{height:44px;font-size:18px}
      .v64FontReadout{text-align:center;border:1px solid var(--v64-border);border-radius:10px;padding:9px;background:linear-gradient(145deg,var(--v64-surface2),var(--v64-surface1))}
      .v64FontReadout b{display:block;font-size:13px}
      .v64FontReadout span{font-size:7px;color:var(--v64-muted)}
      .v64ChoiceGrid,.v64HueGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
      .v64Choice{min-height:42px;font-size:7.5px;padding:7px 4px}
      .v64Choice.active,.v64Hue.active{
        border-color:var(--v64-accent);
        box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--v64-accent) 20%,transparent),0 5px 15px color-mix(in srgb,var(--v64-deep) 18%,transparent);
        background:linear-gradient(145deg,color-mix(in srgb,var(--v64-accent) 20%,var(--v64-surface1)),color-mix(in srgb,var(--v64-deep) 24%,var(--v64-surface2)));
      }
      .v64Hue{display:grid;place-items:center;gap:5px;min-height:58px;padding:6px 3px;font-size:7px}
      .v64Swatch{width:27px;height:27px;border-radius:50%;border:2px solid rgba(255,255,255,.20);background:linear-gradient(135deg,var(--sw1),var(--sw2));box-shadow:0 4px 11px rgba(0,0,0,.24)}
      .v64Reset{width:100%;padding:10px;font-size:8px;color:var(--v64-muted)}
      .v64Hint{font-size:7px;line-height:1.45;color:var(--v64-muted);margin-top:7px}

      @media(max-width:700px){
        #v64DisplayPanel{top:56px;right:8px;width:calc(100vw - 16px);max-height:calc(100vh - 66px);overflow:auto}
        #v64DisplayBtn .v64Label{display:none}
        .v64ChoiceGrid,.v64HueGrid{grid-template-columns:repeat(4,minmax(58px,1fr))}
      }
      @media(max-width:430px){
        .v64ChoiceGrid,.v64HueGrid{grid-template-columns:repeat(2,1fr)}
        .v64Hue{min-height:52px;grid-template-columns:30px 1fr;text-align:left}
        .v64Swatch{width:25px;height:25px}
      }
    `;
    document.head.appendChild(s);
  }

  function applyHue(){
    const h=hues[state.hue]||hues.brown;
    const root=document.documentElement;
    root.style.setProperty('--v64-accent',h.accent);
    root.style.setProperty('--v64-deep',h.deep);
    root.style.setProperty('--v64-glow',h.glow);
    root.style.setProperty('--v64-warm',h.warm);
    root.style.setProperty('--v64-soft',`color-mix(in srgb, ${h.glow} 18%, transparent)`);
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
    if(!el.dataset.v64BaseFont){
      const px=parseFloat(getComputedStyle(el).fontSize);
      if(!Number.isFinite(px)||px<=0)return;
      el.dataset.v64BaseFont=String(px);
    }
    el.style.fontSize=`${(+el.dataset.v64BaseFont*state.fontScale).toFixed(2)}px`;
  }

  function applyFont(){
    document.querySelectorAll(textSelector).forEach(scaleElement);
    const read=$('v64FontValue');
    if(read)read.textContent=`${Math.round(state.fontScale*100)}%`;
  }
  function queueFont(){
    if(fontQueued)return;
    fontQueued=true;
    requestAnimationFrame(()=>{fontQueued=false;applyFont()});
  }
  function setFont(next){state.fontScale=clamp(Math.round(next*10)/10,.8,2);save();applyFont()}
  function setBrightness(v){state.brightness=v;save();applyBrightness()}
  function setHue(v){state.hue=v;save();applyHue()}

  function panelHtml(){
    return `<div class="v64PanelHead"><div><span>Display settings</span><b>Read it your way</b></div><button type="button" class="v64Close" aria-label="Close display settings">×</button></div>
      <div class="v64Group"><div class="v64GroupLabel">Text size</div><div class="v64FontRow"><button type="button" class="v64FontBtn" data-font="minus">A−</button><div class="v64FontReadout"><b id="v64FontValue">100%</b><span>80–200% · saved</span></div><button type="button" class="v64FontBtn" data-font="plus">A+</button></div><div class="v64Hint">10% steps. The guide's fixed-size mobile text scales too.</div></div>
      <div class="v64Group"><div class="v64GroupLabel">Brightness</div><div class="v64ChoiceGrid">${Object.entries(brightnesses).map(([k,v])=>`<button type="button" class="v64Choice" data-brightness="${k}">${v.label}</button>`).join('')}</div><div class="v64Hint">Lighter is the brightest paper-like theme; Light is deliberately one full step darker.</div></div>
      <div class="v64Group"><div class="v64GroupLabel">Background hue</div><div class="v64HueGrid">${Object.entries(hues).map(([k,v])=>`<button type="button" class="v64Hue" data-hue="${k}"><i class="v64Swatch" style="--sw1:${v.accent};--sw2:${v.deep}"></i><span>${v.label}</span></button>`).join('')}</div><div class="v64Hint">Hue now changes the full page gradient, cards, tables, navigation and ambient glow — not just accent text.</div></div>
      <div class="v64Group"><button type="button" class="v64Reset">Reset to Dark + Brown + 100%</button></div>`;
  }

  function addUi(){
    const top=$('v62Topbar')?.querySelector('.v62TopbarInner');
    if(!top||$('v64DisplayBtn'))return;
    $('v63DisplayBtn')?.remove();
    $('v63DisplayPanel')?.remove();

    const btn=document.createElement('button');
    btn.type='button';
    btn.id='v64DisplayBtn';
    btn.className='v62Mode';
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="v64Aa">Aa</span><span class="v64Label">Display</span>';
    top.appendChild(btn);

    const panel=document.createElement('aside');
    panel.id='v64DisplayPanel';
    panel.hidden=true;
    panel.innerHTML=panelHtml();
    document.body.appendChild(panel);

    const toggle=force=>{
      const open=force??panel.hidden;
      panel.hidden=!open;
      btn.setAttribute('aria-expanded',String(open));
    };

    btn.addEventListener('click',()=>toggle());
    panel.querySelector('.v64Close').addEventListener('click',()=>toggle(false));
    panel.querySelector('[data-font="minus"]').addEventListener('click',()=>setFont(state.fontScale-.1));
    panel.querySelector('[data-font="plus"]').addEventListener('click',()=>setFont(state.fontScale+.1));
    panel.querySelectorAll('.v64Choice').forEach(b=>b.addEventListener('click',()=>setBrightness(b.dataset.brightness)));
    panel.querySelectorAll('.v64Hue').forEach(b=>b.addEventListener('click',()=>setHue(b.dataset.hue)));
    panel.querySelector('.v64Reset').addEventListener('click',()=>{
      state={...defaults};
      save();
      applyHue();
      applyBrightness();
      applyFont();
    });
    document.addEventListener('click',e=>{
      if(!panel.hidden&&!panel.contains(e.target)&&!btn.contains(e.target))toggle(false);
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  }

  function enhance(){
    injectCss();
    addUi();
    applyHue();
    applyBrightness();
    applyFont();
    new MutationObserver(m=>{
      if(m.some(x=>x.addedNodes.length))queueFont();
    }).observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);
  else enhance();
})();
