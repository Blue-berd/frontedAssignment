import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 15,
  tax: 3,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (i) => i.productId._id === product.productId._id
      );
      const quantity = parseInt(product.quantity, 10);
      const price = parseFloat(product.productId.price);

      if (item) {
        item.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      state.numItemsInCart += quantity;
      state.cartTotal += price * quantity;
      cartSlice.caseReducers.updateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.shipping = 15;
      state.tax = 3;
      state.orderTotal = 0;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      const product = state.cartItems.find(
        (i) => i.productId._id === productId
      );
      if (product) {
        state.cartItems = state.cartItems.filter(
          (i) => i.productId._id !== productId
        );
        state.numItemsInCart -= product.quantity;
        state.cartTotal -=
          parseFloat(product.productId.price) * product.quantity;
        cartSlice.caseReducers.updateTotals(state);
        toast.error("Item removed from cart");
      }
    },
    editItem: (state, action) => {
      const { productId, amount } = action.payload;
      const item = state.cartItems.find((i) => i.productId._id === productId);
      const newAmount = parseInt(amount, 10);
      if (item) {
        state.numItemsInCart += newAmount - item.quantity;
        state.cartTotal +=
          parseFloat(item.productId.price) * (newAmount - item.quantity);
        item.quantity = newAmount;
        cartSlice.caseReducers.updateTotals(state);
        toast.success("Cart updated");
      }
    },
    updateTotals: (state) => {
      state.tax = 3; // Assuming tax is fixed
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem, updateTotals } = cartSlice.actions;
export default cartSlice.reducer;
