/* ============================================
   THE APRIL CELEBRATIONS — PREMIUM JS
   script.js
   ============================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     LOADER — 4 seconds with rotating messages
     ────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderMessages = document.querySelectorAll('.lm');
  let msgIndex = 0;

  function cycleMessages() {
    loaderMessages.forEach((m) => m.classList.remove('active'));
    loaderMessages[msgIndex].classList.add('active');
    msgIndex = (msgIndex + 1) % loaderMessages.length;
  }

  cycleMessages();
  const msgInterval = setInterval(cycleMessages, 380);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(msgInterval);
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 1500);
  });

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  /* ──────────────────────────────────────────

  document.querySelectorAll('a, button, .service-card, .review-card, .pillar').forEach((el) => {
    el.addEventListener('mouseenter', () => {
    });
    el.addEventListener('mouseleave', () => {
    });
  });

  /* ──────────────────────────────────────────
     STICKY NAVBAR
     ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ──────────────────────────────────────────
     HAMBURGER / MOBILE DRAWER
     ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  document.body.appendChild(overlay);

  function openDrawer() {
    mobileDrawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.d-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* ──────────────────────────────────────────
     HERO PARTICLES
     ────────────────────────────────────────── */
  function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const colors = ['rgba(201,168,76,0.6)', 'rgba(180,79,255,0.4)', 'rgba(242,196,206,0.4)'];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = Math.random() * 15 + 10;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        bottom: -20px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      container.appendChild(p);
    }
  }

  /* ──────────────────────────────────────────
     IMAGE SLIDER
     ────────────────────────────────────────── */
  function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let current = 0;
    let autoTimer;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      autoTimer = setInterval(next, 6000);
    }
    function stopAuto() { clearInterval(autoTimer); }

    nextBtn && nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.idx));
        stopAuto();
        startAuto();
      });
    });

    startAuto();
  }

  /* ──────────────────────────────────────────
     MENU TABS
     ────────────────────────────────────────── */
  function initMenuTabs() {
    const tabs = document.querySelectorAll('.tab');
    const items = document.querySelectorAll('.menu-items');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach((t) => t.classList.remove('active'));
        items.forEach((i) => i.classList.remove('active'));

        tab.classList.add('active');
        const targetEl = document.querySelector(`.menu-items[data-content="${target}"]`);
        if (targetEl) {
          targetEl.classList.add('active');
          targetEl.style.opacity = '0';
          targetEl.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            targetEl.style.transition = 'opacity 0.4s, transform 0.4s';
            targetEl.style.opacity = '1';
            targetEl.style.transform = 'translateY(0)';
          });
        }
      });
    });
  }

  /* ──────────────────────────────────────────
     COUNTER ANIMATION
     ────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ──────────────────────────────────────────
     SCROLL REVEAL + INTERSECTION OBSERVER
     ────────────────────────────────────────── */
  function initAnimations() {
    createParticles();
    initSlider();
    initMenuTabs();

    // Add reveal classes to elements
    const revealTargets = [
      { selector: '.about-grid', delay: 0 },
      { selector: '.service-card', delay: 100 },
      { selector: '.menu-item', delay: 50 },
      { selector: '.review-card', delay: 80 },
      { selector: '.ci-item', delay: 100 },
      { selector: '.policy-item', delay: 80 },
      { selector: '.pillar', delay: 80 },
    ];

    revealTargets.forEach(({ selector, delay }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * delay}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Counter animation
            const counters = entry.target.querySelectorAll
              ? entry.target.querySelectorAll('.stat-num')
              : [];
            counters.forEach(animateCounter);

            if (entry.target.dataset.target) {
              animateCounter(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Observe stat numbers
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.stat-num').forEach((el) => statObserver.observe(el));

    // Observe hero stats section
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      heroStats.classList.add('reveal');
      observer.observe(heroStats);
    }
  }

  /* ──────────────────────────────────────────
     SMOOTH ANCHOR SCROLL
     ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     CONTACT FORM SUBMISSION
     ────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '<i class="fa-light fa-circle-notch fa-spin"></i> Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-light fa-circle-check"></i> Enquiry Sent Successfully';
        btn.style.background = '#2E7D32';
        btn.style.opacity = '1';

        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.style.opacity = '1';
          btn.disabled = false;
          contactForm.reset();
        }, 3500);
      }, 1800);
    });
  }

  /* ──────────────────────────────────────────
     TICKER DUPLICATE (JS safety)
     ────────────────────────────────────────── */
  // Already duplicated in HTML, animation handles it via CSS

  /* ──────────────────────────────────────────
     NAV ACTIVE STATE ON SCROLL
     ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ──────────────────────────────────────────
     REVIEW LIKE BUTTON
     ────────────────────────────────────────── */
  document.querySelectorAll('.review-like').forEach((btn) => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('span');
      if (!btn.dataset.liked) {
        icon.classList.replace('fa-light', 'fa-solid');
        icon.style.color = 'var(--gold)';
        const count = parseInt(text.textContent) + 1;
        text.textContent = `${count} people found this helpful`;
        btn.dataset.liked = 'true';
      }
    });
  });

  /* ──────────────────────────────────────────
     PARALLAX ON HERO
     ────────────────────────────────────────── */
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    if (heroContent) {
      const scrolled = window.scrollY;
      heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
      heroContent.style.opacity = 1 - scrolled / 600;
    }
  }, { passive: true });

})();

  /* ──────────────────────────────────────────
     BACK TO TOP BUTTON
     ────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });