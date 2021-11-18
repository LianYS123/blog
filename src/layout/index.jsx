import React, { useRef } from "react";
import { useScroll } from "react-use";
import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  const ref = useRef();
  const { y } = useScroll(ref);
  return (
    <div className="relative h-full dark:bg-black dark:text-white overflow-hidden">
      <div className="absolute w-full left-0 right-0 top-0">
        <AppHeader top={y} />
      </div>
      <main
        ref={ref}
        id="container"
        className="relative h-full overflow-auto mt-14"
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
