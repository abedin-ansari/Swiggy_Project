import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, removeItems } from "../slice/CartSlice";

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleRemoveItem = () => {
        dispatch(removeItems());
    } 

    return(
        <div className="text-center m-5 p-5">
            <h1 className="font-bold text-lg">Cart</h1>
            <div className="w-6/12 m-auto">

            {cartItems.length > 0 && <button     // When cartItem is there then only show button
             className="m-4 bg-black text-white p-2 rounded-lg"
             onClick={handleClearCart}
             >clearCart</button>}

             {cartItems.length===0 && <h1>Cart is empty! please add items to the cart</h1>}
                <ItemList items={cartItems} />

                {cartItems.length > 0 && <button className="bg-slate-600 border border-black p-2 m-2 rounded-lg" onClick={handleRemoveItem}>remove</button>}

            </div>
        </div>
    )
}

export default Cart;