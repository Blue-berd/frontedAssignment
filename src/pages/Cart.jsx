import { useSelector, useDispatch } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch, getToken } from "../utils";
import { addItem } from "../features/cart/cartSlice";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getToken();
        const response = await customFetch.get("/cart", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const cartData = response.data.data;
        cartData.forEach((cartProduct) => {
          dispatch(addItem({ product: cartProduct }));
        });

        setCartItems(cartData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart items");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const numItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) {
    return <SectionTitle text="Loading cart items..." />;
  }

  if (error) {
    return <SectionTitle text={error} />;
  }

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList items={cartItems} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals items={cartItems} />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to Checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
