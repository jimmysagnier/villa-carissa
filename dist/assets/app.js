(()=>{
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const menu=$('.menu-toggle'), nav=$('#navigation');
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');nav.classList.toggle('open',open)});
 $$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
 const hero=$('#hero-video'), motion=$('#motion-toggle'), reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(hero){
  const update=()=>{motion.textContent=hero.paused?'▷':'Ⅱ';motion.setAttribute('aria-label',hero.paused?'Lire le montage':'Mettre le montage en pause')};
  hero.addEventListener('playing',()=>{hero.classList.add('is-playing');update()});hero.addEventListener('pause',update);
  if(reduced.matches){hero.pause();motion.hidden=true}else hero.play().catch(()=>update());
  motion.addEventListener('click',()=>hero.paused?hero.play().catch(()=>{}):hero.pause());
  reduced.addEventListener('change',e=>{motion.hidden=e.matches;if(e.matches)hero.pause()});
 }
 $$('dialog').forEach(d=>{ $('[data-close]',d).addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
 const film=$('#film-dialog'), filmVideo=$('video',film);let resumeHero=false;
 $$('[data-film]').forEach(b=>b.addEventListener('click',()=>{resumeHero=hero&&!hero.paused;hero?.pause();film.showModal();filmVideo.play().catch(()=>{})}));
 film.addEventListener('close',()=>{filmVideo.pause();if(resumeHero&&!reduced.matches)hero.play().catch(()=>{})});
 const items=$$('.gallery-item'), filters=$$('[data-filter]'), lightbox=$('#photo-dialog');let visible=items,index=0;
 function filter(cat){if(!filters.some(b=>b.dataset.filter===cat))cat='all';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===cat)));items.forEach(b=>b.hidden=cat!=='all'&&b.dataset.category!==cat);visible=items.filter(b=>!b.hidden)}
 filters.forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.filter);history.replaceState(null,'',location.pathname+(b.dataset.filter==='all'?'':'#'+b.dataset.filter))}));
 function applyHash(){filter(location.hash.slice(1)||'all')}if(items.length){applyHash();window.addEventListener('hashchange',applyHash)}
 function showPhoto(i){index=(i+visible.length)%visible.length;const item=visible[index],img=$('#lightbox-image');img.src='/assets/photo-'+item.dataset.photo+'.webp';img.alt=item.dataset.caption;$('#photo-caption').textContent=item.dataset.caption;$('#photo-count').textContent=String(index+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0')}
 items.forEach(b=>b.addEventListener('click',()=>{showPhoto(visible.indexOf(b));lightbox.showModal()}));
 $('#photo-prev').addEventListener('click',()=>showPhoto(index-1));$('#photo-next').addEventListener('click',()=>showPhoto(index+1));
 lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(index-1)}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(index+1)}});
 let startX=0;lightbox.addEventListener('touchstart',e=>startX=e.changedTouches[0].screenX,{passive:true});lightbox.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-startX;if(Math.abs(d)>60)showPhoto(index+(d<0?1:-1))},{passive:true});
 const localDate=new Date();const today=[localDate.getFullYear(),String(localDate.getMonth()+1).padStart(2,'0'),String(localDate.getDate()).padStart(2,'0')].join('-');
 $$('form').forEach(form=>{
  const arrival=$('[name=arrivee]',form),departure=$('[name=depart]',form);if(!arrival||!departure)return;
  arrival.min=today;departure.min=today;
  const validate=()=>{departure.min=arrival.value||today;const bad=departure.value&&arrival.value&&departure.value<=arrival.value;departure.setCustomValidity(bad?'Le départ doit être après l’arrivée.':'');const msg=$('.date-error',form);msg.hidden=!bad;msg.textContent=bad?'Choisissez un départ après votre date d’arrivée.':''};
  arrival.addEventListener('change',validate);departure.addEventListener('change',validate);
  const params=new URLSearchParams(location.search);for(const name of ['arrivee','depart','voyageurs']){const input=$('[name='+name+']',form),value=params.get(name);if(input&&value&&((name==='voyageurs'&&/^[1-8]$/.test(value))||(name!=='voyageurs'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&value>=today)))input.value=value}validate();
 });
 $('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const v=Object.fromEntries(new FormData(form));const body=`Bonjour,\n\nJe souhaite connaître les disponibilités de la Villa Carissa pour le séjour suivant :\n\nArrivée : ${v.arrivee}\nDépart : ${v.depart}\nVoyageurs : ${v.voyageurs}\n\n${v.message||''}\n\n${v.nom}\nEmail : ${v.email}\n${v.telephone?'Téléphone : '+v.telephone:''}`;const a=document.createElement('a');a.href='mailto:reservation@villacarissa-samanah.com?subject='+encodeURIComponent('Séjour Villa Carissa — '+v.arrivee+' au '+v.depart)+'&body='+encodeURIComponent(body);a.click();$('#contact-feedback').hidden=false});
})();
