/* ========================================
   CHÂTEAU MARTINAT - MAIN JAVASCRIPT
   ======================================== */

// ============================================
// AGE VERIFICATION
// ============================================
const ageVerification = {
  popup: document.getElementById('age-verification-popup'),
  yesBtn: document.getElementById('verify-button-yes'),
  noBtn: document.getElementById('verify-button-no'),
  
  init() {
    // Vérifier si l'utilisateur a déjà validé son âge
    const isVerified = sessionStorage.getItem('ageVerified');
    
    if (isVerified === 'true') {
      this.hidePopup();
    } else {
      this.showPopup();
    }
    
    // Événements
    this.yesBtn.addEventListener('click', () => this.verifyAge(true));
    this.noBtn.addEventListener('click', () => this.verifyAge(false));
  },
  
  verifyAge(isAdult) {
    if (isAdult) {
      sessionStorage.setItem('ageVerified', 'true');
      this.hidePopup();
    } else {
      alert("Désolé, vous devez avoir 18 ans ou plus pour accéder à ce site.");
      window.location.href = 'https://www.google.com';
    }
  },
  
  showPopup() {
    this.popup.style.display = 'flex';
  },
  
  hidePopup() {
    this.popup.style.display = 'none';
  }
};

// ============================================
// MENU NAVIGATION
// ============================================
const menuNav = {
  openBtn: document.getElementById('openMenu'),
  closeBtn: document.getElementById('closeMenu'),
  menu: document.getElementById('menu'),
  menuLinks: document.querySelectorAll('.menu-links a'),
  
  init() {
    this.openBtn.addEventListener('click', () => this.openMenu());
    this.closeBtn.addEventListener('click', () => this.closeMenu());
    
    // Fermer le menu quand on clique sur un lien
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.getAttribute('aria-hidden') === 'false') {
        this.closeMenu();
      }
    });
  },
  
  openMenu() {
    this.menu.setAttribute('aria-hidden', 'false');
    this.openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  },
  
  closeMenu() {
    this.menu.setAttribute('aria-hidden', 'true');
    this.openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
};

// ============================================
// SMOOTH SCROLL
// ============================================
const smoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens qui ne sont que "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// ============================================
// REVEAL ON SCROLL
// ============================================
const revealOnScroll = {
  init() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
  }
};

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const headerScroll = {
  header: document.querySelector('.topbar'),
  
  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      } else {
        this.header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      }
    });
  }
};

// ============================================
// LAZY LOADING IMAGES
// ============================================
const lazyLoadImages = {
  init() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Le navigateur supporte le lazy loading natif
      return;
    }
    
    // Fallback pour les navigateurs plus anciens
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ageVerification.init();
  menuNav.init();
  smoothScroll.init();
  revealOnScroll.init();
  headerScroll.init();
  lazyLoadImages.init();
  
  console.log('🍷 Château Martinat website loaded successfully!');
});