(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let observer;
  let queued = false;

  function injectCss(){
    if ($('v62ShellCss')) return;
    const style = document.createElement('style');
    style.id = 'v62ShellCss';
    style.textContent = `
      html{background:#080706}
      body{
        min-height:100vh;
        background:
          radial-gradient(circle at 18% 15%,rgba(44,102,141,.12),transparent 26%),
          radial-gradient(circle at 84% 30%,rgba(85,137,174,.08),transparent 30%),
          linear-gradient(180deg,rgba(8,7,6,.96),rgba(14,10,8,.98) 42%,rgba(8,7,6,1));
      }
      body:before{
        content:'';position:fixed;inset:0;z-index:-3;pointer-events:none;
        background-image:url('./assets/shaman-mana-geyser.webp');
        background-size:cover;background-position:70% 25%;background-repeat:no-repeat;
        opacity:.055;filter:saturate(.78) contrast(1.04) brightness(.68);
        transform:scale(1.025);
      }
      body:after{
        content:'';position:fixed;inset:0;z-index:-2;pointer-events:none;
        background:
          linear-gradient(90deg,rgba(8,7,6,.90),rgba(8,7,6,.62) 46%,rgba(4,17,28,.48)),
          linear-gradient(180deg,rgba(8,7,6,.18),rgba(8,7,6,.74) 75%,rgba(8,7,6,.96));
      }
      .shell,.content{position:relative;z-index:0}
      .content{width:100%!important;max-width:none!important;margin:0!important;padding:0!important}
      #guidePage,#researchPage{width:100%;margin:0 auto}
      .v60Section,.section,.researchHero{width:min(1180px,calc(100% - 48px))!important;margin-left:auto!important;margin-right:auto!important}
      #guidePage .heroCopy{width:min(1180px,calc(100% - 48px))!important;margin-left:auto!important;margin-right:auto!important;padding-left:0!important;padding-right:0!important}
      #guidePage .hero{min-height:670px;border-bottom:1px solid rgba(217,179,112,.14)}
      #guidePage .heroArt{background-position:center 43%!important}
      #guidePage .heroCopy .lede{max-width:720px}
      .sectionNav{
        top:54px!important;justify-content:center;align-items:center;
        padding-left:18px!important;padding-right:18px!important;
        background:rgba(11,8,7,.88)!important;
        border-top:1px solid rgba(255,255,255,.02);
        box-shadow:0 12px 35px rgba(0,0,0,.20);
      }
      .sectionNav a{transition:background .15s ease,border-color .15s ease,color .15s ease}
      .sectionNav a:hover{background:rgba(217,179,112,.07);border-color:rgba(217,179,112,.22)}
      button[data-page='research'],.v62ResearchButton{
        border:1px solid rgba(93,168,209,.50)!important;
        background:linear-gradient(180deg,rgba(27,82,111,.96),rgba(20,59,79,.96))!important;
        color:#e8f5fb!important;border-radius:999px!important;
        padding:8px 11px!important;font-size:8px!important;font-weight:950!important;
        letter-spacing:.04em;cursor:pointer!important;
        box-shadow:inset 0 0 0 1px rgba(165,218,239,.05),0 6px 18px rgba(14,49,67,.18);
      }
      button[data-page='research']:hover,.v62ResearchButton:hover{border-color:rgba(127,202,240,.72)!important;background:linear-gradient(180deg,#236d93,#184d68)!important}
      #v62Topbar{
        position:sticky;top:0;z-index:120;height:54px;
        background:rgba(10,7,6,.94);backdrop-filter:blur(18px);
        border-bottom:1px solid rgba(217,179,112,.16);
        box-shadow:0 9px 30px rgba(0,0,0,.22);
      }
      .v62TopbarInner{width:min(1180px,calc(100% - 36px));height:100%;margin:auto;display:flex;align-items:center;gap:9px}
      .v62Brand{margin-right:auto;display:flex;align-items:center;gap:9px;min-width:0}
      .v62BrandMark{width:27px;height:27px;border-radius:9px;display:grid;place-items:center;border:1px solid rgba(109,182,222,.34);background:radial-gradient(circle at 45% 38%,#3884af,#112d3f 72%);box-shadow:inset 0 0 12px rgba(152,219,255,.12);font-size:13px}
      .v62BrandText{min-width:0}.v62BrandText b{display:block;font-size:9px;letter-spacing:.11em;text-transform:uppercase;color:#e7d7ba;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v62BrandText span{display:block;font-size:6.5px;color:#7f9caf;margin-top:1px;letter-spacing:.04em}
      .v62Mode{border:1px solid var(--line);background:#17100c;color:#bdae95;border-radius:999px;padding:8px 10px;font-size:8px;font-weight:900;cursor:pointer}
      .v62Mode:hover{border-color:rgba(217,179,112,.38);color:#efe2cb}.v62Mode.active{background:#d0b078;color:#1b110b;border-color:#d0b078}
      .v62Mode.research{border-color:rgba(93,168,209,.50);background:#153d54;color:#dff2fb}.v62Mode.research.active{background:#2a789e;border-color:#69b9df;color:white}
      #researchPage .researchHero{padding-top:68px!important;padding-bottom:32px!important}
      #researchPage .researchHero h1{font-size:clamp(43px,5.5vw,76px)!important;max-width:920px}
      #researchPage .researchHero p{max-width:800px}
      #researchPage .section{background:linear-gradient(180deg,rgba(20,14,11,.24),rgba(20,14,11,0));border-radius:18px;padding-left:18px;padding-right:18px}
      #researchPage .sectionNav{border-radius:0 0 14px 14px}
      .v60Verdict,.v60Item,.v60Math article,.v60Compare article,.v60Stage,.v60Instill article,.v60Skill,.steps,.v60Sell,
      #researchPage .card,#researchPage .deepCard,#researchPage .tableWrap{
        box-shadow:0 12px 32px rgba(0,0,0,.12);
      }
      .v60Item,.v60Verdict,.v60Math article,.v60Compare article,.v60Stage,.v60Instill article,.v60Skill{backdrop-filter:blur(5px)}
      .tableWrap{scrollbar-color:#4b3929 #120d0a}
      .tableWrap::-webkit-scrollbar{height:9px;width:9px}.tableWrap::-webkit-scrollbar-thumb{background:#4b3929;border-radius:99px}.tableWrap::-webkit-scrollbar-track{background:#120d0a}
      #poeNinjaSnapshot,#calcRail{display:none!important}
      @media(max-width:900px){
        .sectionNav{justify-content:flex-start!important;top:50px!important}
        #v62Topbar{height:50px}.v62BrandText span{display:none}
        .v62TopbarInner{width:calc(100% - 20px)}
        .v60Section,.section,.researchHero,#guidePage .heroCopy{width:calc(100% - 26px)!important}
        #guidePage .heroArt{background-position:57% 43%!important}
      }
      @media(max-width:560px){
        .v62BrandText b{font-size:8px}.v62Mode{padding:7px 8px;font-size:7px}.v62BrandMark{display:none}
        .sectionNav{padding-left:8px!important;padding-right:8px!important}
        #researchPage .section{padding-left:8px;padding-right:8px}
      }
    `;
    document.head.appendChild(style);
  }

  function showPage(name, updateHash=true){
    const research = name === 'research';
    const guide = $('guidePage');
    const lab = $('researchPage');
    if (!guide || !lab) return;
    guide.classList.toggle('active', !research);
    lab.classList.toggle('active', research);
    document.body.dataset.mode = research ? 'research' : 'guide';
    document.querySelectorAll('[data-v62-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.v62Mode === (research ? 'research' : 'guide'));
    });
    if (updateHash) history.replaceState(null,'',research ? '#research' : '#guide');
    window.scrollTo({top:0,behavior:'auto'});
  }

  function addTopbar(){
    if ($('v62Topbar')) return;
    const shell = document.querySelector('.shell');
    if (!shell) return;
    const bar = document.createElement('header');
    bar.id = 'v62Topbar';
    bar.innerHTML = `<div class="v62TopbarInner">
      <div class="v62Brand"><div class="v62BrandMark">✦</div><div class="v62BrandText"><b>Mana Geyser Shaman</b><span>Runeseeker-free endgame build guide</span></div></div>
      <button type="button" class="v62Mode" data-v62-mode="guide">Build Guide</button>
      <button type="button" class="v62Mode research" data-v62-mode="research">Research</button>
    </div>`;
    shell.prepend(bar);
    bar.querySelectorAll('[data-v62-mode]').forEach(btn => btn.addEventListener('click',()=>showPage(btn.dataset.v62Mode)));
  }

  function bindModeButtons(){
    document.querySelectorAll('[data-page]').forEach(btn => {
      if (btn.dataset.v62Bound) return;
      btn.dataset.v62Bound = '1';
      if (btn.dataset.page === 'research') btn.classList.add('v62ResearchButton');
      btn.addEventListener('click',ev => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        showPage(btn.dataset.page);
      }, true);
    });
  }

  function cleanup(){
    ['calcRail','poeNinjaSnapshot'].forEach(id => $(id)?.remove());
    document.querySelectorAll('.ninjaPanel,.ninjaActions,.chatRefresh,.refreshStatus').forEach(el => el.remove());
    document.querySelectorAll('a[href*="poe.ninja"]').forEach(el => el.remove());
    document.querySelectorAll('.sectionNav button[data-page="research"]').forEach(btn => btn.removeAttribute('style'));
    document.querySelectorAll('.v60ResearchNote').forEach((el,i) => { if (i) el.remove(); });
  }

  function enhance(){
    injectCss();
    addTopbar();
    cleanup();
    bindModeButtons();
    const initial = location.hash === '#research' ? 'research' : 'guide';
    const current = document.body.dataset.mode;
    if (!current) showPage(initial,false);
    else document.querySelectorAll('[data-v62-mode]').forEach(btn => btn.classList.toggle('active',btn.dataset.v62Mode===current));
  }

  function queue(){
    if (queued) return;
    queued = true;
    requestAnimationFrame(()=>{queued=false;cleanup();bindModeButtons();});
  }

  window.v44ShowPage = showPage;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
  observer = new MutationObserver(queue);
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
