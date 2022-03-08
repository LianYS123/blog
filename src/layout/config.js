import React from "react";
import routers from "routers";
import { AccountCircle, Article, Home, Info } from "@mui/icons-material";
import MomentIcon from "./icons/MomentIcon";
import { SvgIcon } from "@mui/material";

export const APP_MENUS = [
  {
    to: routers.ABOUT,
    text: "About",
    icon: <Info />
  },
  {
    to: routers.ARTICLE_LIST,
    text: "Portfolio",
    icon: <Article />
  }
].filter(it => !it.hidden);

export const BOTTOM_MENUS = [
  {
    to: routers.ABOUT,
    text: "About",
    icon: <Info />
  },
  {
    to: routers.ARTICLE_LIST,
    text: "Portfolio",
    icon: <Article />
  }
].filter(it => !it.hidden);
