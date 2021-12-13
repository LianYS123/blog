import React from "react";

import { ADD_ESSAY, EDIT_ESSAY } from "services/essay";
import { noop } from "lodash";
import { CommonEditor } from "components/editor/CommonEditor";

export const EssayEditor = ({
  reload,
  record,
  isEdit = false,
  onCancel = noop,
  onSuccess = noop
}) => {
  return (
    <div className="shadow">
      <CommonEditor
        reload={reload}
        html={record?.html}
        raw={record?.raw}
        contentStyle={{ height: 160 }}
        service={isEdit ? EDIT_ESSAY : ADD_ESSAY}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </div>
  );
};
