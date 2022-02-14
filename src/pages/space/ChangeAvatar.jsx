import React from "react";
import { Upload, Avatar, Toast } from "@douyinfe/semi-ui";
import { IconCamera } from "@douyinfe/semi-icons";
import { FILE_PREVIEW, FILE_UPLOAD } from "services/app";
import { useSelector } from "react-redux";
import { useMutation } from "hooks";
import { CHANGE_AVATAR } from "services/user";
import { useReloadUserInfo } from "./hooks";

export const ChangeAvatar = () => {
  const { userInfo } = useSelector(state => state.app);
  const { avatar, id } = userInfo;
  const [changeAvatar] = useMutation(
    CHANGE_AVATAR,
    {},
    { showActionMessage: true, autoHandleError: true }
  );
  const reloadUserInfo = useReloadUserInfo();

  const onSuccess = async (response, file) => {
    const { data } = response;
    const { success } = await changeAvatar({ avatar: data, id });
    if (success) {
      reloadUserInfo();
    }
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
      <Avatar
        src={`${FILE_PREVIEW}?id=${avatar}`}
        size="large"
        style={{ margin: 4 }}
        hoverMask={hoverMask}
      />
    </Upload>
  );
};
