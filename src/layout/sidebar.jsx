import React from "react";
import { Nav, SideSheet } from "@douyinfe/semi-ui";
import { FormattedMessage } from "react-intl";
import Icon, {
  IconArticle,
  IconHome,
  IconImage,
  IconPriceTag,
  IconSetting,
  IconUser,
  IconUserGroup
} from "@douyinfe/semi-icons";
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
        { itemKey: routers.USER, text: "用户管理", icon: <IconUser /> },
        { itemKey: routers.ROLE, text: "角色管理", icon: <IconUserGroup /> },
        {
          text: "文章管理",
          icon: <IconArticle />,
          itemKey: routers.ARTICLE
        },
        { itemKey: routers.RESOURCE, text: "资源管理", icon: <IconImage /> },
        {
          text: "标签管理",
          icon: <IconPriceTag />,
          itemKey: routers.TAG
        },
        {
          text: "字典管理",
          icon: (
            <Icon
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M957.217 1019.548h-801.39A129.113 129.113 0 0126.712 890.435v-756.87A129.113 129.113 0 01155.826 4.452h712.348a129.113 129.113 0 01129.113 129.113v621.078a39.402 39.402 0 01-8.593 27.025c-24.309 30.81-35.706 59.437-35.706 86.506 0 27.07 11.397 55.652 35.706 86.506a40.07 40.07 0 01-31.477 64.868zM917.147 716.8V133.565a48.974 48.974 0 00-48.973-48.974H155.826a48.974 48.974 0 00-48.974 48.974V734.61a150.706 150.706 0 0171.235-17.809h739.06zm-739.06 222.609h709.098a188.861 188.861 0 01-14.336-71.235c0-24.042 4.853-47.772 14.336-71.235H178.087a71.235 71.235 0 100 142.47zm111.304-716.8H734.61a44.522 44.522 0 010 89.043H289.39a44.522 44.522 0 110-89.043zm0 267.13H734.61a44.522 44.522 0 010 89.044H289.39a44.522 44.522 0 010-89.044z"></path>
                </svg>
              }
            />
          ),
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
