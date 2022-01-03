import React from "react";
import routers from "routers";
import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useTheme } from "hooks/app";
import { useWindowScroll } from "react-use";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { appSlice } from "models/app";

// header
const AppHeader = () => {
  const history = useHistory();
  const intl = useIntl();
  const { userInfo } = useSelector(state => state.app);
  const { id: userId, account = "" } = userInfo;
  const { y } = useWindowScroll();
  const { toggleTheme, isDark } = useTheme();
  const { pathname } = useLocation();
  // const isHomePage = pathname === routers.HOME;
  const dispatch = useDispatch();
  const toLogin = () => {
    dispatch(appSlice.actions.clearToken()); // 清除token
    history.push(routers.LOGIN);
  };
  return (
    <header
      className={classNames(
        "flex w-full justify-between items-center pl-1 sm:pl-4 pr-6 py-3 z-20 transition-shadow fixed bg-white dark:bg-gray-900",
        {
          shadow: y > 10
          // "text-white": isHomePage && y < 20
          // "bg-gray-50 text-black": isHomePage && top > 100
        }
      )}
      // style={{
      //   background: isHomePage && y < 20 ? "transparent" : undefined,
      //   maxHeight: 52
      // }}
    >
      <div className="space-x-3 sm:space-x-4 ml-4 sm:ml-8">
        <button
          onClick={() => history.push(routers.HOME)}
          className="hover:underline"
        >
          主页
        </button>
        <button
          onClick={() => history.push(routers.ARTICLE_LIST)}
          className="hover:underline"
        >
          文章
        </button>

        <button
          onClick={() => history.push(routers.ESSAY)}
          className="hover:underline"
        >
          随笔
        </button>
      </div>
      <div
        id="header-right"
        className="space-x-4 relative font-semibold text-sm flex"
      >
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
                  个人空间
                </Dropdown.Item>
                <Dropdown.Item onClick={toLogin}>退出</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <span>
              <Avatar size="small">{(account[0] || "U").toUpperCase()}</Avatar>
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
