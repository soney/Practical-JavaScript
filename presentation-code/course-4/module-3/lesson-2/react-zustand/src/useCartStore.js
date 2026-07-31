import { create } from 'zustand';

export default create((set) => ({
    items: [],
    addItem: (item) => {
        set((state) => ({
            items: [...state.items, item]
        }))
    },
    clearCart: () => {
        set({ items: [] });
    }
}));