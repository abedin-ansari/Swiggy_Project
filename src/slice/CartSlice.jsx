import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice ({
    name: 'cart',
    initialState: {
        items: []       // Currently item = 0/[]
    },
    reducers: {    // It can store multiple and reducers

        addItems: (state, action) => {            // A reducer function

            // Mutating Our State Here (Modifying the existing state)
            state.items.push(action.payload);
        },
        removeItems: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            // RTK - Either mutate the existing state or either return a new state.

            state.items.length = 0;      // This will make item = 0/[] again
            // Or
            // return {items: []};
        },
    },
});

export const {addItems, removeItems, clearCart} = CartSlice.actions;
export default CartSlice.reducer;