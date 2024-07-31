<<<<<<< HEAD
import { useState, useEffect } from "react";
import { postOrder } from "./postOrder.js";
import { OrdersList, SectionTitle, ErrorElement } from "../components";
import { customFetch, getToken } from "../utils/index.jsx";
=======
import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import {
  ComplexPaginationContainer,
  OrdersList,
  SectionTitle,
} from "../components";
import { postOrder } from "./postOrder.js";

>>>>>>> 162dc87da656abdfb57b681024c1298441b81db6

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      try {
        const response = await customFetch.get("/orders", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.length === 0) {
          setError("No products to show");
        } else {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: orders.map((order) => ({
        productId: order.productId,
        quantity: order.quantity,
      })),
    };

    try {
      await postOrder(orderData);
<<<<<<< HEAD
      console.log("Order placed successfully");
=======
>>>>>>> 162dc87da656abdfb57b681024c1298441b81db6
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <h4 className="font-bold text-4xl">Loading...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <ErrorElement message={error} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10">
        <h4 className="font-bold text-4xl">
          No Orders. Please order something.
        </h4>
      </div>
    );
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
<<<<<<< HEAD
      <OrdersList orders={orders} />
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
=======
      <OrdersList />
      <ComplexPaginationContainer />
      <button
        className="btn btn-primary mt-4"
        onClick={handlePlaceOrder}
        disabled={isLoading}>
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
>>>>>>> 162dc87da656abdfb57b681024c1298441b81db6
    </>
  );
};

export default Orders;
