import React from "react";
import { IntlProvider } from "react-intl";

import store from "models";

import { localMap } from "constants";
import { Provider, useSelector } from "react-redux";

// 国际化
import en_US from "locales/en_US";
import zh_CN from "locales/zh_CN";

import AppRoutes from "routers/AppRoutes";

import "./app.less";
import { createTheme, MuiThemeProvider } from "@material-ui/core";

const locales = {
  en_US,
  zh_CN
};

const App = () => {
  const { local, theme } = useSelector(({ app }) => app);
  return (
    <IntlProvider
      messages={locales[local]}
      locale={localMap[local]}
      defaultLocale="en"
    >
      <MuiThemeProvider
        theme={createTheme({
          palette: {
            type: theme // Switching the dark mode on is a single property value change.
          }
        })}
      >
        <AppRoutes />
      </MuiThemeProvider>
    </IntlProvider>
  );
};

const WrapApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WrapApp;
