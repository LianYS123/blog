import React from "react";
import { Typography } from "@douyinfe/semi-ui";
import { useMutation } from "hooks";
import { deleteConfirmModalAction } from "utils";

// 通用删除按钮
export const CommonDeleteButton = ({
  service,
  id,
  onFinish,
  children = "删除",
  ...rest
}) => {
  const [del] = useMutation(service);
  return (
    <Typography.Text
      link
      className="danger"
      onClick={() => {
        deleteConfirmModalAction({ method: del, id, onFinish });
      }}
      {...rest}
    >
      {children}
    </Typography.Text>
  );
};
