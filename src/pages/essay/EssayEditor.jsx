import React, { useEffect, useState } from "react";

import BraftEditor from "braft-editor";
import { Editor } from "components/editor";
import { useMutation } from "hooks";
import { ADD_ESSAY, EDIT_ESSAY } from "services/essay";
import { Button, Toast } from "@douyinfe/semi-ui";
import { noop } from "lodash";

export const EssayEditor = ({
  reload,
  record,
  isEdit = false,
  onCancel = noop,
  onSuccess = noop
}) => {
  const [request] = useMutation(isEdit ? EDIT_ESSAY : ADD_ESSAY);
  const [editorState, setState] = useState();

  const getParams = editorState => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    return { html, raw };
  };

  // 编辑时初始化内容
  useEffect(() => {
    if (record && isEdit) {
      const state = BraftEditor.createEditorState(record.raw || record.html);
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
      const result = await request(params);
      const { code } = result;
      if (code === "0000") {
        Toast.success({ content: "发布成功", showClose: false });
        setState(BraftEditor.createEditorState(null));
        onSuccess(result);
        reload && reload();
      }
    }
  };

  return (
    <div className="shadow">
      <Editor
        value={editorState}
        onChange={setState}
        onSave={handleSubmit}
        contentStyle={{ height: 160 }}
        // placeholder="输入 Command + Enter / Ctrl + Enter 发布"
        placeholder={
          isEdit
            ? "按 Ctrl + S / Command + S 保存"
            : "按 Ctrl + S / Command + S 发布"
        }
      />
      <div className="text-right space-x-1">
        {isEdit ? (
          <Button size="large" onClick={onCancel}>
            取消
          </Button>
        ) : null}
        <Button size="large" onClick={handleSubmit}>
          {isEdit ? "点击保存" : "点击发布"}
        </Button>
      </div>
    </div>
  );
};
