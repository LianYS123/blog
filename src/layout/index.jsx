import { Layout } from "@douyinfe/semi-ui";
import React from "react";
import AppHeader from "./header";
import { SideNavBar } from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  return (
    <div className="dark:bg-black dark:text-white h-full">
      <Layout className="h-full">
        <Layout.Header>
          <AppHeader />
        </Layout.Header>
        <Layout.Content>
          <Layout className="h-full">
            <Layout.Sider className="w-52">
              <SideNavBar />
            </Layout.Sider>
            <Layout.Content className="py-2 overflow-auto">
              {children}
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default AppLayout;
