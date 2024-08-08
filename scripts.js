document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.toggle-section');
  const sections = document.querySelectorAll('.product-section');
  const tableBody = document.querySelector('#current-items tbody');
  const totalPriceElement = document.querySelector('#total-price');
  const clearCartButton = document.getElementById('clear-cart-button');
  const checkoutButton = document.getElementById('checkout-button');
  const addToFavoritesButton = document.getElementById('addto');
  const applyFavoritesButton = document.getElementById('apply');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Handle button clicks to show/hide sections
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const sectionId = button.getAttribute('data-section');
      const section = document.getElementById(sectionId);

      sections.forEach(sec => {
        sec.classList.toggle('show', sec === section);
        sec.classList.toggle('hidden', sec !== section);
      });
    });
  });

  // Add event listeners to product buttons
  document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
      const productDiv = button.closest('.product');
      const name = productDiv.querySelector('.product-info p').textContent;
      const amountInput = productDiv.querySelector('input[type="number"]');
      const amount = parseFloat(amountInput.value) || 0;
      const pricePerUnit = parseFloat(productDiv.querySelector('.price').textContent.replace('₨ ', ''));

      if (amount > 0) {
        const existingProductIndex = cart.findIndex(item => item.name === name);

        if (existingProductIndex > -1) {
          cart[existingProductIndex].amount += amount;
          cart[existingProductIndex].price = cart[existingProductIndex].amount * pricePerUnit;
        } else {
          cart.push({ name, amount, price: amount * pricePerUnit });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
    });
  });

  // Clear cart functionality
  clearCartButton.addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
  });

  // Function to update cart
  function updateCart() {
    tableBody.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
      totalPrice += item.price;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>₨ ${item.price.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    });

    totalPriceElement.textContent = `₨ ${totalPrice.toFixed(2)}`;
  }

  checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
      window.location.href = 'checkout.html'; // Redirect to checkout page
    } else {
      alert('Your cart is empty.');
    }
  });

  // Add to Favorites functionality
  addToFavoritesButton.addEventListener('click', () => {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
    alert('Order has been added to favorites.');
  });

  // Apply Favorites functionality
  applyFavoritesButton.addEventListener('click', () => {
    const favoriteOrder = localStorage.getItem('favoriteOrder');
    if (favoriteOrder) {
      cart = JSON.parse(favoriteOrder);
      updateCart();
      alert('Favorite order has been applied.');
    } else {
      alert('No favorite order found.');
    }
  });

  // Load cart items and update the cart table on page load
  updateCart();
});
