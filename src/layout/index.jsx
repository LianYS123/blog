import LoginExpiredDialog from "components/dialog/LoginExpiredDialog";
import Loading from "components/loading";
import React from "react";
import { useSelector } from "react-redux";
import AppHeader from "./header";
import "./styles.less";

// 页面布局
const AppLayout = ({ children }) => {
  const { isAppLoaded } = useSelector(state => state.app);
  return (
    <>
      {isAppLoaded ? (
        <div className="dark:bg-black dark:text-white">
          <div className="absolute h-14 w-full left-0 right-0 top-0 app-header">
            <AppHeader />
          </div>
          <main id="container" className="h-full pt-14">
            {children}
          </main>
        </div>
      ) : (
        <Loading />
      )}
      <LoginExpiredDialog />
    </>
  );
};

export default AppLayout;
