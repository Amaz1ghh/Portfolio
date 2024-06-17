// Quand on submit

let form = document.querySelector("form");

(function(){
    emailjs.init("_ubXQnsSOBr-aPYPr")
})();

form.addEventListener("submit", (event) => {
    event.preventDefault();


    let params = {
        formNom: document.getElementById("formNom").value,
        formMail: document.getElementById("formMail").value,
        formObjet: document.getElementById("formObjet").value,
        formMess: document.getElementById("formMess").value,
    };

    let serviceID = "service_94mb3po";
    let templateID = "template_89pkfcf";

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        alert("Message envoyé avec succès !");
    })
    .catch( res => {
        alert("Erreur dans l'envoie du message")
    });

    document.formulaire.reset();

});