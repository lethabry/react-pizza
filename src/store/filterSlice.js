import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchValue: '',
    activeCategory: 0,
    activeSort: {
      title: 'популярности',
      property: 'rating',
    },
    selectedPage: 1,
  },
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setSelectedPage(state, action) {
      state.selectedPage = action.payload;
    },
    setUrlFilters(state, action) {
      state.activeCategory = Number(action.payload.category);
      state.activeSort = action.payload.sortBy;
      state.selectedPage = action.payload.currentPage;
    },
  },
});

export const { setActiveCategory, setActiveSort, setSelectedPage, setUrlFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
