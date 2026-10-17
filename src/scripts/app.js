(()=>{
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const menu=$('.menu-toggle'), nav=$('#navigation'), scrim=$('.menu-scrim');
 function setMenu(open){
  menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  nav.inert=!open;nav.classList.toggle('open',open);scrim.hidden=!open;document.body.classList.toggle('nav-open',open);
  if(open)requestAnimationFrame(()=>$('a',nav)?.focus({preventScroll:true}));else menu.focus({preventScroll:true});
 }
 menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 scrim.addEventListener('click',()=>setMenu(false));
 $$('a',nav).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{
  if(!nav.classList.contains('open'))return;
  if(e.key==='Escape'){setMenu(false);return}
  if(e.key==='Tab'){
   const focusable=[menu,...$$('a',nav)],first=focusable[0],last=focusable.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
 });
 const hero=$('#hero-video'), reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(hero){
  hero.addEventListener('playing',()=>hero.classList.add('is-playing'));
  let inView=true;
  const mobile=matchMedia('(max-width: 600px)');
  const canAutoPlay=()=>!reduced.matches&&inView&&!document.hidden&&!$('dialog[open]');
  const syncPlayback=()=>{if(canAutoPlay())hero.play().catch(()=>{});else hero.pause()};
  const loadHero=()=>{
   if(reduced.matches){hero.pause();return}
   const src=mobile.matches?hero.dataset.mobileSrc:hero.dataset.desktopSrc;
   if(hero.getAttribute('src')!==src){hero.classList.remove('is-playing');hero.src=src;hero.muted=true;hero.load()}
   syncPlayback();
  };
  hero.addEventListener('error',()=>{hero.classList.remove('is-playing')});
  reduced.addEventListener('change',loadHero);mobile.addEventListener('change',loadHero);
  document.addEventListener('visibilitychange',syncPlayback);
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;syncPlayback()},{threshold:.1}).observe(hero);
  loadHero();
 }
 $$('dialog').forEach(d=>{ $('[data-close]',d).addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
 const film=$('#film-dialog'), filmVideo=$('video',film);let resumeHero=false;
 $$('[data-film]').forEach(b=>b.addEventListener('click',()=>{resumeHero=hero&&!hero.paused;hero?.pause();film.showModal();filmVideo.play().catch(()=>{})}));
 film.addEventListener('close',()=>{filmVideo.pause();if(resumeHero&&!reduced.matches)hero.play().catch(()=>{})});
 const items=$$('.gallery-item'), filters=$$('[data-filter]'), lightbox=$('#photo-dialog');let visible=items,index=0;
 function filter(cat){if(!filters.some(b=>b.dataset.filter===cat))cat='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===cat)));items.forEach(b=>b.hidden=cat!=='all'&&b.dataset.category!==cat);visible=items.filter(b=>!b.hidden)}
 filters.forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.filter);history.replaceState(null,'',location.pathname+(b.dataset.filter==='all'?'':'#'+b.dataset.filter))}));
 function applyHash(){filter(location.hash.slice(1)||'all')}if(items.length){applyHash();window.addEventListener('hashchange',applyHash)}
 function showPhoto(i){index=(i+visible.length)%visible.length;const item=visible[index],img=$('#lightbox-image');img.src=item.dataset.src||$('img',item).src;img.alt=item.dataset.caption;$('#photo-caption').textContent=item.dataset.caption;$('#photo-count').textContent=String(index+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0')}
 items.forEach(b=>b.addEventListener('click',()=>{showPhoto(visible.indexOf(b));lightbox.showModal()}));
 $('#photo-prev').addEventListener('click',()=>showPhoto(index-1));$('#photo-next').addEventListener('click',()=>showPhoto(index+1));
 lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(index-1)}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(index+1)}});
 let startX=0;lightbox.addEventListener('touchstart',e=>startX=e.changedTouches[0].screenX,{passive:true});lightbox.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-startX;if(Math.abs(d)>60)showPhoto(index+(d<0?1:-1))},{passive:true});

})();
