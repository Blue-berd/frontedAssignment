import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { postOrder } from "../utils/api";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

const Orders = () => {
  const { meta, orders } = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: orders.map((order) => ({
        productId: order.productId,
        quantity: order.quantity,
      })),
    };

    setIsLoading(true);

    try {
      await postOrder(orderData);
      // Optionally, you can fetch the latest orders or redirect the user
      // e.g., redirect('/orders');
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
      <button
        className="btn btn-primary mt-4"
        onClick={handlePlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
    </>
  );
};

export default Orders;
