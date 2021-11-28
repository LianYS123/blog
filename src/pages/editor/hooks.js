import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

import { useRequest } from "hooks";
import { useEffect } from "react";
import { GET_ARTICLE_DETAIL } from "services/article";
import { fontFamilies } from "./config";

export const useArticle = ({ id, formApi }) => {
  const result = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id
  });

  const { data } = result;
  const { html, raw, articleName, cover, tags } = data;
  const template = raw || html;

  const file = {
    uid: "1",
    name: cover,
    status: "success",
    // size: "130KB",
    response: {
      code: "0000",
      data: cover
    },
    preview: true,
    url: cover
  };

  useEffect(() => {
    if (template && formApi.current) {
      const initValues = {
        editorState: BraftEditor.createEditorState(template, { fontFamilies }),
        articleName,
        tags: tags ? tags.map(it => it.id) : []
      };
      if (cover) {
        initValues.cover = [file];
      }
      formApi.current.setValues(initValues);
    }
  }, [template]);

  return { ...result, ...data, template };
};
