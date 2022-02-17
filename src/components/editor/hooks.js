import BraftEditor from "braft-editor";
import { useEffect, useState } from "react";

/**
 * 编辑器操作封装
 * @param {{record: Object}}
 */
export const useEditorState = ({ record }) => {
  const [editorState, setState] = useState();
  const [visibleStatus, setVisibleStatus] = useState(
    record?.visibleStatus || 0
  ); // 是否仅自己可见 0: 否，1：是

  // 编辑时初始化内容
  useEffect(() => {
    const data = record?.html || record?.raw;
    if (data) {
      const state = BraftEditor.createEditorState(data);
      setState(state);
    }
  }, [record?.id]);

  // 获取请求参数
  const getParams = () => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    const params = { html, raw, visibleStatus };
    if (record?.id) {
      params.id = record.id;
    }
    return params;
  };

  // 校验用户输入是否为空
  const isEmpty = () => {
    if (!editorState) {
      return true;
    }
    const html = editorState.toHTML();
    return !html || html === "<p></p>";
  };

  // 重置输入
  const reset = () => {
    setState(
      BraftEditor.createEditorState(record?.raw || record?.html || null)
    );
  };

  return {
    value: editorState,
    onChange: setState,
    visibleStatus,
    onVisibleStatusChange: setVisibleStatus,
    getParams,
    isEmpty,
    reset
  };
};
