import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { noop } from "lodash";

export const ActionMenuButton = ({ actions = [], icon = <MoreVertIcon /> }) => {
  const [anchorEl, setAnchorEl] = useState();
  return (
    <>
      <IconButton
        onClick={ev => {
          ev.stopPropagation();
          setAnchorEl(ev.currentTarget);
        }}
      >
        {icon}
      </IconButton>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {actions.map((action, index) => {
          const { text, onClick = noop } = action;
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
