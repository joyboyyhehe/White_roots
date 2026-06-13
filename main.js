// ===== WHITE ROOTS ACADEMY — MAIN JS =====

// ---- NAVIGATION ----
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- REVEAL ON SCROLL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ---- COUNTER ANIMATION ----
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal === 'true';
  const dur = 2200;
  const steps = 80;
  const step = dur / steps;
  const inc = target / steps;
  let current = 0;
  const timer = setInterval(() => {
    current += inc;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
  }, step);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counting').forEach(el => countObserver.observe(el));

// ---- PROGRESS BARS ----
const pbObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.pb-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      pbObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-section').forEach(el => pbObserver.observe(el));

// ---- 3D CARD TILT ----
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PARTICLES GENERATOR ----
function generateParticles(wrap, count = 12) {
  if (!wrap) return;
  const colors = ['rgba(26,107,60,0.35)', 'rgba(240,116,39,0.3)', 'rgba(245,200,66,0.35)', 'rgba(45,155,90,0.25)', 'rgba(77,182,232,0.3)'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${5 + Math.random() * 5}s;
    `;
    wrap.appendChild(p);
  }
}
document.querySelectorAll('.particles-wrap').forEach(w => generateParticles(w));

// ---- TABS (Curriculum page) ----
window.switchTab = function(id, el) {
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.subject-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
};

// ---- PROGRAM SELECTOR (Admissions page) ----
window.selectProg = function(el) {
  document.querySelectorAll('.prog-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const progName = el.querySelector('.pc-name')?.textContent;
  const sel = document.querySelector('select[name="program"]');
  if (sel && progName) {
    for (let opt of sel.options) {
      if (opt.text.includes(progName.split(' ')[0])) { sel.value = opt.value; break; }
    }
  }
  setTimeout(() => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  }, 400);
};

// ---- FORM SUBMIT ----
window.submitForm = function() {
  const fc = document.getElementById('form-content');
  const fs = document.getElementById('form-success');
  if (fc && fs) {
    fc.style.display = 'none';
    fs.style.display = 'flex';
  }
};

// ---- STAR RATING ----
window.rate = function(n) {
  document.querySelectorAll('.star-b').forEach((b, i) => b.classList.toggle('lit', i < n));
};

// ---- REVIEW FILTER ----
window.filter = function(c, tab) {
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.tcard').forEach(card => {
    card.style.display = (c === 'all' || card.dataset.c === c) ? 'inline-block' : 'none';
  });
};

// ---- SUBMIT REVIEW ----
window.submitRev = function(btn) {
  btn.textContent = '✅ Thank you for your review!';
  btn.style.background = 'var(--green)';
  btn.disabled = true;
};

// ---- ENQUIRE CTA (Nav button) ----
document.querySelectorAll('.nav-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'admissions.html#enquiry-form';
  });
});

// ---- PAGE LOAD ANIMATION ----
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity .4s ease';
    document.body.style.opacity = '1';
  });
});
