from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json

root=Path(__file__).resolve().parent.parent
dist=root/'dist'
errors=[]
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.links=[];self.ids=set();self.h1=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):self.ids.add(a['id'])
        if tag=='h1':self.h1+=1
        for k in ['src','href','poster','data-desktop-src','data-mobile-src','data-deferred-src']:
            if k in a:self.links.append(a[k])

files=list(dist.rglob('*.html'))
for file in files:
    p=Page();p.feed(file.read_text())
    if 'http-equiv="refresh"' not in file.read_text().lower() and p.h1!=1:errors.append(f'{file}: expected one H1, got {p.h1}')
    for href in p.links:
        u=urlsplit(href)
        if u.scheme or u.netloc or href.startswith('#'):continue
        path=dist/unquote(u.path.lstrip('/'))
        if not path.exists() and not (path/'index.html').exists():errors.append(f'{file}: missing {href}')
legacy=json.loads((root/'source/legacy/pages.json').read_text())
for p in legacy:
    path=urlsplit(p['link']).path.lstrip('/')
    if not (dist/path/'index.html').exists():errors.append('Legacy route lost: '+path)
for name in ['villa-carissa-film.mp4','villa-carissa-mobile.mp4','villa-poster.webp','villa-poster-mobile.webp']:
    if not (dist/'assets'/name).is_file() or not (dist/'assets'/name).stat().st_size>1000:errors.append('Media missing: '+name)
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(files)} HTML documents, local links/assets, six original pages and video.')
