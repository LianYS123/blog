import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";
import routers from "routers";

// 备份, 已弃用
export const Nav = () => {
  const { pathname } = useLocation();
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
      children: "动态"
    },
    {
      name: "linkNav~kyzmj59nff",
      to: routers.ABOUT,
      children: "关于"
    }
  ];
  return (
    <div id="header-right" className="relative flex items-center">
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
    </div>
  );
};
