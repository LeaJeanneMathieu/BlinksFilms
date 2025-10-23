// BINKSFILMS — Contact Page JavaScript

class ContactPage {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.steps = document.querySelectorAll('.step');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.sendBtn = document.getElementById('sendBtn');
    this.stepNow = document.getElementById('stepNow');
    this.ptypeWrap = document.getElementById('ptypeWrap');
    this.backHome = document.getElementById('backHome');
    this.matrixCanvas = document.getElementById('matrixbg');
    
    this.currentStep = 0;
    this.maxSteps = this.steps.length;
    
    this.init();
  }

  init() {
    this.setupFormStepper();
    this.setupProjectTypeBlocks();
    this.setupFormSubmission();
    this.setupMatrixBackground();
    this.setupBackHome();
    this.setupValidation();
    this.setupAnimations();
  }

  setupFormStepper() {
    if (!this.steps.length) return;

    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousStep());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextStep());
    }

    // Initial render
    this.renderSteps();
  }

  renderSteps() {
    this.steps.forEach((step, index) => {
      step.hidden = index !== this.currentStep;
    });

    // Update button states
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentStep === 0;
    }

    if (this.nextBtn) {
      this.nextBtn.hidden = this.currentStep === this.maxSteps - 1;
    }

    if (this.sendBtn) {
      this.sendBtn.hidden = this.currentStep !== this.maxSteps - 1;
    }

    if (this.stepNow) {
      this.stepNow.textContent = this.currentStep + 1;
    }

    // Animate step transition
    this.animateStepTransition();
  }

  animateStepTransition() {
    const currentStepEl = this.steps[this.currentStep];
    if (!currentStepEl) return;

    // Reset animation
    currentStepEl.style.opacity = '0';
    currentStepEl.style.transform = 'translateX(20px)';

    // Animate in
    requestAnimationFrame(() => {
      currentStepEl.style.transition = 'all 0.3s ease-out';
      currentStepEl.style.opacity = '1';
      currentStepEl.style.transform = 'translateX(0)';
    });
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep = Math.min(this.currentStep + 1, this.maxSteps - 1);
      this.renderSteps();
    }
  }

  previousStep() {
    this.currentStep = Math.max(this.currentStep - 1, 0);
    this.renderSteps();
  }

  validateCurrentStep() {
    const currentStepEl = this.steps[this.currentStep];
    if (!currentStepEl) return true;

    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'Ce champ est requis');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });

    // Email validation
    const emailField = currentStepEl.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        this.showFieldError(emailField, 'Veuillez entrer une adresse email valide');
        isValid = false;
      }
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.style.color = '#ff6b6b';
    errorEl.style.fontSize = '0.8rem';
    errorEl.style.marginTop = '0.25rem';
    errorEl.style.display = 'block';
    
    field.parentNode.appendChild(errorEl);
    field.style.borderColor = '#ff6b6b';
  }

  clearFieldError(field) {
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) {
      errorEl.remove();
    }
    field.style.borderColor = '';
  }

  setupProjectTypeBlocks() {
    if (!this.ptypeWrap) return;

    const blocks = {
      musique: document.getElementById('block-musique'),
      photo: document.getElementById('block-photo'),
      event: document.getElementById('block-event'),
      pub: document.getElementById('block-pub'),
      youtube: document.getElementById('block-youtube')
    };

    const updateBlocks = () => {
      const checked = [...this.ptypeWrap.querySelectorAll('input[name="ptype"]:checked')]
        .map(x => x.dataset.block);
      
      for (const key in blocks) {
        if (blocks[key]) {
          blocks[key].hidden = !checked.includes(key);
        }
      }
    };

    this.ptypeWrap.addEventListener('change', updateBlocks);
    updateBlocks(); // Initial update
  }

  setupFormSubmission() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Check honeypot
      if (this.form.website.value.trim()) {
        console.log('Spam detected');
        return;
      }

      if (!this.validateCurrentStep()) {
        return;
      }

      this.submitForm();
    });
  }

  submitForm() {
    const formData = this.collectFormData();
    const emailData = this.formatEmailData(formData);
    
    this.sendEmail(emailData);
  }

  collectFormData() {
    const data = {};
    const formData = new FormData(this.form);
    
    for (const [key, value] of formData.entries()) {
      if (key === 'ptype' || key === 'dist' || key === 'format' || key === 'add' || key === 'eventFmt') {
        if (!data[key]) data[key] = [];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }

  formatEmailData(data) {
    const formatArray = (arr) => Array.isArray(arr) ? arr.join(', ') : (arr || '—');
    
    return {
      Nom: data.name || '—',
      Email: data.email || '—',
      Téléphone: data.phone || '—',
      Réseaux: data.socials || '—',
      Types: formatArray(data.ptype),
      Projet: data.project || '—',
      Lieu: data.location || '—',
      Budget: data.budget || '—',
      'Date de tournage': data.shootDate || '—',
      Références: data.refs || '—',
      'Durée finale souhaitée': data.length || '—',
      Diffusion: formatArray(data.dist),
      'Formats livrables': formatArray(data.format),
      'Options supplémentaires': formatArray(data.add),
      LienMusique: data.musicLink || '—',
      Musique: data.music || '—',
      TypePhoto: data.photoType || '—',
      DateEvent: data.eventDate || '—',
      NbPersonnes: data.people || '—',
      Objectifs: data.goals || '—',
      DuréeSpot: data.dur || '—',
      YT_Format: data.ytFormat || '—',
      YT_Nb: data.ytCount || '—',
      Message: data.message || '—'
    };
  }

  sendEmail(data) {
    const to = "Binksfilms@gmail.com";
    const subject = encodeURIComponent(`[Contact] ${data.Types} — ${data.Projet || data.Nom}`);
    const body = encodeURIComponent(
      Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    );
    
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  }

  setupMatrixBackground() {
    if (!this.matrixCanvas) return;

    const ctx = this.matrixCanvas.getContext('2d');
    const phrase = "LES BEAUX ARTS DU GHETTO • ";
    let W, H, S, C, D;

    const resize = () => {
      W = this.matrixCanvas.width = window.innerWidth;
      H = this.matrixCanvas.height = window.innerHeight;
      S = Math.max(16, Math.min(26, Math.floor(W / 48)));
      ctx.font = S + "px monospace";
      C = Math.floor(W / S);
      D = Array(C).fill(0).map(() => Math.random() * H / S);
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, W, H);
      
      for (let i = 0; i < C; i++) {
        const idx = Math.floor(D[i] + i) % phrase.length;
        const ch = phrase[idx];
        const alpha = 0.28 + 0.18 * Math.sin((D[i] + i) * 0.12);
        ctx.fillStyle = `rgba(0,255,138,${alpha})`;
        ctx.fillText(ch, i * S, D[i] * S);
        D[i] += 0.30;
        
        if (D[i] * S > H && Math.random() > 0.992) {
          D[i] = 0;
        }
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
  }

  setupBackHome() {
    if (!this.backHome) return;

    this.backHome.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const possiblePages = ["index.html", "home.html"];
      
      for (const page of possiblePages) {
        try {
          const response = await fetch(page, { method: 'HEAD' });
          if (response.ok) {
            window.location.assign(page);
            return;
          }
        } catch (error) {
          // Continue to next page
        }
      }
      
      // Fallback
      window.location.assign("index.html");
    });
  }

  setupValidation() {
    // Real-time validation
    const inputs = this.form?.querySelectorAll('input, select, textarea');
    if (!inputs) return;

    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          this.showFieldError(input, 'Ce champ est requis');
        } else if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            this.showFieldError(input, 'Veuillez entrer une adresse email valide');
          } else {
            this.clearFieldError(input);
          }
        } else {
          this.clearFieldError(input);
        }
      });
    });
  }

  setupAnimations() {
    // Animate form elements on load
    const formElements = this.form?.querySelectorAll('.step, .steps-nav');
    if (!formElements) return;

    formElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Public methods
  goToStep(step) {
    if (step >= 0 && step < this.maxSteps) {
      this.currentStep = step;
      this.renderSteps();
    }
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getFormData() {
    return this.collectFormData();
  }
}

// Initialize contact page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
  });
} else {
  new ContactPage();
}

// Export for external use
window.ContactPage = ContactPage;
