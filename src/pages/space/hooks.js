import { GET_LOGIN_USER } from "services/auth";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";
import { useMutation } from "hooks";

export const useReloadUserInfo = () => {
  const [getUserInfo] = useMutation(GET_LOGIN_USER);
  const dispatch = useDispatch();

  const reloadUserInfo = async () => {
    const { success, data } = await getUserInfo();
    if (success) {
      dispatch(appSlice.actions.setUserInfo(data));
    }
  };
  return reloadUserInfo;
};
