import React from "react";
import { FormModal } from "components/modal";
import { ADD_ESSAY, EDIT_ESSAY } from "services/essay";
import { Editor } from "components/editor";
import BraftEditor from "braft-editor";

export const EditEssayModal = ({ isEdit = false, record, ...props }) => {
  const getParams = values => {
    const { editorState } = values;
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    return { html, raw };
  };
  return (
    <FormModal
      title="随笔"
      getParams={getParams}
      initialValues={{
        editorState: isEdit
          ? BraftEditor.createEditorState(record.raw || record.html)
          : undefined
      }}
      service={isEdit ? EDIT_ESSAY : ADD_ESSAY}
      record={record}
      modalProps={{ okText: isEdit ? "发布" : "保存" }}
      {...props}
    >
      <div className="shadow dark:border-white">
        <Editor contentStyle={{ height: 256 }} />
      </div>
    </FormModal>
  );
};
