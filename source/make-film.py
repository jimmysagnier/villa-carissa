"""Original Airbnb JPEGs to native Full HD H.264 hero films.
Requires Pillow and imageio-ffmpeg; see source/airbnb/media.json for provenance.
"""
import argparse
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(next((ROOT / '.venv/lib').glob('python*/site-packages'))))
import imageio_ffmpeg
from PIL import Image

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ASSETS = ROOT / 'public/assets'
ORIGINALS = ROOT / 'source/airbnb/originals'
FPS = 30
SECONDS = 6
FADE = 1
# Return to the first scene: no abrupt jump when the background loops.
SHOTS = [(30,.55), (31,.51), (6,.51), (17,.46), (33,.37), (30,.55)]
DURATION = 25

def render(mobile):
    width, height = (720,1280) if mobile else (1920,1080)
    work_w, work_h = (2160,3840) if mobile else (5760,3240)
    name = 'villa-carissa-mobile.mp4' if mobile else 'villa-carissa-film.mp4'
    output = ASSETS/name
    args = [FFMPEG, '-y', '-filter_complex_threads', '2']
    for photo,_ in SHOTS:
        args += ['-i', str(ORIGINALS/f'{photo:02d}.jpg')]
    filters = []
    for i,(_,focus) in enumerate(SHOTS):
        # Larger working still reduces whole-pixel stepping in slow zooms.
        target = f'{work_w}:{work_h}'
        zoom = '1.01+0.035*on/179'
        filters.append(
            f'[{i}:v]scale={target}:force_original_aspect_ratio=increase:flags=lanczos,'
            f'crop={target}:x=(iw-ow)*{focus}:y=(ih-oh)*0.48,'
            f"zoompan=z='{zoom}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':"
            f'd={FPS*SECONDS}:s={width}x{height}:fps={FPS},'
            f'setsar=1,format=yuv420p[v{i}]'
        )
    last='v0'
    for i in range(1,len(SHOTS)):
        out=f'fade{i}'
        filters.append(f'[{last}][v{i}]xfade=transition=fade:duration={FADE}:offset={5*i}[{out}]')
        last=out
    filters.append(f'[{last}]trim=start=1:end=26,setpts=PTS-STARTPTS,unsharp=5:5:0.22:3:3:0[film]')
    args += ['-filter_complex',';'.join(filters),'-map','[film]','-an',
             '-c:v','libx264','-preset','slow','-crf','21' if mobile else '20',
             '-maxrate','2500k' if mobile else '6000k','-bufsize','5000k' if mobile else '12000k',
             '-r','30','-fps_mode','cfr',
             '-threads','4','-pix_fmt','yuv420p','-profile:v','high','-level','4.1',
             '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',
             '-movflags','+faststart',str(output)]
    with (ROOT/f'source/film-{"mobile" if mobile else "desktop"}.log').open('w') as log:
        subprocess.run(args,check=True,stdout=subprocess.DEVNULL,stderr=log)
    poster=ASSETS/('villa-poster-mobile.webp' if mobile else 'villa-poster.webp')
    first_frame=ROOT/'source'/('poster-mobile.png' if mobile else 'poster-desktop.png')
    subprocess.run([FFMPEG,'-y','-i',str(output),'-frames:v','1',str(first_frame)],
                   check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    with Image.open(first_frame) as im:im.save(poster,'WEBP',quality=94,method=6)
    first_frame.unlink()
    print(json.dumps({'file':name,'width':width,'height':height,'fps':FPS,
                      'duration':DURATION,'bytes':output.stat().st_size}),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--variant',choices=['desktop','mobile','all'],default='all')
    variant=parser.parse_args().variant
    if variant in ['desktop','all']:render(False)
    if variant in ['mobile','all']:render(True)
