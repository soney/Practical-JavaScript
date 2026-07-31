import { useCartStore } from "./stores/useCartStore-1";

function Header() {
  const cartCount = useCartStore((state) => state.cartCount);

  return (
    <header>
      <h1>My Store</h1>
      <p>Cart: {cartCount}</p>
    </header>
  );
}

function Product() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article>
      <h2>React Hoodie</h2>
      <p>$45</p>
      <button onClick={addToCart}>Add to cart</button>
    </article>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <Product />
    </div>
  );
}
