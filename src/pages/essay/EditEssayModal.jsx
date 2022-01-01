import React from "react";
import { FormModal } from "components/modal";
import { EditorField } from "components/editor";
import BraftEditor from "braft-editor";
import { ADD_MOMENT, EDIT_MOMENT } from "services/essay";

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
      service={isEdit ? EDIT_MOMENT : ADD_MOMENT}
      record={record}
      modalProps={{ okText: !isEdit ? "发布" : "保存" }}
      {...props}
    >
      <div className="shadow dark:border-white">
        <EditorField
          noLabel={true}
          field="editorState"
          contentStyle={{ height: 256 }}
        />
      </div>
    </FormModal>
  );
};
