const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:0.1 });
reveals.forEach(r => observer.observe(r));

function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(el) {
  if(el.classList.contains('modal-overlay')) {
    el.classList.remove('active');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => {
  if(e.key==='Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active'); document.body.style.overflow='';
    });
  }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if(window.scrollY >= s.offsetTop-200) current=s.getAttribute('id'); });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href')==='#'+current ? 'var(--accent)' : '';
  });
});

const roles = ['Flutter Developer','Full Stack Developer','Web Developer','Software Engineer','UI/UX Developer'];
let ri=0,ci=0,deleting=false;
const roleEl = document.querySelector('.home-role');
function type() {
  const word=roles[ri];
  if(!deleting) {
    roleEl.textContent=word.slice(0,++ci);
    if(ci===word.length){deleting=true;setTimeout(type,1800);return;}
  } else {
    roleEl.textContent=word.slice(0,--ci);
    if(ci===0){deleting=false;ri=(ri+1)%roles.length;}
  }
  setTimeout(type,deleting?60:100);
}
type();

/* ── CURSOR AURA ── */
const aura = document.getElementById('cursor-aura');
document.addEventListener('mousemove', e => {
  aura.style.left = e.clientX + 'px';
  aura.style.top  = e.clientY + 'px';
});

/* ── FLOATING PARTICLES ── */
const pColors = [
  ['rgba(0,212,255,', '0 0 6px rgba(0,212,255,0.8)'],
  ['rgba(124,58,237,', '0 0 6px rgba(124,58,237,0.8)'],
  ['rgba(249,115,22,', '0 0 6px rgba(249,115,22,0.8)'],
  ['rgba(255,255,255,', '0 0 4px rgba(255,255,255,0.6)'],
];
function spawnParticle() {
  const el = document.createElement('div');
  el.className = 'gp';
  const [cBase, shadow] = pColors[Math.floor(Math.random() * pColors.length)];
  const size = Math.random() * 3 + 1;
  const dur  = Math.random() * 18 + 10;
  const delay = Math.random() * 3;
  el.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}vw;
    background:${cBase}${(Math.random()*0.5+0.3).toFixed(2)});
    box-shadow:${shadow};
    animation-duration:${dur}s;
    animation-delay:${delay}s;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + delay + 1) * 1000);
}
for (let i = 0; i < 40; i++) setTimeout(spawnParticle, i * 200);
setInterval(spawnParticle, 600);

/* ── SHOOTING STARS ── */
function spawnStar() {
  const el = document.createElement('div');
  el.className = 'ss';
  const isAccent = Math.random() > 0.5;
  el.style.cssText = `
    left:${Math.random()*70}vw;
    top:${Math.random()*70}vh;
    background:linear-gradient(90deg, transparent, ${isAccent ? 'rgba(0,212,255,0.9)' : 'rgba(124,58,237,0.9)'}, white);
    box-shadow:0 0 8px ${isAccent ? 'rgba(0,212,255,0.6)' : 'rgba(124,58,237,0.6)'};
    animation-duration:${Math.random()*1.2+0.6}s;
    animation-delay:${Math.random()*0.3}s;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}
setInterval(spawnStar, 2000);
spawnStar(); setTimeout(spawnStar, 800);