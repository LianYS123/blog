import React from "react";
import { Form } from "@douyinfe/semi-ui";
import { FormModal } from "components/modal";
import { ADD_USER, EDIT_USER } from "services/user";

export const EditUserModal = props => {
  const { id, record = {} } = props;
  const service = id ? EDIT_USER : ADD_USER;
  return (
    <FormModal
      title={id ? "编辑用户" : "新增用户"}
      service={service}
      {...props}
    >
      <Form.Input
        rules={[{ required: true }]}
        initValue={record.username}
        label="用户名"
        field="username"
        placeholder="请输入用户名"
      />
      {/* 只有创建时才需要输入密码 */}
      {!id ? (
        <Form.Input
          rules={[{ required: true }]}
          type="password"
          label="密码"
          field="password"
          placeholder="请输入密码"
        />
      ) : null}
    </FormModal>
  );
};
