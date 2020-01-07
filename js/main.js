const hamburger = document.querySelector(".hamburger");
const extendedEmployeeCard = document.querySelector(".extended-employee-card");
const extendedCardCloseButton = document.querySelector(".close");
const overlay = document.querySelector(".cover");
let employeeAPI = 'https://randomuser.me/api/?results=12&nat=us&inc=name, picture,email, location, phone, dob, nat & noinfo';
const search = document.querySelector("#search");
let searchIconContainer = document.querySelector(".search-icon-container");


window.onload = () => {
    searchIconContainer.innerHTML = "<svg class=\"icon-search\"><use xlink:href=\"sprite/sprite.svg#icon-search\"/></svg>\n"
    extendedEmployeeCard.innerHTML =
        `<div class="extended-card-wrapper">
            <span class="close">X</span>
            <div class="employee-image-container">
            </div>
            <div class="employee-info-container">
                 <div class="employee-name-container">
                      <p class="employee-name"></p>
                 </div>
                 <div class="employee-email-container">
                      <p class="employee-email"></p>
                 </div>
                 <div class="employee-location-container">
                      <p class="employee-location"></p>
                 </div>
            </div>
            <div class="extended-employee-info">
                 <div class="employee-phone-number-container">
                      <p class="employee-phone-number"></p>
                 </div>
                 <div class="employee-address-container">
                      <p class="employee-address"></p>
                 </div>
                 <div class="employee-birthday-container">
                      <p class="employee-birthday"></p>
                 </div>
            </div>
        </div> `;

};

//---------------- EVENT LISTENERS --------------------- //

// extendedCardCloseButton.addEventListener("click", closeModal);
hamburger.addEventListener("click", hamburgerMenu);
search.addEventListener('keyup', (e) => {
    employeeSearchFilter();
    changeSearchIcon();
});
searchIconContainer.addEventListener("click",  resetSearchIcon);


// ------------------- FETCH FUNCTIONS ------------------- //

fetch(employeeAPI)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
        generateEmployeeCards(data.results);
    })
    .catch(error => console.log("Looks like there was an problem!", error));


function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateEmployeeCards(data) {
    for ( let i = 0; i < data.length; i++) {
        document.querySelector(".employee-card-container").innerHTML +=
            `<div class="employee-card">
                <div class="card-wrapper">
                    <div class="employee-image-container">
                        <img class="employee-image" src="${data[i].picture.large}" alt="${data[i].name.first} ${data[i].name.last} profile picture"/>
                    </div>
                    <div class="employee-info-container">
                        <div class="employee-name-container">
                            <p class="employee-name">${data[i].name.first} ${data[i].name.last}</p>
                        </div>
                        <div class="employee-email-container">
                            <p class="employee-email">${data[i].email}</p>
                        </div>
                        <div class="employee-location-container">
                            <p class="employee-location">${data[i].location.city}</p>
                        </div>
                    </div>
                </div>
            </div>`
    }
}

// function generateExtendedEmployeeCard(data) {
// //     for ( let i = 0; i < data.length; i++) {
// //         document.querySelector(".employee-image-container").innerHTML = `<img class=\"extended-employee-image"\" src=\"${data[i].picture.large}\" alt=\"${data[i].name.first} ${data[i].name.last} profile picture\"/>\n`;
// //         document.querySelector(".employee-name").innerHTML = `${data[i].name.first} ${data[i].name.last}`;
// //         // document.querySelector(".extended-employee-image").innerHTML = "";
// //         // document.querySelector(".extended-employee-image").innerHTML = "";
// //         // document.querySelector(".extended-employee-image").innerHTML = "";
// //         // document.querySelector(".extended-employee-image").innerHTML = "";
// //     }
// // }


// --------------------- FUNCTIONS ---------------------- //
function hamburgerMenu()  {
    const nav = document.querySelector("nav");
    // toggles class to hamburger and nav. Mobile only use.
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("menu-expanded");
}

function openModal() {
    // adds pop-up-active to overlay and extended employee pop-up card
    overlay.classList.toggle("pop-up-active");
    extendedEmployeeCard.classList.toggle("pop-up-active");
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
    searchIconContainer.style.backgroundColor = "#A21414";
    searchIconContainer.innerText = "X";

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