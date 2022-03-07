import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography, useScrollTrigger } from "@mui/material";
import { useRef } from "react";

const drawerBleeding = 56;

// 一个上下滑动指示条
const Puller = () => {
  return (
    <Box
      sx={{
        width: 30,
        height: 6,
        backgroundColor: theme =>
          theme.palette.mode === "light" ? grey[300] : grey[900],
        borderRadius: 3,
        position: "absolute",
        top: 8,
        left: "calc(50% - 15px)"
      }}
    ></Box>
  );
};

export function CommonDrawer(props) {
  const { children, title } = props;
  const ref = useRef();
  const trigger = useScrollTrigger({ target: ref.current || undefined }); // 使用undefined防止target为null时报错

  return (
    <SwipeableDrawer
      PaperProps={{ sx: { height: "90%", overflow: "visible" } }}
      anchor="bottom"
      {...props}
    >
      <Box
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === "light" ? "#fff" : grey[800],
          position: "absolute",
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
          boxShadow: trigger ? 1 : 0
        }}
      >
        <Puller />

        <Typography sx={{ p: 2, color: "text.secondary" }}>{title}</Typography>
      </Box>
      <Box ref={ref} sx={{ height: "100%", overflow: "auto" }}>
        {children}
      </Box>
    </SwipeableDrawer>
  );
}
