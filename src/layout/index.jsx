import React from "react";
import routers from "routers";
import { useMutation } from "hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { GET_USERINFO_URL } from "services/API";
import { appSlice } from "models/app";
import AppHeader from "./header";
import Sidebar from "./sidebar";

const useInitUserInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadUserInfo] = useMutation(GET_USERINFO_URL);
  const fetchUserInfo = async () => {
    const { userInfo, code } = await loadUserInfo();
    if (code === "0000") {
      dispatch(appSlice.actions.setUserInfo(userInfo));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("acc")) {
      fetchUserInfo();
    } else {
      history.push(routers.LOGIN);
    }
  }, []);
};

// 页面布局
const AppLayout = ({ children }) => {
  useInitUserInfo();
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <main className="flex-auto overflow-auto container mx-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
