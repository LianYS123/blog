import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeSwitch } from "./themeSwitch";
import { UserAvatar } from "./userAvatar";
import { SideBarMenuButton } from "./sidebar";
import { useWindowScroll } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import routers from "routers";
import { APP_MENUS } from "./config";
import { Button, ButtonBase } from "@mui/material";

export default function AppHeader() {
  const { y } = useWindowScroll();
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="inherit"
        sx={{ boxShadow: y > 10 ? 1 : 0 }}
        position="fixed"
      >
        <Toolbar>
          <SideBarMenuButton />
          <Typography
            className="cursor-pointer"
            variant="h6"
            component="div"
            onClick={() => history.push(routers.HOME)}
            sx={{ flexGrow: 1 }}
          >
            Lian's Space
          </Typography>
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
    </Box>
  );
}
