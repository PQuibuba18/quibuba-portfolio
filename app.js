  // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme);
    icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      body.classList.toggle('dark');
      
      const newTheme = body.classList.contains('light') ? 'light' : 'dark';
      icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      localStorage.setItem('theme', newTheme);
    });

    // ==================== MOBILE MENU ====================
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const navLinks = navMobile.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      icon.className = navMobile.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
      });
    });

    // ==================== HEADER SCROLL ====================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });

    // ==================== SCROLL REVEAL ====================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ==================== TYPING EFFECT (Optional) ====================
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      let index = 0;
      
      function type() {
        if (index < text.length) {
          heroTitle.textContent += text.charAt(index);
          index++;
          setTimeout(type, 50);
        }
      }
      
      setTimeout(type, 500);
    }

    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinksDesktop = document.querySelectorAll('.nav-desktop a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinksDesktop.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    });