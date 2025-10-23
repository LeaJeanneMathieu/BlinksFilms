// BINKSFILMS — Home Page JavaScript

class HomePage {
  constructor() {
    this.overlay = document.getElementById('bf-about');
    this.closeBtn = document.getElementById('bf-close');
    this.typingEl = document.getElementById('bf-typing');
    this.titleEl = document.getElementById('bf-title');
    this.moreBtn = document.getElementById('bf-more');
    this.botBox = document.getElementById('bf-bot');
    this.topicsEl = document.getElementById('bf-topics');
    this.chatEl = document.getElementById('bf-chat');
    
    this.audioContext = null;
    this.isTyping = false;
    
    this.init();
  }

  init() {
    this.setupAudioContext();
    this.setupOverlay();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupVideoBackground();
  }

  setupAudioContext() {
    // Initialize audio context for typing sounds
    if (window.AudioContext || window.webkitAudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setupOverlay() {
    if (!this.overlay) return;

    // Overlay content
    this.TITLE = "LES BEAUX ARTS DU GHETTO";
    this.TEXT = `Créer. Explorer. Marquer.

Chez BinksFilms, nous ne produisons pas simplement des images.
Nous façonnons des univers.
Chaque projet est une porte ouverte vers une expérience sensorielle où la musique, le mouvement et la lumière racontent une histoire unique.

Ici, l'art dépasse la technique.
Chaque plan est pensé pour provoquer une émotion, bousculer les codes et laisser une trace.
Nous ne suivons pas les tendances : nous les redéfinissons.

Notre mission est simple :
transformer les idées en expériences visuelles qui résonnent, longtemps après le dernier plan.`;

    this.TOPICS = {
      vision: `Notre vision est de créer des œuvres qui marquent les esprits.
Nous mêlons esthétique, narration et son pour révéler une émotion sincère, identifiable dès le premier plan.`,
      process: `De l'idée à l'écran : repérage, moodboard, écriture visuelle, tournage précis, montage, étalonnage et sound design.
Chaque étape est pensée pour la cohérence et la puissance émotionnelle.`,
      services: `Clips, courts formats, contenus de marque, photographie promotionnelle, color grading, VFX légers, montage & sound design.
Toujours avec une identité forte.`,
      contact: `Parlons de ton projet.
Contact direct : Binksfilms@gmail.com — ou passe par la page Contact pour un brief guidé.`
    };

    this.setupOverlayEvents();
  }

  setupOverlayEvents() {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeOverlay());
    }

    // Overlay background click
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.closeOverlay();
        }
      });
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeOverlay();
      }
    });

    // More button
    if (this.moreBtn) {
      this.moreBtn.addEventListener('click', () => this.toggleBotMode());
    }

    // Topics
    if (this.topicsEl) {
      this.topicsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.bf-chip');
        if (!btn) return;
        
        const topic = btn.dataset.topic;
        if (topic === 'retour') {
          this.showManifest();
        } else {
          this.showTopic(topic, btn.textContent.trim());
        }
      });
    }

    // Find and setup about link
    this.setupAboutLink();
  }

  setupAboutLink() {
    const aboutLink = this.findAboutLink();
    if (aboutLink) {
      aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.openOverlay();
      });
    }
  }

  findAboutLink() {
    // Try by ID first
    let link = document.getElementById('open-about');
    if (link) return link;

    // Try by text content
    const links = [...document.querySelectorAll('a')];
    return links.find(a => {
      const text = (a.textContent || '').toUpperCase();
      const href = (a.getAttribute('href') || '').toLowerCase();
      return text.includes('PROPOS') || href === '#apropos';
    });
  }

  openOverlay() {
    if (!this.overlay) return;

    document.body.classList.add('overlay-open');
    this.overlay.classList.add('is-open');
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Reset state
    this.typingEl?.classList.remove('bf-hidden');
    this.botBox.hidden = true;
    this.chatEl.innerHTML = '';
    this.moreBtn?.setAttribute('aria-expanded', 'false');

    // Start typing animation
    this.typeTitle();
    this.closeBtn?.focus();
  }

  closeOverlay() {
    if (!this.overlay) return;

    this.overlay.classList.remove('is-open');
    document.body.classList.remove('overlay-open');
  }

  typeTitle() {
    if (!this.titleEl || !this.typingEl) return;

    this.typeWriter(this.titleEl, this.TITLE, 10, false, () => {
      this.typeWriter(this.typingEl, this.TEXT, 18, true);
    });
  }

  typeWriter(node, str, speed = 18, withSound = true, done) {
    if (!node) return;

    node.textContent = '';
    let i = 0;
    
    const tick = () => {
      if (i < str.length) {
        node.textContent += str.charAt(i);
        
        if (withSound && str.charAt(i) !== ' ' && str.charAt(i) !== '\n') {
          this.playTypingSound();
        }
        
        i++;
        setTimeout(tick, speed);
      } else if (typeof done === 'function') {
        done();
      }
    };
    
    tick();
  }

  playTypingSound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    const frequency = 800 + Math.random() * 400;
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, now);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 0.06);
  }

  toggleBotMode() {
    if (!this.moreBtn || !this.botBox || !this.typingEl) return;

    const expanded = this.moreBtn.getAttribute('aria-expanded') === 'true';
    
    if (!expanded) {
      this.typingEl.classList.add('bf-hidden');
      this.botBox.hidden = false;
      this.chatEl.innerHTML = '';
      this.pushMessage("Choisis un sujet : Vision, Process, Services, Contact. (← Retour au manifeste)");
      this.moreBtn.setAttribute('aria-expanded', 'true');
    } else {
      this.showManifest();
    }
  }

  showManifest() {
    if (!this.botBox || !this.typingEl || !this.moreBtn) return;

    this.botBox.hidden = true;
    this.typingEl.classList.remove('bf-hidden');
    this.moreBtn.setAttribute('aria-expanded', 'false');
  }

  showTopic(topic, title) {
    if (!this.chatEl) return;

    const content = this.TOPICS[topic];
    if (!content) return;

    this.chatEl.innerHTML = '';
    this.pushMessage("→ " + title);
    this.typeChat(content);
  }

  pushMessage(text) {
    if (!this.chatEl) return;

    const p = document.createElement('p');
    p.className = 'bf-msg';
    p.textContent = text;
    this.chatEl.appendChild(p);
  }

  typeChat(text) {
    if (!this.chatEl) return;

    const p = document.createElement('p');
    p.className = 'bf-msg';
    this.chatEl.appendChild(p);
    
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        p.textContent = text.slice(0, ++i);
        
        if (text[i - 1] && text[i - 1] !== ' ' && text[i - 1] !== '\n') {
          this.playTypingSound();
        }
        
        setTimeout(tick, 14);
      }
    };
    
    tick();
  }

  setupNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('nav a');
      if (!link) return;
      
      // Close overlay if clicking on non-about links
      const aboutLink = this.findAboutLink();
      if (link !== aboutLink) {
        this.closeOverlay();
      }
    });
  }

  setupScrollEffects() {
    // Parallax effect for video background
    const videoBg = document.querySelector('.video-bg');
    if (videoBg) {
      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        videoBg.style.transform = `translateY(${rate}px)`;
      };

      window.addEventListener('scroll', this.throttle(handleScroll, 16));
    }

    // Fade in elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe hero elements
    document.querySelectorAll('.hero > div > *').forEach(el => {
      observer.observe(el);
    });
  }

  setupVideoBackground() {
    const videoIframe = document.querySelector('.video-bg iframe');
    if (videoIframe) {
      // Ensure video is muted and autoplay works
      videoIframe.src = videoIframe.src + '&mute=1&autoplay=1';
    }
  }

  // Utility function
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
  }
}

// Initialize home page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
  });
} else {
  new HomePage();
}
