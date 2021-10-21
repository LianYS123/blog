import React from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import store from "models";

import { localMap } from "constants";
import { Provider, useSelector } from "react-redux";

// 国际化
import en_US from "locales/en_US";
import zh_CN from "locales/zh_CN";

import antd_zh_CN from "antd/lib/locale/zh_CN";
import antd_en_US from "antd/lib/locale/en_US";
import AppRoutes from "routers/AppRoutes";

import "./app.less";

const antdLocales = {
  zh_CN: antd_zh_CN,
  en_US: antd_en_US
};

const locales = {
  en_US,
  zh_CN
};

const App = () => {
  const { local } = useSelector(({ app }) => app);
  return (
    <ConfigProvider locale={antdLocales}>
      <IntlProvider
        messages={locales[local]}
        locale={localMap[local]}
        defaultLocale="en"
      >
        <AppRoutes />
      </IntlProvider>
    </ConfigProvider>
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
