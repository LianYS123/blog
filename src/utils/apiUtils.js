import { parseUrl, stringifyUrl } from "query-string";

const methodReg = /^(get|post|put|delete)/i;
const SIMPLE_REQUEST_METHODS = ["GET", "DELETE"];

export const getAPIMethod = url => {
  if (methodReg.test(url)) {
    const [_, urlMethod] = methodReg.exec(url);
    return urlMethod.toUpperCase();
  }
  return "GET";
};

export const parseAPI = (url, data) => {
  const method = getAPIMethod(url);

  let parsedUrl = url.replace(methodReg, "").replace(/\s/g, "");
  const parsedData = { ...data };
  const paramsReg = /\{(.*?)\}/g;

  if (paramsReg.test(url)) {
    parsedUrl = parsedUrl.replace(paramsReg, ($0, $1) => {
      delete parsedData[$1];
      return data[$1];
    });
  }

  if (SIMPLE_REQUEST_METHODS.includes(method)) {
    parsedUrl = stringifyUrl({ url: parsedUrl, query: parsedData });
  }

  return {
    method: method.toUpperCase(),
    parsedUrl,
    parsedData
  };
};
