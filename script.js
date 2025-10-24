// ---------- Utility & DOMReady ----------
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // AOS init
  if (window.AOS) AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });

  // GSAP + ScrollTrigger init
  if (window.gsap && window.ScrollTrigger) initGSAP();

  // counters
  initCounters();

  // hover-play videos for projects
  initHoverPreview();

  // testimonials slider
  initTestimonials();

  // mobile nav toggles
  initMobileNav();

  // contact form demo handler
  initContactDemo();

  // dark/light mode initial state and toggle
  initColorMode();

  // download resume demo
  document.getElementById('download-resume').addEventListener('click', () => {
    // Replace with your resume file path if you add one to the project
    const a = document.createElement('a');
    a.href = 'https://example.com/john-doe-resume.pdf';
    a.download = 'John-Doe-Resume.pdf';
    a.click();
  });
});

/* ---------------- GSAP & Scroll animations ---------------- */
function initGSAP(){
  gsap.registerPlugin(ScrollTrigger);

  // ... your current animations ...

  gsap.to('.about-video', {
    rotation: 0.8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-video',
      start: 'top 80%',
      scrub: true
    }
  });

  // ⬇️ Add the new animations below this line
  gsap.utils.toArray('.section h2').forEach((el,i)=>{
    gsap.from(el,{
      y:30,opacity:0,duration:0.8,delay:0.1*i,ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 85%' }
    });
  });

  gsap.utils.toArray('.btn.primary').forEach(btn=>{
    btn.addEventListener('mouseenter',()=>gsap.to(btn,{y:-3,scale:1.03,duration:0.3,ease:'power2.out'}));
    btn.addEventListener('mouseleave',()=>gsap.to(btn,{y:0,scale:1,duration:0.4,ease:'power2.out'}));
  });

  gsap.utils.toArray('.section').forEach(sec=>{
    const bg = document.createElement('div');
    bg.className = 'parallax-bg';
    sec.prepend(bg);
    gsap.to(bg,{
      yPercent:20,
      ease:'none',
      scrollTrigger:{ trigger:sec, start:'top bottom', end:'bottom top', scrub:true }
    });
  });
}


/* ---------------- Counters (on-scroll) ---------------- */
function initCounters(){
  const counters = document.querySelectorAll('.stat-num');
  let started = false;
  function startCounters(){
    if (started) return;
    started = true;
    counters.forEach(c => {
      const target = +c.dataset.target || 0;
      const duration = 1300;
      const start = +c.textContent || 0;
      let startTime = null;

      function step(ts){
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        c.textContent = Math.floor(progress * (target - start) + start);
        if (progress < 1) requestAnimationFrame(step);
        else c.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  // Use IntersectionObserver
  const about = document.getElementById('hero');
  const io = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) startCounters();
    });
  }, { threshold: 0.2 });
  io.observe(about);
}

/* ---------------- Hover video previews ---------------- */
function initHoverPreview(){
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const video = card.querySelector('.proj-video');
    const fallback = card.querySelector('.proj-fallback');

    // on hover play, on leave pause and reset
    card.addEventListener('mouseenter', () => {
      if (!video) return;
      video.currentTime = 0;
      video.play().catch(()=>{ /* autoplay may be blocked; still fine */ });
      // fade in video via CSS class already set
    });
    card.addEventListener('mouseleave', () => {
      if (!video) return;
      video.pause();
      try { video.currentTime = 0; } catch(e){}
    });

    // also play on focus for accessibility
    card.addEventListener('focusin', () => { if (video) video.play().catch(() => {}); });
    card.addEventListener('focusout', () => { if (video) video.pause(); });
  });
}

/* ---------------- Testimonials slider ---------------- */
function initTestimonials(){
  const items = Array.from(document.querySelectorAll('.ts-item'));
  let idx = items.findIndex(i => i.classList.contains('active'));
  if (idx < 0) idx = 0;
  let timer = null;

  const show = (n) => {
    items.forEach((it,i) => it.classList.toggle('active', i===n));
  };

  const next = () => {
    idx = (idx + 1) % items.length;
    show(idx);
  };
  const prev = () => {
    idx = (idx - 1 + items.length) % items.length;
    show(idx);
  };

  document.querySelectorAll('.ts-nav.next').forEach(btn => btn.addEventListener('click', () => { next(); resetTimer(); }));
  document.querySelectorAll('.ts-nav.prev').forEach(btn => btn.addEventListener('click', () => { prev(); resetTimer(); }));

  function resetTimer(){
    if (timer) clearInterval(timer);
    timer = setInterval(next, 4500);
  }
  resetTimer();
}

/* ---------------- Mobile nav ---------------- */
function initMobileNav(){
  const open = document.getElementById('menu-toggle');
  const close = document.getElementById('mobile-close');
  const nav = document.getElementById('mobile-nav');

  open && open.addEventListener('click', () => nav.style.display = 'flex');
  close && close.addEventListener('click', () => nav.style.display = 'none');
  // close when clicking a link
  nav && nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.style.display = 'none'));
}

/* ---------------- Contact form demo ---------------- */
function initContactDemo(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // For demo, show a stylish modal-like alert
    const name = form.querySelector('input[name="name"]').value || 'there';
    showToast(`Thanks ${name}! Message received (demo).`);
    form.reset();
  });
}

/* Quick toast for user feedback */
function showToast(msg){
  const t = document.createElement('div');
  t.className = 'site-toast';
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed',right:'20px',bottom:'20px',background:'#06121a',color:'#e6eef6',padding:'12px 18px',borderRadius:'10px',boxShadow:'0 8px 30px rgba(0,0,0,0.6)',zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '1',20);
  setTimeout(()=> t.remove(),3000);
}

/* ---------------- Dark / Light mode ---------------- */
function initColorMode(){
  const btn = document.getElementById('mode-toggle');
  const stored = localStorage.getItem('site-mode');
  const isLight = stored === 'light';
  document.body.classList.toggle('light-mode', isLight);
  document.body.classList.toggle('dark-mode', !isLight);
  btn.textContent = isLight ? '🌙' : '☀️';

  btn.addEventListener('click', () => {
    const toLight = !document.body.classList.contains('light-mode');
    document.body.style.transition = 'background 0.6s ease, color 0.6s ease';
    document.body.classList.toggle('light-mode', toLight);
    document.body.classList.toggle('dark-mode', !toLight);
    btn.textContent = toLight ? '🌙' : '☀️';
    localStorage.setItem('site-mode', toLight ? 'light' : 'dark');
  });
}
