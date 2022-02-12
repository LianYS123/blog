import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeSwitch } from "./themeSwitch";
import { UserAvatar } from "./userAvatar";
import { SideBarMenuButton } from "./sidebar";
import { useWindowScroll } from "react-use";
import { useHistory } from "react-router-dom";
import routers from "routers";

export default function AppHeader() {
  const { y } = useWindowScroll();
  const history = useHistory();
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
            Lian's Blog
          </Typography>
          <div className="flex items-center">
            <ThemeSwitch />
            <UserAvatar />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
