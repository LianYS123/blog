import React, { createContext, useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { noop } from "lodash";

import { useFormik } from "formik";
import * as yup from "yup";
import { USER_LOGIN } from "services/auth";
import { useCustomMutation, useRefresh } from "hooks";
import { useDispatch } from "react-redux";
import { encrypt, getCommonFieldProps } from "utils";
import { appSlice } from "models/app";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const Context = createContext({
  visible: false,
  props: {}, // {title, content, okText, cancelText, onOk, onCancel...}
  open: noop,
  close: noop
});

export const useLoginDialog = () => {
  return useContext(Context);
};

export default function LoginDialogProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const refresh = useRefresh();
  const [props, setProps] = useState({});
  const { tip = "" } = props;
  const open = (props = {}) => {
    setProps(props);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  // 登录
  const [submit, { loading }] = useCustomMutation(USER_LOGIN);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    account: yup.string("请输入账号").required("请输入账号"),
    password: yup
      .string("请输入密码")
      .min(6, "密码长度必须大于6位")
      .max(20, "密码长度必须小于20位")
  });

  const formik = useFormik({
    initialValues: {
      account: "",
      password: ""
    },
    validationSchema,
    onSubmit: async _values => {
      const values = { ..._values };
      values.password = encrypt(values.password); // 加密
      const result = await submit(values);
      const { data: token, success, code, message } = result;

      if (success) {
        dispatch(appSlice.actions.setToken(token));
        close();
        refresh();
        // history.go(0); // 重新加载页面
        // location.reload();
      } else if (code === 1011002) {
        enqueueSnackbar("账号或密码错误");
      } else {
        enqueueSnackbar(message);
      }
    }
  });

  return (
    <Context.Provider value={{ open, close, visible }}>
      <Dialog open={visible} onClose={() => close()}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>登录</DialogTitle>
          <DialogContent>
            {tip && <DialogContentText>{tip}</DialogContentText>}
            <TextField
              margin="dense"
              fullWidth
              variant="standard"
              label="账号"
              {...getCommonFieldProps("account", formik)}
            />
            <TextField
              margin="dense"
              type="password"
              fullWidth
              variant="standard"
              label="密码"
              {...getCommonFieldProps("password", formik)}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={() => close()}>
              取消
            </Button>
            <LoadingButton color="primary" loading={loading} type="submit">
              登录
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
      {children}
    </Context.Provider>
  );
}
