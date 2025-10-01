// Collapse navigation sections by default, keeping the active trail expanded
(function () {
  function clearStoredNavState() {
    try {
      const prefix = location.pathname + '.__nav';
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          localStorage.removeItem(key);
          i -= 1;
        }
      }
    } catch (error) {
      // Ignore storage issues (e.g., private mode)
    }
  }

  function collapsePrimaryNav() {
    const primaryNav = document.querySelector('nav.md-nav--primary');
    if (!primaryNav) {
      return;
    }

    const sections = primaryNav.querySelectorAll('li.md-nav__item--section.md-nav__item--nested');
    sections.forEach(section => {
      const toggle = section.querySelector(':scope > input.md-nav__toggle');
      const nav = section.querySelector(':scope > nav.md-nav');

      if (!toggle || !nav) {
        return;
      }

      if (!toggle._collapseNavBound) {
        toggle.addEventListener('change', () => {
          nav.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
        });
        toggle._collapseNavBound = true;
      }

      const hasActiveDescendant = section.classList.contains('md-nav__item--active') ||
        !!nav.querySelector('.md-nav__item--active, .md-nav__link--active');

      toggle.checked = !!hasActiveDescendant;
      nav.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
    });
  }

  function init() {
    clearStoredNavState();
    collapsePrimaryNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.document$) {
    window.document$.subscribe(init);
  }
})();
