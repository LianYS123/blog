import { useSelector } from "react-redux";

// 指定用户是否是当前登录用户
export const useIsCurrentUser = authorId => {
  const { userInfo, logged } = useSelector(state => state.app);
  const { id: userId } = userInfo; // 用户信息
  const isCurrentUser = logged && userId === authorId; // 是否是当前用户
  return isCurrentUser;
};
