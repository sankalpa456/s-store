document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.toggle-section');
  const sections = document.querySelectorAll('.product-section');
  const tableBody = document.querySelector('#current-items tbody');
  const totalPriceElement = document.querySelector('#total-price');
  const clearCartButton = document.getElementById('clear-cart-button');
  const checkoutButton = document.getElementById('checkout-button');
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

  // Load cart items and update the cart table on page load
  updateCart();
});
document.addEventListener('DOMContentLoaded', function() {
  const cartItems = [
      { name: 'Product 1', price: 500, quantity: 2 },
      { name: 'Product 2', price: 300, quantity: 1 }
  ];

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  function renderCartItems() {
      const cartItemsTable = document.getElementById('cart-items');
      let rows = '';

      cartItems.forEach(item => {
          rows += `
              <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>LKR ${item.price.toFixed(2)}</td>
                  <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
          `;
      });

      cartItemsTable.innerHTML = `
          <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
          </tr>
          ${rows}
      `;
  }

  function updateCartTotal() {
      const cartTotal = document.getElementById('cart-total');
      const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      cartTotal.textContent = `LKR ${totalAmount.toFixed(2)}`;
  }

  renderCartItems();
  updateCartTotal();
});
