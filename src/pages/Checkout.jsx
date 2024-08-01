import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CartTotals, SectionTitle } from "../components";
import paymentHandler from "../components/PaymentHandler.js";
import { getToken } from "../utils";
import { postOrder } from "./postOrder";

export const loader = (store) => () => {
  const user = getToken();
  console.log(user);
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  const cartItems = useSelector((state) => state.cartState.cartItems);

  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  const handleCheckout = async () => {
    try {
      const paymentSuccess = await paymentHandler(cartItems);
      if (!paymentSuccess) {
        throw new Error("Payment failed");
      }
      console.log("payment .............");
      // Place order
      await postOrder({ products: cartItems, totalAmount: cartTotal });

      // Redirect to orders page
      redirect("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was an issue with your checkout process.");
    }
  };

  return (
    <>
      <SectionTitle text="Place Your Order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CartTotals />
        {/* <SubmitBtn onClick={handleCheckout} text="Make Payment" /> */}
        <div onClick={handleCheckout} className="btn btn-primary btn-block">
          make payment
        </div>
      </div>
    </>
  );
};

export default Checkout;
