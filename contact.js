//// Page interaction 
const counter = document.querySelector(".counter");
window.addEventListener("DOMContentLoaded",() => {
    // Load cart from localStorage or empty array
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    //Cart Button Counter
    
    if(cartItems.length > 0){
    counter.textContent = cartItems.length
    counter.classList.add("count");
    }   
})
/////////////////////////
//Mobile interactions
////////////////////////

// Menu Open
const openMenu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu");
const sideBar = document.querySelector(".sidebar-container");
const menuList = document.querySelector(".menu-sidebar");
const overlay = document.querySelector(".menu-overlay");
const html = document.documentElement;

openMenu.addEventListener("click",() => {
    html.classList.add("no-scroll");
    overlay.classList.add("open");
    sideBar.classList.add("open");
})

closeMenu.addEventListener("click", () => {
    sideBar.classList.remove("open");
    overlay.classList.remove("open");
    html.classList.remove("no-scroll");
})

menuList.addEventListener("click", () => {
    sideBar.classList.remove("open");
    overlay.classList.remove("open");
    html.classList.remove("no-scroll");
})

// Search Open
const searchIcon = document.querySelector(".search");
const closeSearch = document.querySelector(".close-search");
const search = document.querySelector(".phone-search");
const searchList = document.querySelector(".search-selection");

searchIcon.addEventListener("click", () => {
    search.classList.add("open");
})

closeSearch.addEventListener("click", () => {
    search.classList.remove("open");
})

searchList.addEventListener("click", () => {
    search.classList.remove("open");
})

// Hero Button
const equipment = document.getElementById("equipment");
const heroButton = document.querySelector(".hero-btn")

heroButton.addEventListener("click" ,() => {
    equipment.scrollIntoView({
        behavior: "smooth"
    })
});

// footer logo
const footerLogo = document.querySelector(".footer-logo");
footerLogo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})