import React from "react";
import { Modal, Typography } from "@douyinfe/semi-ui";
import { useMutation } from "hooks";

// 通用删除按钮
export const CommonDeleteButton = ({ service, id, onFinish, ...rest }) => {
  const [del] = useMutation(service);
  return (
    <Typography.Text
      link
      className="danger"
      onClick={() => {
        Modal.warning({
          title: "确认删除？",
          content: "删除后不可恢复，请谨慎操作。",
          okButtonProps: { type: "danger" },
          onOk: async () => {
            const result = await del({ id });
            if (onFinish) {
              onFinish(result);
            }
          }
        });
      }}
      {...rest}
    >
      删除
    </Typography.Text>
  );
};
