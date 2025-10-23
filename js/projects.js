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
    artists: ['ANYONE'],
    videoId: 'VJFCwBSMXd4',
    year: '2024',
    type: 'Clip vidéo'
  },
  'melo': {
    title: 'MELO',
    number: '003',
    name: 'MELO',
    artists: ['MELO'],
    videoId: 'nkntwx-ZAMI',
    year: '2024',
    type: 'Clip vidéo'
  },
  'anyone': {
    title: 'ANYONE',
    number: '003',
    name: 'ANYONE',
    artists: ['ANYONE'],
    videoId: '18006YbHjKA', // Remplacer par l'ID réel
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

  // Initialize CRIMSHOT section
  initCrimshotSection();

  // Initialize ANYONE section
  initAnyoneSection();

  // Initialize MELO section
  initMeloSection();
  
  // Add mobile play buttons if on mobile
  addMobilePlayButtons();
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


// Scroll effects for video sections
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('iframe');

      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        entry.target.classList.add('in-view');

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

// Check if device is mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add mobile play buttons
function addMobilePlayButtons() {
  if (isMobileDevice()) {
    const videoSections = document.querySelectorAll('.video-section, .video-main');
    
    videoSections.forEach(section => {
      const iframe = section.querySelector('iframe');
      const overlay = section.querySelector('.video-overlay');
      
      if (iframe && overlay) {
        // Add mobile play button
        const mobilePlayBtn = document.createElement('button');
        mobilePlayBtn.className = 'mobile-play-btn';
        mobilePlayBtn.innerHTML = `
          <span class="play-icon">▶</span>
          <span class="play-text">TAP TO PLAY</span>
        `;
        
        // Style the button
        mobilePlayBtn.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #fff;
          color: #fff;
          padding: 15px 30px;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          z-index: 10;
          transition: all 0.3s ease;
        `;
        
        // Add hover effect
        mobilePlayBtn.addEventListener('mouseenter', () => {
          mobilePlayBtn.style.background = '#fff';
          mobilePlayBtn.style.color = '#000';
        });
        
        mobilePlayBtn.addEventListener('mouseleave', () => {
          mobilePlayBtn.style.background = 'rgba(0, 0, 0, 0.8)';
          mobilePlayBtn.style.color = '#fff';
        });
        
        // Play video on click
        mobilePlayBtn.addEventListener('click', () => {
          playVideo(iframe);
          mobilePlayBtn.style.display = 'none';
        });
        
        overlay.appendChild(mobilePlayBtn);
      }
    });
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