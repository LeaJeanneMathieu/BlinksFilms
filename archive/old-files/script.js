
// Demo dataset (remplacera plus tard par CSV/JSON)
const DATA = [
  {id:'a', type:'clip', format:'horizontal_16_9', title:'MEDINE', meta:'Musique · 2025', img:'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', badges:['EXCLU']},
  {id:'b', type:'clip', format:'vertical_9_16', title:'TIZZY MILLER', meta:'Musique · 2024', img:'https://i.ytimg.com/vi/2vjPBrBU-TM/maxresdefault.jpg', badges:['RÉSEAUX','MONTAGE']},
  {id:'c', type:'clip', format:'carre_1_1', title:'M LE MAUDIT', meta:'Musique · 2024', img:'https://i.ytimg.com/vi/LsoLEjrDogU/maxresdefault.jpg', badges:[]},
  {id:'d', type:'interview', format:'horizontal_16_9', title:'LVI — KERY JAMES', meta:'Interview · 2024', img:'https://i.ytimg.com/vi/oHg5SJYRHA0/maxresdefault.jpg', badges:[]},
  {id:'e', type:'interview', format:'horizontal_16_9', title:'LVI — TONY PARKER', meta:'Interview · 2023', img:'https://i.ytimg.com/vi/V-_O7nl0Ii0/maxresdefault.jpg', badges:[]},
  {id:'f', type:'vlog', format:'horizontal_16_9', title:'BTS — 72H AVEC…', meta:'Vlog · 2024', img:'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg', badges:[]},
  {id:'g', type:'publicite', format:'horizontal_16_9', title:'CAMPAGNE STREET', meta:'Publicité · 2025', img:'https://i.ytimg.com/vi/fLexgOxsZu0/maxresdefault.jpg', badges:['MONTAGE']},
  {id:'h', type:'photoshoot', format:'horizontal_16_9', title:'LOOKBOOK — STUDIO', meta:'Photoshoot · 2025', img:'https://placehold.co/1200x800', badges:[]},
  {id:'i', type:'clip', format:'horizontal_16_9', title:'EL GRANDE TOTO', meta:'Musique · 2023', img:'https://i.ytimg.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg', badges:[]},
  {id:'j', type:'clip', format:'vertical_9_16', title:'BLACK M', meta:'Musique · 2025', img:'https://i.ytimg.com/vi/uelHwf8o7_U/maxresdefault.jpg', badges:['RÉSEAUX']},
  {id:'k', type:'vlog', format:'horizontal_16_9', title:'BTS — TUNNEL', meta:'Vlog · 2024', img:'https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg', badges:[]}
];

const sections = {
  clip: document.getElementById('row-clip'),
  interview: document.getElementById('row-interview'),
  vlog: document.getElementById('row-vlog'),
  publicite: document.getElementById('row-publicite'),
  photoshoot: document.getElementById('row-photoshoot')
};
const grid = document.getElementById('grid');

function makeCard(x){
  const b = x.badges.map(b=>`<span class="badge">${b}</span>`).join(' ');
  return `<article class="card" data-type="${x.type}" data-format="${x.format}" data-id="${x.id}">
    <div class="thumb"><img src="${x.img}" alt="${x.title}">
      <div class="ov"><div class="type">${label(x.type)}</div><div class="title">${x.title}</div></div>
    </div>
    <div class="meta"><span>${x.meta}</span> ${b}</div>
  </article>`;
}
function label(t){return ({clip:'Musique',interview:'Interview',vlog:'Vlog',publicite:'Publicité',photoshoot:'Photoshoot'})[t]||t}

function paint(){
  // sections
  Object.keys(sections).forEach(t=>{
    sections[t].innerHTML = DATA.filter(d=>d.type===t).map(makeCard).join('');
  });
  // grid all
  grid.innerHTML = DATA.map(makeCard).join('');
}
paint();

// Filter state
let state = {type:'all', format:'all', badges:new Set(), query:'', shown: 12};

// Tabs + hero chips
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', e=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    state.type = tab.dataset.type || 'all';
  });
});
document.querySelectorAll('.hero__chips .chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const t = btn.dataset.type;
    state.type = t; 
    document.querySelector(`.tab[data-type="${t}"]`)?.click();
    document.getElementById(t+'s')?.scrollIntoView({behavior:'smooth'});
  });
});

// Sticky filter chips
document.getElementById('chips-format').addEventListener('click', e=>{
  const btn = e.target.closest('.chip'); if(!btn) return;
  [...e.currentTarget.children].forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  state.format = btn.dataset.format;
  applyFilters();
});
document.getElementById('chips-badges').addEventListener('click', e=>{
  const btn = e.target.closest('.chip'); if(!btn) return;
  const key = btn.dataset.badge;
  if(state.badges.has(key)){ state.badges.delete(key); btn.classList.remove('active'); }
  else{ state.badges.add(key); btn.classList.add('active'); }
  applyFilters();
});

// Search
document.getElementById('search').addEventListener('input', e=>{
  state.query = e.target.value.toLowerCase().trim();
  applyFilters();
});

function applyFilters(){
  document.querySelectorAll('.card').forEach(card=>{
    const type = card.dataset.type;
    const fmt  = card.dataset.format;
    const text = card.innerText.toLowerCase();
    // type filter only affects the ALL grid (sections restent visibles)
    let visible = true;
    if(state.format!=='all' && fmt!==state.format) visible=false;
    if(state.badges.size>0){
      for(const b of state.badges){ if(!text.includes(b.toLowerCase())) { visible=false; break; } }
    }
    if(state.query && !text.includes(state.query)) visible=false;
    card.style.display = visible? '' : 'none';
  });
}

// Load more (for ALL grid)
document.getElementById('loadMore').addEventListener('click', ()=>{
  state.shown += 12;
  // For now dataset is small; when connected to CSV this will paginate.
});

