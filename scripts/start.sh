#!/bin/bash

# BINKSFILMS — Script de lancement v2.0
echo "🎬 BINKSFILMS — Les Beaux Arts du Ghetto"
echo "========================================"
echo ""

# Vérifier la structure du projet
echo "🔍 Vérification de la structure..."
if [ ! -f "index.html" ]; then
    echo "❌ index.html non trouvé. Êtes-vous dans le bon dossier ?"
    exit 1
fi

if [ ! -d "pages" ]; then
    echo "❌ Dossier 'pages' non trouvé. Structure incomplète."
    exit 1
fi

echo "✅ Structure du projet validée"
echo ""

# Afficher les informations du projet
echo "📋 Informations du projet :"
echo "   • Page d'intro : index.html"
echo "   • Page d'accueil : pages/home.html"
echo "   • Projets : pages/projects.html"
echo "   • Contact : pages/contact.html"
echo ""

# Vérifier si Python est installé
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo "🚀 Lancement du serveur sur http://localhost:8000"
    echo ""
    echo "📱 Ouvrez votre navigateur et allez sur :"
    echo "   🌐 http://localhost:8000"
    echo ""
    echo "💡 Pour arrêter le serveur, appuyez sur Ctrl+C"
    echo "📚 Documentation : docs/README.md"
    echo ""
    echo "🎬 Bon visionnage !"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    echo "🚀 Lancement du serveur sur http://localhost:8000"
    echo ""
    echo "📱 Ouvrez votre navigateur et allez sur :"
    echo "   🌐 http://localhost:8000"
    echo ""
    echo "💡 Pour arrêter le serveur, appuyez sur Ctrl+C"
    echo "📚 Documentation : docs/README.md"
    echo ""
    echo "🎬 Bon visionnage !"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python n'est pas installé"
    echo ""
    echo "🔧 Alternatives :"
    echo "1. Installez Python : https://python.org"
    echo "2. Utilisez Live Server dans VS Code"
    echo "3. Utilisez npx serve ."
    echo "4. Ouvrez simplement index.html dans votre navigateur"
    echo ""
    echo "📚 Documentation complète : docs/README.md"
fi
