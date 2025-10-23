// BINKSFILMS — Project Detail Page JavaScript

// Configuration des projets
const projects = {
  '815': {
    title: '815 BLINKS',
    videoId: '18006YbHjKA',
    coverImage: '/assets/images/watch-cover1.png',
    aboutText: 'Un clip vidéo immersif qui capture l\'essence de l\'art urbain et de la culture contemporaine. MIKADO X RICO nous emmènent dans un voyage visuel où chaque image raconte une histoire, chaque mouvement exprime une émotion. Cette collaboration artistique explore les thèmes de l\'identité, de la résilience et de la beauté cachée dans l\'ombre des rues.',
    galleryImages: [
      '/assets/images/815-1.png',
      '/assets/images/815-2.png',
      '/assets/images/815-3.png',
      '/assets/images/815-4.png',
      '/assets/images/815-5.png',
      '/assets/images/815-6.png'
    ]
  },
  'crimshot': {
    title: 'CRIMSHOT',
    videoId: '_4rAF1_ZlJE',
    coverImage: '/assets/images/0002.png', // Fallback image
    aboutText: 'CRIMSHOT est une exploration visuelle audacieuse qui plonge dans les profondeurs de l\'expression artistique contemporaine. Ce projet capture l\'intensité et la raw energy de la création, où chaque frame est une déclaration, chaque séquence une révélation. Une œuvre qui défie les conventions et redéfinit les limites de l\'art visuel.',
    galleryImages: [
      '/assets/images/0007.png',
      '/assets/images/0008.png',
      '/assets/images/0009.png',
      '/assets/images/0010.png',
      '/assets/images/0011.png',
      '/assets/images/0012.png'
    ]
  }
};

let currentProject = '815';
let isVideoPlaying = false;

// Initialize project detail page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectDetailPage);
} else {
  initProjectDetailPage();
}

function initProjectDetailPage() {
  // Get project from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project') || '815';

  // Set current project
  currentProject = projectId;

  // Initialize project data
  initProjectData();

  // Initialize video functionality
  initVideoFunctionality();

  // Initialize gallery
  initGallery();

  // Initialize smooth scrolling
  initSmoothScrolling();
}

function initProjectData() {
  const project = projects[currentProject];
  if (!project) return;

  // Update page title
  document.title = `BINKSFILMS — ${project.title}`;

  // Update project title
  const projectTitle = document.getElementById('projectTitle');
  if (projectTitle) {
    projectTitle.textContent = project.title;
  }

  // Update about text
  const aboutText = document.getElementById('aboutText');
  if (aboutText) {
    aboutText.textContent = project.aboutText;
  }

  // Update hero image
  const heroImage = document.getElementById('heroImage');
  if (heroImage) {
    heroImage.src = project.coverImage || project.galleryImages[0];
    heroImage.alt = `${project.title} Hero Image`;
  }

  // Update video thumbnail
  const videoThumbnailImg = document.getElementById('videoThumbnailImg');
  if (videoThumbnailImg) {
    videoThumbnailImg.src = project.coverImage || project.galleryImages[0];
    videoThumbnailImg.alt = `${project.title} Video Thumbnail`;
  }
}

function initVideoFunctionality() {
  const playBtn = document.getElementById('playBtn');
  const videoThumbnail = document.getElementById('videoThumbnail');
  const videoContainer = document.getElementById('videoContainer');
  const projectVideo = document.getElementById('projectVideo');
  const closeVideo = document.getElementById('closeVideo');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playVideo();
    });
  }

  if (closeVideo) {
    closeVideo.addEventListener('click', () => {
      closeVideoPlayer();
    });
  }

  // Close video when clicking outside
  if (videoContainer) {
    videoContainer.addEventListener('click', (e) => {
      if (e.target === videoContainer) {
        closeVideoPlayer();
      }
    });
  }
}

function playVideo() {
  const project = projects[currentProject];
  if (!project) return;

  const videoThumbnail = document.getElementById('videoThumbnail');
  const videoContainer = document.getElementById('videoContainer');
  const projectVideo = document.getElementById('projectVideo');

  if (videoThumbnail && videoContainer && projectVideo) {
    // Hide thumbnail
    videoThumbnail.style.display = 'none';

    // Show video container
    videoContainer.style.display = 'flex';

    // Set video source
    const videoSrc = `https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=0&playsinline=1&controls=1&showinfo=0&modestbranding=1&rel=0`;
    projectVideo.src = videoSrc;

    isVideoPlaying = true;
  }
}

function closeVideoPlayer() {
  const videoThumbnail = document.getElementById('videoThumbnail');
  const videoContainer = document.getElementById('videoContainer');
  const projectVideo = document.getElementById('projectVideo');

  if (videoThumbnail && videoContainer && projectVideo) {
    // Show thumbnail
    videoThumbnail.style.display = 'block';

    // Hide video container
    videoContainer.style.display = 'none';

    // Stop video
    projectVideo.src = '';

    isVideoPlaying = false;
  }
}

function initGallery() {
  const project = projects[currentProject];
  if (!project) return;

  const galleryRow1 = document.getElementById('galleryScrollRow1');
  const galleryRow2 = document.getElementById('galleryScrollRow2');

  if (!galleryRow1 || !galleryRow2) return;

  // Clear existing gallery
  galleryRow1.innerHTML = '';
  galleryRow2.innerHTML = '';

  // Split images between two rows
  const images = project.galleryImages;
  const midPoint = Math.ceil(images.length / 2);
  
  // First row - first half of images
  images.slice(0, midPoint).forEach((imageSrc, index) => {
    const galleryItem = createGalleryItem(imageSrc, index, project.title);
    galleryRow1.appendChild(galleryItem);
  });
  
  // Second row - second half of images
  images.slice(midPoint).forEach((imageSrc, index) => {
    const galleryItem = createGalleryItem(imageSrc, index + midPoint, project.title);
    galleryRow2.appendChild(galleryItem);
  });

  // Initialize scroll effects
  initGalleryScrollEffects();
}

// Create gallery item element
function createGalleryItem(imageSrc, index, title) {
  const galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-item';
  galleryItem.innerHTML = `<img src="${imageSrc}" alt="${title} Gallery Image ${index + 1}">`;

  // Add click handler for gallery items
  galleryItem.addEventListener('click', () => {
    openImageModal(imageSrc, title);
  });

  return galleryItem;
}

// Gallery scroll effects like Siena Film Foundation
function initGalleryScrollEffects() {
  const galleryRow1 = document.getElementById('galleryScrollRow1');
  const galleryRow2 = document.getElementById('galleryScrollRow2');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!galleryRow1 || !galleryRow2 || galleryItems.length === 0) return;

  // Intersection Observer for gallery items
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe each gallery item
  galleryItems.forEach(item => {
    observer.observe(item);
  });
}


function openImageModal(imageSrc, title) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">×</button>
        <img src="${imageSrc}" alt="${title}">
      </div>
    </div>
  `;

  // Add modal styles
  const style = document.createElement('style');
  style.textContent = `
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease;
    }
    
    .modal-overlay {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }
    
    .modal-content {
      position: relative;
    }
    
    .modal-content img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
    
    .modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .modal-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(modal);

  // Close modal handlers
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');

  closeBtn.addEventListener('click', () => {
    closeImageModal(modal);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeImageModal(modal);
    }
  });

  // Close on escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      closeImageModal(modal);
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
}

function closeImageModal(modal) {
  modal.style.animation = 'fadeOut 0.3s ease';
  setTimeout(() => {
    modal.remove();
  }, 300);
}

function initSmoothScrolling() {
  // Smooth scroll for internal links
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
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isVideoPlaying) {
    closeVideoPlayer();
  }
});

// Handle browser back button
window.addEventListener('popstate', () => {
  if (isVideoPlaying) {
    closeVideoPlayer();
  }
});
