import React, { createContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { noop } from "lodash";
import { useContext } from "react";

const Context = createContext({
  visible: false,
  props: {}, // {title, content, okText, cancelText, onOk, onCancel...}
  open: noop,
  close: noop
});

export const useAlertDialog = () => {
  return useContext(Context);
};

export default function AlertDialogProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    title = "提示",
    content = "",
    okText = "确认",
    cancleText = "取消",
    onOk = noop,
    onCancel = noop
  } = props;
  const open = (props = {}) => {
    setProps(props);
    setVisible(true);
  };
  const close = () => {
    setProps({});
    setVisible(false);
  };
  const handleOk = async () => {
    if (loading) {
      return;
    }
    const res = onOk();
    if (res && typeof res.then === "function") {
      setLoading(true);
      try {
        await res;
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setLoading(false);
      }
    }
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
    onCancel();
  };
  return (
    <Context.Provider value={{ open, close, visible }}>
      <Dialog open={visible} onClose={handleCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{cancleText}</Button>
          <LoadingButton loading={loading} onClick={handleOk} autoFocus>
            {okText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {children}
    </Context.Provider>
  );
}
