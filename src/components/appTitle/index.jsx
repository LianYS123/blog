import { ArrowBackIos } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { useWindowScroll } from "react-use";

/**
 * 带返回图标的页头
 */
export const AppTitle = ({ back, title, extra }) => {
  const history = useHistory();
  const { y } = useWindowScroll();
  const trigger = useScrollTrigger();
  const handleBack = () => {
    if (typeof back === "string") {
      history.push(back);
    } else if (typeof back === "function") {
      back();
    } else {
      history.goBack();
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide in={!trigger}>
        <AppBar
          color="inherit"
          sx={{ boxShadow: y > 10 ? 1 : 0 }}
          position="fixed"
        >
          <Toolbar variant="dense">
            {back ? (
              <IconButton sx={{ mr: 0.3 }} size="small" onClick={handleBack}>
                <ArrowBackIos fontSize="small" />
              </IconButton>
            ) : null}
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              <span>{title}</span>
            </Typography>
            {extra}
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};
