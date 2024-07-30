import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.productId._id} cartItem={item} />
      ))}
    </>
  );
};
export default CartItemsList;
