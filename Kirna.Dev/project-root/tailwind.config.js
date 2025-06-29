// tailwind.config.js

/**
 * Tailwind CSS Configuration for Kirna.dev
 * - Scans all HTML, JS, and component files for class usage
 * - Customizes theme for a modern, glassy, light look
 * - Add more theme extensions as needed for your brand
 */

module.exports = {
  content: [
    "./index.html",
    "./about.html",
    "./contact.html",
    "./projects.html",
    "./js/navbar.js",
    "./js/footer.js",
    "./js/**/*.js",
    "./css/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Kirna blue
        accent: '#fbbf24',  // Accent yellow
        glass: 'rgba(255,255,255,0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};
