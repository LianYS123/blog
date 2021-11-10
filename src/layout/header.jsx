import React from "react";
import routers from "routers";
import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import classNames from "classnames";

// header
const AppHeader = ({ onMenuIconClick, top }) => {
  const history = useHistory();
  const intl = useIntl();
  const { id: userId, username } = useSelector(state => state.app.userInfo);
  const { pathname } = useLocation();
  return (
    <header
      className={classNames(
        "flex justify-between items-center pl-4 pr-6 py-3 z-20 transition-shadow duration-300",
        {
          shadow: top > 10,
          "bg-transparent absolute left-0 right-0 top-0 text-white":
            pathname === routers.HOME
        }
      )}
    >
      <div className="space-x-6">
        <svg
          onClick={onMenuIconClick}
          width="1.5em"
          height="1.5em"
          viewBox="0 0 48 48"
          className="cursor-pointer"
          style={{ transform: "translateY(-3px)", display: "inline" }}
        >
          <path
            fill="currentColor"
            d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"
          ></path>
        </svg>
        <span
          onClick={() => history.push(routers.HOME)}
          className="text-lg font-medium cursor-pointer hover:underline"
        >
          {intl.formatMessage({ id: "WEBSITE_NAME" })}
        </span>
        {/* <input
          placeholder="Search"
          className="border rounded py-2 px-3 shadow w-56 h-8 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        /> */}
      </div>
      <div className="space-x-4 font-semibold text-sm">
        <span className="space-x-4">
          <button
            onClick={() => history.push(routers.ARTICLE_LIST)}
            className="hover:underline"
          >
            文章
          </button>

          <button
            onClick={() => history.push(routers.EDITOR)}
            className="hover:underline"
          >
            写文章
          </button>

          {userId ? (
            <span className="text-sm">{username}</span>
          ) : (
            <button
              onClick={() => history.push(routers.LOGIN)}
              className="hover:underline"
            >
              {intl.formatMessage({ id: "LOGOUT" })}
            </button>
          )}
        </span>
        {/* <LanguageSelection size="small" className="w-24" /> */}
      </div>
    </header>
  );
};

export default AppHeader;
