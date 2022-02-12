import { Box } from "@mui/system";
import Loading from "components/loading";
import React from "react";
import { useSelector } from "react-redux";
import AppFooter from "./footer";
import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  const { isAppLoaded } = useSelector(state => state.app);
  return (
    <>
      {isAppLoaded ? (
        <Box sx={{ pb: 7 }}>
          <AppHeader />
          <main id="container" className="h-full pt-14">
            {children}
          </main>
          <AppFooter />
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AppLayout;
