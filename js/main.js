/**
 * FULGOR — Interactive Scripts
 * Mobile menu toggle, active section tracking, and subtle animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'close';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('overflow-hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('overflow-hidden');
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
      }
    });
  }

  // 2. Active Section Tracker (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            desktopNavLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('text-fulgor-yellow');
                link.classList.remove('text-paper/80');
              } else {
                link.classList.remove('text-fulgor-yellow');
                link.classList.add('text-paper/80');
              }
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // 3. Optional Hero Spark Generator (Subtle floating embers)
  const heroSection = document.getElementById('hero-section');
  if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sparksCount = 8;
    for (let i = 0; i < sparksCount; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember-spark';
      const size = Math.floor(Math.random() * 4) + 3; // 3px to 6px
      const colors = ['#FFE14D', '#FF3E7F', '#3D9DFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.backgroundColor = color;
      ember.style.boxShadow = `0 0 8px ${color}`;
      ember.style.left = `${Math.random() * 90 + 5}%`;
      ember.style.bottom = `${Math.random() * 40}%`;
      ember.style.setProperty('--duration', `${Math.random() * 4 + 4}s`);
      ember.style.setProperty('--delay', `${Math.random() * 5}s`);
      ember.style.setProperty('--drift', `${(Math.random() - 0.5) * 50}px`);

      heroSection.appendChild(ember);
    }
  }
});
