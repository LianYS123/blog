import React from "react";
import routers from "routers";
import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useTheme } from "hooks/app";
import { useWindowScroll } from "react-use";
import { Avatar, Dropdown, Tooltip } from "@douyinfe/semi-ui";
import { appSlice } from "models/app";
import { Link } from "react-router-dom";
import { FILE_PREVIEW } from "services/app";
import { stringify } from "query-string";

// header
const AppHeader = () => {
  const history = useHistory();
  const intl = useIntl();
  const { userInfo } = useSelector(state => state.app);
  const { id: userId, account = "", avatar } = userInfo;
  const { y } = useWindowScroll();
  const { toggleTheme, isDark } = useTheme();
  const { pathname } = useLocation();
  // const isHomePage = pathname === routers.HOME;
  const dispatch = useDispatch();
  const toLogin = () => {
    dispatch(appSlice.actions.clearToken()); // 清除token
    history.push({
      pathname: routers.LOGIN,
      search: stringify({ redirect: pathname })
    });
  };
  const navs = [
    {
      name: "linkNav",
      to: routers.HOME,
      children: "首页"
    },
    {
      name: "linkNav~kyzmiq0v89f",
      to: routers.ARTICLE_LIST,
      children: "文章"
    },
    {
      name: "linkNav~kyzmiyd5o7",
      to: routers.ESSAY,
      children: "随笔"
    },
    {
      name: "linkNav~kyzmj59nff",
      to: routers.ABOUT,
      children: "关于"
    }
  ];
  return (
    <header
      className={classNames(
        "flex w-full justify-between items-center px-2 md:px-24 z-20 transition-shadow fixed bg-white dark:bg-gray-900 header",
        {
          shadow: y > 10
        }
      )}
      // style={{
      //   background: isHomePage && y < 20 ? "transparent" : undefined,
      //   maxHeight: 52
      // }}
    >
      <div className="flex items-center">
        <img
          style={{ height: 56 }}
          src="https://blog-1259462774.cos.ap-shanghai.myqcloud.com/illustrations/%E6%98%9F%E8%BD%A8.svg"
          alt="logo"
        />
        {/* <span className="ml-2">Blog</span> */}
        {/* <Link to={routers.HOME}>主页</Link>
        <Link to={routers.ARTICLE_LIST}>文章</Link>
        <Link to={routers.ESSAY}>随笔</Link> */}
      </div>
      <div id="header-right" className="space-x-4 relative flex items-center">
        <div className="header-menu">
          {navs.map(({ name, children, to }) => {
            return (
              <Link
                key={name}
                className={classNames("header-menu-item", {
                  active: pathname === to
                })}
                to={to}
              >
                {children}
              </Link>
            );
          })}
        </div>
        <Tooltip content="切换主题">
          <span onClick={() => toggleTheme()} className="cursor-pointer">
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                className="icon"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320-140.8 320-320 320m0 64c211.2 0 384-172.8 384-384S723.2 128 512 128 128 300.8 128 512s172.8 384 384 384zm288-384c0-160-128-288-288-288v576c160 0 288-128 288-288zm-320 96H243.2c6.4 12.8 12.8 32 19.2 44.8H480V608zm0-192v-44.8H262.4c-6.4 12.8-12.8 32-19.2 44.8H480zm0-115.2V256h-96c-25.6 12.8-44.8 25.6-64 44.8h160zM224 537.6h256v-44.8H224v44.8zm256 185.6H320c19.2 19.2 38.4 32 64 44.8h96v-44.8z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                className="icon"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 192c179.2 0 320 140.8 320 320S691.2 832 512 832 192 691.2 192 512s140.8-320 320-320m0-64c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384zm32 288h236.8c-6.4-12.8-12.8-32-19.2-44.8H544V416zm0 192v44.8h217.6c6.4-12.8 12.8-32 19.2-44.8H544zm0 115.2V768h96c25.6-12.8 44.8-25.6 64-44.8H544zm256-230.4H544v44.8h256V512v-19.2zm-256-192h160c-19.2-19.2-38.4-32-64-44.8h-96v44.8z"
                ></path>
              </svg>
            )}
          </span>
        </Tooltip>

        {userId ? (
          <Dropdown
            // getPopupContainer={() => document.getElementById("header-right")}
            // trigger="click"
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push(routers.EDITOR)}>
                  写文章
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push(routers.USER_SPACE)}>
                  设置
                </Dropdown.Item>
                <Dropdown.Item onClick={toLogin}>退出</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <span>
              {avatar ? (
                <Avatar src={`${FILE_PREVIEW}?id=${avatar}`} size="small" />
              ) : (
                <Avatar size="small">
                  {(account[0] || "U").toUpperCase()}
                </Avatar>
              )}
            </span>
          </Dropdown>
        ) : (
          <button onClick={toLogin} className="hover:underline">
            登录
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
