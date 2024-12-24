import { createSlice } from "@reduxjs/toolkit";

const initialalbum = JSON.parse(localStorage.getItem("currentalbum")) || {
  albumid: null,
  albumname: null,
};

export const albumslice = createSlice({
  name: "album",
  initialState: {
    currentalbum: initialalbum,
    useralbum: JSON.parse(localStorage.getItem("useralbums")) || [],
  },
  reducers: {
    addalbum: (state, action) => {
      const newalbum = { ...action.payload, id: Date.now() };
      state.useralbum.push(newalbum);

      // state.currentalbum = action.payload;
      localStorage.setItem("useralbums", JSON.stringify(state.useralbum));
    },
    deletealbum: (state, action) => {
      state.currentalbum = { albumid: null, albumname: null };

      state.useralbum = state.useralbum.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("useralbums", JSON.stringify(state.useralbum));
    },
    setcurrentalbum: (state, action) => {
      state.currentalbum = action.payload;
      localStorage.setItem("currentalbum", JSON.stringify(action.payload));
    },
  },
});
// export const {resetsavedpassword} = passwordslice.actions;
export const { addalbum, deletealbum, setcurrentalbum } = albumslice.actions;
export default albumslice.reducer;
