import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartCount: 0,
  addToCart: () =>
    set((state) => ({
      cartCount: state.cartCount + 1,
    })),
  clearCart: () =>
    set({
      cartCount: 0,
    }),
}));
