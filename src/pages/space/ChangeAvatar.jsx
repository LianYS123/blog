import React, { useState } from "react";
import { Upload, Avatar, Toast } from "@douyinfe/semi-ui";
import { IconCamera } from "@douyinfe/semi-icons";
import { FILE_PREVIEW, FILE_UPLOAD } from "services/app";
import { useSelector } from "react-redux";

export const ChangeAvatar = () => {
  const { userInfo } = useSelector(state => state.app);
  const [url, setUrl] = useState(`${FILE_PREVIEW}?id=${userInfo.avatar}`);
  const onSuccess = (response, file) => {
    const { data } = response;
    setUrl(`${FILE_PREVIEW}?id=${data}`);
    Toast.success("头像更新成功");
  };

  const style = {
    backgroundColor: "var(--semi-color-overlay-bg)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--semi-color-white)"
  };

  const hoverMask = (
    <div style={style}>
      <IconCamera />
    </div>
  );

  return (
    <Upload
      name="file"
      action={FILE_UPLOAD}
      onSuccess={onSuccess}
      accept="image/*"
      headers={{ Authorization: `Bearer ${localStorage.getItem("acc")}` }}
      showUploadList={false}
      onError={() => Toast.error("上传失败")}
    >
      <Avatar src={url} style={{ margin: 4 }} hoverMask={hoverMask} />
    </Upload>
  );
};
