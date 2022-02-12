import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Divider, IconButton, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import routers from "routers";
import { useHistory, useLocation } from "react-router-dom";

const menus = [
  {
    to: routers.HOME,
    text: "首页",
    icon: <InboxIcon />
  },
  {
    to: routers.ARTICLE_LIST,
    text: "文章",
    icon: <InboxIcon />
  },
  {
    to: routers.ESSAY,
    text: "动态",
    icon: <InboxIcon />
  },
  {
    to: routers.ABOUT,
    text: "关于",
    icon: <InboxIcon />
  }
];

export const SideBarMenuButton = () => {
  const [visible, setVisible] = React.useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

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
            {menus.map(({ text, to, icon }) => (
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
