import {
  Avatar,
  ButtonBase,
  Link,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { appSlice } from "models/app";
import { useSnackbar } from "notistack";
import { useLoginDialog } from "providers/LoginDialogProvider";
import { useAlertDialog } from "providers/AlertDialogProvider";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import routers from "routers";
import { FILE_PREVIEW } from "services/app";
import { USER_LOGOUT } from "services/auth";
import qs from "query-string";
import { getQualityImage } from "utils";
import { Box } from "@mui/system";

// 用户头像和下拉菜单, 以及登录与退出逻辑
export const UserAvatar = () => {
  const history = useHistory();
  const { userInfo, logged } = useSelector(state => state.app);
  const { id: userId, account = "", avatarUrl, avatar } = userInfo;
  const [anchorEl, setAnchorEl] = useState();
  const { open: openLoginDialog } = useLoginDialog();
  const { open: openAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // 进入登录页,登录成功的重定向地址为当前页
  const handleJumpToLogin = () => {
    // openLoginDialog();
    history.push({
      pathname: routers.LOGIN,
      search: qs.stringify({ redirect: pathname })
    });
  };

  // 登出
  const logout = async () => {
    await fetch(USER_LOGOUT); // 登出接口使用GET请求，且不会返回数据，因此直接使用fetch请求
    dispatch(appSlice.actions.setUserInfo({})); // 清空用户数据
    dispatch(appSlice.actions.clearToken()); // 清除token
    dispatch(appSlice.actions.setLogged(false)); // 修改登录状态
  };

  const handleLogout = async () => {
    await logout();
    handleJumpToLogin();
    // openLoginDialog({ tip: "已登出，请重新登录" });
  };

  return (
    <React.Fragment>
      {logged ? (
        <span
          className="cursor-pointer"
          onClick={ev => {
            setAnchorEl(ev.currentTarget);
          }}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={getQualityImage(avatarUrl)}
          />
        </span>
      ) : (
        <ButtonBase onClick={handleJumpToLogin}>
          <Typography
            component="span"
            variant="overline"
            sx={{ cursor: "pointer" }}
          >
            Login
          </Typography>
        </ButtonBase>
      )}
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            history.push(routers.EDITOR);
          }}
        >
          Add Article
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            handleLogout();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
