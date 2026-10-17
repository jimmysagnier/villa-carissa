import importlib.util,subprocess,pathlib
import sys
sys.path.insert(0,str(next(pathlib.Path('.venv/lib').glob('python*/site-packages'))))
import imageio_ffmpeg as m
ff=m.get_ffmpeg_exe();ids=[25,38,30,28,40];args=[ff,'-y']
for n in ids:args+=['-i',f'dist/assets/photo-{n}.webp']
filters=[]
for i in range(5):filters.append(f"[{i}:v]scale=1600:-1,crop=1600:900,zoompan=z='1.02+0.0005*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=120:s=1280x720:fps=24,setsar=1,format=yuv420p[v{i}]")
last='v0'
for i in range(1,5):
 out=f'x{i}';filters.append(f'[{last}][v{i}]xfade=transition=fade:duration=0.8:offset={4.2*i}[{out}]');last=out
args+=['-filter_complex',';'.join(filters),'-map',f'[{last}]','-an','-c:v','libx264','-preset','fast','-crf','24','-movflags','+faststart','-t','21.8','dist/assets/villa-carissa-film.mp4']
subprocess.run(args,check=True,stdout=subprocess.DEVNULL,stderr=open('source/film-build.log','w'));print('Film ready',pathlib.Path('dist/assets/villa-carissa-film.mp4').stat().st_size)
