import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ThemeSwitch } from "./themeSwitch";
import { UserAvatar } from "./userAvatar";
import { SideBarMenuButton } from "./sidebar";
import { useWindowScroll } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import routers from "routers";
import { APP_MENUS } from "./config";
import { ButtonBase, Slide, useScrollTrigger } from "@mui/material";
import LiamsBlog from "svg/LiamsBlog";
import { useUpSM } from "hooks";

export default function AppHeader() {
  const { y } = useWindowScroll();
  const history = useHistory();
  const { pathname } = useLocation();
  const trigger = useScrollTrigger();
  const upSM = useUpSM();
  return (
    <Slide in={!trigger}>
      <AppBar
        color="inherit"
        sx={{ boxShadow: y > 10 ? 1 : 0 }}
        position="fixed"
      >
        <Toolbar>
          {upSM ? (
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <LiamsBlog
                onClick={() => history.push(routers.HOME)}
                style={{ height: 36, cursor: "pointer" }}
              />
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <SideBarMenuButton />
            </Box>
          )}

          <div className="space-x-4 mr-2 hidden sm:block">
            {APP_MENUS.map(({ to, text, icon }) => {
              return (
                <ButtonBase
                  key={text}
                  onClick={() => history.push(to)}
                  sx={{
                    px: 0.8,
                    py: 0.4,
                    borderBottom: to === pathname ? "3px solid" : "none",
                    borderColor: "primary.main"
                  }}
                >
                  {text}
                </ButtonBase>
              );
            })}
          </div>
          <div className="flex items-center">
            <ThemeSwitch />
            <UserAvatar />
          </div>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
