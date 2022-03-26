import React from "react";
import routers from "routers";
import { AccountCircle, Apps, Article, Home, Info } from "@mui/icons-material";
import MomentIcon from "./icons/MomentIcon";
import { SvgIcon } from "@mui/material";

export const APP_MENUS = [
  {
    to: routers.HOME,
    text: "首页",
    icon: <Home />
  },
  {
    to: routers.ARTICLE_LIST,
    text: "文章",
    icon: <Article />
  },
  {
    to: routers.RESOURCE,
    text: "资源",
    icon: <Apps />
  },
  {
    to: routers.MOMENT,
    text: "动态",
    icon: (
      <SvgIcon>
        <MomentIcon />
      </SvgIcon>
    )
  },
  {
    to: routers.ABOUT,
    text: "关于",
    icon: <Info />
  }
];

export const BOTTOM_MENUS = [
  {
    to: routers.HOME,
    text: "首页",
    icon: <Home />
  },
  {
    to: routers.ARTICLE_LIST,
    text: "文章",
    icon: <Article />
  },
  {
    to: routers.MOMENT,
    text: "动态",
    icon: (
      <SvgIcon>
        <MomentIcon />
      </SvgIcon>
    )
  },
  {
    to: routers.USER_SPACE,
    text: "我的",
    icon: <AccountCircle />,
    requireLogin: true
  }
];
