// navbar.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Define the HTML for the navbar, including desktop and mobile versions
  const navbarHTML = `
    <nav
      class="fixed w-full top-0 left-0 bg-white/70 backdrop-blur-lg shadow-lg z-50 transition-all duration-300 ease-in-out border-b border-gray-200"
      id="main-navbar"
    >
      <div class="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between h-20">
        <a href="index.html" class="text-2xl font-extrabold text-gray-900 tracking-tight hover:text-gray-700 transition">
          Kirna.dev
        </a>
        <ul class="hidden md:flex space-x-10 text-gray-700 font-semibold tracking-wide text-lg">
          <li><a href="index.html" class="hover:text-black transition">Home</a></li>
          <li><a href="about.html" class="hover:text-black transition">About</a></li>
          <li><a href="projects.html" class="hover:text-black transition">Projects</a></li>
          <li><a href="contact.html" class="hover:text-black transition">Contact</a></li>
        </ul>
        <!-- Mobile menu button -->
        <button id="mobile-menu-btn" class="md:hidden text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu, hidden by default -->
      <div id="mobile-menu" class="hidden md:hidden bg-white/90 px-6 pt-2 pb-4 space-y-2 shadow-inner border-b border-gray-200">
        <a href="index.html" class="block text-gray-700 font-semibold hover:text-black transition">Home</a>
        <a href="about.html" class="block text-gray-700 font-semibold hover:text-black transition">About</a>
        <a href="projects.html" class="block text-gray-700 font-semibold hover:text-black transition">Projects</a>
        <a href="contact.html" class="block text-gray-700 font-semibold hover:text-black transition">Contact</a>
      </div>
    </nav>
  `;

  // Inject the navbar HTML into the placeholder div
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) navbarPlaceholder.innerHTML = navbarHTML;

  // Mobile menu toggle logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smart navbar scroll effect: shrink + shadow
  // Adds/removes shadow and blur based on scroll position
  let lastScrollY = window.scrollY;
  const nav = document.getElementById("main-navbar");
  window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add("backdrop-blur-lg", "shadow-lg");
      nav.classList.remove("shadow-md");
    } else {
      nav.classList.remove("backdrop-blur-lg", "shadow-lg");
      nav.classList.add("shadow-md");
    }
    lastScrollY = window.scrollY;
  });
});
