(() => {
  'use strict';

  const SNAPSHOT_MARKERS = [
    'SNAPSHOT · ARCHMAGE SUSTAIN',
    'CURRENT CHECKPOINT · LEVEL 53'
  ];

  let queued = false;

  function isSnapshotOwned(el) {
    if (!el) return false;
    if (el.id === 'currentCheckpoint') return true;
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    return SNAPSHOT_MARKERS.some(marker => text.includes(marker));
  }

  function removeSnapshotLeaksFrom(page) {
    if (!page) return;

    // Known legacy injection from v66.
    page.querySelectorAll('#currentCheckpoint').forEach(el => el.remove());

    // Catch legacy/current overlays that inject a Snapshot block under Build/Research.
    page.querySelectorAll('section, article, .v60Section, .section, .researchHero').forEach(el => {
      if (!isSnapshotOwned(el)) return;
      if (el.closest('#snapshotPage')) return;
      el.remove();
    });
  }

  function enforceIsolation() {
    const guide = document.getElementById('guidePage');
    const research = document.getElementById('researchPage');
    const snapshot = document.getElementById('snapshotPage');

    removeSnapshotLeaksFrom(guide);
    removeSnapshotLeaksFrom(research);

    // Snapshot is a true peer page, never a child of Build or Research.
    if (snapshot) {
      if (snapshot.parentElement === guide || snapshot.parentElement === research) {
        const content = document.querySelector('.content') || guide?.parentElement || research?.parentElement;
        if (content) content.appendChild(snapshot);
      }
      snapshot.setAttribute('data-v71-isolated', '1');
    }

    // Remove stale in-page links that imply Snapshot is still a subsection.
    [guide, research].forEach(page => {
      page?.querySelectorAll('a[href="#snapshot"], a[href^="#snap"]').forEach(a => {
        if (!a.closest('#v62Topbar')) a.remove();
      });
    });
  }

  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      enforceIsolation();
    });
  }

  function init() {
    enforceIsolation();
    const observer = new MutationObserver(queue);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hashchange', queue);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
