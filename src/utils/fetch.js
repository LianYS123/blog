import { IMAGE_UPLOAD } from "services/API";
import { parseAPI } from "./apiUtils";

const xFetch = function (url, data, options = {}) {
  const { parsedUrl, method, parsedData } = parseAPI(url, data);
  const headers = {};

  const token = localStorage.getItem("acc");
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

// 文件上传
export const upload = file => {
  const url = IMAGE_UPLOAD;
  const token = localStorage.getItem("acc");

  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: token
    },
    body: formData
  }).then(res => res.json());
};

export default xFetch;
