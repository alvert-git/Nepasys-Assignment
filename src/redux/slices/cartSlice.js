import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isCartOpen: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(`Added ${quantity} more of ${product.title}`);
      } else {
        state.items.push({ ...product, quantity: quantity });
        toast.success(`${product.title} added to cart!`);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== productId);
          toast.info(`Item removed from cart.`);
        }
      }
    },
    removeAllFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      toast.info(`All instances removed from cart.`);
    },
  },
});

export const {
  toggleCart,
  setIsCartOpen,
  addToCart,
  removeFromCart,
  removeAllFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
