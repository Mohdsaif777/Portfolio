/* ===== EDITABLE CONTENT ===== */
/* Twinkling starfield */
(function stars(){
  const box = document.getElementById('stars');
  let html = '';
  for (let i = 0; i < 90; i++) {
    const s = (Math.random() * 2 + .6).toFixed(2);
    const top = (Math.random() * 100).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const dur = (Math.random() * 3 + 2).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);
    html += `<i style="width:${s}px;height:${s}px;top:${top}%;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s"></i>`;
  }
  box.innerHTML = html;
})();

/* icon: image URL, or an emoji if no logo. learn:true shows "Currently Learning" */
const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SKILLS = [
 {n:'Python',i:D+'python/python-original.svg'},
 {n:'JavaScript',i:D+'javascript/javascript-original.svg'},
 {n:'HTML',i:D+'html5/html5-original.svg'},
 {n:'CSS',i:D+'css3/css3-original.svg'},
 {n:'SQL',e:'🗄️'},
 {n:'PostgreSQL',i:D+'postgresql/postgresql-original.svg',learn:true},
 {n:'AWS',i:D+'amazonwebservices/amazonwebservices-original-wordmark.svg',learn:true},
 {n:'Networking',e:'🌐'},
 {n:'Git',i:D+'git/git-original.svg'},
 {n:'GitHub',i:D+'github/github-original.svg'},
 {n:'FastAPI',i:D+'fastapi/fastapi-original.svg',learn:true},
 {n:'REST APIs',e:'🔌',learn:true}
];
const ROLES = ['Python Developer','Backend Enthusiast','Problem Solver','Tech Learner'];
// No certificate links were provided, so no buttons are shown. Add `url:'...'` later to show a "View" link.
// i: official logo image (brand or tech). e: emoji fallback used if i fails to load, or for purely contextual icons.
// pdf: path to that certificate's PDF under assets/certs/ — drop your files there with these exact names
// (or edit the paths below to match whatever file names you use)
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/';
const CERTS = [
 {p:'IBM',t:'Web Development Fundamentals',i:SI+'ibm.svg',e:'🌐',pdf:'assets/certs/IBM Web Dev Certificate.pdf'},
 {p:'Scaler',t:'Python & SQL for Data Science',i:SI+'python.svg',e:'🐍',pdf:'assets/certs/Scaler Python and SQL for Data Science.png'},
 {p:'Simplilearn',t:'Prompt Engineering',e:'🤖',pdf:'assets/certs/simplilearn-prompt-engineering.pdf'},
 {p:'LinkedIn Learning',t:'Ethics in the Age of Generative AI',i:SI+'linkedin.svg',e:'⚖️',pdf:'assets/certs/Ethics in the Age of Generative AI.pdf'},
 {p:'Deloitte',t:'Technology Job Simulation',i:SI+'deloitte.svg',e:'💼',pdf:'assets/certs/Deloitte technology job certificate.pdf'},
 {p:'Tata Forage',t:'Cybersecurity Analyst Job Simulation',i:SI+'tata.svg',e:'🛡️',pdf:'assets/certs/tata certificate.pdf'},
 {p:'NVIDIA',t:'Transformer-Based Natural Language Processing',i:SI+'nvidia.svg',e:'🧠',pdf:'assets/certs/Nvidia certificate.pdf'},
 {p:'Kelcai',t:'Git and GitHub',i:SI+'github.svg',e:'🔀',pdf:'assets/certs/git and github certificate.png'},
 {p:'Typingtest',t:'40 WPM Typing Speed',e:'⌨️',pdf:'assets/certs/40 WPM Typing Speed.pdf'}
];

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Build dynamic content */
$('#yr').textContent = new Date().getFullYear();
const certIcon = c => c.i ? `<img src="${c.i}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'emoji',textContent:'${c.e}'}))">` : `<span class="emoji">${c.e}</span>`;
$('#certGrid').innerHTML = CERTS.map(c => `<a class="card cert rv" href="${c.pdf}" target="_blank" rel="noopener"><div class="ic">${certIcon(c)}</div><div><small>${c.p}</small><h3>${c.t}</h3><span class="cert-view">View certificate ↗</span></div></a>`).join('');
const skillIcon = s => s.i ? `<img src="${s.i}" alt="" loading="lazy">` : `<span class="e">${s.e}</span>`;
function skillRingHTML(items, radius, dur, reverseOrbit) {
  const n = items.length, moonDir = reverseOrbit ? 'normal' : 'reverse';
  return items.map((s, i) => {
    const delay = (-(dur / n * i)).toFixed(2) + 's';
    return `<div class="orbit" style="width:${radius * 2}px;height:${radius * 2}px;animation-duration:${dur}s;animation-delay:${delay}${reverseOrbit ? ';animation-direction:reverse' : ''}">`
         + `<span class="moon sk-moon ${s.learn ? 'learn' : 'core'}" title="${s.n}" style="animation-duration:${dur}s;animation-delay:${delay};animation-direction:${moonDir}">${skillIcon(s)}</span>`
         + `</div>`;
  }).join('');
}
$('#solarSkills').insertAdjacentHTML('beforeend', skillRingHTML(SKILLS.slice(0, 6), 100, 24, false) + skillRingHTML(SKILLS.slice(6), 150, 34, true));
$('#skillChips').innerHTML = SKILLS.map(s => `<li class="${s.learn ? 'learn' : ''}">${s.n}</li>`).join('');
$$('h2.split').forEach(h => h.innerHTML = h.textContent.split(' ').map(w => `<span class="w"><span>${w}</span></span>`).join(' '));
const bars = $('#bars');
for (let i = 0; i < 14; i++) bars.innerHTML += '<div></div>';

/* Nav */
const nav = $('#nav');
$('#burger').onclick = () => nav.classList.toggle('open');
$$('#menu a').forEach(a => a.onclick = () => nav.classList.remove('open'));

if (reduce || !window.gsap) {
  $$('.rv').forEach(e => e.style.opacity = 1);
  $('#role').textContent = ROLES[0];
} else {
  gsap.registerPlugin(ScrollTrigger);

  /* One orchestrated hero entrance */
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.avatar', { scale: .5, opacity: 0, duration: 1.1 })
    .from('.hi', { y: 20, opacity: 0, duration: .6 }, '-=.5')
    .from('h1 .line span', { yPercent: 110, duration: 1, stagger: .12 }, '-=.4')
    .from('.roles,.sub', { y: 20, opacity: 0, stagger: .1, duration: .7 }, '-=.5')
    .from('.btns .btn', { y: 20, opacity: 0, stagger: .1, duration: .6 }, '-=.4')
    .from('.socials a', { scale: 0, opacity: 0, stagger: .08, duration: .5, ease: 'back.out(2)' }, '-=.3');

  /* Cycling role text */
  let r = 0; const role = $('#role');
  setInterval(() => {
    gsap.to(role, { y: -12, opacity: 0, duration: .3, onComplete() {
      role.textContent = ROLES[r = (r + 1) % ROLES.length];
      gsap.fromTo(role, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .3 });
    } });
  }, 2200);

  /* Hero parallax + nav shrink */
  gsap.to('.avatar', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.g1', { y: 260, ease: 'none', scrollTrigger: { scrub: true, start: 0, end: 'max' } });
  ScrollTrigger.create({ start: 60, onUpdate: s => nav.classList.toggle('small', s.scroll() > 60) });

  /* Headings: masked word reveal */
  $$('h2.split').forEach(h => gsap.from($$('.w span', h), { yPercent: 110, duration: .9, stagger: .09, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));

  /* Generic staggered reveals per section */
  $$('section').forEach(sec => {
    const items = $$('.rv', sec);
    if (items.length) gsap.from(items, { y: 50, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: sec, start: 'top 70%' } });
  });
  /* Terminal: one clean entrance, then a typing-style line stagger */
  ScrollTrigger.create({ trigger: '#term', start: 'top 82%', once: true, onEnter() {
    gsap.fromTo('#term', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: 'power3.out' });
    gsap.fromTo($$('#term .ln, #term .out'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: .3, duration: .4, delay: .25 });
  } });


  /* Timeline draw + cards slide in from their own side */
  gsap.from('.tl-line', { scaleY: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '.timeline', start: 'top 80%' } });
  $$('.tl-item').forEach(el => gsap.from(el, { x: el.classList.contains('left') ? -60 : 60, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } }));

  /* Project mock slides in */
  gsap.from('.mock', { x: 90, rotate: 3, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.project', start: 'top 70%' } });

  /* Footer: brand, columns and the divider line ease in */
  gsap.from('.foot-glow', { scaleX: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '#site-footer', start: 'top 90%' } });
  gsap.from('.foot-brand,.foot-col', { y: 30, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.foot-top', start: 'top 88%' } });

  /* Magnetic buttons */
  if (matchMedia('(hover:hover)').matches) $$('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .3 });
    });
    b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
  });
}

/* Contact cards: gentle magnetic tilt + rotating gradient-border angle */
if (matchMedia('(hover:hover)').matches) $$('.cx-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    if (window.gsap && !reduce) gsap.to(card, { rotateX: y * -8, rotateY: x * 10, duration: .3, transformPerspective: 600 });
  });
  card.addEventListener('mouseleave', () => window.gsap && gsap.to(card, { rotateX: 0, rotateY: 0, duration: .5 }));
});

/* Back to top */
$('#toTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

/* Active nav link */
const links = $$('#menu a');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('header[id],section[id]').forEach(s => io.observe(s));

/* Sortify preview: looping bubble-sort visual — only runs while it's actually on screen,
   so it doesn't compete with the orbit animations for frame time when scrolled away */
let sortVisible = false;
new IntersectionObserver(es => { sortVisible = es[0].isIntersecting; }, { threshold: .15 }).observe(bars);
(async function sortDemo() {
  const els = $$('div', bars), sleep = ms => new Promise(r => setTimeout(r, ms));
  while (true) {
    if (!sortVisible) { await sleep(400); continue; }
    const a = els.map(() => 15 + Math.random() * 85);
    const draw = () => els.forEach((e, i) => e.style.height = a[i] + '%');
    els.forEach(e => e.className = ''); draw(); await sleep(900);
    for (let i = 0; i < a.length - 1 && sortVisible; i++) {
      for (let j = 0; j < a.length - i - 1 && sortVisible; j++) {
        els[j].classList.add('cmp'); els[j + 1].classList.add('cmp');
        if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; draw(); }
        await sleep(reduce ? 40 : 90);
        els[j].classList.remove('cmp'); els[j + 1].classList.remove('cmp');
      }
      els[a.length - 1 - i].classList.add('done');
    }
    els[0].classList.add('done'); await sleep(2000);
  }
})();

window.addEventListener('load', () => window.ScrollTrigger && ScrollTrigger.refresh());

/* Cursor glow: a soft light that follows the pointer, desktop only */
if (matchMedia('(hover:hover)').matches && !reduce) {
  const glow = $('#cursor-glow');
  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, shown = false;
  addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!shown) { shown = true; glow.style.opacity = 1; cx = tx; cy = ty; }
  });
  (function loop() {
    cx += (tx - cx) * .12; cy += (ty - cy) * .12;
    glow.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();
}
