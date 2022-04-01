import React, { useEffect, useState } from "react";

import { noop } from "lodash";
import { ADD_MOMENT, EDIT_MOMENT } from "services/moment";
import { useCustomMutation } from "hooks";
import { useAssertLogged } from "hooks/app";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { EditorContent } from "@tiptap/react";
import { useMinimalEditor } from "components/editor/tiptap";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import classNames from "classnames";

/**
 * 动态编辑器
 */
export const MomentEditor = ({
  record,
  isEdit = false,
  onCancel = noop,
  onSuccess = noop,
  editable
}) => {
  const service = isEdit ? EDIT_MOMENT : ADD_MOMENT;
  const [request, { isLoading }] = useCustomMutation(service);
  const { assertLogged } = useAssertLogged();
  const [visibleStatus, setVS] = useState(0);

  // 编辑器
  const editor = useMinimalEditor({
    editable,
    content: record?.html,
    placeholder: `说点什么吧...`
  });

  // 同步可视状态
  useEffect(() => {
    if (isEdit && record) {
      setVS(record.visibleStatus);
    }
  }, [record?.visibleStatus]);

  // 可编辑时，自动聚焦
  useEffect(() => {
    if (isEdit && editable && editor) {
      editor.commands.focus();
    }
  }, [editor, editable]);

  // 提交
  const onSubmit = async () => {
    if (editor.isEmpty) {
      return;
    }
    assertLogged();
    const params = {
      visibleStatus,
      html: editor.getHTML(),
      id: record?.id
    };
    const { success } = await request(params);
    if (success) {
      if (!isEdit) {
        // 如果是新增操作，成功后重置输入框
        editor.commands.clearContent();
      }
      onSuccess();
    }
  };

  return (
    <Box
      sx={{ px: 2, pt: editable ? 2 : 0 }}
      className={classNames("rounded border-gray-500 dark:border-gray-300", {
        border: editable && !isEdit
      })}
    >
      <Box
        onClick={() => editor.commands.focus()}
        sx={{ minHeight: editable ? (isEdit ? 120 : 160) : 0 }}
      >
        <EditorContent editor={editor} />
      </Box>
      {editable && (
        <div className="flex justify-between items-center">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visibleStatus === 1 ? true : false}
                  size="small"
                  color="primary"
                  onChange={(ev, checked) => {
                    setVS(checked ? 1 : 0);
                  }}
                />
              }
              label={<span className="text-sm">仅自己可见</span>}
            />
          </div>
          <div className="text-right">
            {isEdit && (
              <Button size="large" sx={{ minWidth: 32 }} onClick={onCancel}>
                取消
              </Button>
            )}

            <LoadingButton
              loading={isLoading}
              disabled={editor ? editor.isEmpty : true}
              size="large"
              onClick={onSubmit}
              sx={{ minWidth: 32 }}
            >
              {isEdit ? "保存" : "发布"}
            </LoadingButton>
          </div>
        </div>
      )}
    </Box>
  );
};
