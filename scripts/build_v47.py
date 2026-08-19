from pathlib import Path

src = Path('site/v80-index.html')
out = Path('site/index.html')

if not src.exists():
    raise SystemExit('site/v80-index.html missing')

html = src.read_text(encoding='utf-8')
required = [
    'MAIN BUILD IDEA',
    'MAIN GEMS + SUPPORTS',
    'MAIN ITEMS TO CONSIDER',
    'MAIN GOALS',
    'NODE LIBRARY',
    'MAIN RECOMMENDED NODES',
    'QUEST REWARD RECOMMENDATIONS',
    'PROGRESSION + SUGGESTED ITEMS',
    './assets/shaman-mana-geyser.webp',
    './v80-guide.css',
    './v80-guide-data.js',
    './v80-guide.js',
]
for token in required:
    if token not in html:
        raise SystemExit(f'missing guide contract token: {token}')

out.write_text(html, encoding='utf-8')
print('built clean single-page Mana Geyser guide', len(html))
