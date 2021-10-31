import { parseUrl, stringifyUrl } from "query-string";

const methodReg = /^(get|post|put|delete)/i;

export const getAPIMethod = url => {
  if (methodReg.test(url)) {
    const [_, urlMethod] = methodReg.exec(url);
    return urlMethod;
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

  if (method === "GET") {
    parsedUrl = stringifyUrl({ url: parsedUrl, query: parsedData });
  }

  return {
    method: method.toUpperCase(),
    parsedUrl,
    parsedData
  };
};
