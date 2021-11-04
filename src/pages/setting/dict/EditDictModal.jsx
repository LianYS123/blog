import React, { useRef } from "react";
import { Form, Modal } from "@douyinfe/semi-ui";
import { useMutation } from "hooks";
import { ADD_DICT, EDIT_DICT } from "services/API";
import { COMMON_FORM_ITEM_LAYOUT } from "constants";

// 编辑字典
export const EditDictModal = ({ visible, id, close, reload, record = {} }) => {
  const [addDict, { loading: loadingAdd }] = useMutation(ADD_DICT);
  const [updateDict, { loading: loadingUpdate }] = useMutation(EDIT_DICT);
  const loading = loadingAdd || loadingUpdate;
  const formApiRef = useRef();
  const { key, value, description } = record;
  const initialValues = { key, value, description };
  const handleSubmit = async values => {
    if (id) {
      await updateDict({ ...values, id });
    } else {
      await addDict(values);
    }
    close();
    reload();
  };
  return (
    <Modal
      title={id ? "编辑字段" : "新增字段"}
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
        <Form.Input required label="字段名称" field="key" placeholder="Key" />
        <Form.Input required label="字段值" field="value" placeholder="Value" />
        <Form.Input
          label="描述"
          field="description"
          placeholder="Description"
        />
      </Form>
    </Modal>
  );
};
