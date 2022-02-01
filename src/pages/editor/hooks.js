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

  return { ...result, ...data, template };
};
