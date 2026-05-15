/* =========================================================
   MR INOX — Main JS
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Header scrolled state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link by section in viewport (home only) ---------- */
  const navLinks = document.querySelectorAll('.nav-primary a[href^="#"]');
  if (navLinks.length) {
    const sections = [...navLinks]
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    const setActive = () => {
      const scrollY = window.scrollY + 120;
      let current = null;
      sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const duration = 1600;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const isInt = Number.isInteger(target);
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = isInt
          ? Math.round(target * eased)
          : (target * eased).toFixed(1);
        el.textContent = prefix + value + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cIo.observe(c));
  }

  /* ---------- Lightbox for gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('button');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Contact form → WhatsApp ---------- */
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome    = data.get('nome')?.toString().trim();
      const tel     = data.get('telefone')?.toString().trim();
      const email   = data.get('email')?.toString().trim();
      const segmento = data.get('segmento')?.toString().trim();
      const msg     = data.get('mensagem')?.toString().trim();

      const text =
        `*Solicitação de Orçamento — Mr. Inox*%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*Telefone:* ${tel}%0A` +
        (email ? `*E-mail:* ${email}%0A` : '') +
        (segmento ? `*Segmento:* ${segmento}%0A` : '') +
        `%0A*Mensagem:*%0A${msg}`;

      const whatsNumber = '5531984877372';
      window.open(`https://wa.me/${whatsNumber}?text=${text}`, '_blank');
    });
  }

  /* ---------- Year in footer ---------- */
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();
})();
