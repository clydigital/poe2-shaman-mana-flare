from pathlib import Path
import subprocess, sys

subprocess.run([sys.executable, 'scripts/build_v46.py'], check=True)

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')
needle = '</body>'
scripts = [
    '<script src="./v47.js"></script>\n',
    '<script src="./v48-topology.js"></script>\n',
]
if needle not in s:
    raise SystemExit('body closing tag missing')
for script in scripts:
    if script not in s:
        s = s.replace(needle, script + needle, 1)
p.write_text(s, encoding='utf-8')
print('built v47 + topology v2', len(s))
