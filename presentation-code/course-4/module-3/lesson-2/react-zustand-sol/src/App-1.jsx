import { useState } from "react";

function Header({ cartCount }) {
  return (
    <header>
      <h1>My Store</h1>
      <p>Cart: {cartCount}</p>
    </header>
  );
}

function Product({ onAddToCart }) {
  return (
    <article>
      <h2>React Hoodie</h2>
      <p>$45</p>
      <button onClick={onAddToCart}>Add to cart</button>
    </article>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount((currentCount) => currentCount + 1);
  }

  return (
    <div>
      <Header cartCount={cartCount} />
      <Product onAddToCart={addToCart} />
    </div>
  );
}
