import { createSlice } from "@reduxjs/toolkit";

export const photoslice = createSlice({
  name: "photopage",
  initialState: {
    userphotos: JSON.parse(localStorage.getItem("photo")) || [],
  },
  reducers: {
    addimg: (state, action) => {
      state.userphotos.push(action.payload);
      localStorage.setItem("photo", JSON.stringify(state.userphotos));
    },
    deleteimgaction: (state, action) => {
      state.userphotos = state.userphotos.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("photo", JSON.stringify(state.userphotos));
    },
    deleteselectedallimgs: (state, action) => {
      const remove = action.payload;
      state.userphotos = state.userphotos.filter(
        (item) => !remove.includes(item.id)
      );

      localStorage.setItem("photo", JSON.stringify(state.userphotos));
    },
  },
});
export const { addimg, deleteimgaction, deleteselectedallimgs } =
  photoslice.actions;
export default photoslice.reducer;
