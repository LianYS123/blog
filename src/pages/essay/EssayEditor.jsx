import React from "react";

import { noop } from "lodash";
import { CommonEditor } from "components/editor/CommonEditor";
import { ADD_MOMENT, EDIT_MOMENT } from "services/essay";
import { useEditorState } from "components/editor/CommonEditor";
import { useMutation } from "hooks";

export const EssayEditor = ({
  reload = noop,
  editItem = noop,
  record,
  isEdit = false,
  onCancel = noop
}) => {
  const successMessage = isEdit ? "修改成功" : "发布成功";
  const service = isEdit ? EDIT_MOMENT : ADD_MOMENT;
  const [request] = useMutation(service, null, { successMessage });
  const { reset, isEmpty, getParams, ...editorProps } = useEditorState({
    record
  });
  const onSubmit = async () => {
    const params = getParams();
    if (isEmpty()) {
      return;
    }
    const { success } = await request(params);
    if (success) {
      if (!isEdit) {
        // 如果是新增操作，成功后重置输入框
        reset();
      } else {
        editItem({ ...record, ...params });
      }
      reload();
      onCancel();
    }
  };
  return (
    <CommonEditor
      {...editorProps}
      contentStyle={{ height: 160 }}
      isEdit={isEdit}
      showCancelButton={isEdit}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};
