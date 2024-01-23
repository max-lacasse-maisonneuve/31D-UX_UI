(function () {
    const nav = document.querySelector("nav");

    nav.addEventListener("click", function () {
        const estOuvert = nav.dataset.opened === "true";
        nav.dataset.opened = !estOuvert;
    });
})();
