
// Get container and clear button and submit cart
const requestBtn = document.getElementById('submit-cart');
const cartItemsContainer = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');

// Load cart from localStorage or empty array
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to build cart item HTML
function buildCartItem(item) {
  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p class="dates">From: ${item.fromDate} To: ${item.toDate}</p>
        <button class="remove-item">Remove</button>
      </div>
    </div>
  `;
}

// Display all cart items
function displayCart() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    clearCartBtn.style.display = 'none';
    return;
  }

  clearCartBtn.style.display = 'inline-block';
  cartItemsContainer.innerHTML = cartItems.map(buildCartItem).join('');
}

// Remove Single Item form Cart
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const itemDiv = e.target.closest('.cart-item');
    const index = itemDiv.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
});


// Clear cart button listener
clearCartBtn.addEventListener('click', () => {
  localStorage.removeItem('cart');
  requestBtn.classList.add("display-quote");
  cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  clearCartBtn.style.display = 'none';
});

// Initial render
displayCart();

// back Button
const backButton = document.querySelector(".back");
backButton.addEventListener("click", ()=>{
    window.location.href = '/index.html';
})

// Request quote button visibility 
if(cartItems.length > 0){
  requestBtn.classList.remove("display-quote");
}


// Form submission

const modal = document.getElementById('quote-form-modal');
const closeModal = document.getElementById('close-modal');
const quoteForm = document.getElementById('quote-form');
emailjs.init("-lnefc9FDoQonW9ej");
requestBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Form submitted"); 

  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();


  if (!name || !validateEmail(email)) {
    alert('Please enter a valid name and email.');
    return;
  }

  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const templateParams = {
    user_name: name,
    user_email: email,
    cart: cartItems.map(item => `
      Vehicle: ${item.name}
      From: ${item.fromDate}
      To: ${item.toDate}
    `).join('\n\n')
  };


  emailjs.send('service_dyqnwsd', 'template_sf09yxj', templateParams)
    .then(() => {
      alert('Quote request sent successfully!');
      localStorage.removeItem('cart'); // ✅ clear cart on success
      cartItems.length = 0;    
      displayCart();
      modal.classList.add('hidden');
      quoteForm.reset();
    })
    .catch((error) => {
      alert('Failed to send the quote. Please try again.');
      console.error('EmailJS error:', error);
    });
});

// Email validation function
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

