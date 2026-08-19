from pathlib import Path
import subprocess, sys, re

# Build only the static guide/research foundation we still use.
# v60+ supplies the player-facing conclusions; Research keeps the searchable libraries.
subprocess.run([sys.executable, 'scripts/build_v44.py'], check=True)
subprocess.run([sys.executable, 'scripts/build_v44_remnants.py'], check=True)

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')

# Keep the final Mana-Geyser visual theme without running the old v45/v46 UI layers.
s = s.replace('./v44.css', './v45.css', 1)

# Remove calculator / live-character / optimizer runtimes and superseded overlays.
for src in [
    './v44-core.js', './v44-instils.js', './v45.js', './v46.js', './v46-benchmark.js',
    './v47.js', './v48-topology.js', './v50-visual-restoration.js',
    './v51-strugglescream-package.js', './v52-gain-as-extra-lab.js',
    './v53-advanced-damage-nodes.js', './v61-chase-defence-notes.js',
    './v63-display-settings.js', './v65-thesis-refinement.js', './v68-research-theorycraft.js'
]:
    s = re.sub(r'\s*<script src="' + re.escape(src) + r'"></script>\s*', '\n', s)

# Remove old calculator / poe.ninja markup rather than merely hiding it.
s = re.sub(r'<aside class="calcRail".*?</aside>', '', s, flags=re.S)
s = re.sub(r'\s*<div class="ninjaPanel" id="poeNinjaSnapshot">.*?</article>\s*</div>', '', s, flags=re.S)
s = re.sub(r'<a href="https://poe\.ninja/[^\"]*"[^>]*>.*?</a>', '', s, flags=re.S | re.I)

# The Research catalogue no longer needs a character-profile field either.
data_path = Path('site/v44-data.js')
data = data_path.read_text(encoding='utf-8')
data = re.sub(r"\n\s*profile:\s*'https://poe\.ninja/[^']*',", '', data, count=1)
data_path.write_text(data, encoding='utf-8')

needle = '</body>'
if needle not in s:
    raise SystemExit('body closing tag missing')

# v70 locks the player-facing Build page after the exploratory overlays have mounted.
# v71 then enforces Snapshot as a true peer page, never a Build/Research subsection.
# v64 deliberately loads last so the selected hue/brightness owns every surface.
for script in [
    '<script src="./v54-sortable-tables.js"></script>\n',
    '<script src="./v60-front-guide.js"></script>\n',
    '<script src="./v62-guide-shell.js"></script>\n',
    '<script src="./v65-budget-theorycraft.js"></script>\n',
    '<script src="./v66-current-checkpoint.js"></script>\n',
    '<script src="./v67-build-visuals.js"></script>\n',
    '<script src="./v69-research-theorycraft.js"></script>\n',
    '<script src="./v70-build-lock.js"></script>\n',
    '<script src="./v71-snapshot-isolation.js"></script>\n',
    '<script src="./v64-display-themes.js"></script>\n',
]:
    if script.strip() not in s:
        s = s.replace(needle, script + needle, 1)

p.write_text(s, encoding='utf-8')
print('built locked Armour+EB Entangle/Rage Mana Flare guide + isolated Snapshot + full Research', len(s))
