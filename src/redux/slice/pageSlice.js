import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    home: 1,
    search: 1,
    category: "HOME",
  },
  reducers: {
    setPage: (state, action) => {
      const { nextPage } = action.payload;
      state.home = nextPage;
    },
    setSearchPage: (state, action) => {
      const { nextPage } = action.payload;
      state.search = nextPage;
    },
    setCategory: (state, action) => {
      const { category } = action.payload;
      state.category = category;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage, setSearchPage, setCategory } = pageSlice.actions;
export const selectPage = (state) => state.page.home;
export const selectSearchPage = (state) => state.page.search;
export const selectCategory = (state) => state.page.category;

export default pageSlice.reducer;
