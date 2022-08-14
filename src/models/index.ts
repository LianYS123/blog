import { configureStore } from "@reduxjs/toolkit";
import app from "./app";
import home from "./home";

const store = configureStore({
  reducer: {
    app,
    home
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
