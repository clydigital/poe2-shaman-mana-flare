from pathlib import Path
import subprocess, sys

subprocess.run([sys.executable, 'scripts/build_v45.py'], check=True)

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')
needle = '</body>'
scripts = '<script src="./v46.js"></script>\n<script src="./v46-benchmark.js"></script>\n'
if needle not in s:
    raise SystemExit('body closing tag missing')
if '<script src="./v46.js"></script>' not in s:
    s = s.replace(needle, scripts + needle, 1)
elif '<script src="./v46-benchmark.js"></script>' not in s:
    s = s.replace('<script src="./v46.js"></script>\n', scripts, 1)
p.write_text(s, encoding='utf-8')
print('built v46', len(s))
