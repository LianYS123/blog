import React, { useEffect, useState } from "react";
import { Upload } from "@douyinfe/semi-ui";
import { FILE_UPLOAD } from "services/app";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

/**
 * 上传图片，受控组件
 */
export const UploadImage = ({ value, onChange, children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector(state => state.app);
  const [fileList, setFileList] = useState();

  useEffect(() => {
    const fls = value
      ? [
          {
            uid: "1",
            name: "image",
            url: value
          }
        ]
      : null;
    setFileList(fls);
  }, [value]);

  const onSuccess = async (response, file) => {
    const { data, success } = response;
    if (success) {
      onChange(data);
    } else {
      enqueueSnackbar("上传失败", { variant: "error" });
    }
  };

  return (
    <Upload
      name="file"
      maxSize={1024 * 5} // 最大上传 5M 的图片
      action={FILE_UPLOAD}
      onSuccess={onSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList([...fileList])}
      accept="image/*"
      headers={{ Authorization: `Bearer ${token}` }}
      listType="picture"
      limit={1}
      // draggable
      // showUploadList={false}
      onError={() => enqueueSnackbar("上传失败", { variant: "error" })}
    >
      {children || <Button>上传图片</Button>}
    </Upload>
  );
};
