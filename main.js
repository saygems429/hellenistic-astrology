/* ============================================
   HELLENISTIC ASTROLOGY — MAIN JS
   ============================================ */

// ---- STARFIELD ----
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = 180;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star-dot');
    const size = Math.random() * 2.5 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 4 + 2).toFixed(1);
    const delay = (Math.random() * 5).toFixed(2);
    const minOp = (Math.random() * 0.15 + 0.05).toFixed(2);
    star.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      --dur:${dur}s; --delay:${delay}s; --min-op:${minOp};
    `;
    container.appendChild(star);
  }
})();

// ---- ZODIAC WHEEL ----
(function drawZodiacWheel() {
  const signs = [
    { glyph: '♈', name: 'Aries',       color: '#e05a2b' },
    { glyph: '♉', name: 'Taurus',      color: '#7a9a5a' },
    { glyph: '♊', name: 'Gemini',      color: '#6a8fca' },
    { glyph: '♋', name: 'Cancer',      color: '#5a7aaa' },
    { glyph: '♌', name: 'Leo',         color: '#e05a2b' },
    { glyph: '♍', name: 'Virgo',       color: '#7a9a5a' },
    { glyph: '♎', name: 'Libra',       color: '#6a8fca' },
    { glyph: '♏', name: 'Scorpio',     color: '#5a7aaa' },
    { glyph: '♐', name: 'Sagittarius', color: '#e05a2b' },
    { glyph: '♑', name: 'Capricorn',   color: '#7a9a5a' },
    { glyph: '♒', name: 'Aquarius',    color: '#6a8fca' },
    { glyph: '♓', name: 'Pisces',      color: '#5a7aaa' },
  ];

  const group = document.getElementById('signs-group');
  if (!group) return;

  const cx = 200, cy = 200, outerR = 190, innerR = 150, glyphR = 170;
  const step = (2 * Math.PI) / 12;

  signs.forEach((sign, i) => {
    const startAngle = i * step - Math.PI / 2;
    const endAngle   = (i + 1) * step - Math.PI / 2;
    const midAngle   = (startAngle + endAngle) / 2;

    // Segment arc
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
    path.setAttribute('fill', `${sign.color}18`);
    path.setAttribute('stroke', 'rgba(201,168,76,0.18)');
    path.setAttribute('stroke-width', '0.8');
    group.appendChild(path);

    // Divider line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx + innerR * Math.cos(startAngle));
    line.setAttribute('y1', cy + innerR * Math.sin(startAngle));
    line.setAttribute('x2', cx + outerR * Math.cos(startAngle));
    line.setAttribute('y2', cy + outerR * Math.sin(startAngle));
    line.setAttribute('stroke', 'rgba(201,168,76,0.3)');
    line.setAttribute('stroke-width', '0.8');
    group.appendChild(line);

    // Glyph
    const gx = cx + glyphR * Math.cos(midAngle);
    const gy = cy + glyphR * Math.sin(midAngle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', gx);
    text.setAttribute('y', gy + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', sign.color);
    text.setAttribute('opacity', '0.9');
    text.textContent = sign.glyph;
    group.appendChild(text);
  });
})();

// ---- ACCORDION ----
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(el => el.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

// ---- NAVBAR TOGGLE (mobile) ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.borderBottomColor = 'rgba(201,168,76,0.35)';
  } else {
    navbar.style.borderBottomColor = 'rgba(201,168,76,0.2)';
  }
}, { passive: true });

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.origin-card, .planet-card, .house-card, .philosopher-card, .accordion-item, .timeline-item, .sign-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
  observer.observe(el);
});
