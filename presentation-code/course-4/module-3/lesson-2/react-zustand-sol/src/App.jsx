import React from "react";
import { create } from "zustand";

const useCartStore = create((set) => ( {
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));

function Product({type, price, onAddToCart}) {
  const addItem = useCartStore((state) => state.addItem);

  function onClickAddToCart() {
    addItem({ type, price });
  }

  return (
    <article>
      <h2>{type}</h2>
      <p>${price.toFixed(2)}</p>
      <button onClick={onClickAddToCart}>
        Add to cart
      </button>
    </article>
  );
}

function CartSummary( {cartCount} ) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  return <header>
    <h1>My Store</h1>
    <p>Cart items: {items.map((item) => item.type).join(", ")}</p>
    <button onClick={clearCart}>
      Clear Cart
    </button>
  </header>
}

export default function App() {
  const onAddToCart = useCartStore((state) => state.addItem);

  return <div>
      <CartSummary cartCount={0} />
      <Product type="Apple" price={0.99} onAddToCart={onAddToCart} />
      <Product type="Orange" price={0.79} onAddToCart={onAddToCart} />
      <Product type="Banana" price={0.49} onAddToCart={onAddToCart} />
    </div>;
}
