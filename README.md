# 🎬 BINKSFILMS — Les Beaux Arts du Ghetto

> Portfolio créatif de BinksFilms - Créateur de contenus visuels

[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](https://github.com/yourusername/binsfilms.art)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/website-binsfilms.art-orange.svg)](https://binsfilms.art)

## 🚀 Démarrage Rapide

```bash
# Lancer le site
./scripts/start.sh

# Ou manuellement
python3 -m http.server 8000
```

Puis ouvrez [http://localhost:8000](http://localhost:8000) dans votre navigateur.

## 📁 Structure

```
binsfilms.art/
├── 📄 index.html              # Page d'intro
├── 📁 pages/                  # Pages principales
├── 📁 css/                   # Styles organisés
├── 📁 js/                    # JavaScript modulaire
├── 📁 assets/               # Images et audio
├── 📁 config/               # Configuration
├── 📁 scripts/              # Scripts utilitaires
├── 📁 docs/                 # Documentation
└── 📁 archive/              # Anciens fichiers
```

## 🎨 Fonctionnalités

- ✨ **Animation d'intro** avec barre de progression
- 🎬 **Vidéo de fond** YouTube intégrée
- 💬 **Overlay interactif** "À propos" avec machine à écrire
- 🎯 **Galerie de projets** avec thèmes dynamiques
- 📝 **Formulaire de contact** en étapes
- 📱 **Design responsive** pour tous les écrans
- ♿ **Accessibilité** complète
- ⚡ **Performance** optimisée

## 🛠 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Variables, animations, responsive
- **JavaScript ES6+** - Classes, modules, async/await
- **YouTube API** - Intégration vidéo
- **Web Audio API** - Sons interactifs

## 📚 Documentation

- [Structure détaillée](docs/STRUCTURE.md)
- [Guide de personnalisation](docs/README.md)
- [Configuration](config/config.json)

## 🎯 Pages

| Page | Description | URL |
|------|-------------|-----|
| **Intro** | Animation de chargement | `/` |
| **Accueil** | Page principale avec overlay | `/pages/home.html` |
| **Projets** | Galerie interactive | `/pages/projects.html` |
| **Contact** | Formulaire en étapes | `/pages/contact.html` |

## ⚙️ Configuration

Modifiez `config/config.json` pour personnaliser :
- Informations du site
- Chemins des pages
- Fonctionnalités activées
- Paramètres de performance

## 🚀 Déploiement

### Netlify
1. Connectez votre repo GitHub
2. Le fichier `_redirects` gère les redirections
3. Déployez automatiquement

### Apache
1. Uploadez les fichiers sur votre serveur
2. Le fichier `.htaccess` gère la configuration
3. Activez mod_rewrite

## 🎨 Personnalisation

### Couleurs
```css
:root {
  --ink: #00ff66;        /* Couleur principale */
  --accent: #00ff8a;     /* Couleur d'accent */
  --bg: #000;            /* Arrière-plan */
}
```

### Contenu
- **Projets** : Modifiez `js/projects.js`
- **Contact** : Ajustez `pages/contact.html`
- **Texte** : Éditez les fichiers HTML

## 📞 Support

- **Email** : Binksfilms@gmail.com
- **GitHub** : [Votre repo]
- **Site** : https://binsfilms.art

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

*Créé avec ❤️ par BinksFilms - Les Beaux Arts du Ghetto*
