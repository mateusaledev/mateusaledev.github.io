// Collapse navigation sections by default and add explicit expand controls
(function () {
  function hydrateSections(root) {
    const sections = root.querySelectorAll(':scope > ul > li.md-nav__item--section.md-nav__item--nested');

    sections.forEach(section => {
      const toggle = section.querySelector(':scope > input.md-nav__toggle');
      const nav = section.querySelector(':scope > nav.md-nav');
      const label = section.querySelector(':scope > .md-nav__link.md-nav__container > label.md-nav__link');

      if (!toggle || !nav || !label) {
        return;
      }

      let button = label.querySelector('.md-nav__expander');
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'md-nav__expander';
        button.setAttribute('aria-label', 'Alternar secao de navegacao');
        button.innerHTML = '<span class="md-nav__expander-icon" aria-hidden="true"></span>';
        label.insertBefore(button, label.firstChild);
      }

      label.classList.add('md-nav__label--expander');

      const shouldOpen = section.classList.contains('md-nav__item--active') || !!nav.querySelector('.md-nav__link--active');
      toggle.checked = shouldOpen;

      if (!toggle._collapseNavChangeHandler) {
        toggle._collapseNavChangeHandler = () => {
          const expanded = toggle.checked;
          nav.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        };
        toggle.addEventListener('change', toggle._collapseNavChangeHandler);
      }

      toggle._collapseNavChangeHandler();

      if (!button._collapseNavClickHandler) {
        button._collapseNavClickHandler = event => {
          event.preventDefault();
          event.stopPropagation();
          toggle.checked = !toggle.checked;
          toggle.dispatchEvent(new Event('change', { bubbles: true }));
        };
        button.addEventListener('click', button._collapseNavClickHandler);
      }
    });
  }

  function init() {
    const primaryNav = document.querySelector('nav.md-nav--primary');
    if (!primaryNav) {
      return;
    }
    hydrateSections(primaryNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.document$) {
    window.document$.subscribe(() => init());
  }
})();
