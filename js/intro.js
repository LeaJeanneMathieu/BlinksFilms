// BINKSFILMS — Intro/Loader JavaScript

class IntroLoader {
  constructor() {
    this.progressBar = document.querySelector('.progress > span');
    this.progressText = document.querySelector('.progress-text');
    this.enterWrap = document.querySelector('.enter-wrap');
    this.skipBtn = document.querySelector('.skip');
    this.introTitle = document.querySelector('.intro-title');
    this.introSub = document.querySelector('.intro-sub');
    
    this.progress = 0;
    this.duration = 3000; // 3 seconds
    this.interval = null;
    this.isComplete = false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startLoading();
  }

  setupEventListeners() {
    // Skip button
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => {
        this.completeLoading();
      });
    }

    // Enter button
    if (this.enterWrap) {
      const enterBtn = this.enterWrap.querySelector('.btn');
      if (enterBtn) {
        enterBtn.addEventListener('click', () => {
          this.enterSite();
        });
      }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.isComplete) {
          this.enterSite();
        } else {
          this.completeLoading();
        }
      }
    });
  }

  startLoading() {
    // Animate title and subtitle
    this.animateText();
    
    // Start progress animation
    this.animateProgress();
    
    // Preload critical resources
    this.preloadResources();
  }

  animateText() {
    if (this.introTitle) {
      this.introTitle.style.opacity = '0';
      this.introTitle.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        this.introTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        this.introTitle.style.opacity = '1';
        this.introTitle.style.transform = 'translateY(0)';
      }, 200);
    }

    if (this.introSub) {
      this.introSub.style.opacity = '0';
      this.introSub.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        this.introSub.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        this.introSub.style.opacity = '1';
        this.introSub.style.transform = 'translateY(0)';
      }, 600);
    }
  }

  animateProgress() {
    const startTime = Date.now();
    
    this.interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      this.progress = Math.min((elapsed / this.duration) * 100, 100);
      
      this.updateProgressBar();
      this.updateProgressText();
      
      if (this.progress >= 100) {
        this.completeLoading();
      }
    }, 16); // ~60fps
  }

  updateProgressBar() {
    if (this.progressBar) {
      this.progressBar.style.width = `${this.progress}%`;
    }
  }

  updateProgressText() {
    if (this.progressText) {
      const messages = [
        'Initialisation...',
        'Chargement des ressources...',
        'Préparation de l\'interface...',
        'Finalisation...',
        'Prêt !'
      ];
      
      const messageIndex = Math.floor((this.progress / 100) * messages.length);
      const currentMessage = messages[Math.min(messageIndex, messages.length - 1)];
      
      this.progressText.textContent = currentMessage;
    }
  }

  async preloadResources() {
    const criticalResources = [
      '/css/main.css',
      '/css/projects.css',
      '/css/contact.css',
      '/js/main.js'
    ];

    try {
      await Promise.all(
        criticalResources.map(resource => this.preloadResource(resource))
      );
    } catch (error) {
      console.warn('Some resources failed to preload:', error);
    }
  }

  preloadResource(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = url.endsWith('.css') ? 'style' : 'script';
      
      link.onload = resolve;
      link.onerror = reject;
      
      document.head.appendChild(link);
    });
  }

  completeLoading() {
    if (this.isComplete) return;
    
    this.isComplete = true;
    clearInterval(this.interval);
    
    // Complete progress bar
    this.progress = 100;
    this.updateProgressBar();
    this.updateProgressText();
    
    // Show enter button
    setTimeout(() => {
      this.showEnterButton();
    }, 500);
  }

  showEnterButton() {
    if (this.enterWrap) {
      this.enterWrap.classList.add('ready');
      
      // Animate button appearance
      const enterBtn = this.enterWrap.querySelector('.btn');
      if (enterBtn) {
        enterBtn.style.opacity = '0';
        enterBtn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          enterBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          enterBtn.style.opacity = '1';
          enterBtn.style.transform = 'translateY(0)';
        }, 200);
      }
    }
  }

  enterSite() {
    // Add exit animation
    document.body.style.transition = 'opacity 0.5s ease-out';
    document.body.style.opacity = '0';
    
    // Redirect after animation
    setTimeout(() => {
      // Try to find the main page
      const possiblePages = ['home.html', 'index.html', 'index_to_home.html'];
      
      // Check which page exists
      this.findMainPage(possiblePages).then(mainPage => {
        window.location.href = mainPage;
      }).catch(() => {
        // Fallback
        window.location.href = 'home.html';
      });
    }, 500);
  }

  async findMainPage(pages) {
    for (const page of pages) {
      try {
        const response = await fetch(page, { method: 'HEAD' });
        if (response.ok) {
          return page;
        }
      } catch (error) {
        // Continue to next page
      }
    }
    throw new Error('No main page found');
  }
}

// Initialize intro loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new IntroLoader();
  });
} else {
  new IntroLoader();
}
