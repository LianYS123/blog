import { useRequest } from "hooks";
import { GET_ARTICLE_DETAIL } from "services/API";
import { getHtmlAndOutline } from "./utils";

export const useDocAuth = () => {
  // TODO
  return true;
};

export const useHtmlAndOutline = resourceId => {
  const {
    data: { html },
    ...rest
  } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { resourceId },
    // ready: !!resourceId && resourceId !== "undefined",
    ready: false,
    initialData: { html: "" }
  });
  const result = getHtmlAndOutline(html);
  return { ...result, ...rest };
};
