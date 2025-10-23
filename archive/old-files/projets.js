// Filtre simple par catégorie
const buttons = document.querySelectorAll('.projects-filters .pill');
const cards   = document.querySelectorAll('.projects-grid .card');

buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    // Actif visuel
    buttons.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Parallax discret
(function(){
  const scene = document.querySelector('.collage-scene');
  if(!scene) return;
  scene.addEventListener('mousemove', e=>{
    const r = scene.getBoundingClientRect();
    const cx = (e.clientX - r.left)/r.width - .5;
    const cy = (e.clientY - r.top)/r.height - .5;
    scene.querySelectorAll('.tilt').forEach(el=>{
      el.style.transform = `translate(${el.style.getPropertyValue('--x')||'0'}, ${el.style.getPropertyValue('--y')||'0'}) rotateZ(${el.style.getPropertyValue('--rz')||'0'}) rotateX(${cy*4}deg) rotateY(${cx*-4}deg)`;
    });
  });

  // Mélanger
  const btn = document.getElementById('arrange');
  if(btn){
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.obj').forEach(el=>{
        const x = Math.round(Math.random()*70+10);
        const y = Math.round(Math.random()*55+12);
        const rz= Math.round(Math.random()*12-6);
        el.style.setProperty('--x', x+'%');
        el.style.setProperty('--y', y+'%');
        el.style.setProperty('--rz', rz+'deg');
      });
    });
  }
})();

    const cat = btn.dataset.filter; // "all" | "clip" | "brand" | "event" | "photo"
    cards.forEach(card=>{
      const ok = (cat === 'all') || (card.dataset.cat === cat);
      card.style.display = ok ? '' : 'none';
    });
  });
});
