import { Layout } from "@douyinfe/semi-ui";
import { useModalAction } from "hooks";
import React from "react";
import AppHeader from "./header";
import Sidebar from "./sidebar";
import { SideNavBar } from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  const { open, ...modalProps } = useModalAction();
  return (
    <div className="dark:bg-black dark:text-white">
      <Layout>
        <Layout.Header>
          <AppHeader />
        </Layout.Header>
        <Layout.Content>
          <Layout>
            <Layout.Sider className="w-52">
              <SideNavBar />
            </Layout.Sider>
            <Layout.Content className="py-2">{children}</Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default AppLayout;
