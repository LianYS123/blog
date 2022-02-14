import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, IconButton, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory, useLocation } from "react-router-dom";
import { APP_MENUS } from "./config";

export const SideBarMenuButton = () => {
  const [visible, setVisible] = React.useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setVisible(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="left"
        open={visible}
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
      >
        <Box className="ml-1 py-1">
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setVisible(false)}
            sx={{ mr: 8 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setVisible(false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {APP_MENUS.map(({ text, to, icon }) => (
              <ListItemButton
                selected={pathname === to}
                onClick={() => history.push(to)}
                key={text}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
