import React, { useEffect, useState } from "react";

import BraftEditor from "braft-editor";
import { Editor } from "components/editor";
import { useMutation } from "hooks";
import { Button, Toast } from "@douyinfe/semi-ui";
import { noop } from "lodash";
import { Checkbox, FormControlLabel } from "@material-ui/core";

// 带请求逻辑的富文本编辑器封装
export const CommonEditor = ({
  record,
  reload = noop,
  onCancel = noop,
  onSuccess = noop,
  service,
  isEdit,
  okText = isEdit ? "保存" : "发布",
  cancelText = "取消",
  showOkButton = true,
  showCancelButton = true,
  showOptions = true,
  ...editorProps
}) => {
  const [request] = useMutation(service);
  const [editorState, setState] = useState();
  const [visibleStatus, setVisibleStatus] = useState(
    record?.visibleStatus || 0
  ); // 是否仅自己可见 0: 是，1：否

  const getParams = editorState => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    return { html, raw };
  };

  // 编辑时初始化内容
  useEffect(() => {
    const data = record?.html || record?.raw;
    if (data) {
      const state = BraftEditor.createEditorState(data);
      setState(state);
    }
  }, [record]);

  const handleSubmit = async () => {
    if (editorState) {
      const params = getParams(editorState);
      if (!params.html || params.html === "<p></p>") {
        return;
      }
      if (record?.id) {
        params.id = record.id;
      }
      params.visibleStatus = visibleStatus;
      const result = await request(params);
      const { success } = result;
      if (success) {
        Toast.success({ content: "发布成功", showClose: false });
        setState(BraftEditor.createEditorState(null));
        onSuccess(result);
        reload();
      }
    }
  };

  return (
    <div>
      <Editor
        value={editorState}
        onChange={setState}
        onSave={handleSubmit}
        placeholder={
          isEdit
            ? "按 Ctrl + S / Command + S 保存"
            : "按 Ctrl + S / Command + S 发布"
        }
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
                  setVisibleStatus(checked ? 1 : 0);
                }}
              />
            }
            label={<span className="text-sm">仅自己可见</span>}
          />
        </div>
        {showOptions ? (
          <div className="text-right space-x-1">
            {showCancelButton ? (
              <Button size="large" onClick={onCancel}>
                {cancelText}
              </Button>
            ) : null}
            {showOkButton && (
              <Button size="large" onClick={handleSubmit}>
                {okText}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
