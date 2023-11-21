import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterSlice';
import shoppingCartReducer from './shoppingCartSlice';
import pizzasReducer from './pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    shoppingCart: shoppingCartReducer,
    pizzas: pizzasReducer,
  },
});
