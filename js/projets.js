
let buttons = document.querySelectorAll('.triggers button');
let tabs = Array.from(document.querySelectorAll('.tabs'))

// Ajouter un gestionnaire d'événements à chaque bouton
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let tabName = button.getAttribute('value');
        tabs.forEach(tab => {
            tab.classList.remove('estSelect')
        })
        let tab = tabs.filter(t => t.getAttribute('value') === tabName)[0]
        tab.classList.add('estSelect')
    });
});