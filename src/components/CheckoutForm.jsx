import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { customFetch, getToken } from "../utils";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { address, pincode } = Object.fromEntries(formData);
    const { cartItems } = store.getState().cartState;

    // Extract productId and quantity correctly from cartItems
    const info = {
      address,
      pincode,
      cartItems: cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
    };

    // Debugging: Check info structure
    console.log("Info to be sent:", info);

    try {
      const token = getToken();

      await customFetch.post("/createOrder", info, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping Information</h4>
      <FormInput label="Address" name="address" type="text" />
      <FormInput label="Pincode" name="pincode" type="number" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
