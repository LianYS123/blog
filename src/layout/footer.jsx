import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { APP_MENUS } from "./config";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-use";

export default function AppFooter() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        pb: 2,
        display: { xs: "block", sm: "none" }
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={pathname}
        onChange={(event, newValue) => {
          history.push(newValue);
        }}
      >
        {APP_MENUS.map(({ text, to, icon }) => (
          <BottomNavigationAction
            key={text}
            value={to}
            label={text}
            icon={icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
