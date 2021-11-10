import { useModalAction } from "hooks";
import React, { useRef } from "react";
import { useMeasure, useScroll } from "react-use";
import AppHeader from "./header";
import Sidebar from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  const { open, ...modalProps } = useModalAction();
  const ref = useRef();
  const { y } = useScroll(ref);
  const [headerRef, { height }] = useMeasure();
  return (
    <div className="h-full relative">
      <div ref={headerRef}>
        <AppHeader top={y} onMenuIconClick={() => open()} />
      </div>
      <main
        ref={ref}
        id="container"
        style={{ height: `calc(100vh - ${height}px)` }}
        className="relative overflow-auto"
      >
        {children}
      </main>
      <Sidebar {...modalProps} />
    </div>
  );
};

export default AppLayout;
