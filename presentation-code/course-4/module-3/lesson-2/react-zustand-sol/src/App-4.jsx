import { useCartStore } from "./stores/useCartStore";

function Product() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article>
      <h2>React Hoodie</h2>
      <p>$45</p>
      <button
        onClick={() =>
          addItem({
            id: "react-hoodie",
            name: "React Hoodie",
            price: 45,
          })
        }
      >
        Add to cart
      </button>
    </article>
  );
}

function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside>
      <h2>Cart</h2>
      <p>Items: {items.length}</p>
      <p>Total: ${total}</p>
      <button onClick={clearCart}>Clear cart</button>
    </aside>
  );
}

export default function App() {
  return (
    <div>
      <CartSummary />
      <Product />
    </div>
  );
}
