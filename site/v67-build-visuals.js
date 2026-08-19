(() => {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));

  const wikiFile = filename => `https://www.poe2wiki.net/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

  const ART = {
    valako: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ2hhcm1zL0NoYXJtR3JlYXRlckZyZW56eSIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/86d1ee176b/CharmGreaterFrenzy.png',
    bramble: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvV2VhcG9ucy9PbmVIYW5kV2VhcG9ucy9XYW5kcy9XYW5kMTMiLCJ3IjoyLCJoIjo0LCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/72b38fef35/Wand13.png',
    astramentis: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQW11bGV0cy9VbmlxdWVzL0FzdHJhbWVudGlzIiwidyI6MSwiaCI6MSwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/2cb3d3c8c7/Astramentis.png',
    prisoner: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9HbG92ZXMvVW5pcXVlcy9UaGVQcmlzb25lcnNNYW5hY2xlcyIsInciOjIsImgiOjIsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/d083162232/ThePrisonersManacles.png',
    waistgate: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQmVsdHMvVW5pcXVlcy9XYWlzdGdhdGUiLCJ3IjoyLCJoIjoxLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/02bb2a2fb4/Waistgate.png',
    manaFlask: 'https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtcy9GbGFza3MvTWFuYUZsYXNrNSIsInciOjEsImgiOjIsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/8155bbad42/ManaFlask5.png',
    kurgalGaze: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvSmV3ZWxzL1VuaXF1ZXMvS3VyZ2Fsc0dhemUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/ef6a32a685/KurgalsGaze.png',
    jiquaniThesis: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQW11bGV0cy9VbmlxdWVzL0ppcXVhbmlzVGhlc2lzIiwidyI6MSwiaCI6MSwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/a40db590c6/JiquanisThesis.png',
    runeseeker: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9VbmlxdWVzL1J1bmVzZWVrZXIiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/7f082e6efb/Runeseeker.png',
    rareGloves: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9HbG92ZXMvR2xvdmVzMTMiLCJ3IjoyLCJoIjoyLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/a31c519213/Gloves13.png',
    runeMind: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvU29ja2V0YWJsZXMvUnVuZXMvUnVuZU1pbmQzIiwidyI6MSwiaCI6MSwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/44f83b1604/RuneMind3.png',
    runeInspiration: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvU29ja2V0YWJsZXMvUnVuZXMvUnVuZUluc3BpcmF0aW9uMyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/c85d45d8aa/RuneInspiration3.png',
    runeStorm: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvU29ja2V0YWJsZXMvUnVuZXMvUnVuZVN0b3JtMyIsInciOjEsImgiOjEsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/8b387cf3c1/RuneStorm3.png',
    eldritchBattery: 'https://assets.poe.ninja/poe2/tree/passives/keystoneeldritchbattery.webp',
    mindOverMatter: 'https://assets.poe.ninja/poe2/tree/passives/heroicspirit.webp',
    invocatedEfficiency: wikiFile('auraeffect passive skill icon.png'),
    mysticalRage: wikiFile('Rage passive skill icon.png'),
    electricAmplification: wikiFile('LightningDamagenode passive skill icon.png'),
    aspiringGenius: wikiFile('manaregeneration passive skill icon.png'),
    temporalMastery: wikiFile('ReducedSkillEffectDurationNode passive skill icon.png'),
    pureChaos: wikiFile('ChaosDamagenode passive skill icon.png'),
    arcaneIntensity: wikiFile('mana passive skill icon.png'),
    sacredFlow: 'https://assets.poe.ninja/poe2/tree/passives/shaman/shamangainspiritemptycharmslot.webp'
  };

  function injectCss() {
    if ($('#v67Css')) return;
    const s = document.createElement('style');
    s.id = 'v67Css';
    s.textContent = `
      .v67VisualRow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:6px 0 8px}
      .v67VisualChip{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:8px;background:rgba(21,16,12,0.85);border:1px solid var(--v64-border,rgba(217,179,112,0.22));color:var(--v64-text,#eadfce);font-size:8.5px;font-weight:900}
      .v67VisualChip img{width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))}
      .v67NodeIcon{display:inline-flex;align-items:center;gap:5px;padding:3px 7px;border-radius:999px;background:rgba(15,22,33,0.85);border:1px solid rgba(116,195,233,0.3);color:#82c3e7;font-size:8px;font-weight:950;text-transform:uppercase;letter-spacing:0.06em}
      .v67NodeIcon img{width:16px;height:16px;border-radius:50%;object-fit:cover}
      .v67RuneArt{display:inline-block;width:32px;height:32px;object-fit:contain;vertical-align:middle;margin-right:6px;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.6))}
      .v67ItemThumb{width:42px;height:42px;object-fit:contain;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5))}
      .v67WarnVisual{display:inline-flex;align-items:center;gap:6px;margin-right:10px;padding:3px 6px;border-radius:6px;background:rgba(25,18,13,0.8);border:1px solid rgba(217,179,112,0.18)}
      .v67WarnVisual img{width:20px;height:20px;object-fit:contain}
    `;
    document.head.appendChild(s);
  }

  function makeImg(url, alt, className = 'v67ItemThumb') {
    return `<img src="${url}" alt="${alt}" class="${className}" onerror="this.style.display='none'">`;
  }
  function makeChip(url, name) {
    return `<span class="v67VisualChip">${makeImg(url, name, '')}<span>${name}</span></span>`;
  }
  function makeNodeIcon(url, name) {
    return `<span class="v67NodeIcon">${makeImg(url, name, '')}<span>${name}</span></span>`;
  }

  function decorateCheckpoint(guide) {
    const keepGrid = guide.querySelector('.v66KeepGrid');
    if (!keepGrid || keepGrid.dataset.v67Decorated) return;
    keepGrid.dataset.v67Decorated = '1';
    keepGrid.querySelectorAll('.v66Keep').forEach(item => {
      const title = item.querySelector('h3')?.textContent || '';
      let imgUrl = null;
      if (title.includes('Bramble Scratch')) imgUrl = ART.bramble;
      else if (title.includes('Astramentis')) imgUrl = ART.astramentis;
      else if (title.includes("Prisoner's Manacles")) imgUrl = ART.prisoner;
      else if (title.includes('Waistgate')) imgUrl = ART.waistgate;
      if (imgUrl && !item.querySelector('.v67VisualRow')) {
        const row = document.createElement('div');
        row.className = 'v67VisualRow';
        row.innerHTML = makeImg(imgUrl, title, 'v67ItemThumb');
        item.querySelector('h3')?.after(row);
      }
    });
    guide.querySelectorAll('.v66Action').forEach(action => {
      if (action.dataset.v67Decorated) return;
      action.dataset.v67Decorated = '1';
      const text = action.textContent || '';
      if (text.includes("Valako's Roar") && !action.querySelector('.v67VisualRow')) {
        const row = document.createElement('div');
        row.className = 'v67VisualRow';
        row.innerHTML = makeChip(ART.valako, "Valako's Roar");
        action.querySelector('h3')?.after(row);
      } else if (text.includes('rare Mana Flask') && !action.querySelector('.v67VisualRow')) {
        const row = document.createElement('div');
        row.className = 'v67VisualRow';
        row.innerHTML = makeChip(ART.manaFlask, 'Rare Mana Flask');
        action.querySelector('h3')?.after(row);
      }
    });
  }

  function decorateNodeSection(guide) {
    guide.querySelectorAll('.v60Section, .section, article, div').forEach(sec => {
      const text = sec.textContent || '';
      if (sec.dataset.v67NodesDecorated) return;
      if ((text.includes('Eldritch Battery') || text.includes('Mind Over Matter') || text.includes('Invocated Efficiency')) &&
          (sec.classList.contains('v60Compare') || sec.classList.contains('v60Math') || sec.classList.contains('v66Math') || sec.classList.contains('v60Section'))) {
        const ebCheck = sec.querySelector('h3, strong, b');
        if (ebCheck && !sec.querySelector('.v67NodeIconGroup')) {
          sec.dataset.v67NodesDecorated = '1';
          const container = document.createElement('div');
          container.className = 'v67VisualRow v67NodeIconGroup';
          container.innerHTML = `${makeNodeIcon(ART.eldritchBattery, 'Eldritch Battery')}${makeNodeIcon(ART.mindOverMatter, 'Mind Over Matter')}${makeNodeIcon(ART.invocatedEfficiency, 'Invocated Efficiency')}`;
          sec.insertBefore(container, sec.firstChild?.nextSibling || sec.firstChild);
        }
      }
    });
  }

  function decorateRunesAndInstills(guide) {
    guide.querySelectorAll('.v60Compare article, .v60Item, .card').forEach(card => {
      if (card.dataset.v67RuneDecorated) return;
      const html = card.innerHTML || '';
      let runeUrl = null, runeName = null;
      if (html.includes('Perfect Mind')) { runeUrl = ART.runeMind; runeName = 'Perfect Mind'; }
      else if (html.includes('Perfect Inspiration')) { runeUrl = ART.runeInspiration; runeName = 'Perfect Inspiration'; }
      else if (html.includes('Perfect Storm')) { runeUrl = ART.runeStorm; runeName = 'Perfect Storm'; }
      if (runeUrl) {
        card.dataset.v67RuneDecorated = '1';
        const chip = document.createElement('div');
        chip.className = 'v67VisualRow';
        chip.innerHTML = `<img src="${runeUrl}" alt="${runeName}" class="v67RuneArt" onerror="this.style.display='none'"> <strong>${runeName} Rune</strong>`;
        card.insertBefore(chip, card.firstChild);
      }
    });
    guide.querySelectorAll('.v60Instill article').forEach(art => {
      if (art.dataset.v67InstillDecorated) return;
      const title = art.querySelector('h3')?.textContent || art.textContent || '';
      let nodeUrl = null, name = null;
      if (title.includes('Invocated Efficiency')) { nodeUrl = ART.invocatedEfficiency; name = 'Invocated Efficiency'; }
      else if (title.includes('Mystical Rage')) { nodeUrl = ART.mysticalRage; name = 'Mystical Rage'; }
      else if (title.includes('Electric Amplification')) { nodeUrl = ART.electricAmplification; name = 'Electric Amplification'; }
      else if (title.includes('Aspiring Genius')) { nodeUrl = ART.aspiringGenius; name = 'Aspiring Genius'; }
      else if (title.includes('Temporal Mastery')) { nodeUrl = ART.temporalMastery; name = 'Temporal Mastery'; }
      else if (title.includes('Pure Chaos')) { nodeUrl = ART.pureChaos; name = 'Pure Chaos'; }
      if (nodeUrl) {
        art.dataset.v67InstillDecorated = '1';
        const icon = document.createElement('div');
        icon.className = 'v67VisualRow';
        icon.innerHTML = makeNodeIcon(nodeUrl, name);
        art.querySelector('h3')?.before(icon);
      }
    });
  }

  function decorateKeyGearAndWarnings(guide) {
    guide.querySelectorAll('.v60Item, .card, article').forEach(el => {
      const text = el.textContent || '';
      if (text.includes('Kurgal Arcane-Surge gloves') || text.includes('Kurgal gloves')) {
        if (!el.dataset.v67GloveDecorated) {
          el.dataset.v67GloveDecorated = '1';
          const title = el.querySelector('h3');
          if (title && title.innerHTML.includes('⚡')) title.innerHTML = title.innerHTML.replace('⚡', '');
          if (!el.querySelector('.v67GloveRow')) {
            const row = document.createElement('div');
            row.className = 'v67VisualRow v67GloveRow';
            row.innerHTML = makeChip(ART.rareGloves, 'Rare Kurgal Gloves Base');
            (title || el.firstChild).after(row);
          }
        }
      }
    });
    guide.querySelectorAll('.v60Sell, .v60Section, .v60Compare, article').forEach(warn => {
      const text = warn.textContent || '';
      if (text.includes('Do not spend') || text.includes('Do not buy') || text.includes("Kurgal's Gaze")) {
        if (warn.dataset.v67WarnDecorated) return;
        warn.dataset.v67WarnDecorated = '1';
        const row = document.createElement('div');
        row.className = 'v67VisualRow';
        row.innerHTML = `<span class="v67WarnVisual">${makeImg(ART.kurgalGaze, "Kurgal's Gaze", 'v67ItemThumb')}<span>Kurgal's Gaze</span></span><span class="v67WarnVisual">${makeImg(ART.jiquaniThesis, "Jiquani's Thesis", 'v67ItemThumb')}<span>Jiquani's Thesis</span></span><span class="v67WarnVisual">${makeImg(ART.runeseeker, 'Runeseeker', 'v67ItemThumb')}<span>Runeseeker</span></span>${makeNodeIcon(ART.mindOverMatter, 'Mind Over Matter')}`;
        warn.querySelector('h3, b, span')?.after(row);
      }
    });
  }

  function decorateOtherBuildSections(guide) {
    guide.querySelectorAll('.v60Runeseeker, .v60Math, .v60Section, article, .card').forEach(block => {
      const text = block.textContent || '';
      if (block.dataset.v67OtherDecorated) return;
      if (text.includes('Runeseeker') && (block.classList.contains('v60Runeseeker') || block.classList.contains('v60Section'))) {
        block.dataset.v67OtherDecorated = '1';
        if (!block.querySelector('.v67RuneseekerRow')) {
          const row = document.createElement('div');
          row.className = 'v67VisualRow v67RuneseekerRow';
          row.innerHTML = `${makeChip(ART.runeseeker, 'Runeseeker')}${makeChip(ART.waistgate, 'Waistgate')}`;
          block.querySelector('h2, h3, .steps')?.before(row);
        }
      }
      if (text.includes('Arcane Intensity') && !block.querySelector('.v67ArcaneRow')) {
        block.dataset.v67OtherDecorated = '1';
        const row = document.createElement('div');
        row.className = 'v67VisualRow v67ArcaneRow';
        row.innerHTML = makeNodeIcon(ART.arcaneIntensity, 'Arcane Intensity');
        block.querySelector('h3, b')?.after(row);
      }
      if (text.includes('Sacred Flow') && !block.querySelector('.v67SacredRow')) {
        block.dataset.v67OtherDecorated = '1';
        const row = document.createElement('div');
        row.className = 'v67VisualRow v67SacredRow';
        row.innerHTML = makeNodeIcon(ART.sacredFlow, 'Sacred Flow');
        block.querySelector('h3, b')?.after(row);
      }
    });
  }

  function applyVisuals() {
    injectCss();
    const guide = $('#guidePage') || document.body;
    if (!guide) return;
    decorateCheckpoint(guide);
    decorateNodeSection(guide);
    decorateRunesAndInstills(guide);
    decorateKeyGearAndWarnings(guide);
    decorateOtherBuildSections(guide);
  }

  function init() {
    applyVisuals();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyVisuals);
    setTimeout(applyVisuals, 300);
    setTimeout(applyVisuals, 1000);
  }

  init();
})();