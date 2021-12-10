import React from "react";
import { Form } from "@douyinfe/semi-ui";
import { FormModal } from "components/modal";
import { ADD_ROLE, EDIT_ROLE } from "services/role";

export const EditRoleModal = props => {
  const { id, record = {} } = props;
  const service = id ? EDIT_ROLE : ADD_ROLE;
  return (
    <FormModal
      title={id ? "编辑角色" : "新增角色"}
      service={service}
      {...props}
    >
      <Form.Input
        rules={[{ required: true }]}
        initValue={record.roleName}
        label="角色名称"
        field="roleName"
        placeholder="请输入角色码"
      />
      <Form.Input
        rules={[{ required: true }]}
        initValue={record.roleCode}
        label="角色码"
        field="roleCode"
        placeholder="请输入角色码"
      />
      <Form.Input
        rules={[{ required: true }]}
        initValue={record.roleDesc}
        label="描述"
        field="roleDesc"
        placeholder="请输入描述"
      />
    </FormModal>
  );
};
