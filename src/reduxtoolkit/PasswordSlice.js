// import { api } from "./Apis";
import { createSlice } from "@reduxjs/toolkit";

export const passwordslice = createSlice({
  name: "password",
  initialState: {
    // userpassword:(localStorage.getItem("password")) ,

    savedpassword: localStorage.getItem("password") || "",
    loading: "idle",
    error: null,
  },
  reducers: {
    savepassword: (state, action) => {
      state.savedpassword = action.payload.password;

      localStorage.setItem("password", JSON.stringify(state.savedpassword));
    },
    resetsavedpassword: (state) => {
      state.savedpassword = "";
      // localStorage.removeItem("password");
    },
  },
});
export const { savepassword, resetsavedpassword } = passwordslice.actions;
export default passwordslice.reducer;
