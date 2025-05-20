import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

type BooksFilterState = {
  query?: string;
  genres?: number[];  // Теперь genres это массив чисел (идентификаторов)
};

const initialState: BooksFilterState = {
  query: undefined,
  genres: [],
};

export const booksFilterSlice = createSlice({
  name: 'booksFilter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string | undefined>) => {
      state.query = action.payload;
    },
    setGenres: (state, action: PayloadAction<number[] | undefined>) => {
      state.genres = action.payload;
    },
    resetFilters: (state) => {
      state.query = undefined;
      state.genres = [];
    },
  },
});

export const getQuery = (state: RootState) => state.booksFilter.query;

export const getGenresFilter = (state: RootState) => state.booksFilter.genres;

export const { setQuery, setGenres, resetFilters } = booksFilterSlice.actions;

export default booksFilterSlice.reducer;
