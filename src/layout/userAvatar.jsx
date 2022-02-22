import { Avatar, ButtonBase, Menu, MenuItem } from "@mui/material";
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

// 用户头像和下拉菜单, 以及登录与退出逻辑
export const UserAvatar = () => {
  const history = useHistory();
  const { userInfo, logged } = useSelector(state => state.app);
  const { id: userId, account = "", avatar } = userInfo;
  const [anchorEl, setAnchorEl] = useState();
  const { open: openLoginDialog } = useLoginDialog();
  const { open: openAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // 进入登录页,登录成功的重定向地址为当前页
  const handleJumpToLogin = () => {
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

  const handleLogout = () => {
    openAlertDialog({
      content: "你确定要登出吗？",
      onOk: async () => {
        await logout();
        enqueueSnackbar("已登出");
        handleJumpToLogin();
      }
    });
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
          {avatar ? (
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={`${FILE_PREVIEW}?id=${avatar}`}
            />
          ) : (
            <Avatar sx={{ width: 32, height: 32 }}>
              {(account[0] || "U").toUpperCase()}
            </Avatar>
          )}
        </span>
      ) : (
        <ButtonBase onClick={handleJumpToLogin}>登录</ButtonBase>
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
          写文章
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            history.push(routers.USER_SPACE);
          }}
        >
          设置
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            handleLogout();
          }}
        >
          退出
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
