// ═══ PARTICLES ═══
(function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, particles = [];
  function resize() { w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    particles.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.5+0.5, dx: (Math.random()-0.5)*0.3, dy: (Math.random()-0.5)*0.3, o: Math.random()*0.5+0.1 });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,240,255,${p.o})`; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ═══ NAV SCROLL ═══
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ MOBILE MENU ═══
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('active'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('active')));
}

// ═══ SCROLL REVEAL ═══
function reveal() {
  document.querySelectorAll('.problem-card,.solution-col,.feature-card,.web3-card,.testimonial-card,.chain-block,.problem-terminal,.solution-vs').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ═══ STAT BARS ANIMATION ═══
const statsCard = document.querySelector('.hero-stats-card');
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  const fills = document.querySelectorAll('.stat-fill');
  fills.forEach(f => { f.style.width = f.dataset.width + '%'; });
  barsAnimated = true;
}
if (statsCard) {
  const ob = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateBars(); ob.disconnect(); }
  }, { threshold: 0.3 });
  ob.observe(statsCard);
}

// ═══ CLASS SELECTOR ═══
document.querySelectorAll('.class-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.class-detail').forEach(d => d.classList.remove('active'));
    const target = document.getElementById('class-' + btn.dataset.class);
    if (target) target.classList.add('active');
  });
});

// ═══ TERMINAL TYPING EFFECT ═══
const terminalBody = document.getElementById('terminal-body');
if (terminalBody) {
  const lines = terminalBody.querySelectorAll('p');
  lines.forEach((line, i) => {
    line.style.opacity = '0'; line.style.transform = 'translateX(-10px)';
    line.style.transition = 'opacity 0.4s, transform 0.4s';
  });
  const tOb = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      lines.forEach((line, i) => {
        setTimeout(() => { line.style.opacity = '1'; line.style.transform = 'translateX(0)'; }, i * 300);
      });
      tOb.disconnect();
    }
  }, { threshold: 0.3 });
  tOb.observe(terminalBody);
}

// ═══ SMOOTH ANCHOR LINKS ═══
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ═══ CTA FORM ═══
const ctaBtn = document.getElementById('cta-submit-btn');
const emailInput = document.getElementById('email-input');
if (ctaBtn && emailInput) {
  ctaBtn.addEventListener('click', e => {
    e.preventDefault();
    if (emailInput.value && emailInput.value.includes('@')) {
      ctaBtn.querySelector('.btn-text').textContent = '✅ You\'re In!';
      ctaBtn.style.pointerEvents = 'none';
      emailInput.disabled = true;
    } else {
      emailInput.style.borderColor = 'var(--accent-red)';
      setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
    }
  });
}
