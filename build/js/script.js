// Récuperer la navigation
const nav = document.querySelector("nav");

// Ajouter un écouteur d'événement sur le clic
nav.addEventListener("click", function () {
    const isOpen = nav.dataset.opened === "true";
    nav.dataset.opened = !isOpen;
});
