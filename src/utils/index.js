import dayjs from "dayjs";
import fileSize from "filesize";

export const secretPhone = phone => {
  if (!phone) return "";
  return phone.replace(/(\d{1,4})\w{4}(\d{1,3})/, "$1****$2");
};

export const renderDateTime = time =>
  time ? dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss") : null;

export const getFileInfo = (file, defaultValues = {}) => {
  if (!file) return {};
  const {
    fileInstance = {},
    response: { data: src = defaultValues.src } = {},
    url: blobUrl,
    size: showSize
  } = file;
  const {
    name = defaultValues.name,
    size = defaultValues.size,
    type = defaultValues.type
  } = fileInstance;
  return { src, blobUrl, size, showSize, type, name };
};

export const getDefaultFileObj = ({ src, size, showSize, name }) => {
  const file = {
    uid: src || name,
    name,
    status: "success",
    size: showSize || fileSize(size),
    preview: true,
    url: src,
    response: {
      data: src,
      code: "0000"
    }
  };
  return file;
};
