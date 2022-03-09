import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppFooter from "./footer";
import AppHeader from "./header";
import { isiosDevice } from "utils";
import { useMount } from "react-use";
import { useLocation } from "react-router-dom";
import { APP_MENUS } from "./config";
import { ButtonBase, Container, Tab, Tabs, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import LogoSvg from "./logo";

// 页面布局
const AppLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <Box>
      {/* <AppHeader /> */}
      <Container>
        {/* <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 8, textAlign: "center" }}
        >
          Title...
        </Typography> */}
        <Box
          sx={{
            mt: 8,
            mb: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {/* <Box sx={{ mt: 8, mb: 2, textAlign: "center" }}> */}
          <LogoSvg />
        </Box>

        {/* <Box sx={{ mb: 4, display: "flex" }}> */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Tabs
            value={pathname}
            onChange={(ev, value) => history.push(value)}
            aria-label="disabled tabs example"
          >
            {APP_MENUS.map(({ to, text, icon }) => {
              return (
                <Tab label={text} value={to} key={to} />
                // <ButtonBase
                //   key={text}
                //   onClick={() => history.push(to)}
                //   sx={{
                //     px: 0.8,
                //     py: 0.4,
                //     borderBottom: to === pathname ? "3px solid" : "none",
                //     borderColor: "primary.main"
                //   }}
                // >
                //   {text}
                // </ButtonBase>
              );
            })}
          </Tabs>
        </Box>
        {children}
      </Container>
      <AppFooter />
    </Box>
  );
};

export default AppLayout;
