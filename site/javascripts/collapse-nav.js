// Force nav groups collapsed on load and add an expander button next to section titles
(function(){
  try{
    // Clear any stored nav state for the current path so sections start collapsed
    const keys = Object.keys(localStorage).filter(k=>k.startsWith(location.pathname+".__nav"));
    keys.forEach(k=>localStorage.removeItem(k));
  }catch(e){}

  function setupNavCollapseAndExpanders(){
    const containers = document.querySelectorAll('.md-nav__container');
    containers.forEach(container=>{
      const label = container.querySelector('.md-nav__link');
      const nav = container.querySelector('nav');
      const toggle = container.querySelector('.md-nav__toggle');
      if(!label || !nav) return;

      // Ensure collapsed on load
      if(toggle && toggle.type === 'checkbox') toggle.checked = false;
      nav.setAttribute('aria-expanded','false');

      // If an expander button already exists, skip creating another
      if(label.querySelector('.md-nav__expander')) return;

      // Create a small accessible button to expand/collapse the section
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'md-nav__expander';
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('title','Expandir seção');
      btn.setAttribute('aria-label','Expandir/Colapsar seção de navegação');
      btn.innerHTML = '<span class="md-nav__expander-icon">▸</span>';

      btn.addEventListener('click', function(e){
        e.stopPropagation();
        const expanded = nav.getAttribute('aria-expanded') === 'true';
        nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if(toggle && toggle.type === 'checkbox') toggle.checked = !expanded;
      });

      // Append the button into the label so it appears next to the section title
      // Use appendChild to avoid breaking existing markup
      label.appendChild(btn);
    });
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive') setupNavCollapseAndExpanders();
  else document.addEventListener('DOMContentLoaded', setupNavCollapseAndExpanders);
})();