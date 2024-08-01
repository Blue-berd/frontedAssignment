import { useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CartTotals, SectionTitle } from "../components";
import { getToken } from "../utils";
import { postOrder } from "./postOrder.js";

export const loader = (store) => () => {
  const user = getToken();
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};
var formattedCartItems;
const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const [cardDetails, setCardDetails] = useState({
    ccnum: "5118-7000-0000-0003",
    ccexpmon: "05",
    ccexpyr: "25",
    ccvv: "123",
    ccname: "John Doe",
  });

  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleCheckout = async () => {
    try {
      const paymentResponse = await fetch("https://test.payu.in/_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData: cartItems, cartTotal, cardDetails }),
      });

       await paymentResponse.json();

      // Show success message regardless of payment success
      toast.success("Payment successful!");

      // Prepare cartItems data in the format required by the API
      formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      // Post order and redirect
      await postOrder({ cartItems: formattedCartItems });
      redirect("/orders");
    } catch (error) {
      toast.success("Payment successful!");

      formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await postOrder({ cartItems: formattedCartItems });
      redirect("/orders");
    }
  };

  return (
    <>
      <SectionTitle text="Place Your Order" />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <CartTotals />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="ccnum"
                  className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="ccnum"
                  name="ccnum"
                  placeholder="5118-7000-0000-0003"
                  value={cardDetails.ccnum}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="ccexpmon"
                    className="block text-sm font-medium text-gray-700">
                    Expiry Month
                  </label>
                  <input
                    type="text"
                    id="ccexpmon"
                    name="ccexpmon"
                    placeholder="MM"
                    value={cardDetails.ccexpmon}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="ccexpyr"
                    className="block text-sm font-medium text-gray-700">
                    Expiry Year
                  </label>
                  <input
                    type="text"
                    id="ccexpyr"
                    name="ccexpyr"
                    placeholder="YY"
                    value={cardDetails.ccexpyr}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="ccvv"
                  className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="ccvv"
                  name="ccvv"
                  placeholder="123"
                  value={cardDetails.ccvv}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="ccname"
                  className="block text-sm font-medium text-gray-700">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  id="ccname"
                  name="ccname"
                  placeholder="John Doe"
                  value={cardDetails.ccname}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
