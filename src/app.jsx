import React from "react";
import { IntlProvider } from "react-intl";

import store from "models";

import { localMap } from "constants";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// 国际化
import en_US from "locales/en_US";
import zh_CN from "locales/zh_CN";

import AppRoutes from "routers/AppRoutes";

import "./app.less";
import { createTheme, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import AlertDialogProvider from "providers/AlertDialogProvider";
import LoginDialogProvider from "providers/LoginDialogProvider";
import { ProgressProvider } from "providers/ProgressProvider";

// 字体
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import "bytemd/dist/index.min.css";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/default.css";

const locales = {
  en_US,
  zh_CN
};

const App = () => {
  const { local, theme } = useSelector(({ app }) => app);
  return (
    <Router>
      <IntlProvider
        messages={locales[local]}
        locale={localMap[local]}
        defaultLocale="en"
      >
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: theme, // Switching the dark mode on is a single property value change.
              primary:
                theme === "dark"
                  ? {
                      main: "#8272db"
                    }
                  : {
                      main: "#5051c1"
                    }
            }
          })}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ProgressProvider>
              <SnackbarProvider
                // anchorOrigin={{ vertical: "top", horizontal: "right" }}
                maxSnack={3}
              >
                <AlertDialogProvider>
                  <LoginDialogProvider>
                    <AppRoutes />
                  </LoginDialogProvider>
                </AlertDialogProvider>
              </SnackbarProvider>
            </ProgressProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </IntlProvider>
    </Router>
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
