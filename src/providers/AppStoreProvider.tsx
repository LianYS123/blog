import React from "react";
import store from "models";
import { Provider } from "react-redux";

export const AppStoreProvider: React.FC<{ children: React.ReactNode; }> = ({
  children
}) => {
  return <Provider store={store}>{children}</Provider>;
};
