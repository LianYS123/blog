import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    sectionList: []
  },
  reducers: {
    setSectionList(state, action) {
      state.sectionList = action.payload;
    }
  }
});

export default homeSlice.reducer;
