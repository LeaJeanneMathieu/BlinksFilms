// BINKSFILMS — Projects Page JavaScript
// Fonctionnalités pour la page projets avec lecteur vidéo YouTube

// Sample clips data
const clips = [
  { title: 'MIKADO RICO', artist: 'PERPRE', year: '2024' },
  { title: 'SHINO', artist: 'BIONA', year: '2024' },
  { title: 'KHRIS K', artist: 'NADA', year: '2024' },
  { title: 'IGOR', artist: 'PRIMAITATALLT', year: '2024' },
  { title: 'LEROY GUSTO', artist: 'PECATE', year: '2024' },
  { title: 'ELYON', artist: 'BITE', year: '2024' }
];

// Initialize projects page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectsPage);
} else {
  initProjectsPage();
}

function initProjectsPage() {
  // Initialize navigation menu
  initNavigationMenu();

  // Initialize video controls
  initVideoControls();

  // Initialize category menu
  initCategoryMenu();

  // Initialize clips grid
  initClipsGrid();

  // Initialize search functionality
  initSearch();
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

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    filterClips(searchTerm);
  });
}

// Filter clips based on search term
function filterClips(searchTerm) {
  const clipItems = document.querySelectorAll('.clip-item');
  
  if (searchTerm === '') {
    clipItems.forEach(item => {
      item.style.display = '';
    });
    return;
  }

  clipItems.forEach(item => {
    const title = item.querySelector('.clip-title')?.textContent.toLowerCase() || '';
    const artist = item.querySelector('.clip-artist')?.textContent.toLowerCase() || '';
    const year = item.querySelector('.clip-year')?.textContent.toLowerCase() || '';
    
    const matches = title.includes(searchTerm) || 
                   artist.includes(searchTerm) || 
                   year.includes(searchTerm);
    
    item.style.display = matches ? '' : 'none';
  });
}

// Video controls functionality
function initVideoControls() {
  const exploreBtn = document.getElementById('exploreBtn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      // Scroll to clips section
      const clipsSection = document.querySelector('.clips-section');
      if (clipsSection) {
        clipsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Category menu functionality
function initCategoryMenu() {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all items
      categoryItems.forEach(cat => cat.classList.remove('active'));

      // Add active class to clicked item
      item.classList.add('active');

      // Handle category switching (for future functionality)
      const category = item.getAttribute('data-category');
      console.log('Category selected:', category);
    });
  });
}

// Initialize clips grid
async function initClipsGrid() {
  const clipsGrid = document.getElementById('clipsGrid');

  if (!clipsGrid) return;

  let clipsToDisplay = [];

  // First, try to load from localStorage (admin-managed clips)
  const stored = localStorage.getItem('binsfilms_clips');
  if (stored) {
    try {
      clipsToDisplay = JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored clips:', error);
    }
  }

  // If no clips in localStorage, load from JSON file
  if (clipsToDisplay.length === 0) {
    try {
      const response = await fetch('/data/clips.json');
      const data = await response.json();
      clipsToDisplay = data.clips || clips;
    } catch (error) {
      console.error('Error loading clips from JSON:', error);
      // Fallback to default clips
      clipsToDisplay = clips;
    }
  }

  // Generate clip items
  clipsToDisplay.forEach((clip, index) => {
    const clipItem = document.createElement('a');
    clipItem.href = `/pages/project-detail.html?clip=${index}`;
    clipItem.className = 'clip-item';

    // Generate YouTube thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${clip.youtubeId || '18006YbHjKA'}/maxresdefault.jpg`;

    clipItem.innerHTML = `
      <div class="clip-thumbnail">
        <img src="${clip.thumbnail || thumbnailUrl}" alt="${clip.title}" onerror="this.src='${thumbnailUrl}'">
      </div>
      <div class="clip-title">${clip.title}</div>
      <div class="clip-artist">${clip.artist}</div>
      <div class="clip-year">${clip.year}</div>
    `;

    clipsGrid.appendChild(clipItem);
  });

  // Save clips to global variable for project-detail page
  window.clipsData = clipsToDisplay;
}
