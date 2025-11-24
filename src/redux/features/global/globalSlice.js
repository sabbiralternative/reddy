import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: 0,
  addBank: false,
  selectedCategory: "ALL",
  showLanguageModal: false,
  showNotification: false,
  showBanner: false,
  showAppPopUp: false,
  windowWidth: window.innerWidth,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setAddBank: (state, action) => {
      state.addBank = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setShowLanguageModal: (state, action) => {
      state.showLanguageModal = action.payload;
    },
    setShowNotification: (state, action) => {
      state.showNotification = action.payload;
    },
    setShowBanner: (state, action) => {
      state.showBanner = action.payload;
    },
    setShowAppPopUp: (state, action) => {
      state.showAppPopUp = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const {
  setGroup,
  setAddBank,
  setSelectedCategory,
  setShowLanguageModal,
  setShowNotification,
  setShowBanner,
  setShowAppPopUp,
  setWindowWidth,
} = stateSlice.actions;

export default stateSlice.reducer;
