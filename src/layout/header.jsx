import React from "react";
import routers from "routers";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

// header
const AppHeader = () => {
  const history = useHistory();
  const intl = useIntl();
  const { id: userId, username } = useSelector(state => state.app.userInfo);
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow z-10">
      <div className="space-x-6">
        <span
          onClick={() => history.push(routers.HOME)}
          className="text-lg cursor-pointer hover:underline"
        >
          {intl.formatMessage({ id: "WEBSITE_NAME" })}
        </span>
        {/* <input
          placeholder="Search"
          className="border rounded py-2 px-3 shadow w-56 h-8 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        /> */}
      </div>
      <div className="space-x-4 text-sm">
        <span className="space-x-2">
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
