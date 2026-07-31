import React from "react";
import CartSummary from './CartSummary';
import Product from './Product';
import useCartStore from './useCartStore';

export default function App() {
  return <div>
      <CartSummary />
      <Product type="Apple" price={0.99} />
      <Product type="Orange" price={0.79} />
      <Product type="Banana" price={0.49} />
    </div>;
}
