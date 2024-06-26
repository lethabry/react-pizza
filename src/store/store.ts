import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
