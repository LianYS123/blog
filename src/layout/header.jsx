import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeSwitch } from "./themeSwitch";
import { UserAvatar } from "./userAvatar";
import { SideBarMenuButton } from "./sidebar";
import { useWindowScroll } from "react-use";

export default function AppHeader() {
  const { y } = useWindowScroll();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="inherit"
        sx={{ boxShadow: y > 10 ? 1 : 0 }}
        position="fixed"
      >
        <Toolbar>
          <SideBarMenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
