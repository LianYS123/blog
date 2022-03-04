import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Settings from "./settings";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";

const drawerBleeding = 0;

function SettingsDrawser(props) {
  const { open, onOpen, onClose } = props;

  return (
    <SwipeableDrawer
      PaperProps={{ sx: { height: "95%" } }}
      anchor="bottom"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
    >
      {/* 一个上下滑动指示条 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Box
          sx={{
            width: 30,
            height: 6,
            backgroundColor: theme =>
              theme.palette.mode === "light" ? grey[300] : grey[900],
            borderRadius: 3
          }}
        ></Box>
      </Box>

      <Settings onOpen={onOpen} onClose={onClose} />
    </SwipeableDrawer>
  );
}

export default SettingsDrawser;
