/**
 * giscus Comments System Configuration
 *
 * Setup Instructions:
 * 1. Go to https://github.com/apps/giscus
 * 2. Install the giscus app on your GitHub repository
 * 3. Enable Discussions on your repository
 * 4. Configure the settings below
 */

const GISCUS_CONFIG = {
  // GitHub repository (format: username/repository)
  repo: 'iamfangyun/bmaster-cn',

  // Repository ID from giscus setup
  repoId: 'R_kgDOS4mTgg',

  // Discussion category
  category: 'Announcements',

  // Category ID from giscus setup
  categoryId: 'DIC_kwDOS4mTgs4C_75p',

  // Discussion mapping (recommended: 'pathname' for unique pages)
  mapping: 'pathname',

  // GitHub theme (light, dark, dark_dimmed, dark_high_contrast, transparent_dark, preferred_color_scheme)
  theme: 'light',

  // Language (en, zh-CN, ja, ko, de, fr, ru, es, pt)
  lang: 'en',

  // Lazy load (comments load when scrolled into view)
  lazy: true,

  // Reaction mapping (use GitHub emoji reactions)
  reactionsEnabled: '1'
};

/**
 * Auto-detect language from HTML lang attribute
 */
function detectLanguage() {
  const htmlLang = document.documentElement.lang;
  if (htmlLang.startsWith('zh')) {
    return 'zh-CN';
  }
  return 'en';
}

/**
 * Load giscus comments
 */
function loadComments() {
  const commentsContainer = document.getElementById('comments');
  if (!commentsContainer) return;

  // Update language based on page
  const detectedLang = detectLanguage();
  if (detectedLang !== GISCUS_CONFIG.lang) {
    console.log(`Detected language: ${detectedLang}`);
  }

  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';

  // Build giscus configuration
  const config = {
    repo: GISCUS_CONFIG.repo,
    repoId: GISCUS_CONFIG.repoId,
    category: GISCUS_CONFIG.category,
    categoryId: GISCUS_CONFIG.categoryId,
    mapping: GISCUS_CONFIG.mapping,
    strict: '0',
    reactionsEnabled: GISCUS_CONFIG.reactionsEnabled,
    emitMetadata: '0',
    inputPosition: 'bottom',
    theme: GISCUS_CONFIG.theme,
    lang: detectedLang,
    loading: 'lazy'
  };

  // Set data attributes
  Object.keys(config).forEach(key => {
    script.setAttribute(`data-${key}`, config[key]);
  });

  commentsContainer.appendChild(script);
}

/**
 * Lazy load comments when they come into viewport
 */
function setupLazyComments() {
  if (!GISCUS_CONFIG.lazy) {
    loadComments();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadComments();
        observer.disconnect();
      }
    });
  }, { rootMargin: '500px' });

  const commentsContainer = document.getElementById('comments');
  if (commentsContainer) {
    observer.observe(commentsContainer);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupLazyComments);
} else {
  setupLazyComments();
}

// Export for manual loading if needed
window.loadComments = loadComments;
