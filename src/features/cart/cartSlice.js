import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],

  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      //payload is newItem
      state.cart.push(action.payload);
    },
    removeItems(state, action) {
      //payload is pizzaID
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const selectedItem = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      selectedItem.quantity++;
      selectedItem.totalPrice = selectedItem.quantity * selectedItem.unitPrice;
    },
    decreaseQuantity(state, action) {
      const selectedItem = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      selectedItem.quantity--;
      selectedItem.totalPrice = selectedItem.quantity * selectedItem.unitPrice;

      if (selectedItem.quantity === 0)
        cartSlice.caseReducers.removeItems(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItems,
  removeItems,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartTotalNum = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (state) => state.cart.cart;

export const currentNumberById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
