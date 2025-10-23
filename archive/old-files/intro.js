// Simple accelerated loader, auto-redirect to home.html
const bar = document.getElementById('bar');
const pct = document.getElementById('pct');
const wrap = document.getElementById('enterWrap');
const enterBtn = document.getElementById('enterBtn');
const skipBtns = [document.getElementById('skipBtn'), document.getElementById('skipFloating')];

let p = 0;
const speed = 22; // ms per tick
const accel = 1.035; // accelerate slightly
let tick = speed;

function step(){
  p = Math.min(100, p + Math.max(0.6, (100 - p) * 0.045));
  bar.style.width = p + '%';
  pct.textContent = Math.floor(p) + '%';
  if(p < 100){
    setTimeout(step, tick);
    tick = Math.max(10, tick/accel);
  }else{
    wrap.classList.add('ready');
    // auto enter after a short beat
    setTimeout(()=> window.location.href = 'home.html', 1200);
  }
}
step();

enterBtn.addEventListener('click', ()=> window.location.href = 'home.html');
skipBtns.forEach(b => b.addEventListener('click', ()=> window.location.href = 'home.html'));