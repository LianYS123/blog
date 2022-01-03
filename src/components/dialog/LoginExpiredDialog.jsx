import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { useSelector } from "react-redux";
import { LOGIN_STATUS } from "constants/index";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";

const LoginExpiredDialog = () => {
  const history = useHistory();
  const { loginStatus } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(appSlice.actions.setLoginStatus(LOGIN_STATUS.NOT_LOGIN));
  };
  const handleToLogin = () => {
    dispatch(appSlice.actions.setLoginStatus(LOGIN_STATUS.NOT_LOGIN));
    history.push(routers.LOGIN);
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
