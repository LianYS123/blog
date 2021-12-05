import React, { useState } from "react";

import BraftEditor from "braft-editor";
import { Editor } from "components/editor";
import { useMutation } from "hooks";
import { ADD_ESSAY } from "services/essay";
import { Button, Toast } from "@douyinfe/semi-ui";

export const EssayEditor = ({ reload }) => {
  const [request] = useMutation(ADD_ESSAY);
  const [editorState, setState] = useState();

  const getParams = editorState => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    return { html, raw };
  };

  const handleSubmit = async () => {
    if (editorState) {
      const params = getParams(editorState);
      if (!params.html || params.html === "<p></p>") {
        return;
      }
      const { code } = await request(params);
      if (code === "0000") {
        Toast.success({ content: "发布成功", showClose: false });
        setState(BraftEditor.createEditorState(null));
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
        placeholder="按 Ctrl + S / Command + S 发布"
      />
      <div className="text-right">
        <Button size="large" onClick={handleSubmit}>
          点击发布
        </Button>
      </div>
    </div>
  );
};
