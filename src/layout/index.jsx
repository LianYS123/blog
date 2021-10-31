import { useModalAction } from "hooks";
import React from "react";
import AppHeader from "./header";
import Sidebar from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  const { open, ...modalProps } = useModalAction();
  return (
    <div className="h-full">
      <AppHeader onMenuIconClick={() => open()} />
      <main
        id="container"
        style={{ height: "calc(100vh - 60px)" }}
        className="overflow-auto relative px-20"
      >
        {children}
      </main>
      <Sidebar {...modalProps} />
    </div>
  );
};

export default AppLayout;
