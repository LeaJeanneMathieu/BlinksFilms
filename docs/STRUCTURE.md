# 📁 Structure du Projet BINKSFILMS

## 🎯 Vue d'ensemble
```
binsfilms.art/
├── 📄 index.html              # Page d'intro/loader
├── 📁 pages/                  # Pages principales
│   ├── home.html             # Page d'accueil
│   ├── projects.html         # Galerie de projets
│   └── contact.html          # Formulaire de contact
├── 📁 css/                   # Feuilles de style
│   ├── main.css             # Styles principaux
│   ├── intro.css            # Styles de l'intro
│   ├── projects.css         # Styles des projets
│   └── contact.css          # Styles du contact
├── 📁 js/                    # JavaScript modulaire
│   ├── main.js              # Script principal
│   ├── intro.js             # Script de l'intro
│   ├── home.js              # Script de l'accueil
│   ├── projects.js          # Script des projets
│   └── contact.js           # Script du contact
├── 📁 assets/               # Ressources
│   ├── images/             # Images (0001-0142.png)
│   └── audio/              # Fichiers audio
├── 📁 config/               # Configuration
│   ├── .htaccess           # Configuration Apache
│   └── _redirects          # Redirections Netlify
├── 📁 scripts/              # Scripts utilitaires
│   └── start.sh            # Script de lancement
├── 📁 docs/                 # Documentation
│   ├── README.md           # Documentation principale
│   └── STRUCTURE.md        # Ce fichier
├── 📁 archive/              # Anciens fichiers
│   └── old-files/          # Fichiers archivés
├── 📁 .vscode/              # Configuration VS Code
│   └── settings.json       # Paramètres de l'éditeur
├── 📄 config.json           # Configuration du site
├── 📄 deploy.json           # Configuration de déploiement
├── 📄 .gitignore            # Fichiers à ignorer
└── 📄 index_to_home.html    # Redirection legacy
```

## 🎨 Organisation des Styles

### `css/main.css`
- Variables CSS globales
- Reset et base styles
- Composants réutilisables (boutons, cartes, etc.)
- Layout et grilles
- Responsive design
- Animations de base

### `css/intro.css`
- Styles de la page d'intro
- Animation de chargement
- Effets d'étoiles
- Barre de progression
- Boutons d'entrée

### `css/projects.css`
- Styles de la galerie de projets
- Thèmes (YouTube, Phone, Baroque)
- Supports vidéo (citron, téléphone, cadre)
- Effets CRT et glitch
- Navigation sidebar

### `css/contact.css`
- Styles du formulaire de contact
- Fond Matrix animé
- Formulaire en étapes
- Validation visuelle
- Responsive mobile

## ⚡ Organisation du JavaScript

### `js/main.js`
- Module principal de l'application
- Utilitaires communs
- Gestion des animations
- Navigation
- Performance
- Gestion d'erreurs

### `js/intro.js`
- Classe IntroLoader
- Animation de chargement
- Préchargement des ressources
- Redirection vers l'accueil

### `js/home.js`
- Classe HomePage
- Overlay interactif "À propos"
- Effet de machine à écrire
- Sons de frappe clavier
- Navigation fluide

### `js/projects.js`
- Classe ProjectsPage
- Gestion des catégories de projets
- Changement de thème dynamique
- Navigation clavier
- Intégration YouTube

### `js/contact.js`
- Classe ContactPage
- Formulaire en étapes
- Validation en temps réel
- Fond Matrix animé
- Envoi d'email

## 🖼️ Organisation des Assets

### `assets/images/`
- Images numérotées de 0001.png à 0142.png
- Optimisées pour le web
- Formats supportés : PNG, JPG, WebP

### `assets/audio/`
- Fichiers audio du projet
- Format MP3 pour compatibilité

## ⚙️ Configuration

### `config.json`
Configuration centralisée du site :
- Informations du site
- Chemins des pages
- Chemins des assets
- Fonctionnalités activées
- Paramètres de performance
- Options d'accessibilité

### `deploy.json`
Configuration de déploiement :
- Métadonnées du projet
- Scripts npm
- Mots-clés
- Configuration des moteurs

## 🚀 Scripts et Outils

### `scripts/start.sh`
Script de lancement automatique :
- Détection de Python
- Lancement du serveur local
- Instructions d'utilisation

### `.vscode/settings.json`
Configuration VS Code :
- Port Live Server
- Paramètres d'édition
- Formatage automatique

## 📚 Documentation

### `docs/README.md`
Documentation principale :
- Guide d'installation
- Instructions d'utilisation
- Personnalisation
- Support

### `docs/STRUCTURE.md`
Ce fichier - documentation de l'architecture

## 🗂️ Archive

### `archive/old-files/`
Anciens fichiers conservés :
- Fichiers HTML/CSS/JS originaux
- Sauvegarde avant réorganisation
- Référence historique

## 🔧 Fichiers de Configuration

### `.htaccess`
Configuration Apache :
- Compression
- Cache
- Headers de sécurité
- Redirections

### `_redirects`
Redirections Netlify :
- Redirection des anciennes URLs
- Fallback SPA

### `.gitignore`
Fichiers à ignorer par Git :
- Fichiers système
- Logs
- Dependencies
- Fichiers temporaires

## 🎯 Avantages de cette Structure

✅ **Séparation claire** des responsabilités  
✅ **Maintenabilité** améliorée  
✅ **Performance** optimisée  
✅ **Évolutivité** facilitée  
✅ **Collaboration** simplifiée  
✅ **Déploiement** automatisé  
✅ **Documentation** complète  

## 🚀 Prochaines Étapes

1. **Tester** le site avec `./scripts/start.sh`
2. **Personnaliser** le contenu dans `config.json`
3. **Ajouter** vos projets dans `js/projects.js`
4. **Déployer** sur votre hébergeur
5. **Maintenir** et mettre à jour régulièrement
