import React from "react";
import { FormModal } from "components/modal";
import { ADD_ESSAY } from "services/essay";
import { Editor } from "components/editor";

export const EditEssayModal = ({ ...props }) => {
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
      service={ADD_ESSAY}
      {...props}
    >
      <div className="shadow dark:border-white">
        <Editor contentStyle={{ height: 256 }} />
      </div>
    </FormModal>
  );
};
