import React from "react";
import routers from "routers";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";

// header
const AppHeader = ({ onMenuIconClick }) => {
  const history = useHistory();
  const intl = useIntl();
  const { id: userId, username } = useSelector(state => state.app.userInfo);
  return (
    <header className="flex justify-between items-center pl-4 pr-6 py-3 shadow z-10">
      <div className="space-x-6">
        <svg
          onClick={onMenuIconClick}
          width="1.5em"
          height="1.5em"
          viewBox="0 0 48 48"
          className="cursor-pointer"
          style={{ transform: "translateY(-2px)", display: "inline" }}
        >
          <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"></path>
        </svg>
        <span
          onClick={() => history.push(routers.HOME)}
          className="text-lg font-bold cursor-pointer hover:underline"
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
          <Button onClick={() => history.push(routers.EDITOR)}>写文章</Button>

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
