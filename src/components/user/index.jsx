import { Avatar } from "@douyinfe/semi-ui";
import React from "react";

export const UserAvatar = ({ userInfo, ...rest }) => {
  const { id: userId, username, avatar } = userInfo;
  return avatar ? (
    <Avatar src={avatar} {...rest} />
  ) : (
    <Avatar {...rest}>{username[0].toUpperCase()}</Avatar>
  );
};
