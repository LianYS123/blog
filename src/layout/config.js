import React from "react";
import routers from "routers";
import { Article, Home, Info } from "@mui/icons-material";
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
    to: routers.ESSAY,
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
