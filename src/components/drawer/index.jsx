import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";

export function CommonDrawer(props) {
  const { children } = props;

  return (
    <SwipeableDrawer
      PaperProps={{ sx: { height: "95%" } }}
      anchor="bottom"
      {...props}
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
      {children}
    </SwipeableDrawer>
  );
}
