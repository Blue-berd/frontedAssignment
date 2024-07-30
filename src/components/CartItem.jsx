import { formatPrice, generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { quantity, productId } = cartItem;
  const { name, price, image } = productId;

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ productId: productId._id }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ productId: productId._id, amount: parseInt(e.target.value) }));
  };

  return (
    <article
      key={productId._id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image[0]}
        alt={name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{name}</h3>
        {/* PRICE */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {formatPrice(price)}
        </h4>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={quantity}
            onChange={handleAmount}
          >
            {generateAmountOptions(quantity + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
