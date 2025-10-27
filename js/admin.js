// BINKSFILMS — Admin Page JavaScript
// Interface d'administration pour gérer les clips

// Initialize admin page when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPage);
} else {
    initAdminPage();
}

function initAdminPage() {
    // Load existing clips from localStorage or JSON
    loadClips();

    // Setup form submission
    const addClipForm = document.getElementById('addClipForm');
    if (addClipForm) {
        addClipForm.addEventListener('submit', handleAddClip);
    }

    // Setup action buttons
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportClips);
    }

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllClips);
    }
}

// Load clips from localStorage or fetch from JSON
async function loadClips() {
    let clips = [];

    // First, try to load from localStorage
    const stored = localStorage.getItem('binsfilms_clips');
    if (stored) {
        clips = JSON.parse(stored);
    } else {
        // Otherwise, load from JSON file
        try {
            const response = await fetch('/data/clips.json');
            const data = await response.json();
            clips = data.clips || [];
            // Save to localStorage for future use
            localStorage.setItem('binsfilms_clips', JSON.stringify(clips));
        } catch (error) {
            console.error('Error loading clips:', error);
        }
    }

    renderClips(clips);
    updateClipsCount(clips.length);
}

// Save clips to localStorage
function saveClips(clips) {
    localStorage.setItem('binsfilms_clips', JSON.stringify(clips));
    renderClips(clips);
    updateClipsCount(clips.length);
}

// Handle form submission
async function handleAddClip(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newClip = {
        title: formData.get('title').trim(),
        artist: formData.get('artist').trim(),
        year: formData.get('year').trim(),
        youtubeId: formData.get('youtubeId').trim(),
        thumbnail: formData.get('thumbnail').trim() || `https://img.youtube.com/vi/${formData.get('youtubeId').trim()}/maxresdefault.jpg`
    };

    // Load existing clips
    let clips = [];
    const stored = localStorage.getItem('binsfilms_clips');
    if (stored) {
        clips = JSON.parse(stored);
    }

    // Add new clip
    clips.push(newClip);

    // Save and render
    saveClips(clips);
    showMessage('Clip ajouté avec succès !', 'success');

    // Reset form
    e.target.reset();
}

// Render clips list
function renderClips(clips) {
    const clipsList = document.getElementById('clipsList');
    if (!clipsList) return;

    if (clips.length === 0) {
        clipsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-text">Aucun clip pour le moment. Ajoutez votre premier clip ci-dessus.</div>
      </div>
    `;
        return;
    }

    clipsList.innerHTML = clips.map((clip, index) => `
    <div class="clip-item-admin">
      ${clip.thumbnail ? `<img src="${clip.thumbnail}" alt="${clip.title}" class="clip-thumbnail-admin" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${clip.youtubeId}/hqdefault.jpg'">` : ''}
      <div class="clip-info">
        <div class="clip-info-title">${clip.title}</div>
        <div class="clip-info-artist">${clip.artist} • ${clip.year}</div>
        <div class="clip-info-details">
          YouTube ID: ${clip.youtubeId}
        </div>
      </div>
      <div class="clip-actions">
        <button class="btn btn-edit" onclick="editClip(${index})">Modifier</button>
        <button class="btn btn-delete" onclick="deleteClip(${index})">Supprimer</button>
      </div>
    </div>
    <div id="edit-form-${index}" class="edit-form">
      <form onsubmit="saveEdit(event, ${index})">
        <div class="form-row">
          <div class="form-group">
            <label>Titre</label>
            <input type="text" id="edit-title-${index}" value="${clip.title}" required>
          </div>
          <div class="form-group">
            <label>Artiste</label>
            <input type="text" id="edit-artist-${index}" value="${clip.artist}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Année</label>
            <input type="text" id="edit-year-${index}" value="${clip.year}" required>
          </div>
          <div class="form-group">
            <label>ID YouTube</label>
            <input type="text" id="edit-youtubeId-${index}" value="${clip.youtubeId}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Miniature</label>
          <input type="text" id="edit-thumbnail-${index}" value="${clip.thumbnail}">
        </div>
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit(${index})">Annuler</button>
      </form>
    </div>
  `).join('');
}

// Update clips count
function updateClipsCount(count) {
    const countElement = document.getElementById('clipsCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Delete clip
function deleteClip(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce clip ?')) {
        const stored = localStorage.getItem('binsfilms_clips');
        if (stored) {
            let clips = JSON.parse(stored);
            clips.splice(index, 1);
            saveClips(clips);
            showMessage('Clip supprimé avec succès !', 'success');
        }
    }
}

// Edit clip
function editClip(index) {
    // Hide all other edit forms
    document.querySelectorAll('.edit-form').forEach(form => {
        form.classList.remove('active');
    });

    // Show this edit form
    const editForm = document.getElementById(`edit-form-${index}`);
    if (editForm) {
        editForm.classList.add('active');

        // Scroll to form
        editForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Save edit
function saveEdit(event, index) {
    event.preventDefault();

    const stored = localStorage.getItem('binsfilms_clips');
    if (!stored) return;

    let clips = JSON.parse(stored);

    clips[index] = {
        title: document.getElementById(`edit-title-${index}`).value.trim(),
        artist: document.getElementById(`edit-artist-${index}`).value.trim(),
        year: document.getElementById(`edit-year-${index}`).value.trim(),
        youtubeId: document.getElementById(`edit-youtubeId-${index}`).value.trim(),
        thumbnail: document.getElementById(`edit-thumbnail-${index}`).value.trim() || `https://img.youtube.com/vi/${document.getElementById(`edit-youtubeId-${index}`).value.trim()}/maxresdefault.jpg`
    };

    saveClips(clips);

    // Hide edit form
    const editForm = document.getElementById(`edit-form-${index}`);
    if (editForm) {
        editForm.classList.remove('active');
    }

    showMessage('Clip modifié avec succès !', 'success');
}

// Cancel edit
function cancelEdit(index) {
    const editForm = document.getElementById(`edit-form-${index}`);
    if (editForm) {
        editForm.classList.remove('active');
    }
}

// Export clips to JSON
function exportClips() {
    const stored = localStorage.getItem('binsfilms_clips');
    if (!stored) {
        showMessage('Aucun clip à exporter.', 'error');
        return;
    }

    const data = {
        clips: JSON.parse(stored)
    };

    const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clips.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Fichier JSON téléchargé !', 'success');
}

// Clear all clips
function clearAllClips() {
    if (confirm('Êtes-vous sûr de vouloir supprimer TOUS les clips ? Cette action est irréversible.')) {
        localStorage.removeItem('binsfilms_clips');
        renderClips([]);
        updateClipsCount(0);
        showMessage('Tous les clips ont été supprimés.', 'success');
    }
}

// Show message
function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Make functions available globally
window.editClip = editClip;
window.deleteClip = deleteClip;
window.saveEdit = saveEdit;
window.cancelEdit = cancelEdit;
