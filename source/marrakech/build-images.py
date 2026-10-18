"""Create responsive WebP variants from the selected, documented source photos."""
import json, re, html
from pathlib import Path
from PIL import Image, ImageOps
root=Path(__file__).resolve().parents[2]
r=root/'source/marrakech'
selected=json.loads((r/'selected.json').read_text())
official={
 'secret':('https://www.lejardinsecretmarrakech.com/images/pages/rbd190325-14.webp','https://www.lejardinsecretmarrakech.com/','Le Jardin Secret'),
 'menara':('https://mice.visitmarrakech.com/wp-content/uploads/2022/05/10_bonnes_raisons.jpg','https://mice.visitmarrakech.com/listing/les-jardins-de-la-menara/','CRT Marrakech-Safi'),
 'ysl':('https://www.museeyslmarrakech.com/wp-content/uploads/2022/10/myslm_5e-2048x1159.jpg','https://www.museeyslmarrakech.com/fr/le-musee/','Musée Yves Saint Laurent Marrakech'),
 'agafay':('https://visitmarrakech.com/wp-content/uploads/2024/10/DSC_4325.jpg','https://visitmarrakech.com/destinations/agafay/','CRT Marrakech-Safi'),
 'ourika':('https://visitmarrakech.com/wp-content/uploads/2024/10/ourika1-2.jpg','https://visitmarrakech.com/en/listing/ourika/','CRT Marrakech-Safi'),
 'bains':('https://lesbainsdemarrakech.com/img/bdm/bains-de-marrakech-home-slider-hammam-soins.jpg','https://lesbainsdemarrakech.com/?lang=fr','Les Bains de Marrakech')}
out=root/'public/assets/marrakech';out.mkdir(parents=True,exist_ok=True)
data={};manifest=[]
for f in sorted((r/'originals').glob('*.jpg')):
 key=f.stem;im=ImageOps.exif_transpose(Image.open(f)).convert('RGB');iw,ih=im.size
 if key in official:
  url,source,author=official[key];license='';licenseUrl=''
 else:
  p=selected[key];md=p['extmetadata'];url=p['url'].split('?')[0];source=p['descriptionurl'];author=html.unescape(re.sub('<[^>]+>','',md.get('Artist',{}).get('value','Wikimedia Commons'))).strip();license=md.get('LicenseShortName',{}).get('value','');licenseUrl=md.get('LicenseUrl',{}).get('value','')
 variants=[]
 widths=[640,1000,1600,2400] if key=='hero' else [480,800,1200,1600]
 for w in sorted(set(min(iw,w) for w in widths)):
  h=round(ih*w/iw);name=f'{key}-{w}.webp';im.resize((w,h),Image.Resampling.LANCZOS).save(out/name,'WEBP',quality=85,method=6);variants.append(dict(src='/assets/marrakech/'+name,width=w,height=h))
 data[key]=dict(variants=variants,source=source,author=author,license=license,licenseUrl=licenseUrl)
 manifest.append(dict(id=key,url=url,source=source,author=author,license=license,licenseUrl=licenseUrl,dimensions=[iw,ih]))
(root/'src/data/marrakech-images.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(r/'download-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(len(data),'photos prepared')
