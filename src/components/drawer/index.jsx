import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { IconButton, Typography, useScrollTrigger } from "@mui/material";
import { useRef } from "react";
import { Close } from "@mui/icons-material";

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
  const { children, title, extra, ...rest } = props;
  const ref = useRef();
  const trigger = useScrollTrigger({ target: ref.current || undefined }); // 使用undefined防止target为null时报错

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          height: "88%",
          overflow: "visible"
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.8)"
        }
      }}
      anchor="bottom"
      {...rest}
    >
      <IconButton
        onClick={props.onClose}
        sx={{
          display: {
            xs: "none",
            sm: "block"
          },
          position: "absolute",
          right: 0,
          color: grey[300],
          top: -drawerBleeding - 45,
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <Close />
      </IconButton>
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
          boxShadow: trigger ? 1 : 0,
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <Puller />
        <Box sx={{ display: "flex", p: 2, alignItems: "center" }}>
          <Typography sx={{ color: "text.secondary", flexGrow: 1 }}>
            {title}
          </Typography>
          <Box>{extra}</Box>
        </Box>
      </Box>
      <Box ref={ref} sx={{ height: "100%", overflow: "auto" }}>
        {children}
      </Box>
    </SwipeableDrawer>
  );
}
