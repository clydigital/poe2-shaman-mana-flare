(() => {
  'use strict';
  const KEY='manaGeyserDisplayV1';
  const $=id=>document.getElementById(id);
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const defaults={fontScale:1,mode:'dark',accent:'mana'};
  const palettes={
    mana:{label:'Mana blue',accent:'#6fc4ef',accent2:'#2b769d',soft:'rgba(76,174,226,.16)',warm:'#d6b678'},
    gold:{label:'Relic gold',accent:'#d5b16f',accent2:'#8e6736',soft:'rgba(213,177,111,.16)',warm:'#e4c88e'},
    ember:{label:'Ember',accent:'#e08b63',accent2:'#9b4f35',soft:'rgba(224,139,99,.15)',warm:'#e4b081'},
    verdant:{label:'Verdant',accent:'#7fc49a',accent2:'#3d7552',soft:'rgba(127,196,154,.15)',warm:'#c9d493'},
    amethyst:{label:'Amethyst',accent:'#b49ad8',accent2:'#725699',soft:'rgba(180,154,216,.15)',warm:'#d0b7df'}
  };
  let state=load();
  let fontQueued=false;
  let observer;

  function load(){
    try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}

  function injectCss(){
    if($('v63DisplayCss'))return;
    const s=document.createElement('style');s.id='v63DisplayCss';s.textContent=`
      :root{
        --v63-accent:#6fc4ef;--v63-accent2:#2b769d;--v63-soft:rgba(76,174,226,.16);--v63-warm:#d6b678;
      }
      #v63DisplayBtn{display:inline-flex;align-items:center;gap:5px}
      #v63DisplayBtn .v63Aa{font-weight:950;font-size:10px;letter-spacing:-.04em}
      #v63DisplayPanel{
        position:fixed;right:max(12px,calc((100vw - 1180px)/2));top:62px;z-index:220;
        width:min(350px,calc(100vw - 24px));padding:14px;
        border:1px solid rgba(217,179,112,.23);border-radius:16px;
        background:rgba(18,13,10,.97);backdrop-filter:blur(22px);
        box-shadow:0 22px 70px rgba(0,0,0,.46);color:#eadeca;
        transform-origin:top right;transition:opacity .14s ease,transform .14s ease;
      }
      #v63DisplayPanel[hidden]{display:none}
      .v63PanelHead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:13px}
      .v63PanelHead span{display:block;font-size:7px;letter-spacing:.13em;text-transform:uppercase;color:var(--v63-accent);font-weight:950}
      .v63PanelHead b{display:block;font-size:15px;margin-top:3px}
      .v63Close{border:1px solid rgba(217,179,112,.2);background:transparent;color:inherit;border-radius:9px;width:30px;height:30px;cursor:pointer}
      .v63Group{padding:11px 0;border-top:1px solid rgba(217,179,112,.13)}
      .v63Group:first-of-type{border-top:0;padding-top:0}.v63GroupLabel{font-size:7px;text-transform:uppercase;letter-spacing:.11em;color:#998d7a;font-weight:950;margin-bottom:8px}
      .v63FontRow{display:grid;grid-template-columns:44px 1fr 44px;gap:7px;align-items:center}
      .v63FontBtn,.v63ModeBtn,.v63PaletteBtn,.v63Reset{
        border:1px solid rgba(217,179,112,.20);background:#16100c;color:#ddd0ba;border-radius:10px;cursor:pointer;font-weight:900;
      }
      .v63FontBtn{height:42px;font-size:17px}.v63FontReadout{text-align:center;border:1px solid rgba(217,179,112,.14);border-radius:10px;padding:9px;background:#110c09}.v63FontReadout b{display:block;font-size:13px}.v63FontReadout span{font-size:7px;color:#8e8271}
      .v63ModeRow{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.v63ModeBtn{min-height:38px;font-size:8px;padding:7px}.v63ModeBtn.active,.v63PaletteBtn.active{border-color:var(--v63-accent);box-shadow:inset 0 0 0 1px var(--v63-soft);color:#fff;background:color-mix(in srgb,var(--v63-accent2) 66%,#15100c)}
      .v63PaletteGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}.v63PaletteBtn{display:grid;place-items:center;gap:5px;min-height:54px;padding:6px 3px;font-size:6.5px}.v63Swatch{width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.18);background:var(--swatch);box-shadow:0 3px 9px rgba(0,0,0,.25)}
      .v63Reset{width:100%;padding:9px;font-size:8px;color:#ac9f8b}
      .v63Hint{font-size:7px;line-height:1.45;color:#827766;margin-top:7px}

      /* Palette hooks across both guide and Research. */
      body{--blue:var(--v63-accent)!important;--blue2:var(--v63-accent2)!important;--gold:var(--v63-warm)!important}
      .eyebrow,.kicker,.v60Verdict span,.v60Math span,.v60ItemBody span,.v60Instill span,.v60Sell span,.tagPill.mana,.libCount,.calcSectionLabel{color:var(--v63-accent)!important}
      .v60Verdict.rec,.v60Item.best,.triggerRecommendation,.highlightBlue,.ninjaCard{border-color:color-mix(in srgb,var(--v63-accent) 46%,transparent)!important;box-shadow:inset 0 0 32px var(--v63-soft)!important}
      .v60Formula,.callout{border-left-color:var(--v63-accent)!important;background:color-mix(in srgb,var(--v63-soft) 55%,transparent)!important}
      .v62BrandMark{border-color:color-mix(in srgb,var(--v63-accent) 50%,transparent)!important;background:radial-gradient(circle at 45% 38%,var(--v63-accent),var(--v63-accent2) 74%)!important}
      .v62Mode.research,button[data-page='research'],.v62ResearchButton{border-color:color-mix(in srgb,var(--v63-accent) 58%,transparent)!important;background:linear-gradient(180deg,color-mix(in srgb,var(--v63-accent2) 88%,#111),color-mix(in srgb,var(--v63-accent2) 65%,#111))!important}
      .v62Mode.research.active{background:var(--v63-accent2)!important;border-color:var(--v63-accent)!important}
      .sectionNav a:hover{background:var(--v63-soft)!important;border-color:color-mix(in srgb,var(--v63-accent) 32%,transparent)!important}
      .v54SortBtn.active{border-color:var(--v63-warm)!important}

      /* Light mode: parchment-like, not sterile white. */
      body[data-v63-mode='light']{color:#29241e!important;background:linear-gradient(180deg,#f3efe6,#ebe4d8 48%,#f6f2ea)!important;color-scheme:light}
      body[data-v63-mode='light']:before{opacity:.045!important;filter:saturate(.6) contrast(.92) brightness(1.28)!important}
      body[data-v63-mode='light']:after{background:linear-gradient(90deg,rgba(248,244,236,.92),rgba(247,242,233,.72) 48%,rgba(230,241,247,.54)),linear-gradient(180deg,rgba(248,244,236,.05),rgba(244,239,230,.70) 76%,rgba(246,242,234,.96))!important}
      body[data-v63-mode='light'] #v62Topbar,body[data-v63-mode='light'] .sectionNav{background:rgba(247,242,234,.94)!important;border-color:rgba(94,75,51,.16)!important;color:#322a21!important}
      body[data-v63-mode='light'] .v62BrandText b,body[data-v63-mode='light'] .v62Mode,body[data-v63-mode='light'] .sectionNav a{color:#40362b!important}
      body[data-v63-mode='light'] .v62Mode{background:#eee6d9!important;border-color:rgba(91,69,43,.18)!important}
      body[data-v63-mode='light'] .v62Mode.active{background:var(--v63-warm)!important;color:#20170e!important}
      body[data-v63-mode='light'] .v62Mode.research{background:color-mix(in srgb,var(--v63-accent) 16%,#f4eee5)!important;color:#25333a!important;border-color:color-mix(in srgb,var(--v63-accent) 44%,transparent)!important}
      body[data-v63-mode='light'] .v62Mode.research.active{background:var(--v63-accent2)!important;color:#fff!important}
      body[data-v63-mode='light'] #guidePage .heroShade{background:linear-gradient(90deg,rgba(20,16,13,.76),rgba(16,18,22,.48) 42%,rgba(8,25,38,.10) 70%,rgba(8,14,20,.28)),linear-gradient(0deg,rgba(31,24,19,.78) 0%,transparent 38%)!important}
      body[data-v63-mode='light'] #guidePage .heroCopy{color:#fff!important;text-shadow:0 2px 10px rgba(0,0,0,.35)}
      body[data-v63-mode='light'] #guidePage .heroCopy .lede,body[data-v63-mode='light'] #guidePage .subtitle{color:#eee5d7!important}
      body[data-v63-mode='light'] .v60Section,body[data-v63-mode='light'] .section,body[data-v63-mode='light'] .researchHero{color:#312920!important}
      body[data-v63-mode='light'] .v60Intro,body[data-v63-mode='light'] .sectionIntro,body[data-v63-mode='light'] .researchHero p{color:#675d50!important}
      body[data-v63-mode='light'] .v60Verdict,body[data-v63-mode='light'] .v60Item,body[data-v63-mode='light'] .v60Math article,body[data-v63-mode='light'] .v60Compare article,body[data-v63-mode='light'] .v60Stage,body[data-v63-mode='light'] .v60Instill article,body[data-v63-mode='light'] .v60Skill,body[data-v63-mode='light'] .v60Sell,body[data-v63-mode='light'] .steps,body[data-v63-mode='light'] .card,body[data-v63-mode='light'] .deepCard,body[data-v63-mode='light'] .price{
        background:rgba(252,249,243,.90)!important;border-color:rgba(91,69,43,.16)!important;color:#312920!important;box-shadow:0 10px 28px rgba(72,54,34,.08)!important
      }
      body[data-v63-mode='light'] .v60Verdict p,body[data-v63-mode='light'] .v60Verdict li,body[data-v63-mode='light'] .v60ItemBody p,body[data-v63-mode='light'] .v60Swap,body[data-v63-mode='light'] .v60Compare p,body[data-v63-mode='light'] .v60Stage p,body[data-v63-mode='light'] .v60Instill p,body[data-v63-mode='light'] .v60Sell p,body[data-v63-mode='light'] .steps p,body[data-v63-mode='light'] .card p,body[data-v63-mode='light'] .deepCard p,body[data-v63-mode='light'] .deepCard li{color:#655b4e!important}
      body[data-v63-mode='light'] .tableWrap{background:rgba(252,249,243,.94)!important;border-color:rgba(91,69,43,.17)!important;box-shadow:0 9px 25px rgba(72,54,34,.07)!important}
      body[data-v63-mode='light'] table th{background:#e9e0d2!important;color:#665a4b!important;border-color:rgba(91,69,43,.13)!important}
      body[data-v63-mode='light'] table td{color:#493f34!important;border-color:rgba(91,69,43,.10)!important}
      body[data-v63-mode='light'] .formula,body[data-v63-mode='light'] .v60Formula{background:rgba(228,238,243,.72)!important;color:#40545c!important;border-color:var(--v63-accent)!important}
      body[data-v63-mode='light'] .libraryToolbar input,body[data-v63-mode='light'] .libraryToolbar select{background:#fbf7f0!important;color:#392f26!important;border-color:rgba(91,69,43,.18)!important}
      body[data-v63-mode='light'] #v63DisplayPanel{background:rgba(250,246,239,.98);color:#312920;border-color:rgba(91,69,43,.20);box-shadow:0 22px 70px rgba(72,54,34,.18)}
      body[data-v63-mode='light'] .v63FontBtn,body[data-v63-mode='light'] .v63ModeBtn,body[data-v63-mode='light'] .v63PaletteBtn,body[data-v63-mode='light'] .v63Reset,body[data-v63-mode='light'] .v63FontReadout{background:#f1e9dd;color:#40362b;border-color:rgba(91,69,43,.16)}
      body[data-v63-mode='light'] .v63Group{border-color:rgba(91,69,43,.12)}
      body[data-v63-mode='light'] .v63GroupLabel,body[data-v63-mode='light'] .v63Hint,body[data-v63-mode='light'] .v63FontReadout span{color:#766a5b}
      body[data-v63-mode='light'] .v54SortBtn{background:#f5eee4!important;color:#685b4b!important;border-color:rgba(91,69,43,.18)!important}

      @media(max-width:700px){
        #v63DisplayPanel{top:56px;right:8px;width:calc(100vw - 16px);max-height:calc(100vh - 66px);overflow:auto}
        #v63DisplayBtn .v63Label{display:none}.v63PaletteGrid{grid-template-columns:repeat(5,minmax(48px,1fr))}
      }
    `;document.head.appendChild(s);
  }

  function applyPalette(){
    const p=palettes[state.accent]||palettes.mana;
    const root=document.documentElement;
    root.style.setProperty('--v63-accent',p.accent);root.style.setProperty('--v63-accent2',p.accent2);root.style.setProperty('--v63-soft',p.soft);root.style.setProperty('--v63-warm',p.warm);
    document.querySelectorAll('.v63PaletteBtn').forEach(b=>b.classList.toggle('active',b.dataset.accent===state.accent));
  }
  function resolvedMode(){
    if(state.mode!=='system')return state.mode;
    return matchMedia?.('(prefers-color-scheme: light)').matches?'light':'dark';
  }
  function applyMode(){
    const mode=resolvedMode();document.body.dataset.v63Mode=mode;
    document.querySelectorAll('.v63ModeBtn').forEach(b=>b.classList.toggle('active',b.dataset.mode===state.mode));
  }

  const textSelector=[
    '.content h1','.content h2','.content h3','.content p','.content li','.content td','.content th','.content label','.content input','.content select',
    '.content .kicker','.content .eyebrow','.content .subtitle','.content .lede','.content .v60Swap','.content .v60Footer','.content .v60Liquids',
    '#v62Topbar b','#v62Topbar span','#v62Topbar button','.sectionNav a','.sectionNav button','#v63DisplayPanel button','#v63DisplayPanel b','#v63DisplayPanel span','#v63DisplayPanel div'
  ].join(',');
  function scaleElement(el){
    if(!el||el.closest('#v63DisplayPanel'))return;
    if(!el.dataset.v63BaseFont){const px=parseFloat(getComputedStyle(el).fontSize);if(!Number.isFinite(px)||px<=0)return;el.dataset.v63BaseFont=String(px)}
    const base=+el.dataset.v63BaseFont;el.style.fontSize=`${(base*state.fontScale).toFixed(2)}px`;
  }
  function applyFont(){
    document.querySelectorAll(textSelector).forEach(scaleElement);
    const read=$('v63FontValue');if(read)read.textContent=`${Math.round(state.fontScale*100)}%`;
    document.documentElement.dataset.v63Font=Math.round(state.fontScale*100);
  }
  function queueFont(){if(fontQueued)return;fontQueued=true;requestAnimationFrame(()=>{fontQueued=false;applyFont()})}

  function setFont(next){state.fontScale=clamp(Math.round(next*100)/100,.8,1.6);save();applyFont()}
  function setMode(mode){state.mode=mode;save();applyMode()}
  function setAccent(accent){state.accent=accent;save();applyPalette()}

  function panelHtml(){
    return `<div class="v63PanelHead"><div><span>Display settings</span><b>Make the guide easier to read</b></div><button type="button" class="v63Close" aria-label="Close display settings">×</button></div>
      <div class="v63Group"><div class="v63GroupLabel">Text size</div><div class="v63FontRow"><button type="button" class="v63FontBtn" data-font="minus" aria-label="Decrease font size">A−</button><div class="v63FontReadout"><b id="v63FontValue">100%</b><span>saved on this device</span></div><button type="button" class="v63FontBtn" data-font="plus" aria-label="Increase font size">A+</button></div><div class="v63Hint">Range: 80–160%. This scales the fixed-size guide text too, so it works properly on mobile.</div></div>
      <div class="v63Group"><div class="v63GroupLabel">Appearance</div><div class="v63ModeRow"><button type="button" class="v63ModeBtn" data-mode="dark">Dark</button><button type="button" class="v63ModeBtn" data-mode="light">Light</button><button type="button" class="v63ModeBtn" data-mode="system">System</button></div></div>
      <div class="v63Group"><div class="v63GroupLabel">Accent colour</div><div class="v63PaletteGrid">${Object.entries(palettes).map(([k,p])=>`<button type="button" class="v63PaletteBtn" data-accent="${k}" title="${p.label}"><i class="v63Swatch" style="--swatch:${p.accent}"></i><span>${p.label.replace(' ','<br>')}</span></button>`).join('')}</div></div>
      <div class="v63Group"><button type="button" class="v63Reset">Reset display settings</button></div>`;
  }

  function addUi(){
    const top=$('v62Topbar')?.querySelector('.v62TopbarInner');if(!top||$('v63DisplayBtn'))return;
    const btn=document.createElement('button');btn.type='button';btn.id='v63DisplayBtn';btn.className='v62Mode';btn.setAttribute('aria-expanded','false');btn.innerHTML='<span class="v63Aa">Aa</span><span class="v63Label">Display</span>';
    top.appendChild(btn);
    const panel=document.createElement('aside');panel.id='v63DisplayPanel';panel.hidden=true;panel.innerHTML=panelHtml();document.body.appendChild(panel);
    const toggle=force=>{const open=force??panel.hidden;panel.hidden=!open;btn.setAttribute('aria-expanded',String(open))};
    btn.addEventListener('click',()=>toggle());panel.querySelector('.v63Close').addEventListener('click',()=>toggle(false));
    panel.querySelector('[data-font="minus"]').addEventListener('click',()=>setFont(state.fontScale-.1));panel.querySelector('[data-font="plus"]').addEventListener('click',()=>setFont(state.fontScale+.1));
    panel.querySelectorAll('.v63ModeBtn').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
    panel.querySelectorAll('.v63PaletteBtn').forEach(b=>b.addEventListener('click',()=>setAccent(b.dataset.accent)));
    panel.querySelector('.v63Reset').addEventListener('click',()=>{state={...defaults};save();applyPalette();applyMode();setFont(1)});
    document.addEventListener('click',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!btn.contains(e.target))toggle(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  }

  function enhance(){
    injectCss();addUi();applyPalette();applyMode();applyFont();
    if(matchMedia){const mq=matchMedia('(prefers-color-scheme: light)');mq.addEventListener?.('change',()=>{if(state.mode==='system')applyMode()})}
    observer=new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length))queueFont()});observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
