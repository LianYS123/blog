import React from "react";
import { Portal } from "@mui/base";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSpinDelay } from "hooks";
import { useIsFetching } from "react-query";

/**
 * 全局加载状态
 */
export const GlobalProgress = () => {
  const loading = useIsFetching({
    predicate: query => query.state.status === "loading"
  });
  const visible = useSpinDelay(loading);
  return (
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
  );
};
