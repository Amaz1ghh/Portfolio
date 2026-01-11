// Initialisation des icônes Lucide
lucide.createIcons();

// Note : La classe "active" est mise manuellement dans le HTML de chaque page 
// pour simplifier le code sans serveur, mais voici un script qui peut le faire auto
// si tu veux ne pas toucher au HTML à chaque fois.

const navLinks = document.querySelectorAll('.nav-links a');
const currentPath = window.location.pathname.split("/").pop(); 

// Si le fichier est vide (racine), c'est index.html
const activePage = currentPath === "" ? "index.html" : currentPath;

navLinks.forEach(link => {
    // Retire la classe active par défaut
    link.classList.remove('active');
    // Si le href du lien correspond à la page active
    if(link.getAttribute('href') === activePage) {
        link.classList.add('active');
    }
});

// Animation simple au chargement des cartes
const cards = document.querySelectorAll('.card, .timeline-item, .skill-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease-out";
    observer.observe(card);
});


// --- SCRIPT POUR LA PAGE PROJETS ---

document.addEventListener('DOMContentLoaded', () => {

    const page = document.getElementById('projects-grid');
    if (!page) return;

    // --- LOGIQUE DE FILTRAGE ---
    const filtersContainer = document.getElementById('filters');
    const skillFiltersContainer = document.getElementById('filters-skills');
    const projectCards = document.querySelectorAll('.project-card');

    let currentCompetenceFilter = 'all';
    let currentSkillFilter = 'all';

    function applyFilters() {
        projectCards.forEach(card => {
            const competences = card.dataset.competences || '';
            const skills = card.dataset.skills || '';
            
            const competenceMatch = currentCompetenceFilter === 'all' || competences.includes(currentCompetenceFilter);
            const skillMatch = currentSkillFilter === 'all' || skills.includes(currentSkillFilter);

            if (competenceMatch && skillMatch) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    }

    filtersContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('filter-btn')) return;

        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        currentCompetenceFilter = target.dataset.filter;
        applyFilters();
    });

    skillFiltersContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('filter-btn')) return;

        skillFiltersContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        currentSkillFilter = target.dataset.filter;
        applyFilters();
    });


    // --- LOGIQUE DES MODALS ET CAROUSELS ---
    const modals = document.querySelectorAll('.modal');

    // Fonction pour initialiser UN carousel
    const initCarousel = (carousel) => {
        if (carousel.dataset.initialized) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        let currentIndex = 0;

        // Créer les points
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        };

        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        });
        
        carousel.dataset.initialized = true;
        showSlide(0); // Afficher la première slide par défaut
    };

    // Ouvrir les modals et initialiser le carousel correspondant
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const html = document.querySelector("html");
            
            const modalId = card.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                html.style.overflowY = "hidden"
                modal.style.display = 'block';
                const carousel = modal.querySelector('.carousel');
                if (carousel) {
                    initCarousel(carousel);
                }
                lucide.createIcons();
            }
        });
    });

    // Fermer les modals
    modals.forEach(modal => {
        const html = document.querySelector("html");

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
                html.style.overflowY = "visible"
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                html.style.overflowY = "visible"
                modal.style.display = 'none';
            }
        });
    });
});


// --- SCRIPT POUR LE FORMULAIRE DE CONTACT AVEC EMAILJS ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // Make sure the form exists before trying to add an event listener
    if (contactForm) {
        emailjs.init("_ubXQnsSOBr-aPYPr");

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const formNom = document.getElementById("formNom").value;
            const formMail = document.getElementById("formMail").value;
            const formObjet = document.getElementById("formObjet").value;
            const formMess = document.getElementById("formMess").value;

            // Define template parameters.
            const templateParams = {
                formNom: formNom,
                formMail: formMail,
                formObjet: formObjet,
                formMess: formMess,
            };

            const serviceID = "service_94mb3po";
            const templateID = "template_89pkfcf"; // This template ID was provided by the user

            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    alert("Message envoyé avec succès !");
                    contactForm.reset(); // Clear the form after successful submission
                }, function(error) {
                    console.error("Erreur lors de l'envoi du message :", error); // Log error for debugging
                    alert("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
                });
        });
    }
});