import { configureStore } from "@reduxjs/toolkit";
import app from "./app";
import home from "./home";

export default configureStore({
  reducer: {
    app,
    home
  }
});
