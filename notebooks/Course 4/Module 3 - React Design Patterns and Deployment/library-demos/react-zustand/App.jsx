// The shopping page from the "Managing State with Zustand" video, restaged to
// run with no build step. To watch it run, right-click index.html in this
// folder and choose "Show Preview", then add some fruit to the cart and clear
// it again.
//
// In the video, the store lived in its own file, useCartStore.js, and each
// component had a .jsx file of its own. The in-browser compiler used here can
// only load one JSX file per page, so everything shares this file, with a
// comment marking where each piece came from.

// #region globals
// zustand is loaded by index.html as a browser global (window.zustand) from a
// script tag. In the video's project, a bundler loaded the library instead,
// and this line was an import at the top of useCartStore.js:
//
//     import { create } from 'zustand';
//
// There is no build step here, so we read the piece we need off the global.
const { create } = zustand;
// #endregion

// #region cart-store
// The store. In the video this was the whole of useCartStore.js, a plain .js
// file (it renders nothing), ending in export default so that the components
// in other files could import it.
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => {
    set((state) => ({
      items: [...state.items, item]
    }));
  },
  clearCart: () => {
    set({ items: [] });
  }
}));
// #endregion

// #region cart-summary
// Video: CartSummary.jsx. It reads the cart straight from the store; nothing
// cart-related arrives through props.
function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  return <header>
    {items.length === 0 && <span>Cart is empty</span>}
    {items.length > 0 && <p>Cart items: {items.map((item) => item.type).join(", ")}</p>}
    <button onClick={clearCart}>Clear Cart</button>
    <hr />
  </header>;
}
// #endregion

// #region product
// Video: Product.jsx. Each product pulls the addItem action from the store,
// so no callback has to be passed down from the parent.
function Product({ type, price }) {
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <article>
      <span>{type}: ${price.toFixed(2)}</span>
      <button onClick={() => addToCart({ type, price })}>
        Add to cart
      </button>
    </article>
  );
}
// #endregion

// #region app-component
// Video: App.jsx. Compare this with the props version at the top of the
// reading: no state variable, and not one cart-related attribute.
function App() {
  return <div>
    <CartSummary />
    <Product type="Apple" price={0.99} />
    <Product type="Orange" price={0.79} />
    <Product type="Banana" price={0.49} />
  </div>;
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);
// #endregion
