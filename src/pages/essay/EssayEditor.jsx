import React from "react";

import { noop } from "lodash";
import { CommonEditor } from "components/editor/CommonEditor";
import { ADD_MOMENT, EDIT_MOMENT } from "services/essay";

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
        record={record}
        contentStyle={{ height: 160 }}
        service={isEdit ? EDIT_MOMENT : ADD_MOMENT}
        isEdit={isEdit}
        showCancelButton={isEdit}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </div>
  );
};
