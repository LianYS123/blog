import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";

export function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = ev => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 96, sm: 48 },
          right: { xs: 24, sm: 48 },
          zIndex: 999
        }}
      >
        <Fab color="primary" size="medium">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
