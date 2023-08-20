import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    homePageIdx: 1,
    searchPageIdx: 1,
    category: "best",
    scrollY: 0,
    width: window.innerWidth,
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
    setWidth: (state, action) => {
      const { width } = action.payload;
      state.width = width;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage, setSearchPage, setCategory, setScrollY, setWidth } =
  pageSlice.actions;
export const selectPage = (state) => state.page.homePageIdx;
export const selectSearchPage = (state) => state.page.searchPageIdx;
export const selectCategory = (state) => state.page.category;
export const selectScrollY = (state) => state.page.scrollY;
export const selectWidth = (state) => state.page.width;

export default pageSlice.reducer;
