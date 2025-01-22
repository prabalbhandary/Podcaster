import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/auth";
import audioPlayerReducer from "./AudioPlayer/AudioPlayer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    audioPlayer: audioPlayerReducer
  },
});

export default store;