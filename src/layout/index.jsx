import React from "react";
import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  return (
    <div className="dark:bg-black dark:text-white overflow-auto">
      <div className="absolute h-14 w-full left-0 right-0 top-0">
        <AppHeader />
      </div>
      <main id="container" className="mt-14">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
