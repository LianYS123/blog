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
          <AppHeader />
          <main id="container" className="h-full pt-14">
            {children}
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AppLayout;
