from pathlib import Path
import subprocess, sys, re

# Keep the mature v44/v45 markup/CSS base, then strip the runtime layers the
# player no longer uses. Research keeps the static node/item libraries.
subprocess.run([sys.executable, 'scripts/build_v46.py'], check=True)

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')

# Remove calculator/optimizer/live-character runtime layers. The front page is
# now a findings guide; Research is a static/searchable reference library.
for src in [
    './v44-instils.js', './v45.js', './v46.js', './v46-benchmark.js',
    './v47.js', './v48-topology.js', './v50-visual-restoration.js',
    './v51-strugglescream-package.js', './v52-gain-as-extra-lab.js',
    './v53-advanced-damage-nodes.js'
]:
    s = re.sub(r'\s*<script src="' + re.escape(src) + r'"></script>\s*', '\n', s)

# The old compact calculator and poe.ninja link are not part of the new product.
s = re.sub(r'<aside class="calcRail".*?</aside>', '', s, flags=re.S)
s = re.sub(r'<a href="https://poe\.ninja/[^\"]*"[^>]*>poe\.ninja.*?</a>', '', s, flags=re.S | re.I)

needle = '</body>'
if needle not in s:
    raise SystemExit('body closing tag missing')
for script in [
    '<script src="./v54-sortable-tables.js"></script>\n',
    '<script src="./v60-front-guide.js"></script>\n',
    '<script src="./v61-chase-defence-notes.js"></script>\n',
]:
    if script.strip() not in s:
        s = s.replace(needle, script + needle, 1)

p.write_text(s, encoding='utf-8')
print('built findings-first v61 guide + static Research', len(s))
