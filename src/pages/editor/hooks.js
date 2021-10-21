import BraftEditor from "braft-editor";

import { useRequest } from "hooks";
import { useEffect } from "react";
import { fontFamilies } from "./config";

export const useArticle = ({ resourceId, form }) => {
  const result = useRequest({
    service: "",
    necessaryParams: { resourceId },
    // ready: !!resourceId,
    ready: false,
    initialData: { content: "" }
  });

  const { data } = result;
  const { html, raw } = data;
  const template = raw || html;

  useEffect(() => {
    if (template) {
      form.setFieldsValue({
        editorState: BraftEditor.createEditorState(template, { fontFamilies })
      });
    }
  }, [template]);

  return { ...result, ...data, template };
};
