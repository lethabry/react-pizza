import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShoppingCartItemType } from '../utils/constants';
import { RootState } from './store';

interface ShoppinCartInterface {
  summaryPrice: number;
  summaryAmount: number;
  shoppingCart: ShoppingCartItemType[];
}

type ChangerAmountPayload = {
  item: ShoppingCartItemType;
  amount: number;
};

const initialState: ShoppinCartInterface = {
  shoppingCart: [],
  summaryPrice: 0,
  summaryAmount: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<ShoppingCartItemType>) {
      const equalItemIndex: number = state.shoppingCart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.types === action.payload.types &&
          item.sizes === action.payload.sizes,
      );
      if (equalItemIndex !== -1) {
        state.shoppingCart[equalItemIndex].amount += 1;
      } else {
        state.shoppingCart.push({ ...action.payload });
      }
      state.summaryPrice = state.shoppingCart.reduce(
        (total, current) => (total += current.price * current.amount),
        0,
      );
      state.summaryAmount = state.shoppingCart.reduce(
        (total, current) => (total += current.amount),
        0,
      );
    },
    changeAmount(state, action: PayloadAction<ChangerAmountPayload>) {
      const { item, amount } = action.payload;
      const equalItemIndex: number = state.shoppingCart.findIndex(
        (shoppingCartItem) =>
          shoppingCartItem.id === item.id &&
          shoppingCartItem.types === item.types &&
          shoppingCartItem.sizes === item.sizes,
      );
      state.shoppingCart[equalItemIndex].amount = amount;
      state.summaryPrice = state.shoppingCart.reduce(
        (total, current) => (total += current.price * current.amount),
        0,
      );
      state.summaryAmount = state.shoppingCart.reduce(
        (total, current) => (total += current.amount),
        0,
      );
    },
    removeItem(state, action: PayloadAction<ShoppingCartItemType>) {
      state.shoppingCart = state.shoppingCart.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.types !== action.payload.types ||
          item.sizes !== action.payload.sizes,
      );
      state.summaryPrice = state.shoppingCart.reduce(
        (total, current) => (total += current.price * current.amount),
        0,
      );
      state.summaryAmount = state.shoppingCart.reduce(
        (total, current) => (total += current.amount),
        0,
      );
    },
    clearShoppingCart(state) {
      state.shoppingCart = [];
      state.summaryPrice = 0;
      state.summaryAmount = 0;
    },
  },
});

export const selectShoppingCart = (state: RootState) => state.shoppingCart;

export const { setItem, removeItem, changeAmount, clearShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
