import { toast } from "react-toastify";
import { customFetch, getToken } from "../utils";

export const postOrder = async (orderData) => {
  try {
    const token = getToken();
    const response = await customFetch.post("/createOrder", orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Order placed successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "There was an error placing your order";
    toast.error(errorMessage);
    throw error;
  }
};
