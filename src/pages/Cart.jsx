import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { addItem } from "../features/cart/cartSlice";
import { customFetch, getToken } from "../utils";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getToken();
        const response = await customFetch.get("/getCart", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const cartData = response.data.data;

        // Only add items that are not already in the store
        cartData.forEach((cartProduct) => {
          const itemExists = cartItems.some(
            (item) => item.productId._id === cartProduct.productId._id
          );
          if (!itemExists) {
            dispatch(addItem({ product: cartProduct }));
          }
        });

        setLoading(false);
      } catch (err) {
        setError("No cart items to fetch");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, cartItems, dispatch]);

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
