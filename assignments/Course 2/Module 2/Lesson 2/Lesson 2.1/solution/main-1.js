// Product data
const products = [
  { id: 'laptop', name: 'Laptop', price: 999 },
  { id: 'mouse', name: 'Wireless Mouse', price: 25 },
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 75 }
];

// Select the elements
const productList = document.querySelector('#productList');
const cartTotal = document.querySelector('#cartTotal');

// Running total for the cart
let total = 0;

// Create a button for each product in the array
for (let i = 0; i < products.length; i++) {
  const product = products[i];

  const button = document.createElement('button');
  button.textContent = product.name + ' for $' + product.price;
  button.classList.add('product-button');

  // When the button is clicked, add this product's price to the total
  button.addEventListener('click', function() {
    total = total + product.price;
    cartTotal.textContent = 'Total: $' + total;
  });

  productList.append(button);
}
