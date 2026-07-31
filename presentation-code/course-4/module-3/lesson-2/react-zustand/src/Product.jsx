import useCartStore from './useCartStore';
export default function Product({type, price, onAddToCart}) {
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <article>
      <span>{type}: ${price.toFixed(2)}</span>
      <button onClick={() => addToCart({type, price})}>
        Add to cart
      </button>
    </article>
  );
}