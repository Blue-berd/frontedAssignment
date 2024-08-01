import { useEffect, useState } from "react";
import { ErrorElement, OrdersList, SectionTitle } from "../components/index.js";
import { customFetch, getToken } from "../utils/index.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      try {
        const response = await customFetch.get("/getOrders", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.length === 0) {
          setError("No orders to show");
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
      <SectionTitle text="Your Order Items" />
      <OrdersList orders={orders} />
    </>
  );
};

export default Orders;
