import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { useSelector } from "react-redux";
import { LOGIN_STATUS } from "constants/index";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";
import { stringify } from "query-string";
import { useLocation } from "react-use";

const LoginExpiredDialog = () => {
  const history = useHistory();
  const { loginStatus } = useSelector(state => state.app);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(appSlice.actions.setLoginStatus(LOGIN_STATUS.NOT_LOGIN));
  };
  const handleToLogin = () => {
    dispatch(appSlice.actions.setLoginStatus(LOGIN_STATUS.NOT_LOGIN));
    dispatch(appSlice.actions.clearToken()); // 清除token
    history.push({
      pathname: routers.LOGIN,
      search: stringify({ redirect: pathname })
    });
  };
  return (
    <Dialog
      open={loginStatus === LOGIN_STATUS.LOGIN_EXPIRED}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>
          您当前登录会话已过期，是否前往重新登录?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleToLogin} color="primary">
          前往登录
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginExpiredDialog;
