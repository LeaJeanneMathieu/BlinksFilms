// BINKSFILMS — Main JavaScript (v2.0)

// Global state
const App = {
  currentPage: null,
  isLoaded: false,
  animations: {
    enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
};

// Utility functions
const Utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  // Generate random ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
};

// Animation controller
const Animations = {
  // Fade in animation
  fadeIn(element, duration = 600) {
    if (!App.animations.enabled) {
      element.style.opacity = '1';
      return;
    }

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  },

  // Slide in from left
  slideInLeft(element, duration = 600) {
    if (!App.animations.enabled) {
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
      return;
    }

    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  },

  // Slide in from right
  slideInRight(element, duration = 600) {
    if (!App.animations.enabled) {
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
      return;
    }

    element.style.opacity = '0';
    element.style.transform = 'translateX(30px)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  },

  // Scale in animation
  scaleIn(element, duration = 600) {
    if (!App.animations.enabled) {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
      return;
    }

    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  },

  // Stagger animation for multiple elements
  stagger(elements, animation, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        animation(element);
      }, index * delay);
    });
  }
};

// Navigation controller
const Navigation = {
  init() {
    this.setupSmoothScrolling();
    this.setupActiveLinks();
    this.setupMobileMenu();
  },

  setupSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          Utils.smoothScrollTo(targetElement, 80);
        }
      });
    });
  },

  setupActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href.replace('.html', ''))) {
        link.classList.add('active');
      }
    });
  },

  setupMobileMenu() {
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });
    }
  }
};

// Scroll effects
const ScrollEffects = {
  init() {
    if (!App.animations.enabled) return;
    
    this.setupScrollAnimations();
    this.setupParallax();
    this.setupScrollProgress();
  },

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animation || 'fadeIn';
          
          if (Animations[animationType]) {
            Animations[animationType](element);
            observer.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Observe elements with animation attributes
    document.querySelectorAll('[data-animation]').forEach(element => {
      observer.observe(element);
    });
  },

  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    const handleScroll = Utils.throttle(() => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleScroll);
  },

  setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    const updateProgress = Utils.throttle(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${scrollPercent}%`;
    }, 16);

    window.addEventListener('scroll', updateProgress);
  }
};

// Performance optimizations
const Performance = {
  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupPreloading();
  },

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  },

  setupImageOptimization() {
    // Add loading="lazy" to images without it
    document.querySelectorAll('img:not([loading])').forEach(img => {
      img.loading = 'lazy';
    });
  },

  setupPreloading() {
    // Preload critical resources
    const criticalResources = [
      '/css/main.css',
      '/css/intro.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'style';
      document.head.appendChild(link);
    });
  }
};

// Error handling
const ErrorHandler = {
  init() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  },

  handleError(event) {
    console.error('JavaScript Error:', event.error);
    // You can add error reporting here
  },

  handlePromiseRejection(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
    // You can add error reporting here
  }
};

// Initialize app
const init = () => {
  // Set current page
  App.currentPage = document.body.dataset.page || 'home';
  
  // Initialize modules
  Navigation.init();
  ScrollEffects.init();
  Performance.init();
  ErrorHandler.init();
  
  // Mark as loaded
  App.isLoaded = true;
  
  // Dispatch custom event
  document.dispatchEvent(new CustomEvent('app:loaded'));
  
  console.log('BINKSFILMS App initialized');
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other modules
window.BinksFilms = {
  App,
  Utils,
  Animations,
  Navigation,
  ScrollEffects,
  Performance
};
