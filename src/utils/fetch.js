import { parseAPI } from "./apiUtils";

const xFetch = function (url, data, options = {}) {
  const { parsedUrl, method, parsedData } = parseAPI(url, data);
  const headers = {};

  const token = localStorage.getItem("acc");
  // const token = "Bearer " + localStorage.getItem("acc");
  // const token = localStorage.getItem("acc");
  const opts = {
    method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      ...headers
    },
    ...options
  };
  if (method !== "GET") {
    opts.body = JSON.stringify(parsedData);
  }
  return fetch(parsedUrl, opts).then(res => res.json());
};

export default xFetch;
