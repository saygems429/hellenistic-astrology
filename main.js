/* ============================================
   HELLENISTIC ASTROLOGY — MAIN JS v2
   ============================================ */

// ---- STARFIELD ----
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 220; i++) {
    const star = document.createElement('div');
    star.classList.add('star-dot');
    const size = Math.random() * 2.2 + 0.4;
    // Slightly bias toward right half to complement left-aligned hero text
    const x = Math.random() < 0.4 ? Math.random() * 100 : 45 + Math.random() * 55;
    const y = Math.random() * 100;
    const dur = (Math.random() * 5 + 2.5).toFixed(1);
    const delay = (Math.random() * 7).toFixed(2);
    const minOp = (Math.random() * 0.11 + 0.03).toFixed(2);
    star.style.cssText = `width:${size}px;height:${size}px;left:${x}%;top:${y}%;--dur:${dur}s;--delay:${delay}s;--min-op:${minOp};`;
    container.appendChild(star);
  }
})();

// ---- ZODIAC WHEEL ----
(function drawZodiacWheel() {
  const signs = [
    { glyph: '♈', name: 'Aries',       color: '#c85a32' },
    { glyph: '♉', name: 'Taurus',      color: '#6e8f50' },
    { glyph: '♊', name: 'Gemini',      color: '#5e85c0' },
    { glyph: '♋', name: 'Cancer',      color: '#4e72a0' },
    { glyph: '♌', name: 'Leo',         color: '#c85a32' },
    { glyph: '♍', name: 'Virgo',       color: '#6e8f50' },
    { glyph: '♎', name: 'Libra',       color: '#5e85c0' },
    { glyph: '♏', name: 'Scorpio',     color: '#4e72a0' },
    { glyph: '♐', name: 'Sagittarius', color: '#c85a32' },
    { glyph: '♑', name: 'Capricorn',   color: '#6e8f50' },
    { glyph: '♒', name: 'Aquarius',    color: '#5e85c0' },
    { glyph: '♓', name: 'Pisces',      color: '#4e72a0' },
  ];

  const group = document.getElementById('signs-group');
  if (!group) return;

  const cx = 200, cy = 200, outerR = 188, innerR = 148, glyphR = 168;
  const step = (2 * Math.PI) / 12;
  const paths = [];
  const signItems = document.querySelectorAll('.sign-item');

  signs.forEach((sign, i) => {
    const startAngle = i * step - Math.PI / 2;
    const endAngle   = (i + 1) * step - Math.PI / 2;
    const midAngle   = (startAngle + endAngle) / 2;

    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1},${y1} A${outerR},${outerR} 0 0,1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 0,0 ${x4},${y4} Z`);
    path.setAttribute('fill', `${sign.color}12`);
    path.setAttribute('stroke', 'rgba(201,168,76,0.14)');
    path.setAttribute('stroke-width', '0.8');
    path.style.cursor = 'pointer';
    path.style.transition = 'fill 0.3s';

    const highlight = () => {
      path.setAttribute('fill', `${sign.color}2e`);
      if (signItems[i]) signItems[i].style.background = 'rgba(201,168,76,0.08)';
    };
    const unhighlight = () => {
      path.setAttribute('fill', `${sign.color}12`);
      if (signItems[i]) signItems[i].style.background = '';
    };

    path.addEventListener('mouseenter', highlight);
    path.addEventListener('mouseleave', unhighlight);
    group.appendChild(path);
    paths.push({ path, highlight, unhighlight });

    // Divider line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx + innerR * Math.cos(startAngle));
    line.setAttribute('y1', cy + innerR * Math.sin(startAngle));
    line.setAttribute('x2', cx + outerR * Math.cos(startAngle));
    line.setAttribute('y2', cy + outerR * Math.sin(startAngle));
    line.setAttribute('stroke', 'rgba(201,168,76,0.2)');
    line.setAttribute('stroke-width', '0.8');
    group.appendChild(line);

    // Glyph
    const gx = cx + glyphR * Math.cos(midAngle);
    const gy = cy + glyphR * Math.sin(midAngle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', gx);
    text.setAttribute('y', gy + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '13');
    text.setAttribute('fill', sign.color);
    text.setAttribute('opacity', '0.85');
    text.style.pointerEvents = 'none';
    text.textContent = sign.glyph;
    group.appendChild(text);
  });

  // Sign list hover → mirror highlight on wheel
  signItems.forEach((item, i) => {
    if (!paths[i]) return;
    item.addEventListener('mouseenter', paths[i].highlight);
    item.addEventListener('mouseleave', paths[i].unhighlight);
  });
})();

// ---- ACCORDION ----
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
    });
    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- NAVBAR TOGGLE (mobile) ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- ACTIVE NAV LINK ----
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// ---- NAVBAR BORDER ON SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 60
    ? 'rgba(201,168,76,0.42)'
    : 'rgba(201,168,76,0.22)';
}, { passive: true });

// ---- SCROLL REVEAL — staggered by group ----
(function setupReveal() {
  const selectors = [
    '.explainer-block',
    '.step-card',
    '.origin-card',
    '.timeline-item',
    '.planet-card',
    '.sign-item',
    '.house-card',
    '.accordion-item',
    '.philosopher-card',
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      const delay = (i % 8) * 0.075;
      el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
      observer.observe(el);
    });
  });
})();
