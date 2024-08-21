import { configureStore } from "@reduxjs/toolkit"; // configuring store is a redux job.
import cartReducer from "../slice/CartSlice";

const appStore = configureStore({
    reducer: {    // This reducer is responsible to modify Store. (And reducer means it will store only one reducer not (Reducers))
        cart: cartReducer,
    }
});

export default appStore;