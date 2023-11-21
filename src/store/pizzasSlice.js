import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPizzasAxios } from '../utils/api';

export const getPizzasFetch = createAsyncThunk(
  'pizzas/getPizzasFetch',
  async ({ selectedPage, activeCategory, activeSort }) =>
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
  initialState: {
    pizzas: [],
    status: 'loading',
  },
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzasFetch.fulfilled, (state, action) => {
        state.status = 'success';
        state.pizzas = action.payload;
      })
      .addCase(getPizzasFetch.pending, (state) => {
        state.pizzas = [];
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
