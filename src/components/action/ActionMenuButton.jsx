import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export const ActionMenuButton = ({ actions = [] }) => {
  const [anchorEl, setAnchorEl] = useState();
  return (
    <>
      <IconButton
        onClick={ev => {
          ev.stopPropagation();
          setAnchorEl(ev.currentTarget);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {actions.map((action, index) => {
          const { text, onClick } = action;
          return (
            <MenuItem
              key={index}
              onClick={ev => {
                ev.stopPropagation();
                setAnchorEl(null);
                onClick(ev);
              }}
            >
              <ListItemText>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
