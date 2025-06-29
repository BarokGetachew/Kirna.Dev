// main.js - Premium interactivity for Kirna.dev
// Handles mobile menu, dark/light mode, scroll-to-top, navbar/footer injection, and advanced Apple-style animations

// Inject navbar and footer from HTML partials
async function injectPartial(id, url) {
  const el = document.getElementById(id);
  if (el) {
    const res = await fetch(url);
    el.innerHTML = await res.text();
  }
}

// Apple-style parallax hero and floating shapes
function appleParallax() {
  const hero = document.querySelector('section[data-aos="fade-up"]');
  const shapes = document.querySelectorAll('.floating-shape');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (hero) {
      hero.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0005})`;
      hero.style.transition = 'transform 0.3s cubic-bezier(.4,2,.6,1)';
    }
    shapes.forEach((shape, i) => {
      shape.style.transform = `translateY(${Math.sin(scrollY/100 + i) * 20}px) scale(1.08)`;
    });
  });
}

// 3D tilt effect for cards (Apple style)
function tiltCards() {
  document.querySelectorAll('.glass, .bg-white\/80, .dark\:bg-gray-800\/80').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * -8;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.4,2,.6,1)';
    });
  });
}

// Animated counters for stats (Apple style)
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-counter');
      const current = +counter.innerText.replace(/,/g, '');
      const inc = Math.ceil((target - current) / 12);
      if (current < target) {
        counter.innerText = (current + inc).toLocaleString();
        setTimeout(update, 30);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });
}

// Page transition fade (Apple style)
function pageTransitions() {
  document.body.classList.add('fade-in');
  document.querySelectorAll('a').forEach(link => {
    if (link.target === '_blank' || link.href.startsWith('mailto:')) return;
    link.addEventListener('click', e => {
      if (link.href && !link.href.includes('#')) {
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location = link.href;
        }, 350);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectPartial('navbar-placeholder', '../components/navbar.html');
  injectPartial('footer-placeholder', '../components/footer.html');
  // Advanced Apple-style features
  appleParallax();
  tiltCards();
  animateCounters();
  pageTransitions();
  // Alpine.js is loaded for future interactivity (Kirby/Aceternity ready)
});

  // Mobile menu toggle
  document.body.addEventListener('click', e => {
    if (e.target.closest('#mobile-menu-btn')) {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    }
  });

  // Dark/Light mode toggle
  document.body.addEventListener('click', e => {
    if (e.target.closest('#theme-toggle')) {
      const html = document.documentElement;
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    }
  });

  // Initial theme
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  // Scroll-to-top button
  const btn = document.createElement('button');
  btn.id = 'scrollToTopBtn';
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" /></svg>';
  document.body.appendChild(btn);
  function toggleBtn() {
    if (window.scrollY > 200) {
      btn.classList.add('show');
      btn.classList.remove('hide');
    } else {
      btn.classList.remove('show');
      btn.classList.add('hide');
    }
  }
  window.addEventListener('scroll', toggleBtn);
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Advanced Apple-style features
  appleParallax();
  tiltCards();
  animateCounters();
  pageTransitions();
});
