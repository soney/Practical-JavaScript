import { useState } from "react";

function CartSummary({ items, onClearCart }) {
    const cartLabel = items.map((item) => item.type).join(", ");

    return (
        <header className="card">
            <h1>My Store</h1>
            {items.length === 0 && <p>Cart is empty</p>}
            {items.length > 0 && <p>Cart items: {cartLabel}</p>}
            <button type="button" onClick={onClearCart}>
                Clear Cart
            </button>
        </header>
    );
}

function Product({ type, price, onAddToCart }) {
    return (
        <article className="card">
            {type}: ${price.toFixed(2)}
            <button type="button" onClick={() => onAddToCart({ type, price })}>
                Add to cart
            </button>
        </article>
    );
}

export default function App() {
    const [items, setItems] = useState([]);

    function addItem(item) {
        setItems((currentItems) => {
            return [...currentItems, item];
        })
    }

    function clearCart() {
        setItems([]);
    }

    return (
        <main className="app-shell">
            <CartSummary items={items} onClearCart={clearCart} />
            <Product type="Apple" price={0.99} onAddToCart={addItem} />
            <Product type="Orange" price={0.79} onAddToCart={addItem} />
            <Product type="Banana" price={0.49} onAddToCart={addItem} />
        </main>
    );
}