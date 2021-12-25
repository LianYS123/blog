import { Avatar } from "@douyinfe/semi-ui";
import React from "react";

export const UserAvatar = ({ userInfo, ...rest }) => {
  const { id: userId, account = "u", avatar } = userInfo;
  return avatar ? (
    <Avatar src={avatar} {...rest} />
  ) : (
    <Avatar {...rest}>{account[0].toUpperCase()}</Avatar>
  );
};
