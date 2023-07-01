import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    homePageIdx: 1,
    searchPageIdx: 1,
    category: "HOME",
    scrollY: 0,
  },
  reducers: {
    setPage: (state, action) => {
      const { nextPage } = action.payload;
      state.homePageIdx = nextPage;
    },
    setSearchPage: (state, action) => {
      const { nextPage } = action.payload;
      state.searchPageIdx = nextPage;
    },
    setCategory: (state, action) => {
      const { category } = action.payload;
      state.category = category;
    },
    setScrollY: (state, action) => {
      const { scrollY } = action.payload;
      state.scrollY = scrollY;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage, setSearchPage, setCategory, setScrollY } =
  pageSlice.actions;
export const selectPage = (state) => state.page.homePageIdx;
export const selectSearchPage = (state) => state.page.searchPageIdx;
export const selectCategory = (state) => state.page.category;
export const selectScrollY = (state) => state.page.scrollY;

export default pageSlice.reducer;
