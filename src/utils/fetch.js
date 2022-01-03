import { IMAGE_UPLOAD } from "services/app";
import { parseAPI } from "./apiUtils";

const SIMPLE_REQUEST_METHODS = ["GET", "DELETE"];

const xFetch = async function (url, data, options = {}) {
  const {
    parsedUrl,
    method,
    parsedData,
    apiPrefix = "/api"
  } = parseAPI(url, data);
  const headers = {};

  const acc = localStorage.getItem("acc");

  const token = `Bearer ${acc}`;
  if (acc) {
    headers.Authorization = token;
  }
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    ...options
  };
  if (!SIMPLE_REQUEST_METHODS.includes(method)) {
    opts.body = JSON.stringify(parsedData);
  }
  const result = await fetch(apiPrefix + parsedUrl, opts).then(res =>
    res.json()
  );
  return result;
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
