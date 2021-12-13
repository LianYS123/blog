import React, { useEffect, useState } from "react";

import BraftEditor from "braft-editor";
import { Editor } from "components/editor";
import { useMutation } from "hooks";
import { Button, Toast } from "@douyinfe/semi-ui";
import { noop } from "lodash";

// 带请求逻辑的富文本编辑器封装
export const CommonEditor = ({
  record,
  reload = noop,
  onCancel = noop,
  onSuccess = noop,
  service,
  html,
  raw,
  isEdit,
  okText = isEdit ? "保存" : "发布",
  cancelText = "取消",
  showOptions = true,
  ...editorProps
}) => {
  const [request] = useMutation(service);
  const [editorState, setState] = useState();

  const getParams = editorState => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    return { html, raw };
  };

  // 编辑时初始化内容
  useEffect(() => {
    if (html || raw) {
      const state = BraftEditor.createEditorState(html || raw);
      setState(state);
    }
  }, [html, raw]);

  const handleSubmit = async () => {
    if (editorState) {
      const params = getParams(editorState);
      if (!params.html || params.html === "<p></p>") {
        return;
      }
      if (record?.id) {
        params.id = record.id;
      }
      const result = await request(params);
      const { code } = result;
      if (code === "0000") {
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
      {showOptions ? (
        <div className="text-right space-x-1">
          {cancelText ? (
            <Button size="large" onClick={onCancel}>
              {cancelText}
            </Button>
          ) : null}
          {okText && (
            <Button size="large" onClick={handleSubmit}>
              {okText}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
