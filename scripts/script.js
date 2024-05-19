let form = document.querySelector('form');

btnEnvoyer = document.getElementById("btnSubmit")

// Quand on submit
btnEnvoyer.addEventListener("click", (event) => {
    event.preventDefault();

    let nom = document.getElementById("formNom").value;
    let email = document.getElementById("formMail").value;
    let objet = document.getElementById("formObjet").value;
    let message = document.getElementById("formMess").value;

    verifierChamps(nom, email, objet, message);
});

function verifierChamps(nom, email, objet, message) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    
    let verifNom = verifChamp(nom);
    let verifEmail = regex.test(email);
    let verifObjet = verifChamp(objet);
    let verifMess = verifChamp(message);

    if ((!verifNom) || (!verifEmail) || (!verifObjet) || (!verifMess)){
        console.log("nope");
    }
    
}

function verifChamp(champ){
    if (champ.trim().value === "") {
        return true;
    }
    return false;
}