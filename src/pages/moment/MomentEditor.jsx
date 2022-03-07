import React from "react";

import { noop } from "lodash";
import { ADD_MOMENT, EDIT_MOMENT } from "services/moment";
import { useEditorState, CommonEditor } from "components/editor";
import { useMutation } from "hooks";
import { useAssertLogged } from "hooks/app";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

/**
 * 动态编辑器
 */
export const MomentEditor = ({
  reload = noop,
  editItem = noop,
  record,
  isEdit = false,
  onCancel = noop
}) => {
  const successMessage = isEdit ? "修改成功" : "发布成功";
  const service = isEdit ? EDIT_MOMENT : ADD_MOMENT;
  const [request] = useMutation(service, null, { successMessage });
  const {
    reset,
    isEmpty,
    getParams,
    visibleStatus,
    onVisibleStatusChange,
    ...editorProps
  } = useEditorState({
    record
  });
  const { assertLogged } = useAssertLogged();
  const onSubmit = async () => {
    if (isEmpty()) {
      return;
    }
    assertLogged();
    const params = getParams();
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
    <div>
      <CommonEditor
        controls={[
          "bold",
          "italic",
          "emoji",
          "underline",
          "text-indent",
          "remove-styles"
        ]}
        placeholder={
          isEdit
            ? "按 Ctrl + S / Command + S 保存"
            : "按 Ctrl + S / Command + S 发布"
        }
        contentStyle={{ height: 160 }}
        onSave={onSubmit}
        {...editorProps}
      />
      <div className="flex justify-between">
        <div className="ml-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleStatus === 1 ? true : false}
                size="small"
                color="primary"
                onChange={(ev, checked) => {
                  onVisibleStatusChange(checked ? 1 : 0);
                }}
              />
            }
            label={<span className="text-sm">仅自己可见</span>}
          />
        </div>
        <div className="text-right">
          {isEdit && (
            <Button size="large" onClick={onCancel}>
              取消
            </Button>
          )}

          <Button disabled={isEmpty()} size="large" onClick={onSubmit}>
            {isEdit ? "保存" : "发布"}
          </Button>
        </div>
      </div>
    </div>
  );
};
