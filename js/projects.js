// BINKSFILMS — Projects Page JavaScript
// Fonctionnalités pour la page projets avec lecteur vidéo YouTube

// Configuration des projets
const projects = {
  '815': {
    title: '815 BINKS',
    number: '815',
    name: 'BINKS',
    artists: ['MIKADO', 'X', 'RICO'],
    videoId: '18006YbHjKA',
    year: '2024',
    type: 'Clip vidéo'
  },
  'crimshot': {
    title: 'CRIMSHOT',
    number: '001',
    name: 'CRIMSHOT',
    artists: ['CRIMSHOT'],
    videoId: '_4rAF1_ZlJE',
    year: '2024',
    type: 'Clip vidéo'
  },
  'anyone': {
    title: 'ANYONE',
    number: '002',
    name: 'ANYONE',
    artists: ['T55A'],
    videoId: 'VJFCwBSMXd4',
    year: '2024',
    type: 'Clip vidéo'
  },
  'melo': {
    title: 'MELO',
    number: '003',
    name: 'MELO',
    artists: ['UN BANDIT'],
    videoId: 'nkntwx-ZAMI',
    year: '2024',
    type: 'Clip vidéo'
  }
};

let currentProject = '815';

// Initialize projects page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectsPage);
} else {
  initProjectsPage();
}

function initProjectsPage() {
  // Initialize dropdown functionality
  initDropdown();

  // Initialize navigation menu
  initNavigationMenu();

  // Initialize video controls
  initVideoControls();

  // Initialize project switching
  initProjectSwitching();

  // Initialize scroll effects
  initScrollEffects();

  // Initialize enhanced scroll animations
  initEnhancedScrollAnimations();

  // Initialize text animations
  initTextAnimations();

  // Initialize scroll-based dropdown update
  initScrollBasedDropdownUpdate();

  // Initialize CRIMSHOT section
  initCrimshotSection();

  // Initialize ANYONE section
  initAnyoneSection();

  // Initialize MELO section
  initMeloSection();
}

// Dropdown functionality
function initDropdown() {
  const dropdownBtn = document.getElementById('projectDropdown');
  const dropdownContent = document.getElementById('projectDropdownContent');

  if (!dropdownBtn || !dropdownContent) return;

  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
    dropdownBtn.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.classList.remove('show');
      dropdownBtn.classList.remove('active');
    }
  });

  // Handle project selection
  dropdownContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const projectId = e.target.getAttribute('data-project');
      if (projectId && projects[projectId]) {
        if (projectId === 'crimshot') {
          // Scroll to CRIMSHOT section
          scrollToSection('crimshot-section');
          updateDropdownActiveState(projectId);
        } else if (projectId === 'anyone') {
          // Scroll to ANYONE section
          scrollToSection('anyone-section');
          updateDropdownActiveState(projectId);
        } else if (projectId === 'melo') {
          // Scroll to MELO section
          scrollToSection('melo-section');
          updateDropdownActiveState(projectId);
        } else {
          switchProject(projectId);
        }
        dropdownContent.classList.remove('show');
        dropdownBtn.classList.remove('active');
      }
    }
  });
}

// Navigation menu functionality
function initNavigationMenu() {
  const menuBtn = document.getElementById('navMenuBtn');
  const navOverlay = document.getElementById('navOverlay');

  if (!menuBtn || !navOverlay) return;

  menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('show');
    document.body.style.overflow = navOverlay.classList.contains('show') ? 'hidden' : '';
  });

  // Close menu when clicking on overlay
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on links
  const navLinks = navOverlay.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });
}

// Video controls functionality
function initVideoControls() {
  const exploreBtn = document.getElementById('exploreBtn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      // Redirect to project detail page
      const projectId = currentProject;
      window.location.href = `/pages/project-detail.html?project=${projectId}`;
    });
  }
}

// Project switching functionality
function initProjectSwitching() {
  // Initialize with current project
  updateProjectDisplay();
  updateDropdownActiveState(currentProject);
}

function switchProject(projectId) {
  if (!projects[projectId]) return;

  currentProject = projectId;
  const project = projects[projectId];

  // Update video
  updateVideo(project.videoId);

  // Update display
  updateProjectDisplay();

  // Update dropdown button text
  const dropdownBtn = document.getElementById('projectDropdown');
  if (dropdownBtn) {
    dropdownBtn.textContent = project.title + ' ▼';
  }

  // Update active state in dropdown
  updateDropdownActiveState(projectId);
}

function updateDropdownActiveState(projectId) {
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-project') === projectId) {
      item.classList.add('active');
    }
  });
}

function updateVideo(videoId) {
  const iframe = document.getElementById('mainVideo');
  if (iframe) {
    const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`;
    iframe.src = newSrc;
  }
}

function updateProjectDisplay() {
  const project = projects[currentProject];
  if (!project) return;

  // Update year
  const yearEl = document.querySelector('.year');
  if (yearEl) yearEl.textContent = project.year;

  // Update video type
  const typeEl = document.querySelector('.video-type');
  if (typeEl) typeEl.textContent = project.type;

  // Update project number
  const numberEl = document.querySelector('.project-number');
  if (numberEl) numberEl.textContent = project.number;

  // Update project name
  const nameEl = document.querySelector('.project-name');
  if (nameEl) nameEl.textContent = project.name;

  // Update artists
  const artistsEl = document.querySelector('.project-artists');
  if (artistsEl) {
    artistsEl.innerHTML = project.artists
      .map((artist, index) => {
        const separator = index < project.artists.length - 1 ? '<span class="separator">—</span>' : '';
        return `<span class="artist">${artist}</span>${separator}`;
      })
      .join(' ');
  }

  // Add animation to updated elements
  const elementsToAnimate = [yearEl, typeEl, numberEl, nameEl, artistsEl].filter(Boolean);
  elementsToAnimate.forEach((el, index) => {
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
  });

  // Enhanced animation for all elements
  elementsToAnimate.forEach((el, index) => {
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    el.style.animation = `fadeInUpScroll 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s both`;
  });

  // Special animation for project title elements
  if (numberEl) {
    numberEl.style.opacity = '0';
    numberEl.style.transform = 'translateX(-50px)';
    setTimeout(() => {
      numberEl.style.opacity = '1';
      numberEl.style.transform = 'translateX(0)';
      numberEl.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 300);
  }

  if (nameEl) {
    nameEl.style.opacity = '0';
    nameEl.style.transform = 'translateX(50px)';
    setTimeout(() => {
      nameEl.style.opacity = '1';
      nameEl.style.transform = 'translateX(0)';
      nameEl.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 400);
  }

  // Enhanced animation for project title elements
  if (numberEl) {
    numberEl.style.animation = 'none';
    numberEl.offsetHeight; // Trigger reflow
    numberEl.style.animation = `slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both`;
  }

  if (nameEl) {
    nameEl.style.animation = 'none';
    nameEl.offsetHeight; // Trigger reflow
    nameEl.style.animation = `slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both`;
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open overlays
    const navOverlay = document.getElementById('navOverlay');
    const dropdownContent = document.getElementById('projectDropdownContent');

    if (navOverlay && navOverlay.classList.contains('show')) {
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (dropdownContent && dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
      document.getElementById('projectDropdown').classList.remove('active');
    }
  }

  if (e.key === 'ArrowRight') {
    // Next project
    const projectIds = Object.keys(projects);
    const currentIndex = projectIds.indexOf(currentProject);
    const nextIndex = (currentIndex + 1) % projectIds.length;
    switchProject(projectIds[nextIndex]);
  }

  if (e.key === 'ArrowLeft') {
    // Previous project
    const projectIds = Object.keys(projects);
    const currentIndex = projectIds.indexOf(currentProject);
    const prevIndex = currentIndex === 0 ? projectIds.length - 1 : currentIndex - 1;
    switchProject(projectIds[prevIndex]);
  }
});


// Initialize text animations with scroll effects
function initTextAnimations() {
  // Set initial state for all video info and controls
  const allVideoInfos = document.querySelectorAll('.video-info');
  const allVideoControls = document.querySelectorAll('.video-controls');

  // Add scroll-hidden class to all elements except the first one
  allVideoInfos.forEach((info, index) => {
    if (index > 0) { // Skip the first one (main video)
      info.classList.add('scroll-hidden');
    }
  });

  allVideoControls.forEach((controls, index) => {
    if (index > 0) { // Skip the first one (main video)
      controls.classList.add('scroll-hidden');
    }
  });

  // Add special animation for project titles
  const allProjectTitles = document.querySelectorAll('.project-title');
  allProjectTitles.forEach(title => {
    const number = title.querySelector('.project-number');
    const name = title.querySelector('.project-name');

    if (number) {
      number.style.opacity = '0';
      number.style.transform = 'translateX(-50px)';
    }

    if (name) {
      name.style.opacity = '0';
      name.style.transform = 'translateX(50px)';
    }
  });

  // Initialize scroll-based text animations
  initScrollTextAnimations();

  // Make sure the first video section is visible immediately
  const mainVideoInfo = document.querySelector('.video-main .video-info');
  const mainVideoControls = document.querySelector('.video-main .video-controls');
  const mainVideoOverlay = document.querySelector('.video-main .video-overlay');

  if (mainVideoInfo) {
    mainVideoInfo.classList.add('animate');
  }
  if (mainVideoControls) {
    mainVideoControls.classList.add('animate');
  }
  if (mainVideoOverlay) {
    mainVideoOverlay.classList.add('fade-in');
  }
}

// Initialize scroll-based text animations
function initScrollTextAnimations() {
  // Create observer for text elements
  const textObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  };

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;

        if (element.classList.contains('video-info')) {
          element.classList.remove('scroll-hidden');
          element.classList.add('animate');
          animateTextElementsEnhanced(element);

          // Also animate the overlay for this section
          const section = element.closest('.video-section, .video-main');
          if (section) {
            const overlay = section.querySelector('.video-overlay');
            if (overlay) {
              overlay.classList.add('fade-in');
            }
          }
        } else if (element.classList.contains('video-controls')) {
          element.classList.remove('scroll-hidden');
          element.classList.add('animate');
          animateControlElementsEnhanced(element);
        }

        textObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, textObserverOptions);

  // Observe all video info elements
  const allVideoInfos = document.querySelectorAll('.video-info');
  allVideoInfos.forEach(info => {
    textObserver.observe(info);
  });

  // Also observe control elements
  const allVideoControls = document.querySelectorAll('.video-controls');
  allVideoControls.forEach(controls => {
    textObserver.observe(controls);
  });
}

// Animate text elements with staggered delays
function animateTextElements(videoInfo) {
  // Get specific elements in order
  const year = videoInfo.querySelector('.year');
  const videoType = videoInfo.querySelector('.video-type');
  const projectTitle = videoInfo.querySelector('.project-title');
  const projectArtists = videoInfo.querySelector('.project-artists');

  // Animate elements in sequence
  const elements = [year, videoType, projectTitle, projectArtists].filter(Boolean);

  elements.forEach((element, index) => {
    if (element) {
      // Reset any existing animations
      element.style.animation = 'none';
      element.offsetHeight; // Trigger reflow

      // Apply staggered animation
      const delay = index * 0.2;
      element.style.animation = `fadeInUpScroll 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`;
    }
  });

  // Special handling for project title elements
  if (projectTitle) {
    const number = projectTitle.querySelector('.project-number');
    const name = projectTitle.querySelector('.project-name');

    if (number) {
      number.style.animation = 'none';
      number.offsetHeight; // Trigger reflow
      number.style.animation = `slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both`;
    }

    if (name) {
      name.style.animation = 'none';
      name.offsetHeight; // Trigger reflow
      name.style.animation = `slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s both`;
    }
  }
}

// Enhanced text animation with better timing
function animateTextElementsEnhanced(videoInfo) {
  // Get specific elements in order
  const year = videoInfo.querySelector('.year');
  const videoType = videoInfo.querySelector('.video-type');
  const projectTitle = videoInfo.querySelector('.project-title');
  const projectArtists = videoInfo.querySelector('.project-artists');

  // Animate elements in sequence with better timing
  const elements = [year, videoType, projectTitle, projectArtists].filter(Boolean);

  elements.forEach((element, index) => {
    if (element) {
      // Reset any existing animations
      element.style.animation = 'none';
      element.offsetHeight; // Trigger reflow

      // Apply staggered animation with faster timing
      const delay = index * 0.08;
      element.style.animation = `fadeInUpScroll 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`;
    }
  });

  // Special handling for project title elements with better timing
  if (projectTitle) {
    const number = projectTitle.querySelector('.project-number');
    const name = projectTitle.querySelector('.project-name');

    if (number) {
      number.style.animation = 'none';
      number.offsetHeight; // Trigger reflow
      number.style.animation = `slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both`;
    }

    if (name) {
      name.style.animation = 'none';
      name.offsetHeight; // Trigger reflow
      name.style.animation = `slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s both`;
    }
  }
}

// Animate control elements with staggered delays
function animateControlElements(videoControls) {
  const exploreBtn = videoControls.querySelector('.explore-btn');

  if (exploreBtn) {
    // Reset any existing animations
    exploreBtn.style.animation = 'none';
    exploreBtn.offsetHeight; // Trigger reflow

    // Apply animation with delay
    const delay = 0.8; // Start after text elements
    exploreBtn.style.animation = `fadeInUpScroll 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`;
  }
}

// Enhanced control animation with better timing
function animateControlElementsEnhanced(videoControls) {
  const exploreBtn = videoControls.querySelector('.explore-btn');

  if (exploreBtn) {
    // Reset any existing animations
    exploreBtn.style.animation = 'none';
    exploreBtn.offsetHeight; // Trigger reflow

    // Apply animation with faster timing
    const delay = 0.3; // Start after text elements
    exploreBtn.style.animation = `fadeInUpScroll 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`;
  }
}

// Animate overlay elements with fade-in effect
function animateOverlayElements(videoOverlay) {
  // Add a subtle fade-in effect to the overlay
  videoOverlay.style.opacity = '0';
  videoOverlay.style.transition = 'opacity 0.8s ease-out';

  setTimeout(() => {
    videoOverlay.style.opacity = '1';
  }, 100);
}

// Enhanced overlay animation with faster timing
function animateOverlayElementsEnhanced(videoOverlay) {
  // Add a subtle fade-in effect to the overlay with faster timing
  videoOverlay.style.opacity = '0';
  videoOverlay.style.transition = 'opacity 0.4s ease-out';

  setTimeout(() => {
    videoOverlay.style.opacity = '1';
  }, 25);
}

// Enhanced scroll-based animation system
function initEnhancedScrollAnimations() {
  // Create a more sophisticated intersection observer
  const observerOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const section = entry.target;
      const videoInfo = section.querySelector('.video-info');
      const videoControls = section.querySelector('.video-controls');
      const videoOverlay = section.querySelector('.video-overlay');

      // Calculate animation progress based on intersection ratio
      const progress = entry.intersectionRatio;

      if (progress > 0.2) {
        section.classList.add('animate');
        section.classList.add('in-view');

        // Animate elements based on progress
        if (videoInfo) {
          videoInfo.classList.remove('scroll-hidden');
          videoInfo.classList.add('animate');
          animateTextElementsEnhanced(videoInfo);
        }
        if (videoControls) {
          videoControls.classList.remove('scroll-hidden');
          videoControls.classList.add('animate');
          animateControlElementsEnhanced(videoControls);
        }
        if (videoOverlay) {
          videoOverlay.classList.add('fade-in');
          animateOverlayElementsEnhanced(videoOverlay);
        }

        // Also animate the overlay for this section
        const overlay = entry.target.querySelector('.video-overlay');
        if (overlay) {
          overlay.classList.add('fade-in');
        }
      }
    });
  }, observerOptions);

  // Observe all video sections
  const allVideoSections = document.querySelectorAll('.video-main, .video-section');
  allVideoSections.forEach(section => {
    observer.observe(section);
  });
}

// Scroll effects for video sections
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('iframe');
      const videoInfo = entry.target.querySelector('.video-info');
      const videoControls = entry.target.querySelector('.video-controls');
      const videoOverlay = entry.target.querySelector('.video-overlay');

      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        entry.target.classList.add('in-view');

        // Animate text elements
        if (videoInfo) {
          videoInfo.classList.remove('scroll-hidden');
          videoInfo.classList.add('animate');
          animateTextElementsEnhanced(videoInfo);
        }
        if (videoControls) {
          videoControls.classList.remove('scroll-hidden');
          videoControls.classList.add('animate');
          animateControlElementsEnhanced(videoControls);
        }
        if (videoOverlay) {
          videoOverlay.classList.add('fade-in');
          animateOverlayElementsEnhanced(videoOverlay);
        }

        // Also animate the overlay for this section
        const overlay = entry.target.querySelector('.video-overlay');
        if (overlay) {
          overlay.classList.add('fade-in');
        }

        // Auto-play video when in view
        if (video) {
          playVideo(video);
        }
      } else {
        entry.target.classList.remove('in-view');

        // Pause video when out of view
        if (video) {
          pauseVideo(video);
        }
      }
    });
  }, observerOptions);

  // Observe video sections
  const videoSections = document.querySelectorAll('.video-section');
  videoSections.forEach(section => {
    observer.observe(section);
  });

  // Also observe the main video section
  const mainVideoSection = document.querySelector('.video-main');
  if (mainVideoSection) {
    observer.observe(mainVideoSection);
  }

  // Initialize parallax effect
  initParallaxEffect();
}

// Function to play video
function playVideo(iframe) {
  if (iframe && iframe.contentWindow) {
    try {
      // Send play command to YouTube iframe
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } catch (error) {
      console.log('Could not play video:', error);
    }
  }
}


// Function to pause video
function pauseVideo(iframe) {
  if (iframe && iframe.contentWindow) {
    try {
      // Send pause command to YouTube iframe
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } catch (error) {
      console.log('Could not pause video:', error);
    }
  }
}

// Parallax effect for video backgrounds and elements
function initParallaxEffect() {
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Main video parallax (only when in view)
    const mainVideo = document.querySelector('.video-main iframe');
    if (mainVideo && scrolled < windowHeight) {
      const mainVideoSpeed = 0.2;
      const mainVideoY = scrolled * mainVideoSpeed;
      mainVideo.style.transform = `translate(-50%, calc(-50% + ${mainVideoY}px))`;
    }

    // Main video overlay parallax (only when in view)
    const mainOverlay = document.querySelector('.video-main .video-overlay');
    if (mainOverlay && scrolled < windowHeight) {
      const overlaySpeed = 0.05;
      const overlayY = scrolled * overlaySpeed;
      mainOverlay.style.transform = `translateY(${overlayY}px)`;
    }

    // Main video info parallax (only when in view)
    const mainVideoInfo = document.querySelector('.video-main .video-info');
    if (mainVideoInfo && scrolled < windowHeight) {
      const infoSpeed = 0.1;
      const infoY = scrolled * infoSpeed;
      mainVideoInfo.style.transform = `translateY(calc(-50% + ${infoY}px))`;
    }

    // Main video controls parallax (only when in view)
    const mainControls = document.querySelector('.video-main .video-controls');
    if (mainControls && scrolled < windowHeight) {
      const controlsSpeed = 0.15;
      const controlsY = scrolled * controlsSpeed;
      mainControls.style.transform = `translateY(${controlsY}px)`;
    }

    // CRIMSHOT video parallax (only when in view)
    const crimshotVideo = document.querySelector('#crimshot-section iframe');
    if (crimshotVideo && scrolled >= windowHeight) {
      const crimshotVideoSpeed = 0.3;
      const crimshotVideoY = (scrolled - windowHeight) * crimshotVideoSpeed;
      crimshotVideo.style.transform = `translate(-50%, calc(-50% + ${crimshotVideoY}px))`;
    }

    // CRIMSHOT overlay parallax (only when in view)
    const crimshotOverlay = document.querySelector('#crimshot-section .video-overlay');
    if (crimshotOverlay && scrolled >= windowHeight) {
      const crimshotOverlaySpeed = 0.1;
      const crimshotOverlayY = (scrolled - windowHeight) * crimshotOverlaySpeed;
      crimshotOverlay.style.transform = `translateY(${crimshotOverlayY}px)`;
    }

    // CRIMSHOT info parallax (only when in view)
    const crimshotInfo = document.querySelector('#crimshot-section .video-info');
    if (crimshotInfo && scrolled >= windowHeight) {
      const crimshotInfoSpeed = 0.15;
      const crimshotInfoY = (scrolled - windowHeight) * crimshotInfoSpeed;
      crimshotInfo.style.transform = `translateY(calc(-50% + ${crimshotInfoY}px))`;
    }

    // CRIMSHOT controls parallax (only when in view)
    const crimshotControls = document.querySelector('#crimshot-section .video-controls');
    if (crimshotControls && scrolled >= windowHeight) {
      const crimshotControlsSpeed = 0.2;
      const crimshotControlsY = (scrolled - windowHeight) * crimshotControlsSpeed;
      crimshotControls.style.transform = `translateY(${crimshotControlsY}px)`;
    }

    // ANYONE video parallax (only when in view)
    const anyoneVideo = document.querySelector('#anyone-section iframe');
    if (anyoneVideo && scrolled >= windowHeight * 2) {
      const anyoneVideoSpeed = 0.3;
      const anyoneVideoY = (scrolled - windowHeight * 2) * anyoneVideoSpeed;
      anyoneVideo.style.transform = `translate(-50%, calc(-50% + ${anyoneVideoY}px))`;
    }

    // ANYONE overlay parallax (only when in view)
    const anyoneOverlay = document.querySelector('#anyone-section .video-overlay');
    if (anyoneOverlay && scrolled >= windowHeight * 2) {
      const anyoneOverlaySpeed = 0.1;
      const anyoneOverlayY = (scrolled - windowHeight * 2) * anyoneOverlaySpeed;
      anyoneOverlay.style.transform = `translateY(${anyoneOverlayY}px)`;
    }

    // ANYONE info parallax (only when in view)
    const anyoneInfo = document.querySelector('#anyone-section .video-info');
    if (anyoneInfo && scrolled >= windowHeight * 2) {
      const anyoneInfoSpeed = 0.15;
      const anyoneInfoY = (scrolled - windowHeight * 2) * anyoneInfoSpeed;
      anyoneInfo.style.transform = `translateY(calc(-50% + ${anyoneInfoY}px))`;
    }

    // ANYONE controls parallax (only when in view)
    const anyoneControls = document.querySelector('#anyone-section .video-controls');
    if (anyoneControls && scrolled >= windowHeight * 2) {
      const anyoneControlsSpeed = 0.2;
      const anyoneControlsY = (scrolled - windowHeight * 2) * anyoneControlsSpeed;
      anyoneControls.style.transform = `translateY(${anyoneControlsY}px)`;
    }

    // MELO video parallax (only when in view)
    const meloVideo = document.querySelector('#melo-section iframe');
    if (meloVideo && scrolled >= windowHeight * 3) {
      const meloVideoSpeed = 0.3;
      const meloVideoY = (scrolled - windowHeight * 3) * meloVideoSpeed;
      meloVideo.style.transform = `translate(-50%, calc(-50% + ${meloVideoY}px))`;
    }

    // MELO overlay parallax (only when in view)
    const meloOverlay = document.querySelector('#melo-section .video-overlay');
    if (meloOverlay && scrolled >= windowHeight * 3) {
      const meloOverlaySpeed = 0.1;
      const meloOverlayY = (scrolled - windowHeight * 3) * meloOverlaySpeed;
      meloOverlay.style.transform = `translateY(${meloOverlayY}px)`;
    }

    // MELO info parallax (only when in view)
    const meloInfo = document.querySelector('#melo-section .video-info');
    if (meloInfo && scrolled >= windowHeight * 3) {
      const meloInfoSpeed = 0.15;
      const meloInfoY = (scrolled - windowHeight * 3) * meloInfoSpeed;
      meloInfo.style.transform = `translateY(calc(-50% + ${meloInfoY}px))`;
    }

    // MELO controls parallax (only when in view)
    const meloControls = document.querySelector('#melo-section .video-controls');
    if (meloControls && scrolled >= windowHeight * 3) {
      const meloControlsSpeed = 0.2;
      const meloControlsY = (scrolled - windowHeight * 3) * meloControlsSpeed;
      meloControls.style.transform = `translateY(${meloControlsY}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Throttled scroll event
  let lastScrollTime = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime >= 16) { // ~60fps
      requestTick();
      lastScrollTime = now;
    }
  });
}

// Mouse parallax effect for enhanced interactivity (simplified)
function initMouseParallax() {
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  function updateMouseParallax() {
    // Smooth mouse movement
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Only apply subtle mouse parallax to overlays
    const overlays = document.querySelectorAll('.video-overlay');
    overlays.forEach(overlay => {
      const moveX = (targetX - window.innerWidth / 2) * 0.005;
      const moveY = (targetY - window.innerHeight / 2) * 0.005;
      const currentTransform = overlay.style.transform;
      const baseTransform = currentTransform.replace(/translate\([^)]*\)/, '');
      overlay.style.transform = `${baseTransform} translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(updateMouseParallax);
  }

  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Start the animation loop
  updateMouseParallax();
}

// CRIMSHOT section functionality
function initCrimshotSection() {
  const crimshotExploreBtn = document.getElementById('crimshotExploreBtn');

  if (crimshotExploreBtn) {
    crimshotExploreBtn.addEventListener('click', () => {
      // Redirect to CRIMSHOT project detail page
      window.location.href = '/pages/project-detail.html?project=crimshot';
    });
  }
}

// ANYONE section functionality
function initAnyoneSection() {
  const anyoneExploreBtn = document.getElementById('anyoneExploreBtn');

  if (anyoneExploreBtn) {
    anyoneExploreBtn.addEventListener('click', () => {
      // Redirect to ANYONE project detail page
      window.location.href = '/pages/project-detail.html?project=anyone';
    });
  }
}

// MELO section functionality
function initMeloSection() {
  const meloExploreBtn = document.getElementById('meloExploreBtn');

  if (meloExploreBtn) {
    meloExploreBtn.addEventListener('click', () => {
      // Redirect to MELO project detail page
      window.location.href = '/pages/project-detail.html?project=melo';
    });
  }
}

// Smooth scrolling between video sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Update dropdown to include CRIMSHOT
function updateDropdownForCrimshot() {
  const dropdownContent = document.getElementById('projectDropdownContent');
  if (dropdownContent) {
    // Add CRIMSHOT to dropdown if not already present
    const existingCrimshot = dropdownContent.querySelector('[data-project="crimshot"]');
    if (!existingCrimshot) {
      const crimshotItem = document.createElement('a');
      crimshotItem.href = '#';
      crimshotItem.setAttribute('data-project', 'crimshot');
      crimshotItem.className = 'project-item';
      crimshotItem.innerHTML = `
        <div class="project-thumbnail">
          <img src="/assets/images/0002.png" alt="CRIMSHOT thumbnail">
        </div>
        <span class="project-title">CRIMSHOT</span>
      `;

      // Insert after 815 BINKS
      const firstItem = dropdownContent.querySelector('.project-item');
      if (firstItem) {
        firstItem.insertAdjacentElement('afterend', crimshotItem);
      }
    }
  }
}

// Initialize scroll-based dropdown update
function initScrollBasedDropdownUpdate() {
  const sections = [
    { id: '815', element: document.querySelector('.video-main'), name: '815 BINKS' },
    { id: 'crimshot', element: document.getElementById('crimshot-section'), name: 'CRIMSHOT' },
    { id: 'anyone', element: document.getElementById('anyone-section'), name: 'ANYONE' },
    { id: 'melo', element: document.getElementById('melo-section'), name: 'MELO' }
  ];

  const dropdownBtn = document.getElementById('projectDropdown');

  if (!dropdownBtn) return;

  const observerOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for better detection
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    // Find the section with the highest intersection ratio
    let mostVisibleSection = null;
    let highestRatio = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
        highestRatio = entry.intersectionRatio;
        mostVisibleSection = sections.find(s => s.element === entry.target);
      }
    });

    if (mostVisibleSection) {
      // Update dropdown button text
      dropdownBtn.innerHTML = `${mostVisibleSection.name} <span class="dropdown-arrow">▼</span>`;

      // Update active state in dropdown
      updateDropdownActiveState(mostVisibleSection.id);

      // Update current project
      currentProject = mostVisibleSection.id;
    }
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    if (section.element) {
      observer.observe(section.element);
    }
  });
}

// Smooth scrolling for any internal links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});