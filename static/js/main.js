
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer:fine)').matches;

  /* Cursor spotlight */
  const cursor = document.querySelector('.cursor');
  if (cursor && fine && !reduce) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      document.body.style.setProperty('--mx', `${(e.clientX / innerWidth) * 100}%`);
      document.body.style.setProperty('--my', `${(e.clientY / innerHeight) * 100}%`);
    }, {passive:true});
  }

  /* Scroll progress + nav state */
  const progress = document.querySelector('.progress');
  const nav = document.querySelector('.nav');
  const updateScrollUI = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    nav?.classList.toggle('scrolled', window.scrollY > 18);
  };
  window.addEventListener('scroll', updateScrollUI, {passive:true});
  updateScrollUI();

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('show'); io.unobserve(entry.target); }
    }), {threshold:.08, rootMargin:'0px 0px -4% 0px'});
    reveals.forEach((el,i) => { el.style.transitionDelay = `${Math.min(i * 28, 240)}ms`; io.observe(el); });
  } else reveals.forEach(el => el.classList.add('show'));

  /* Project filtering */
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
    const filter = btn.dataset.filter;
    cards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show && !reduce) {
        card.animate([{opacity:.15,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}], {duration:420,delay:i*35,easing:'cubic-bezier(.2,.8,.2,1)'});
      }
    });
  }));
  filters.forEach(btn => btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false'));

  /* Mobile menu */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    const closeMenu = () => { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); menuToggle.setAttribute('aria-expanded','false'); };
    menuToggle.addEventListener('click', () => { const open = mobileMenu.classList.toggle('open'); mobileMenu.setAttribute('aria-hidden', String(!open)); menuToggle.setAttribute('aria-expanded', String(open)); });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* Theme selector — persistent, accessible, and keyboard-safe */
  (() => {
    const key = 'asif-portfolio-theme';
    const panel = document.querySelector('.theme-panel');
    const trigger = document.querySelector('.theme-trigger');
    const close = document.querySelector('.theme-close');
    const options = [...document.querySelectorAll('.theme-option')];
    const themes = ['midnight','arctic','emerald','violet'];
    const meta = document.querySelector('meta[name="theme-color"]');
    const colors = {midnight:'#071016',arctic:'#f3f7fa',emerald:'#f6f4ec',violet:'#0e0d16'};
    let lastFocused = null;
    const apply = theme => {
      if (!themes.includes(theme)) theme = 'midnight';
      document.body.dataset.theme = theme;
      localStorage.setItem(key, theme);
      options.forEach(o => {
        const active = o.dataset.theme === theme;
        o.classList.toggle('active', active);
        o.setAttribute('aria-pressed', String(active));
      });
      if (meta) meta.content = colors[theme];
    };
    apply(localStorage.getItem(key) || 'midnight');
    const focusables = () => panel ? [...panel.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled) : [];
    const closePanel = () => {
      if (!panel) return;
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      trigger?.setAttribute('aria-expanded','false');
      document.body.classList.remove('theme-lock');
      lastFocused?.focus?.();
    };
    const openPanel = () => {
      if (!panel) return;
      lastFocused = document.activeElement;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      trigger?.setAttribute('aria-expanded','true');
      document.body.classList.add('theme-lock');
      requestAnimationFrame(() => (options.find(o => o.classList.contains('active')) || options[0])?.focus());
    };
    trigger?.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
    close?.addEventListener('click', closePanel);
    panel?.addEventListener('click', e => { if (e.target === panel) closePanel(); });
    options.forEach(o => o.addEventListener('click', () => { apply(o.dataset.theme); closePanel(); }));
    document.addEventListener('keydown', e => {
      if (!panel?.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closePanel(); return; }
      if (e.key !== 'Tab') return;
      const items = focusables(); if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  /* Active nav */
  (() => {
    const links = [...document.querySelectorAll('nav a[href^="#"]')];
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(l => l.classList.toggle('current', l.getAttribute('href') === '#' + entry.target.id));
    }), {rootMargin:'-38% 0px -52% 0px',threshold:0});
    sections.forEach(s => spy.observe(s));
  })();

  /* Gentle 3D card tilt on desktop */
  if (fine && !reduce) {
    document.querySelectorAll('.project').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(1000px) rotateX(${(-y*2.4).toFixed(2)}deg) rotateY(${(x*3.2).toFixed(2)}deg) translateY(-5px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform=''; });
    });
  }

  /* Magnetic buttons */
  if (fine && !reduce) {
    document.querySelectorAll('.btn.primary').forEach(btn => {
      btn.addEventListener('pointermove', e => { const r=btn.getBoundingClientRect(); btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`; });
      btn.addEventListener('pointerleave', () => btn.style.transform='');
    });
  }

  /* Count-up metrics */
  const counters = document.querySelectorAll('.numbers b[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el=entry.target, target=Number(el.dataset.count)||0, suffix=el.dataset.suffix||''; let start=0; const duration=900, t0=performance.now();
      const tick=now=>{const p=Math.min((now-t0)/duration,1), eased=1-Math.pow(1-p,3); el.textContent=`${Math.round(target*eased).toString().padStart(2,'0')}${suffix}`; if(p<1) requestAnimationFrame(tick);};
      requestAnimationFrame(tick); cio.unobserve(el);
    }),{threshold:.7});
    counters.forEach(c=>cio.observe(c));
  }

  /* External link affordance + lazy image safety */
  document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => img.classList.add('img-error')));
})();
