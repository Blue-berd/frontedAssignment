import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { customFetch, getToken } from "../utils";
export const postOrder = async ({ orderData, dispatch }) => {
  try {
    const token = getToken();
    const response = await customFetch.post("/createOrder", orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Order placed successfully");
    dispatch(clearCart());

    redirect("/orders");

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "There was an error placing your order";
    toast.error(errorMessage);
    throw error;
  }
};
