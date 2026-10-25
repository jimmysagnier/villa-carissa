(()=>{
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const deferredPhotos=$$('img[data-deferred-src]');
 const revealPhoto=img=>{img.loading='eager';img.srcset=img.dataset.deferredSrcset;img.src=img.dataset.deferredSrc;delete img.dataset.deferredSrc;delete img.dataset.deferredSrcset};
 if('IntersectionObserver' in window){
  const photosObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){revealPhoto(entry.target);photosObserver.unobserve(entry.target)}})},{rootMargin:'500px'});
  deferredPhotos.forEach(img=>photosObserver.observe(img));
 }else deferredPhotos.forEach(revealPhoto);
 const menu=$('.menu-toggle'), nav=$('#navigation'), scrim=$('.menu-scrim');
 const menuBackground=[$('main'),$('footer'),$('.header .brand-signature'),$('.header-cta'),$('.skip')].filter(Boolean);
 function setMenu(open){
  menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  nav.inert=!open;nav.classList.toggle('open',open);scrim.hidden=!open;document.body.classList.toggle('nav-open',open);
  menuBackground.forEach(element=>{element.inert=open});
  if(open)requestAnimationFrame(()=>$('a',nav)?.focus({preventScroll:true}));else menu.focus({preventScroll:true});
 }
 menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 scrim.addEventListener('click',()=>setMenu(false));
 $$('a',nav).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{
  if(!nav.classList.contains('open'))return;
  if(e.key==='Escape'){setMenu(false);return}
  if(e.key==='Tab'){
   const focusable=[menu,...$$('a',nav)],current=focusable.indexOf(document.activeElement);
   const next=e.shiftKey?(current<=0?focusable.length-1:current-1):(current+1)%focusable.length;
   e.preventDefault();focusable[next].focus();
  }
 });
 const hero=$('#hero-video'), reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(hero){
  const motion=$('[data-hero-motion]'),poster=$('.hero-media picture img');
  let inView=true,ready=false,pausedByUser=false;
  const mobile=matchMedia('(max-width: 600px)');
  const canAutoPlay=()=>ready&&!pausedByUser&&!reduced.matches&&!navigator.connection?.saveData&&inView&&!document.hidden&&!$('dialog[open]');
  const updateMotion=()=>{
   if(!motion)return;
   const label=pausedByUser?'Reprendre la vidéo':'Mettre la vidéo en pause';
   motion.setAttribute('aria-label',label);motion.title=label;motion.classList.toggle('is-paused',pausedByUser);
  };
  hero.addEventListener('playing',()=>{hero.classList.add('is-playing');if(motion)motion.hidden=false});
  motion?.addEventListener('click',()=>{pausedByUser=!pausedByUser;updateMotion();syncPlayback()});
  const syncPlayback=()=>{if(canAutoPlay())hero.play().catch(()=>{});else hero.pause()};
  const loadHero=()=>{
   if(!ready||reduced.matches||navigator.connection?.saveData){hero.pause();if(motion)motion.hidden=true;return}
   const src=mobile.matches?hero.dataset.mobileSrc:hero.dataset.desktopSrc;
   if(hero.getAttribute('src')!==src){hero.classList.remove('is-playing');hero.poster=poster.currentSrc||poster.src;hero.src=src;hero.muted=true;hero.load()}
   syncPlayback();
  };
  hero.addEventListener('error',()=>{hero.classList.remove('is-playing');if(motion)motion.hidden=true});
  reduced.addEventListener('change',loadHero);mobile.addEventListener('change',loadHero);
  document.addEventListener('visibilitychange',syncPlayback);
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;syncPlayback()},{threshold:.1}).observe(hero);
  // Render the high-priority poster before the decorative film competes for bandwidth.
  const startHero=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
   const start=()=>{ready=true;loadHero()};
   if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:1800});else setTimeout(start,250);
  }));
  if(document.readyState==='complete')startHero();else window.addEventListener('load',startHero,{once:true});
 }
 $$('dialog').forEach(d=>{ $('[data-close]',d).addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
 const film=$('#film-dialog'), filmVideo=film&&$('video',film);let resumeHero=false;
 $$('[data-film]').forEach(b=>b.addEventListener('click',()=>{if(!film||!filmVideo)return;resumeHero=hero&&!hero.paused;hero?.pause();if(!filmVideo.getAttribute('src')){filmVideo.poster=filmVideo.dataset.poster;filmVideo.src=filmVideo.dataset.src}film.showModal();filmVideo.play().catch(()=>{})}));
 film?.addEventListener('close',()=>{filmVideo.pause();if(resumeHero&&!reduced.matches)hero.play().catch(()=>{})});
 const items=$$('.gallery-item'), filters=$$('[data-filter]'), lightbox=$('#photo-dialog');let visible=items,index=0;
 function filter(cat){if(!filters.some(b=>b.dataset.filter===cat))cat='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===cat)));items.forEach(b=>b.hidden=cat!=='all'&&b.dataset.category!==cat);visible=items.filter(b=>!b.hidden)}
 filters.forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.filter);history.replaceState(null,'',location.pathname+(b.dataset.filter==='all'?'':'#'+b.dataset.filter))}));
 function applyHash(){filter(location.hash.slice(1)||'all')}if(items.length){applyHash();window.addEventListener('hashchange',applyHash)}
 function showPhoto(i){if(!lightbox||!visible.length)return;index=(i+visible.length)%visible.length;const item=visible[index],img=$('#lightbox-image');img.src=item.dataset.src||$('img',item).src;img.alt=item.dataset.caption;$('#photo-caption').textContent=item.dataset.caption;$('#photo-count').textContent=String(index+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');$('#photo-status').textContent=`Photo ${index+1} sur ${visible.length} : ${item.dataset.caption}`}
 items.forEach(b=>b.addEventListener('click',()=>{showPhoto(visible.indexOf(b));lightbox.showModal()}));
 $('#photo-prev')?.addEventListener('click',()=>showPhoto(index-1));$('#photo-next')?.addEventListener('click',()=>showPhoto(index+1));
 lightbox?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(index-1)}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(index+1)}});
 let startX=0;lightbox?.addEventListener('touchstart',e=>startX=e.changedTouches[0].screenX,{passive:true});lightbox?.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-startX;if(Math.abs(d)>60)showPhoto(index+(d<0?1:-1))},{passive:true});

 const reviewTrack=$('#reviews-track');
 if(reviewTrack){
  const cards=$$('.review-card',reviewTrack), controls=$('.reviews-controls'), previous=$('[data-reviews-prev]'), next=$('[data-reviews-next]'), position=$('.reviews-position');
  let cardStep=1,visibleCards=1,maxScroll=0,frame;
  const updateReviews=()=>{
   frame=undefined;
   const scrollLeft=reviewTrack.scrollLeft;
   const first=Math.min(cards.length-1,Math.max(0,Math.round(scrollLeft/cardStep)));
   const last=Math.min(cards.length,first+visibleCards);
   previous.disabled=scrollLeft<2;
   next.disabled=scrollLeft>=maxScroll-2;
   const label='Avis '+(first+1)+(last>first+1?'–'+last:'')+' sur '+cards.length;
   if(position.textContent!==label)position.textContent=label;
  };
  const scheduleReviews=()=>{if(frame===undefined)frame=requestAnimationFrame(updateReviews)};
  function moveReviews(direction){
   const amount=cardStep*visibleCards;
   reviewTrack.scrollBy({left:direction*amount,behavior:reduced.matches?'instant':'smooth'});
  }
  controls.hidden=false;
  previous.addEventListener('click',()=>moveReviews(-1));next.addEventListener('click',()=>moveReviews(1));
  reviewTrack.addEventListener('scroll',scheduleReviews,{passive:true});
  // ResizeObserver runs after layout: measure once, then update controls in the next frame.
  new ResizeObserver(()=>{
   const width=reviewTrack.clientWidth;
   cardStep=Math.max(1,cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:width);
   visibleCards=Math.max(1,Math.round(width/cardStep));
   maxScroll=reviewTrack.scrollWidth-width;
   scheduleReviews();
  }).observe(reviewTrack);
 }

})();
