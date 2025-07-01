//// Page interaction 

/////////////////////////
//Mobile interactions
////////////////////////

// Menu Open
const openMenu = document.querySelector(".menu-icon");
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
////////////////////////////
// Desktop Interaction
////////////////////////////



//////////////////////////////////
///BACKEND DATA COMMUNICATION
//////////////////////////////////
fetch('http://localhost:3000/data')
.then(res => res.json())
.then(data => {
    var Data = data;
    buttonPrint(Data);
    vehicleListing(Data);
    const cartButtons = document.querySelectorAll('.cart-btn');

cartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('clicked', btn);
    const container = btn.closest('.vehicle-container');
    console.log('container', container);
  });
});

    // console.log(Data);
})
.catch(err => console.error(err));

// Category Listing function
const vehicleContainer = document.querySelector(".vehicles-section-container");
function vehicleListing(arr){
    let vehicle = arr.map((item)=> {
        return `<div class="vehicle-container" data-id=${item.BOOKED}>
                    <img src="${item.IMAGE}" alt="vehicle" class="vehicle-img" />
                    <div class="shadow"></div>
                    <h3 class="vehicle-title">${item.NAME}</h3>
                    <p class="vehicle-description">
                        ${item.DESCRIPTION}
                    </p>
                    <div class="section-btns">
                        <button type="button" class="cart-btn section-btn">Add to Cart</button>
                        <button type="button" class="reserve-btn section-btn">Reserve Now</button>
                    </div>
                    <div class="rent-form hidden">
                    <label>From: <input type="date" class="from-date"></label>
                    <label>To: <input type="date" class="to-date"></label>
                    <button class="submit-dates">Submit</button>
                    </div>
                </div>`
    }).join("")
    vehicleContainer.innerHTML = vehicle;
    const vehicleListing = document.querySelectorAll(".vehicle-container");
    vehicleListing.forEach((vehicle) => {
        if(vehicle.dataset.id === "YES"){
            vehicle.innerHTML += `  <div class="disabled">
                                        <p class="unavailable">BOOKED</p>
                                    </div>`;
        }
    })
}

// Filters for Vehicles
const filter = document.getElementById("filters-list");

function buttonPrint(arr){
const buttonArray = arr.reduce((product, item) => {
    if(!product.includes(item.TYPE)){
        product.push(item.TYPE)
    }
    return product;
}, ["All"])
// console.log(buttonArray);

// Button array created from xlsx file
    let buttons = buttonArray.map((item) => {
        return `<li><button class="nav-btn" data-id="${item}">${item}</button></li> \n`
    }).join("");
    filter.innerHTML = buttons;
    // console.log(buttons);

    // Filtering Categories
    
    const navBtn = document.querySelectorAll(".nav-btn");
    // Active Class
    navBtn.forEach((btn) => {
        if(btn.dataset.id === "All"){
            btn.classList.add("active");
        }
    })
    
    navBtn.forEach((btn) => {
        btn.addEventListener("click", (e) =>{
            navBtn.forEach(b => b.classList.remove('active'));
            if(!btn.classList.contains("active")){
                btn.classList.add("active")
            }
           const data = e.currentTarget.dataset.id;
        //    console.log(data);
           let product = arr.filter((items) => {
            if(data === 'All'){
                return arr;
            }else{
                return items.TYPE === data;
            }
           })
        //    console.log(product);
        let vehicles = product.map((items) => {
            return `<div class="vehicle-container" data-id = ${items.BOOKED}>
                        <img src="${items.IMAGE}" alt="vehicle" class="vehicle-img" />
                        <div class="shadow"></div>
                        <h3 class="vehicle-title">${items.NAME}</h3>
                        <p class="vehicle-description">
                            ${items.DESCRIPTION}
                        </p>
                        <div class="section-btns">
                            <button type="button" class="cart-btn section-btn">Add to Cart</button>
                            <button type="button" class="reserve-btn section-btn">Reserve Now</button>
                        </div>
                        <div class="rent-form hidden">
                            <label>From: <input type="date" class="from-date"></label>
                            <label>To: <input type="date" class="to-date"></label>
                            <button class="submit-dates">Submit</button>
                        </div>
                    </div>`
        }).join("");
        vehicleContainer.innerHTML = vehicles;
        const vehicleListing = document.querySelectorAll(".vehicle-container");
        vehicleListing.forEach((vehicle) => {
            if(vehicle.dataset.id === "YES"){
                vehicle.innerHTML += `  <div class="disabled">
                                            <p class="unavailable">BOOKED</p>
                                        </div>`;
        }
    })
        })
    })
}


// Add To cart Function
vehicleContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-btn')) {
    const btn = e.target;
    const container = btn.closest('.vehicle-container');
    const form = container.querySelector('.rent-form');
    form.classList.toggle('hidden');
  }

  if (e.target.classList.contains('submit-dates')) {
    const btn = e.target;
    const container = btn.closest('.vehicle-container');
    const fromDate = container.querySelector('.from-date').value;
    const toDate = container.querySelector('.to-date').value;
    const name = container.querySelector('.vehicle-title').textContent.trim();
    const desc = container.querySelector('.vehicle-description').textContent.trim();
    const image = container.querySelector('.vehicle-img').getAttribute('src');
  // Basic validation
  if (!fromDate || !toDate) {
    alert('Please select both dates.');
    return;
  }else{
    const form = container.querySelector('.rent-form');
    form.classList.add("hidden");
  }



  let rentItem = {
    name,
    description: desc,
    fromDate,
    toDate,
    image,
  };

  let existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = existingCart.findIndex(item => item.name === name);
  if(index !== -1){
    // Updates Entry
    existingCart[index] = rentItem;
  }else{
        existingCart.push(rentItem);
  }

  localStorage.setItem('cart', JSON.stringify(existingCart));
  alert('Added to cart!');

    //Cart Button Counter
    const counter = document.querySelector(".counter");
    if(existingCart.length > 0){
    counter.textContent = existingCart.length
    counter.classList.add("count");
}      
}
});

// Cart Button
// const cartButton = document.querySelector(".cart");
// cartButton.addEventListener("click", ()=>{
//     window.location.href = 'https://caption04.github.io/cart.html';
// })


// console.log(existingCart.length)

