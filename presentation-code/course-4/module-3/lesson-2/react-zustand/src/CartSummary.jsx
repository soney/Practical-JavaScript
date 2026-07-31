import useCartStore from './useCartStore';

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  return <header>
    {items.length === 0 && <span>Cart is empty</span>}
    {items.length > 0 && <p>Cart items: { items.map((item) => item.type).join(", ")}</p>}
    <button onClick={clearCart}>Clear Cart</button>
    <hr />
  </header>
}