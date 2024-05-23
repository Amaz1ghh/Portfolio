function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function affichePage(event) {
    // Supprimer la classe 'estSelect' de tous les boutons
    buttons.forEach(btn => btn.classList.remove('estSelect'));
    // Ajouter la classe 'estSelect' au bouton cliqué
    event.target.classList.add('estSelect');
}