import { useRequest } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/article";
import { getHtmlAndOutline } from "./utils";

export const useDocAuth = () => {
  // TODO
  return true;
};

export const useHtmlAndOutline = id => {
  const { data, ...rest } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { id },
    ready: !!id && id !== "undefined",
    initialData: { html: "" }
  });
  const { html } = data;
  const result = getHtmlAndOutline(html);
  return { ...data, ...result, ...rest };
};
