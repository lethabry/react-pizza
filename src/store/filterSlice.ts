import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortItem } from '../utils/constants';

export type UrlPayload = {
  category: string;
  sortBy: SortItem;
  currentPage: string;
};

interface FilterSliceInterface {
  searchValue: string;
  activeCategory: number;
  activeSort: SortItem;
  selectedPage: number;
}

const initialState: FilterSliceInterface = {
  searchValue: '',
  activeCategory: 0,
  activeSort: {
    title: 'популярности',
    property: 'rating',
  },
  selectedPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<SortItem>) {
      state.activeSort = action.payload;
    },
    setSelectedPage(state, action: PayloadAction<number>) {
      state.selectedPage = action.payload;
    },
    setUrlFilters(state, action: PayloadAction<UrlPayload>) {
      state.activeCategory = Number(action.payload.category);
      if (action.payload.sortBy) {
        state.activeSort = action.payload.sortBy;
      }
      state.selectedPage = Number(action.payload.currentPage);
    },
  },
});

export const { setActiveCategory, setActiveSort, setSelectedPage, setUrlFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
