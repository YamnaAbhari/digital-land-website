    // src/store/searchSlice.js (مثال)
    // import { createSlice } from '@reduxjs/toolkit';

    // const initialState = {
    //   searchTerm: '',
    // };

    // const searchSlice = createSlice({
    //   name: 'search',
    //   initialState,
    //   reducers: {
    //     setSearchTerm: (state, action) => {
    //       state.searchTerm = action.payload;
    //     },
    //     clearSearchTerm: (state) => {
    //       state.searchTerm = '';
    //     },
    //   },
    // });

    // export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
    // export default searchSlice.reducer;

    // SearchSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const searchSlice = createSlice({
//   name: 'search',
//   initialState: {
//     searchTerm: '',
//     lastSelectedProduct: null, // <-- این رو اضافه کن
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//       state.lastSelectedProduct = null; // وقتی سرچ جدید شروع میشه، محصول قبلی رو پاک کن
//     },
//     clearSearchTerm: (state) => {
//       state.searchTerm = '';
//       state.lastSelectedProduct = null;
//     },
//     setLastSelectedProduct: (state, action) => {
//       state.lastSelectedProduct = action.payload;
//     },
//   },
// });

// export const { setSearchTerm, clearSearchTerm, setLastSelectedProduct } = searchSlice.actions;
// export default searchSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    selectedProductTitle: null, // <-- این متغیر جدید رو اضافه کن
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.selectedProductTitle = null; // وقتی سرچ جدید شروع میشه، اسم محصول قبلی رو پاک کن
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
      state.selectedProductTitle = null;
    },
    setSelectedProductTitle: (state, action) => {
      state.selectedProductTitle = action.payload;
    },
  },
});

export const { setSearchTerm, clearSearchTerm, setSelectedProductTitle } = searchSlice.actions;
export default searchSlice.reducer;
