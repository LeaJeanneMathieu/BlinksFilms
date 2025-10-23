/******** CONFIG ********/
const FPS = 24;
const FRAMES = 137;
const IMG_PATH = "assets/img";
const HOLD_CLOSED = 120;
const HOLD_OPEN   = 120;
const OFFSET_X = 0;
const OFFSET_Y = 0;

const eye  = document.getElementById('eye');
const btn  = document.getElementById('enter');
const root = document.getElementById('introRoot');
const tagAudio = document.getElementById('tag-audio');

const pad4 = n => String(n).padStart(4,'0');
const srcFor = i => `${IMG_PATH}/${pad4(i)}.png`;
const setVar = (k,v)=>document.documentElement.style.setProperty(k, v);


function setRevealCenter(){
  const r = eye.getBoundingClientRect();
  const cx = r.left + r.width/2 + OFFSET_X;
  const cy = r.top  + r.height/2 + OFFSET_Y;
  setVar('--cx', `${cx}px`);
  setVar('--cy', `${cy}px`);
}

function revealHome(){
  requestAnimationFrame(()=>{
    setVar('--r', '200vmax');
    root.classList.add('intro--fade');
  });
  setTimeout(()=>{
    try{ btn.remove(); }catch(_){}
    try{ eye.remove(); }catch(_){}
    root.classList.add('intro--ready');
  }, 1000 + 140);
}

function playOpenThenZoom(){
  const frameDur = 1000 / FPS;
  let phase = "holdClosed";
  let frame = 1;
  let last  = performance.now();
  let t0    = last;

  function step(now){
    const dt = now - last;
    if (phase==="holdClosed"){
      eye.src = srcFor(1);
      if (now - t0 >= HOLD_CLOSED){ phase="play"; last = now; }
    }
    else if (phase==="play"){
      if (dt >= frameDur){
        last = now;
        eye.src = srcFor(frame);
        frame++;
        if (frame>FRAMES){ phase = "holdOpen"; t0 = now; }
      }
    }
    else if (phase==="holdOpen"){
      eye.src = srcFor(FRAMES);
      if (now - t0 >= HOLD_OPEN){
        phase = "zoom";
        root.classList.add('intro--zoom');
        setRevealCenter();
        setTimeout(revealHome, 500);
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function startIntro(){
  btn.disabled = true;
  if(tagAudio){
    tagAudio.currentTime = 0;
    tagAudio.play().catch(()=>{});
  }
  playOpenThenZoom();
}

btn.addEventListener('click', startIntro);
eye.addEventListener('click', startIntro);

eye.src = srcFor(1);
window.addEventListener('resize', setRevealCenter);
