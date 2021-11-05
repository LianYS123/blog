import React from "react";
import { Form, Tag } from "@douyinfe/semi-ui";
import { ADD_TAG, EDIT_TAG } from "services/API";
import { FormModal } from "components/modal";

const colors = [
  "amber",
  "blue",
  "cyan",
  "green",
  "grey",
  "indigo",
  "light-blue",
  "light-green",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "violet",
  "yellow",
  "white"
];

// 编辑标签
export const EditTagModal = props => {
  const { record = {} } = props;
  const { tagName, description, color, id } = record;
  const service = id ? EDIT_TAG : ADD_TAG;
  const title = id ? "编辑标签" : "新增标签";
  const initialValues = { tagName, description, color };
  return (
    <FormModal
      initialValues={initialValues}
      service={service}
      title={title}
      {...props}
    >
      <Form.Input
        rules={[{ required: true }]}
        label="标签名称"
        field="tagName"
        placeholder="请输入标签名称"
      />
      <Form.Select
        rules={[{ required: true }]}
        label="标签颜色"
        field="color"
        placeholder="请选择标签颜色"
        className="w-full"
      >
        {colors.map(color => (
          <Form.Select.Option value={color} key={color}>
            <Tag style={{ marginTop: 5 }} color={color}>
              {color}
            </Tag>
          </Form.Select.Option>
        ))}
      </Form.Select>
      <Form.Input
        label="标签描述"
        field="description"
        placeholder="请输入标签描述"
      />
    </FormModal>
  );
};
