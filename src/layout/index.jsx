import { Box } from "@mui/system";
import Loading from "components/loading";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppBottomNav from "./bottomNav";
import AppHeader from "./header";
import PWAPrompt from "react-ios-pwa-prompt";
import { isiosDevice } from "utils";
import { useMount } from "react-use";
import { useUpSM } from "hooks";
import { useLocation } from "react-router-dom";
import routers from "routers";

// 页面布局
const AppLayout = ({ children }) => {
  const { isAppLoaded } = useSelector(state => state.app);
  const [iOS, setiOS] = useState();
  useMount(() => {
    setiOS(isiosDevice());
  });
  const upSM = useUpSM();
  const { pathname } = useLocation();
  return (
    <>
      {isAppLoaded ? (
        <>
          <Box sx={{ pb: pathname === routers.HOME ? 0 : 7 }}>
            <AppHeader />
            <main id="container" className="h-full pt-14">
              {children}
            </main>
            <AppBottomNav />
          </Box>
          {iOS && (
            <PWAPrompt
              //debug={true}
              promptOnVisit={1}
              timesToShow={3}
              copyTitle="添加到主屏幕"
              copyClosePrompt="关闭"
              copyBody="该网站具有应用程序功能。将其添加到您的主屏幕，以便在全屏和离线时使用它。"
              copyShareButtonLabel="1) 点击 “分享” 按钮"
              copyAddHomeButtonLabel="2) 点击 “添加到主屏幕”"
              permanentlyHideOnDismiss={true}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AppLayout;
