import React from "react";
import { Form } from "@douyinfe/semi-ui";
import { FormModal } from "components/modal";

export const CheckModal = ({ ...props }) => {
  return (
    <FormModal {...props} title="文章审核">
      <Form.RadioGroup
        rules={[{ required: true }]}
        field="approval"
        label="审核"
        initValue={true}
        options={[
          { label: "审核通过", value: true },
          { label: "审核拒绝", value: false }
        ]}
      />
      <Form.TextArea
        field="description"
        label="描述"
        placeholder="请填写审核通过/拒绝原因"
      />
    </FormModal>
  );
};
