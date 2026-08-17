from pathlib import Path
import re

p = Path('site/index.html')
s = p.read_text(encoding='utf-8')
shell = Path('site/v42-build.html').read_text(encoding='utf-8')

# The old fixed/global nav is not part of the redesigned Build page or backend.
# Remove it from the deploy artifact rather than hiding it after first paint.
s = re.sub(r'<nav\s+class="nav"[^>]*>.*?</nav>', '', s, count=1, flags=re.S)
s = re.sub(r'<nav\s+class="mobileNav"[^>]*>.*?</nav>', '', s, count=1, flags=re.S)

# Rename the browser title.
s = re.sub(r'<title>.*?</title>', '<title>Mana Geyser Shaman — PoE2 Build Guide</title>', s, count=1, flags=re.S)

critical = '''
<link rel="stylesheet" href="./v42-build.css">
<style id="v42-critical">
html,body{background:#0d0b0a}
body.v42FrontMode>.slide,body.v42FrontMode>.nav,body.v42FrontMode>.mobileNav,body.v42FrontMode>#mfFront,body.v42FrontMode>#mfBackend{display:none!important}
body.v42FrontMode #v42Build{display:block!important}
body.v42BackendMode #v42Build{display:none!important}
body.v42BackendMode>.nav,body.v42BackendMode>.mobileNav,body.v42BackendMode .mfNav,body.v42BackendMode>#mfFront{display:none!important}
body.v42BackendMode>.slide{display:flex!important}
body.v42BackendMode>#mfBackend{display:block!important}
</style>
'''
if 'v42-build.css' not in s:
    s = s.replace('</head>', critical + '</head>', 1)

# Add the front-mode class before any page JavaScript runs, eliminating the old-design flash.
m = re.search(r'<body([^>]*)>', s, flags=re.I)
if not m:
    raise SystemExit('body tag not found')
attrs = m.group(1)
if re.search(r'\bclass=', attrs, flags=re.I):
    attrs = re.sub(r'class="([^"]*)"', lambda x: f'class="{x.group(1)} v42FrontMode"', attrs, count=1)
else:
    attrs += ' class="v42FrontMode"'
body_tag = '<body' + attrs + '>'
s = s[:m.start()] + body_tag + '\n' + shell + '\n' + s[m.end():]

if 'v42-build.js' not in s:
    s = s.replace('</body>', '<script src="./v42-build.js"></script>\n</body>', 1)

p.write_text(s, encoding='utf-8')
