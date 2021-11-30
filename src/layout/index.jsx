import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router";
import routers from "routers";
import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === routers.HOME;
  return (
    <div className="dark:bg-black dark:text-white">
      <div className="absolute h-14 w-full left-0 right-0 top-0 app-header">
        <AppHeader />
      </div>
      <main
        id="container"
        className={classNames("h-full", { "pt-14": !isHomePage })}
        // style={{ height: !isHomePage ? "calc(100vh - 56px)" : "100vh" }}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
