/* =========================================================
   Rishab Ajeyakumar Badaseshi — Portfolio
   script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (dark / light) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = getStoredTheme();
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    iconSun.hidden = isDark;
    iconMoon.hidden = !isDark;
  }

  // Uses an in-memory variable as a graceful fallback if localStorage
  // is unavailable (e.g. privacy mode) — the toggle still works for
  // the current visit even without persistence.
  let memoryTheme = null;
  function getStoredTheme() {
    try {
      return localStorage.getItem('rb-portfolio-theme');
    } catch (e) {
      return memoryTheme;
    }
  }
  function storeTheme(theme) {
    try {
      localStorage.setItem('rb-portfolio-theme', theme);
    } catch (e) {
      memoryTheme = theme;
    }
  }

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after clicking a link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scroll (JS fallback for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerOffset = 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 12 ? '0 6px 20px -12px rgba(0,0,0,0.25)' : 'none';
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  function validateField(key) {
    const { input, error } = fields[key];
    let message = '';

    if (!input.value.trim()) {
      message = 'This field is required.';
    } else if (key === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        message = 'Please enter a valid email address.';
      }
    } else if (key === 'message' && input.value.trim().length < 10) {
      message = 'Message should be at least 10 characters.';
    }

    error.textContent = message;
    input.closest('.form-row').classList.toggle('invalid', Boolean(message));
    return !message;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('blur', () => validateField(key));
    fields[key].input.addEventListener('input', () => {
      if (fields[key].input.closest('.form-row').classList.contains('invalid')) {
        validateField(key);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields)
      .map((key) => validateField(key))
      .every(Boolean);

    if (!allValid) {
      formStatus.textContent = 'Please fix the highlighted fields.';
      formStatus.className = 'form-status error';
      return;
    }

    // No backend is wired up yet — this simply confirms the message is ready to send.
    // Replace this block with a real API call (fetch/EmailJS/Formspree, etc.) when ready.
    formStatus.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message looks good — connect a backend to actually send it.`;
    formStatus.className = 'form-status success';
    form.reset();
  });

});
