const hamburger = document.querySelector(".hamburger");
const extendedEmployeeCard = document.querySelector(".extended-employee-card");
const extendedCardCloseButton = document.querySelector(".close");
const overlay = document.querySelector(".cover");
let employeeAPI = 'https://randomuser.me/api/?results=12&nat=us&inc=name, picture,email, location, phone, dob, nat & noinfo';
const search = document.querySelector("#search");
let searchIconContainer = document.querySelector(".search-icon-container");
const cardContainer = document.querySelector(".employee-card-container");
let employeeInformation = [];


window.onload = () => {
    searchIconContainer.innerHTML = "<svg class=\"icon-search\"><use xlink:href=\"sprite/sprite.svg#icon-search\"/></svg>\n";
};

//---------------- EVENT LISTENERS --------------------- //

hamburger.addEventListener("click", hamburgerMenu);
search.addEventListener('keyup', (e) => {
    employeeSearchFilter();
    changeSearchIcon();
});
searchIconContainer.addEventListener("click",  resetSearchIcon);

$( ".close" ).on("click", function() {
    console.log("something");
});

// ------------------- FETCH FUNCTIONS ------------------- //

fetch(employeeAPI)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
        generateEmployeeCards(data.results);
        console.log(data.results)
    })
    .catch(error => console.log("Looks like there was an problem!", error));

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateEmployeeCards(employeeData) {
    employeeInformation = employeeData;

    employeeInformation.forEach((employee, index) => {
        document.querySelector(".employee-card-container").innerHTML +=
            `<div class="employee-card" data-index="${index}">
                <div class="card-wrapper">
                    <div class="employee-image-container">
                        <img class="employee-image" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last} profile picture"/>
                    </div>
                    <div class="employee-info-container">
                        <div class="employee-name-container">
                            <p class="employee-name">${employee.name.first} ${employee.name.last}</p>
                        </div>
                        <div class="employee-email-container">
                            <p class="employee-email">${employee.email}</p>
                        </div>
                        <div class="employee-location-container">
                            <p class="employee-location">${employee.location.city}</p>
                        </div>
                    </div>
                </div>
            </div>`
    })
}

function generateExtendedEmployeeCard(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employeeInformation[index];

    extendedEmployeeCard.innerHTML +=
        `<div class="extended-card-wrapper">
            <span class="close">X</span>
            <div class="employee-image-container">
                 <img class="employee-image" src="${picture.large}" alt="${name.first} ${name.last} profile picture"/>
            </div>
            <div class="employee-info-container">
                 <div class="employee-name-container">
                      <p class="employee-name">${name.first} ${name.last}</p>
                 </div>
                 <div class="employee-email-container">
                      <p class="employee-email">${email}</p>
                 </div>
                 <div class="employee-location-container">
                      <p class="employee-location">${city}</p>
                 </div>
            </div>
            <div class="extended-employee-info">
                 <div class="employee-phone-number-container">
                      <p class="employee-phone-number">(${phone.substring(1,4)}) ${phone.substring(6,9)}-${phone.substring(10,14)}</p>
                 </div>
                 <div class="employee-address-container">
                      <p class="employee-address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
                 </div>
                 <div class="employee-birthday-container">
                      <p class="employee-birthday">Birthday: ${dob.date.substring(5, 7)}/${dob.date.substring(8, 10)}/${dob.date.substring(2, 4)}</p>
                 </div>
            </div>
            <svg class=\"left-arrow arrow\"><use xlink:href=\"sprite/sprite.svg#icon-arrow\"/></svg>
            <svg class=\"right-arrow arrow\"><use xlink:href=\"sprite/sprite.svg#icon-arrow\"/></svg>
        </div> `;
    overlay.classList.toggle("pop-up-active");
    extendedEmployeeCard.classList.toggle("pop-up-active");
}

// --------------------- FUNCTIONS ---------------------- //
function hamburgerMenu()  {
    const nav = document.querySelector("nav");
    // toggles class to hamburger and nav. Mobile only use.
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("menu-expanded");
}

function closeModal() {
    // removes pop-up-active to overlay and extended employee pop-up card
    extendedEmployeeCard.classList.remove("pop-up-active");
    overlay.classList.remove("pop-up-active");
}

function employeeSearchFilter() {
    let employeeCards = document.querySelectorAll(".employee-card");

    employeeCards.forEach(employee => {
        let employeeName = employee.querySelector(".employee-name").textContent;
        let searchValue = search.value.toUpperCase();

        if (employeeName.toUpperCase().indexOf(searchValue) > -1 ) {
            employee.style.display = "";
        } else {
            employee.style.display = "none";
        }
    })
    // Key typing activates function
}
function changeSearchIcon() {
    searchIconContainer.innerText = "X";

     if (cardContainer.hasChildNodes()) {
         searchIconContainer.style.backgroundColor = "#189F13";
     } else {
         searchIconContainer.style.backgroundColor = "#A21414";
     }

    if (search.value === "") {resetSearchIcon()}
}

function resetSearchIcon() {
    let employeeCards = document.querySelectorAll(".employee-card");

    searchIconContainer.innerHTML = "<svg class=\"icon-search\"><use xlink:href=\"sprite/sprite.svg#icon-search\"/></svg>\n";
    searchIconContainer.style.backgroundColor = "#262626";
    search.value = "";
    // shows all employee cards
    employeeCards.forEach(employee => {
        employee.style.display = ""
    })
}

function displayModal() {
    cardContainer.addEventListener('click', e => {
        if (e.target !== cardContainer) {
            const card = e.target.closest(".employee-card");
            const index = card.getAttribute('data-index');
            generateExtendedEmployeeCard(index);
        }
    });
}
displayModal();

function modalNext() {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".left-arrow");

    rightArrow.addEventListener("click", () => {

    })
}