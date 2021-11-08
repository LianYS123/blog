import React, { useRef } from "react";
import { Form, Modal } from "@douyinfe/semi-ui";
import { useMutation } from "hooks";
import { COMMON_FORM_ITEM_LAYOUT } from "constants";

// 封装通用Modal提交表单
export const FormModal = ({
  title,
  visible,
  close,
  onCancel,
  width,
  reload,
  initialValues = {},
  service,
  getParams = values => values,
  record,
  children,
  onFinish
}) => {
  const [load, { loading }] = useMutation(service);
  const formApiRef = useRef();
  const handleSubmit = async values => {
    if (record?.id) {
      values.id = record.id;
    }
    const params = getParams(values);
    if (!params) {
      // eslint-disable-next-line no-console
      console.warn("请求数据不存在。");
      return;
    }
    const result = await load(params);
    const { code } = result;
    if (code === "0000") {
      close && close();
      reload && reload();
      onFinish && onFinish(result);
    }
  };
  return (
    <Modal
      title={title}
      width={width}
      onOk={() => {
        formApiRef.current.submitForm();
      }}
      okButtonProps={{ loading }}
      onCancel={close || onCancel}
      visible={visible}
    >
      <Form
        {...COMMON_FORM_ITEM_LAYOUT}
        initValues={initialValues}
        getFormApi={api => (formApiRef.current = api)}
        onSubmit={handleSubmit}
      >
        {children}
      </Form>
    </Modal>
  );
};
