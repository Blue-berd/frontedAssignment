import { useSelector } from "react-redux";

const OrdersList = () => {
  const orders = useSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.productId} className="order-item">
          <p>{order.productId}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
