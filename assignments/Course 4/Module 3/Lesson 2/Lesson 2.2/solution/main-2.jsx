// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// zustand is loaded by index.html as a global (window.zustand) from a <script> tag.
// In a project with a bundler you would import it instead:
//   import { create } from "zustand";
// There is no build step here, so we read `create` off the global instead of
// importing. This line is provided for you.
const { create } = zustand;

// The books for sale are the same for everyone, so this static list lives outside
// the components. This part is provided for you.
const PRODUCTS = [
  { id: "pragmatic", title: "The Pragmatic Programmer", price: 39.99 },
  { id: "clean-code", title: "Clean Code", price: 32.5 },
  { id: "refactoring", title: "Refactoring", price: 47 },
];

// Turns a dollar amount into a price string with exactly two decimals and a
// leading "$", e.g. formatPrice(39.99) is "$39.99" and formatPrice(47) is
// "$47.00". This part is provided for you -- call it whenever you need to
// display a price, instead of formatting the number yourself.
function formatPrice(amount) {
  return "$" + amount.toFixed(2);
}

// SOLUTION: one store holds the cart. Both Product and CartSummary read from it,
// so the cart never has to be passed through props.
const useCartStore = create((set) => ({
  items: [],
  addItem: (book) =>
    set((state) => ({ items: [...state.items, book] })),
  clearCart: () => set({ items: [] }),
}));

function Product({ book }) {
  // SOLUTION: pull just the addItem action out of the store with a selector
  const addItem = useCartStore((state) => state.addItem);
  return (
    <article className="card product">
      <h2 className="product-title">{book.title}</h2>
      {/* the price is shown with the provided formatPrice helper */}
      <p className="product-price">{formatPrice(book.price)}</p>
      <button onClick={() => addItem(book)}>Add to cart</button>
    </article>
  );
}

function CartSummary() {
  // SOLUTION: read the items and the clearCart action from the same store
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce((sum, book) => sum + book.price, 0);
  return (
    <header className="cart">
      <h1>Bookstore Cart</h1>
      <p className="status-line cart-status">
        <span className="cart-count">Items in cart: {items.length}</span>
        {" - "}
        {/* SOLUTION: format the total with the provided formatPrice helper */}
        <span className="cart-total">Total: {formatPrice(total)}</span>
      </p>
      <button className="danger" onClick={clearCart}>Clear cart</button>
    </header>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <CartSummary />
      <section className="card-grid product-grid">
        {PRODUCTS.map((book) => (
          <Product key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
