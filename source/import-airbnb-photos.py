"""Download only the 34 property photos already identified on the public listing.
No session, private API, calendar scraping or reviews scraping is used.
"""
from pathlib import Path
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

ROOT=Path(__file__).resolve().parent.parent
PHOTOS=json.loads((ROOT/'src/data/photos.json').read_text())
ORIGINALS=ROOT/'source/airbnb/originals'
PUBLIC=ROOT/'public/assets/airbnb'

def fetch(photo):
    raw=photo['sourceUrl'].replace('/im/pictures/','/pictures/').split('?')[0]
    original=ORIGINALS/f"{photo['id']:02d}.jpg"
    if not original.exists():
        original.write_bytes(urllib.request.urlopen(raw,timeout=30).read())
    with Image.open(original).convert('RGB') as image:
        for size,suffix in [(2400,''),(1600,'-1600'),(800,'-800')]:
            output=PUBLIC/f"{photo['id']:02d}{suffix}.webp"
            resized=image.copy();resized.thumbnail((size,size))
            resized.save(output,'WEBP',quality=90 if size==2400 else 88,method=5)
    return photo['id']

if __name__=='__main__':
    ORIGINALS.mkdir(parents=True,exist_ok=True);PUBLIC.mkdir(parents=True,exist_ok=True)
    print('Imported photos:',list(ThreadPoolExecutor(max_workers=6).map(fetch,PHOTOS)))
