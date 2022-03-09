import React from "react";
import routers from "routers";
import { Article, Info } from "@mui/icons-material";
import MomentIcon from "./icons/MomentIcon";

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
  },
  {
    to: routers.CREDENTIALS,
    text: "Credentials",
    icon: <MomentIcon />
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
  },
  {
    to: routers.CREDENTIALS,
    text: "Credentials",
    icon: <MomentIcon />
  }
].filter(it => !it.hidden);
