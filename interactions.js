// ====================================================================
// INTERACTIONS — conjunto curado, cada efeito com uma função clara.
// Tudo aqui verifica prefers-reduced-motion antes de animar qualquer coisa
// que não seja puramente CSS (que já é coberto globalmente em styles.css).
// ====================================================================

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== SCROLL PROGRESS ====================
(function scrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function update() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ==================== SECTION TITLE — SPLIT WORD REVEAL ====================
// Reaproveita o mecanismo .scroll-reveal/.revealed que já existe em app.js —
// só divide o título em palavras pra elas entrarem com um leve atraso entre si.
(function splitSectionTitles() {
  document.querySelectorAll('.section-title').forEach((title) => {
    const words = title.textContent.trim().split(' ');
    title.innerHTML = words
      .map((word, i) => `<span class="word" style="transition-delay:${i * 60}ms">${word}</span>`)
      .join(' ');
    title.classList.add('split-ready');
  });
})();

// ==================== TIMELINE DESENHANDO-SE NO SCROLL ====================
if (!reducedMotion) {
  (function timelineDraw() {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    let ticking = false;

    function update() {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const covered = vh * 0.85 - rect.top;
      const pct = Math.max(0, Math.min(1, covered / total));
      timeline.style.setProperty('--timeline-progress', pct.toFixed(3));
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  })();
}

// ==================== TILT SUTIL NOS CARDS ====================
// Só desktop com mouse de verdade — em touch, mousemove não dispara, então
// isso já não interfere em nada no celular.
if (!reducedMotion) {
  (function cardTilt() {
    const MAX_TILT = 4; // graus — deliberadamente pequeno
    const cards = document.querySelectorAll('.project-card, .skill-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(700px) rotateX(${(-y * MAX_TILT).toFixed(2)}deg) rotateY(${(x * MAX_TILT).toFixed(2)}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();
}

// ==================== PARALLAX SUTIL DO RETRATO ====================
// Só roda enquanto o hero está visível, e só existe em telas largas
// (o .hero-visual já é display:none abaixo de 1024px via CSS).
if (!reducedMotion) {
  (function heroParallax() {
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;

    let ticking = false;

    function update() {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        visual.style.transform = `translateY(${(scrolled * 0.12).toFixed(1)}px)`;
      }
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  })();
}
