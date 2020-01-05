const hamburger = document.querySelector(".hamburger");
const card = document.querySelector(".employee-card");
const extendedCard = document.querySelector(".extended-employee-card");
const extendedCardCloseButton = document.querySelector(".close");
const overlay = document.querySelector(".cover");



window.onload = () => {
    // toggles classes to hamburger and nav - allows mobile functions

};




//---------------- EVENT LISTENERS --------------------- //
card.addEventListener("click", function() {
    document.querySelector(".cover").classList.toggle("pop-up-active");
    document.querySelector(".extended-employee-card").classList.toggle("pop-up-active");
});

extendedCardCloseButton.addEventListener("click", () => {
    extendedCard.classList.remove("pop-up-active");
    overlay.classList.remove("pop-up-active");
});

// hamburger.addEventListener("click", function() {
//     hamburgerMenu();
// });


// --------------------- Functions ---------------------- //
hamburgerMenu = () => {
    const nav = document.querySelector("nav");
    // toggles class to hamburger and nav. Mobile only use.
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("menu-expanded");
};

mediaQuery = () => {
    const mqSmall = window.matchMedia("(min-width: 320px)");
    const mqMedium = window.matchMedia("(min-width: 768px)");
    const mqLarge = window.matchMedia("(min-width: 1024px)");
    if (mqSmall.matches) {
        
    }
    if (mqMedium.matches) {

    }
}; mediaQuery();




