// footer.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Define the HTML for the footer, including links and styling
  const footerHTML = `
    <footer class="bg-white/70 backdrop-blur-lg text-gray-600 text-center py-8 mt-16 shadow-inner select-none border-t border-gray-200">
      <div class="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center">
        <p class="text-base font-semibold mb-2">© 2025 Kirna.dev — Placeholder footer content</p>
        <div class="flex space-x-4 mt-2">
          <a href="https://github.com/" target="_blank" rel="noopener" class="hover:text-black transition">GitHub</a>
          <a href="about.html" class="hover:text-black transition">About</a>
          <a href="contact.html" class="hover:text-black transition">Contact</a>
        </div>
      </div>
    </footer>
  `;
  // Inject the footer HTML into the placeholder div
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
});
