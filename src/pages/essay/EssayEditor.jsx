import React from "react";

import { noop } from "lodash";
import { CommonEditor } from "components/editor/CommonEditor";
import { ADD_MOMENT, EDIT_MOMENT } from "services/essay";
import { useEditorState } from "components/editor/CommonEditor";
import { useMutation } from "hooks";

export const EssayEditor = ({
  reload,
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
    await request(params);
    reset();
    reload();
    onCancel();
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
