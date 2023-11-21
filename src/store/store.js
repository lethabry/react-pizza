import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterSlice';
import shoppingCartReducer from './shoppingCartSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    shoppingCart: shoppingCartReducer,
  },
});
