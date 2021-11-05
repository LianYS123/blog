import React from "react";
import { Form } from "@douyinfe/semi-ui";
import { ADD_DICT, EDIT_DICT } from "services/API";
import { FormModal } from "components/modal";

// 编辑字典
export const EditDictModal = props => {
  const { id, record = {} } = props;
  const service = id ? EDIT_DICT : ADD_DICT;
  const { key, value, description } = record;
  const initialValues = { key, value, description };
  return (
    <FormModal
      title={id ? "编辑字段" : "新增字段"}
      initialValues={initialValues}
      service={service}
      {...props}
    >
      <Form.Input
        rules={[{ required: true }]}
        label="字段名称"
        field="key"
        placeholder="Key"
      />
      <Form.Input
        rules={[{ required: true }]}
        label="字段值"
        field="value"
        placeholder="Value"
      />
      <Form.Input label="描述" field="description" placeholder="Description" />
    </FormModal>
  );
};
