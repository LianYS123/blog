import React, { useRef } from "react";
import { Form, Modal, Tag, withField } from "@douyinfe/semi-ui";
import { useMutation } from "hooks";
import { ADD_TAG, EDIT_TAG } from "services/API";
import { COMMON_FORM_ITEM_LAYOUT } from "constants";
import { SketchPicker } from "react-color";

const ColorPicker = withField(SketchPicker, {
  valueKey: "color",
  onKeyChangeFnName: "onChangeComplete",
  valuePath: "hex"
});

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

// 编辑字典
export const EditTagModal = ({ visible, id, close, reload, record = {} }) => {
  const [add, { loading: loadingAdd }] = useMutation(ADD_TAG);
  const [update, { loading: loadingUpdate }] = useMutation(EDIT_TAG);
  const loading = loadingAdd || loadingUpdate;
  const formApiRef = useRef();
  const { tagName, description, color } = record;
  const initialValues = { tagName, description, color };
  const handleSubmit = async values => {
    let result;
    if (id) {
      result = await update({ ...values, id });
    } else {
      result = await add(values);
    }
    const { code } = result;
    if (code === "0000") {
      close();
      reload();
    }
  };
  return (
    <Modal
      title={id ? "编辑标签" : "新增标签"}
      onOk={() => {
        formApiRef.current.submitForm();
      }}
      okButtonProps={{ loading }}
      onCancel={close}
      visible={visible}
    >
      <Form
        {...COMMON_FORM_ITEM_LAYOUT}
        initValues={initialValues}
        getFormApi={api => (formApiRef.current = api)}
        onSubmit={handleSubmit}
      >
        <Form.Input
          required
          label="标签名称"
          field="tagName"
          placeholder="请输入标签名称"
        />
        <Form.Select
          required
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
      </Form>
    </Modal>
  );
};
