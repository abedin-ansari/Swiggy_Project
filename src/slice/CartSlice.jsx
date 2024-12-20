import { createSlice } from "@reduxjs/toolkit";

// Get cart items from localStorage if they exist
const storedCartItems = localStorage.getItem("cartItems");
const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialCartItems,
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      // Save to localStorage whenever items are added
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItems: (state) => {
      state.items.pop();
      // Update localStorage when an item is removed
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items.length = 0;
      // Clear localStorage when cart is cleared
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItems, removeItems, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
