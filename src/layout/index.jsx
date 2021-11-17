import React, { useRef } from "react";
import { useMeasure, useScroll } from "react-use";
import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  const ref = useRef();
  const { y } = useScroll(ref);
  const [headerRef, { height }] = useMeasure();
  return (
    <div className="h-full relative dark:bg-black dark:text-white">
      <div ref={headerRef}>
        <AppHeader top={y} />
      </div>
      <main
        ref={ref}
        id="container"
        style={{ height: `calc(100vh - ${height}px)` }}
        className="relative overflow-auto"
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
