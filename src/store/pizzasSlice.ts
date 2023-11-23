import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPizzasAxios } from '../utils/api';
import { PizzaBlockProps } from '../utils/constants';

interface PizzaSliceInterface {
  pizzas: PizzaBlockProps[];
  status: string;
}

export type GetPizzasArgs = {
  selectedPage: number;
  activeCategory: number;
  activeSort: {
    property: string;
    title: string;
  };
};

const initialState: PizzaSliceInterface = {
  pizzas: [],
  status: 'loading',
};

export const getPizzasFetch = createAsyncThunk(
  'pizzas/getPizzasFetch',
  async ({ selectedPage, activeCategory, activeSort }: GetPizzasArgs) =>
    await getPizzasAxios({
      limit: '4',
      page: `${selectedPage}`,
      category: `${activeCategory === 0 ? '' : activeCategory}`,
      sortBy: activeSort.property,
      order: `${activeSort.property === 'rating' ? 'desc' : 'asc'}`,
    }),
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaBlockProps[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzasFetch.fulfilled, (state, action: PayloadAction<PizzaBlockProps[]>) => {
        state.status = 'success';
        state.pizzas = action.payload;
      })
      .addCase(getPizzasFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPizzasFetch.rejected, (state) => {
        state.pizzas = [];
        state.status = 'error';
      });
  },
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
