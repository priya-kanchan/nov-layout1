(() => {
  'use strict';
  const toggle=document.getElementById('menu-toggle'),nav=document.getElementById('navigation');
  function menu(open){nav.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');}
  toggle.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))menu(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){menu(false);toggle.focus()}});
  matchMedia('(min-width:1181px)').addEventListener('change',()=>menu(false));
  const enquiry=document.getElementById('enquiry-dialog'),viewer=document.getElementById('gallery-dialog');
  let lastFocus=null,galleryIndex=0;
  const gallery=[...document.querySelectorAll('[data-image]')];
  function open(dialog){menu(false);lastFocus=document.activeElement;dialog.showModal();document.body.classList.add('dialog-open');window.dispatchEvent(new Event('enquiry:opened'));}
  function close(dialog){dialog.close();}
  [enquiry,viewer].forEach(dialog=>{
    dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dialog.close()}});
    dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastFocus?.focus({preventScroll:true})});
    dialog.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close(dialog);if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(dialog)}});
  });
  document.addEventListener('click',e=>{
    const trigger=e.target.closest('[data-enquire]');if(!trigger)return;
    const title=trigger.dataset.enquire;document.getElementById('popup-title').textContent=title;
    document.getElementById('qMessagepopup').value=title;open(enquiry);
  });
  function showImage(index){galleryIndex=(index+gallery.length)%gallery.length;const item=gallery[galleryIndex],image=document.getElementById('gallery-full');image.src=item.dataset.image;image.alt=item.dataset.caption;document.getElementById('gallery-caption').textContent=item.dataset.caption;}
  gallery.forEach((item,index)=>item.addEventListener('click',()=>{showImage(index);open(viewer)}));
  document.getElementById('gallery-prev').addEventListener('click',()=>showImage(galleryIndex-1));
  document.getElementById('gallery-next').addEventListener('click',()=>showImage(galleryIndex+1));
  viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showImage(galleryIndex-1)}if(e.key==='ArrowRight'){e.preventDefault();showImage(galleryIndex+1)}});
  const strip=document.getElementById('filmstrip'),step=()=>Math.max(280,strip.clientWidth*.6);
  document.getElementById('film-prev').addEventListener('click',()=>strip.scrollBy({left:-step()}));
  document.getElementById('film-next').addEventListener('click',()=>strip.scrollBy({left:step()}));
  document.getElementById('year').textContent=new Date().getFullYear();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches&&entry.target.animate)entry.target.animate([{opacity:.4,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.65,.3,1)'});observer.unobserve(entry.target)}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const links=[...nav.querySelectorAll('a')];const sections=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}}),{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main>section[id]').forEach(section=>sections.observe(section));
  }
})();

