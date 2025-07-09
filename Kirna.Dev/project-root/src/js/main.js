/**
 * KIRNA.DEV - Main JavaScript
 * Premium CMS Development Services
 * Mind-blowing animations and interactions
 */

// ===== GLOBAL VARIABLES =====
let isAnimating = false;
let mouseX = 0;
let mouseY = 0;
let scrollY = 0;
let particles = [];
let animationId;

// ===== UTILITY FUNCTIONS =====
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const map = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// ===== CUSTOM CURSOR =====
class CustomCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    `;
    document.body.appendChild(this.cursor);

    this.dot = this.cursor.querySelector('.cursor-dot');
    this.ring = this.cursor.querySelector('.cursor-ring');

    this.currentX = 0;
    this.currentY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
    });

    this.animate();
  }

  animate() {
    this.currentX = lerp(this.currentX, this.targetX, 0.1);
    this.currentY = lerp(this.currentY, this.targetY, 0.1);

    this.dot.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    this.ring.style.transform = `translate(${this.currentX - 16}px, ${this.currentY - 16}px)`;

    requestAnimationFrame(() => this.animate());
  }

  expand() {
    this.ring.style.transform = `translate(${this.currentX - 16}px, ${this.currentY - 16}px) scale(1.5)`;
    this.ring.style.borderColor = 'rgba(59, 130, 246, 0.5)';
  }

  shrink() {
    this.ring.style.transform = `translate(${this.currentX - 16}px, ${this.currentY - 16}px) scale(1)`;
    this.ring.style.borderColor = 'rgba(255, 255, 255, 0.3)';
  }
}

// ===== PARTICLE SYSTEM =====
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(1, 3);
    this.opacity = random(0.1, 0.5);
    this.life = 1;
    this.decay = random(0.005, 0.02);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.opacity = this.life * 0.5;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseParticles = [];

    this.resize();
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    window.addEventListener('resize', () => this.resize());
    
    document.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.1) {
        this.mouseParticles.push(new Particle(e.clientX, e.clientY));
      }
    });

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw background particles
    this.particles.forEach((particle, index) => {
      particle.update();
      particle.draw(this.ctx);
      
      if (particle.isDead()) {
        this.particles.splice(index, 1);
      }
    });

    // Update and draw mouse particles
    this.mouseParticles.forEach((particle, index) => {
      particle.update();
      particle.draw(this.ctx);
      
      if (particle.isDead()) {
        this.mouseParticles.splice(index, 1);
      }
    });

    // Add new background particles
    if (this.particles.length < 50) {
      this.particles.push(new Particle(
        random(0, this.canvas.width),
        random(0, this.canvas.height)
      ));
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
  constructor() {
    this.currentY = 0;
    this.targetY = 0;
    this.ease = 0.1;
    this.init();
  }

  init() {
    document.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
    });

    this.animate();
  }

  animate() {
    this.currentY = lerp(this.currentY, this.targetY, this.ease);
    
    document.documentElement.style.setProperty('--scroll-y', `${this.currentY}px`);
    
    requestAnimationFrame(() => this.animate());
  }
}

// ===== PARALLAX EFFECTS =====
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    this.elements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const y = (window.scrollY * speed);
      element.style.transform = `translateY(${y}px)`;
    });

    window.addEventListener('scroll', () => {
      this.elements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const y = (window.scrollY * speed);
        element.style.transform = `translateY(${y}px)`;
      });
    });
  }
}

// ===== MAGNETIC EFFECTS =====
class MagneticEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-magnetic]');
    this.init();
  }

  init() {
    this.elements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = element.dataset.magnetic || 0.3;
        
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px)';
      });
    });
  }
}

// ===== TEXT ANIMATIONS =====
class TextAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Split text into characters
    const textElements = document.querySelectorAll('[data-text-animation]');
    
    textElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${index * 0.05}s`;
        element.appendChild(span);
      });

      // Trigger animation when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('span');
            spans.forEach(span => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0px)';
            });
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  }
}

// ===== INTERACTIVE BACKGROUND =====
class InteractiveBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    this.connections = [];

    this.resize();
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    // Create points
    for (let i = 0; i < 50; i++) {
      this.points.push({
        x: random(0, this.canvas.width),
        y: random(0, this.canvas.height),
        vx: random(-0.5, 0.5),
        vy: random(-0.5, 0.5)
      });
    }

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update points
    this.points.forEach(point => {
      point.x += point.vx;
      point.y += point.vy;

      // Bounce off edges
      if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
      if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;

      // Draw points
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      this.ctx.fill();
    });

    // Draw connections
    this.points.forEach((point1, i) => {
      this.points.slice(i + 1).forEach(point2 => {
        const dist = distance(point1.x, point1.y, point2.x, point2.y);
        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(point1.x, point1.y);
          this.ctx.lineTo(point2.x, point2.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ===== SCROLL TRIGGERED ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-scroll-animation]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.scrollAnimation;
          this.animateElement(entry.target, animation);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    this.elements.forEach(element => {
      observer.observe(element);
    });
  }

  animateElement(element, animation) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';

    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0px)';
    }, 100);
  }
}

// ===== SOUND EFFECTS =====
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.init();
  }

  init() {
    // Initialize audio context on user interaction
    document.addEventListener('click', () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
    });
  }

  playHoverSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playClickSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.init();
  }

  init() {
    this.updateFPS();
  }

  updateFPS() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Log FPS in development
      if (window.location.hostname === 'localhost') {
        console.log(`FPS: ${this.fps}`);
      }
    }

    requestAnimationFrame(() => this.updateFPS());
  }
}

// ===== MAIN INITIALIZATION =====
class App {
  constructor() {
    this.cursor = null;
    this.particleSystem = null;
    this.smoothScroll = null;
    this.parallaxEffect = null;
    this.magneticEffect = null;
    this.textAnimations = null;
    this.interactiveBackground = null;
    this.scrollAnimations = null;
    this.soundEffects = null;
    this.performanceMonitor = null;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize all systems
    this.cursor = new CustomCursor();
    this.particleSystem = new ParticleSystem();
    this.smoothScroll = new SmoothScroll();
    this.parallaxEffect = new ParallaxEffect();
    this.magneticEffect = new MagneticEffect();
    this.textAnimations = new TextAnimations();
    this.interactiveBackground = new InteractiveBackground();
    this.scrollAnimations = new ScrollAnimations();
    this.soundEffects = new SoundEffects();
    this.performanceMonitor = new PerformanceMonitor();

    // Add event listeners
    this.addEventListeners();

    // Initial animations
    this.initialAnimations();

    console.log('🚀 KIRNA.DEV - Premium CMS Development Services Loaded!');
  }

  addEventListeners() {
    // Hover effects for buttons
    document.querySelectorAll('button, a').forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.expand();
        this.soundEffects.playHoverSound();
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.shrink();
      });

      element.addEventListener('click', () => {
        this.soundEffects.playClickSound();
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modals or menus
        document.querySelectorAll('[data-modal]').forEach(modal => {
          modal.style.display = 'none';
        });
      }
    });
  }

  initialAnimations() {
    // Animate hero section on load
    const hero = document.querySelector('#home');
    if (hero) {
      gsap.from(hero.querySelector('h1'), {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
      });

      gsap.from(hero.querySelector('p'), {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from(hero.querySelectorAll('button'), {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6,
        stagger: 0.2
      });
    }
  }
}

// ===== START THE APP =====
const app = new App();

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
