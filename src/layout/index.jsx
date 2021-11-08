import { useModalAction } from "hooks";
import React, { useRef } from "react";
import { useScroll } from "react-use";
import AppHeader from "./header";
import Sidebar from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  const { open, ...modalProps } = useModalAction();
  const ref = useRef();
  const { y } = useScroll(ref);
  return (
    <div className="h-full">
      <AppHeader top={y} onMenuIconClick={() => open()} />
      <main
        ref={ref}
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
