import { useSelector } from "react-redux";
import paymentHandler from "./PaymentHandler";
import SubmitBtn from "./SubmitBtn";

const OrdersList = () => {
  const orders = useSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.productId} className="order-item">
          <p>{order.productId}</p>
          <p>Quantity: {order.quantity}</p>
          <SubmitBtn
            onClick={() => paymentHandler(order)}
            text="Make Payment"
          />
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
