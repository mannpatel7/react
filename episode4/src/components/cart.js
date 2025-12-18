import { useSelector } from "react-redux";
import CategoryAccordion from "./catagory";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartslice";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
const dispatch = useDispatch();
const handleclear=()=>{
    dispatch(clearCart());
}
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-800 py-10">
    <div className="text-center p-2 m-3">
      <h1 className="font-bold text-2xl dark:text-white">Cart</h1>

      <CategoryAccordion
        category="Cart Items"
        items={cart.items}   
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleclear}>
         ClearCart
      </button>
      {cart.items.length===0 && <h2 className="font-bold text-xl mt-4">Your cart is empty!!</h2>}
    </div>
    </div>
  );
};

export default Cart;
