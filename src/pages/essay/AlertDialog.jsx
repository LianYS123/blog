import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ close, visible, title, content, onOk }) {
  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>取消</Button>
          <Button
            onClick={() => {
              onOk();
              close();
            }}
            autoFocus
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
