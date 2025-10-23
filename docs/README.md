# BINKSFILMS — Portfolio Website

## 🎬 À propos
Site portfolio de BinksFilms - "Les Beaux Arts du Ghetto". Créateur de contenus visuels : clips musicaux, photographie, vidéos promotionnelles.

## 📁 Structure du projet

```
binsfilms.art/
├── index.html              # Page d'intro/loader
├── pages/                  # Pages principales
│   ├── home.html          # Page d'accueil
│   ├── projects.html      # Galerie de projets
│   └── contact.html       # Formulaire de contact
├── css/                   # Feuilles de style
│   ├── main.css          # Styles principaux
│   ├── intro.css         # Styles de l'intro
│   ├── projects.css      # Styles des projets
│   └── contact.css       # Styles du contact
├── js/                    # JavaScript
│   ├── main.js           # Script principal
│   ├── intro.js          # Script de l'intro
│   ├── home.js           # Script de l'accueil
│   ├── projects.js       # Script des projets
│   └── contact.js        # Script du contact
├── assets/               # Ressources
│   ├── images/          # Images (0001.png à 0142.png)
│   └── audio/           # Fichiers audio
├── .htaccess            # Configuration Apache
├── _redirects           # Redirections Netlify
└── README.md           # Ce fichier
```

## 🚀 Comment lancer le projet

### Option 1 : Serveur local simple
```bash
# Dans le dossier du projet
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Option 2 : Live Server (VS Code)
1. Installer l'extension "Live Server"
2. Clic droit sur `index.html` → "Open with Live Server"

### Option 3 : Serveur Node.js
```bash
npx serve .
# Puis ouvrir l'URL affichée
```

## 🎨 Fonctionnalités

### Page d'intro (`index.html`)
- Animation de chargement avec barre de progression
- Effet d'étoiles animées
- Redirection automatique vers l'accueil

### Page d'accueil (`pages/home.html`)
- Vidéo de fond YouTube
- Overlay interactif "À propos" avec effet de machine à écrire
- Navigation fluide
- Design responsive

### Page projets (`pages/projects.html`)
- Galerie interactive avec différents thèmes
- Support pour formats 16:9, 9:16, et cadre baroque
- Navigation au clavier
- Effets visuels (glitch, CRT)

### Page contact (`pages/contact.html`)
- Formulaire en étapes avec validation
- Fond Matrix animé
- Envoi par email automatique
- Design bullet journal

## 🛠 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles avec variables CSS et animations
- **JavaScript ES6+** - Interactivité et animations
- **YouTube API** - Intégration vidéo
- **Web Audio API** - Sons de frappe clavier

## 📱 Responsive Design

Le site s'adapte à tous les écrans :
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibilité

- Navigation au clavier
- Attributs ARIA
- Contraste élevé
- Support des lecteurs d'écran
- Respect des préférences de mouvement réduit

## 🎯 Performance

- Preload des ressources critiques
- Lazy loading des images
- Compression des assets
- Cache optimisé
- Code minifié en production

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/main.css` :
```css
:root {
  --ink: #00ff66;        /* Couleur principale */
  --accent: #00ff8a;     /* Couleur d'accent */
  --bg: #000;            /* Arrière-plan */
  --fg: #e6e6e6;         /* Texte principal */
}
```

### Contenu
- **Projets** : Modifiez `js/projects.js` pour ajouter vos vidéos
- **Contact** : Ajustez les champs dans `pages/contact.html`
- **Texte** : Modifiez le contenu dans les fichiers HTML

## 📞 Support

Pour toute question ou problème :
- Email : Binksfilms@gmail.com
- GitHub : [Votre repo]
- Site : https://binsfilms.art

---

*Créé avec ❤️ par BinksFilms*