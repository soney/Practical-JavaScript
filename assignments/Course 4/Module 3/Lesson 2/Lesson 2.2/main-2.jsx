// ===== YOUR TASK =====
// Edit this file to complete the assignment (see the problem description).
// The spots to change are marked with TODO comments below. Leave the rest as-is.
// =====================

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

// TODO: (1) Finish the cart store. `create` takes a function that receives `set` and
// returns the store object. Give the two actions real bodies:
//   - addItem(book) should add `book` to the end of items with `set`
//   - clearCart() should reset items to an empty array with `set`
const useCartStore = create((set) => ({
  items: [],
  addItem: (book) => {}, // TODO: (1) append book to items using set
  clearCart: () => {}, // TODO: (1) reset items to [] using set
}));

function Product({ book }) {
  // TODO: (3) read the addItem action from the store with a selector, e.g.
  //   const addItem = useCartStore((state) => state.addItem);
  const addItem = () => {}; // placeholder - replace using the store
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
  // TODO: (2) read `items` and `clearCart` from the store with selectors, e.g.
  //   const items = useCartStore((state) => state.items);
  //   const clearCart = useCartStore((state) => state.clearCart);
  const items = []; // placeholder - replace with the store's items
  const clearCart = () => {}; // placeholder - replace with the store's clearCart
  const total = items.reduce((sum, book) => sum + book.price, 0);
  return (
    <header className="cart">
      <h1>Bookstore Cart</h1>
      <p className="status-line cart-status">
        <span className="cart-count">Items in cart: {items.length}</span>
        {" - "}
        {/* TODO: (2) show the total by calling the provided formatPrice helper on
             `total`, i.e. formatPrice(total). It returns a string like "$39.99".
             Right now it prints the raw, unformatted number. */}
        <span className="cart-total">Total: {total}</span>
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
