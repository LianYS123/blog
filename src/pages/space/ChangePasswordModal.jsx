import React from "react";
import { Form } from "@douyinfe/semi-ui";
import { FormModal } from "components/modal";
import { CHANGE_PASSWORD } from "services/user";

// 修改密码弹出框
export const ChangePasswordModal = props => {
  const getPasswordRule = values => {
    return {
      validator: (rule, value) => {
        const { newPassword, newPassword2 } = values;
        if (newPassword && newPassword2 && newPassword !== newPassword2) {
          return false;
        } else {
          return true;
        }
      },
      message: "两次输入的密码不一致"
    };
  };
  return (
    <FormModal title="修改密码" service={CHANGE_PASSWORD} {...props}>
      {({ values }) => {
        return (
          <>
            <Form.Input
              rules={[{ required: true }]}
              noLabel={true}
              field="password"
              placeholder="请输入旧密码"
            />
            <Form.Input
              trigger="blur"
              rules={[{ required: true }, getPasswordRule(values)]}
              noLabel={true}
              field="newPassword"
              placeholder="请输入新密码"
            />
            <Form.Input
              trigger="blur"
              rules={[{ required: true }, getPasswordRule(values)]}
              noLabel={true}
              field="newPassword2"
              placeholder="请再次输入新密码"
            />
          </>
        );
      }}
    </FormModal>
  );
};
