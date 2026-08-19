from pathlib import Path
import subprocess, sys, re

# Build the static guide/research foundation, then mount only the final player-facing layers.
subprocess.run([sys.executable, 'scripts/build_v44.py'], check=True)
subprocess.run([sys.executable, 'scripts/build_v44_remnants.py'], check=True)

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')

# Keep the Mana-Geyser visual theme without running the old optimizer/live-character UI.
s = s.replace('./v44.css', './v45.css', 1)

# Remove calculator / optimizer runtimes and all superseded front-page overlays.
# v73 is now the only owner of the Build Guide DOM.
for src in [
    './v44-core.js', './v44-instils.js', './v45.js', './v46.js', './v46-benchmark.js',
    './v47.js', './v48-topology.js', './v50-visual-restoration.js',
    './v51-strugglescream-package.js', './v52-gain-as-extra-lab.js',
    './v53-advanced-damage-nodes.js', './v60-front-guide.js',
    './v61-chase-defence-notes.js', './v63-display-settings.js',
    './v65-budget-theorycraft.js', './v65-thesis-refinement.js',
    './v67-build-visuals.js', './v68-research-theorycraft.js',
    './v70-build-lock.js', './v72-skill-supports.js'
]:
    s = re.sub(r'\s*<script src="' + re.escape(src) + r'"></script>\s*', '\n', s)

# Remove old calculator / poe.ninja markup rather than merely hiding it.
s = re.sub(r'<aside class="calcRail".*?</aside>', '', s, flags=re.S)
s = re.sub(r'\s*<div class="ninjaPanel" id="poeNinjaSnapshot">.*?</article>\s*</div>', '', s, flags=re.S)
s = re.sub(r'<a href="https://poe\.ninja/[^\"]*"[^>]*>.*?</a>', '', s, flags=re.S | re.I)

# Research does not need a live character-profile field.
data_path = Path('site/v44-data.js')
data = data_path.read_text(encoding='utf-8')
data = re.sub(r"\n\s*profile:\s*'https://poe\.ninja/[^']*',", '', data, count=1)
data_path.write_text(data, encoding='utf-8')

needle = '</body>'
if needle not in s:
    raise SystemExit('body closing tag missing')

# Clear ownership:
#   v62 = Build / Research / Snapshot shell
#   v66 = Snapshot content (legacy Build/Research injections are scrubbed by v71/v73)
#   v69 = Research-only theorycraft
#   v71 = Snapshot isolation safety
#   v73 = sole Build Guide owner
#   v64 = display settings/theme, deliberately last
for script in [
    '<script src="./v54-sortable-tables.js"></script>\n',
    '<script src="./v62-guide-shell.js"></script>\n',
    '<script src="./v66-current-checkpoint.js"></script>\n',
    '<script src="./v69-research-theorycraft.js"></script>\n',
    '<script src="./v71-snapshot-isolation.js"></script>\n',
    '<script src="./v73-front-guide.js"></script>\n',
    '<script src="./v64-display-themes.js"></script>\n',
]:
    if script.strip() not in s:
        s = s.replace(needle, script + needle, 1)

p.write_text(s, encoding='utf-8')
print('built consolidated Mana Geyser Build Guide + isolated Snapshot + full Research', len(s))
