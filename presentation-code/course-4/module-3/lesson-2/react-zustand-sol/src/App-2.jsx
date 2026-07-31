import { useState } from "react";

function Header({ cartCount }) {
  return (
    <header>
      <h1>My Store</h1>
      <p>Cart: {cartCount}</p>
    </header>
  );
}

function Footer({ cartCount }) {
  return <footer>Cart Items: {cartCount}</footer>;
}

function FeaturedProducts({ onAddToCart }) { return <div><button onClick={onAddToCart}>Add Featured</button></div>; }
function ProductGrid({ onAddToCart }) { return <div><button onClick={onAddToCart}>Add from Grid</button></div>; }
function RecommendedProducts({ onAddToCart }) { return <div><button onClick={onAddToCart}>Add Recommended</button></div>; }

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount((currentCount) => currentCount + 1);
  }

  return (
    <div>
      <Header cartCount={cartCount} />

      <main>
        <FeaturedProducts onAddToCart={addToCart} />
        <ProductGrid onAddToCart={addToCart} />
        <RecommendedProducts onAddToCart={addToCart} />
      </main>

      <Footer cartCount={cartCount} />
    </div>
  );
}
