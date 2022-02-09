import React, { useEffect, useState } from "react";

import BraftEditor from "braft-editor";
import { Editor } from "components/editor";
import { noop } from "lodash";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

/**
 * 编辑器操作封装
 * @param {{record: Object}}
 */
export const useEditorState = ({ record }) => {
  const [editorState, setState] = useState();
  const [visibleStatus, setVisibleStatus] = useState(
    record?.visibleStatus || 0
  ); // 是否仅自己可见 0: 是，1：否

  // 编辑时初始化内容
  useEffect(() => {
    const data = record?.html || record?.raw;
    if (data) {
      const state = BraftEditor.createEditorState(data);
      setState(state);
    }
  }, [record]);

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
    const params = getParams();
    return !params.html || params.html === "<p></p>";
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

// 带请求逻辑的富文本编辑器封装
export const CommonEditor = ({
  value,
  onChange,
  onCancel = noop,
  onSubmit = noop,
  service,
  isEdit,
  okText = isEdit ? "保存" : "发布",
  cancelText = "取消",
  showOkButton = true,
  showCancelButton = true,
  showOptions = true,
  visibleStatus,
  onVisibleStatusChange,
  ...editorProps
}) => {
  return (
    <div>
      <Editor
        value={value}
        onChange={onChange}
        onSave={onSubmit}
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
                  onVisibleStatusChange(checked ? 1 : 0);
                }}
              />
            }
            label={<span className="text-sm">仅自己可见</span>}
          />
        </div>
        {showOptions ? (
          <div className="text-right">
            {showCancelButton ? (
              <Button size="large" onClick={onCancel}>
                {cancelText}
              </Button>
            ) : null}
            {showOkButton && (
              <Button size="large" onClick={ev => onSubmit(value, ev)}>
                {okText}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
