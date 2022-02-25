import React, { createContext, useContext, useState } from "react";
import { noop } from "lodash";
import { Portal } from "@mui/base";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

const Context = createContext({
  showProgress: noop,
  hideProgress: noop,
  setProgressVisible: noop
});

export const useGlobalProgress = () => {
  return useContext(Context);
};

/**
 * 全局加载状态
 */
export const ProgressProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showProgress = () => {
    setVisible(true);
  };
  const hideProgress = () => {
    setVisible(false);
  };
  return (
    <Context.Provider
      value={{ showProgress, hideProgress, setProgressVisible: setVisible }}
    >
      <Portal container={document.body}>
        {visible ? (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0
              }}
            >
              <LinearProgress />
            </Box>
          </Box>
        ) : null}
      </Portal>
      {children}
    </Context.Provider>
  );
};
