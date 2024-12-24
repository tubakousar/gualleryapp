import { configureStore } from "@reduxjs/toolkit";

import passwordslicereducer from "./PasswordSlice";
import albumslicereducer from "./AlbumSlice.js";
import photoslicereducer from "./PhotoSlice.js";

export const store = configureStore({
  reducer: {
    password: passwordslicereducer,
    album: albumslicereducer,
    photopage: photoslicereducer,
  },
});
