import React from "react";
import { Nav, SideSheet } from "@douyinfe/semi-ui";
import { FormattedMessage } from "react-intl";
import { IconHome, IconSetting, IconUser } from "@douyinfe/semi-icons";
import routers from "routers";
import { useHistory, useLocation } from "react-router";
import "./styles.less";

export const SideNavBar = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <Nav
      className="w-full h-full"
      selectedKeys={[pathname]}
      items={[
        { itemKey: routers.HOME, text: "主页", icon: <IconHome /> },
        {
          text: "文章管理",
          icon: <IconSetting />,
          itemKey: routers.ARTICLE
        },
        { itemKey: routers.RESOURCE, text: "资源管理", icon: <IconUser /> },
        {
          text: "标签管理",
          icon: <IconSetting />,
          itemKey: routers.TAG
        },
        {
          text: "字典管理",
          icon: <IconSetting />,
          itemKey: routers.DICT
        }
      ]}
      onSelect={data => {
        history.push({ pathname: data.itemKey });
        // close();
      }}
    />
  );
};

// 侧边栏
const Sidebar = ({ visible, close }) => {
  return (
    <SideSheet
      className="sidebar"
      width={300}
      bodyStyle={{ paddingRight: 0, paddingLeft: 16 }}
      headerStyle={{ borderBottom: "1px solid #dadce0", padding: "12px 16px" }}
      title={
        <div className="text-lg font-bold">
          <svg
            onClick={close}
            width="1.5em"
            height="1.5em"
            viewBox="0 0 48 48"
            className="cursor-pointer mr-6"
            style={{ transform: "translateY(-1px)", display: "inline" }}
          >
            <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"></path>
          </svg>
          <FormattedMessage id="WEBSITE_NAME" />
        </div>
      }
      onCancel={close}
      placement="left"
      visible={visible}
    >
      <SideNavBar />
    </SideSheet>
  );
};

export default Sidebar;
