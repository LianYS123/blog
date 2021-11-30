import { Avatar, Button, Form } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";
import { IconCamera } from "@douyinfe/semi-icons";
import { useSelector } from "react-redux";
import { useModalAction, useMutation } from "hooks";
import { ChangePassword } from "./ChangePassword";
import { COMMON_FORM_ITEM_LAYOUT } from "constants";
import { getDefaultFileObj } from "utils";
import { CHANGE_USER_INFO } from "services/user";
import { IMAGE_UPLOAD } from "services/app";

const Space = () => {
  const style = {
    backgroundColor: "rgba(0,0,0,.4)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF"
  };
  const { userInfo } = useSelector(state => state.app);
  const { username = "", avatar } = userInfo;
  const [url, setUrl] = useState(avatar);

  const initialValues = {
    username,
    files: avatar ? [getDefaultFileObj({ src: avatar })] : []
  };

  useEffect(() => {
    setUrl(avatar);
  }, [avatar]);
  const [changeUserInfo, { loading }] = useMutation(
    CHANGE_USER_INFO,
    {},
    { showActionMessage: true }
  );
  const { open: openChangePasswordModal, ...changePasswordModalProps } =
    useModalAction();

  const hoverMask = (
    <div style={style}>
      <IconCamera />
    </div>
  );
  const onSubmit = async values => {
    const { files, ...rest } = values;
    const { response } = files[0];
    const avatar = response.data;
    const requestParams = { avatar, ...rest };
    const { code } = await changeUserInfo(requestParams);
  };
  return (
    <div className="mx-auto w-full sm:w-1/2 h-96 p-8 sm:shadow">
      <Form
        className="h-full mx-4"
        initValues={initialValues}
        {...COMMON_FORM_ITEM_LAYOUT}
        onSubmit={onSubmit}
      >
        {({ formApi, values }) => {
          return (
            <div className="flex h-full flex-col justify-between">
              <div>
                <Form.Input
                  label="用户名"
                  field="username"
                  placeholder="请输入用户名"
                />
                <Form.Upload
                  field="files"
                  label="头像"
                  fileName="file"
                  accept={"image/*"}
                  showUploadList={false}
                  rules={[{ required: true }]}
                  headers={{ Authorization: localStorage.getItem("acc") }}
                  limit={1}
                  action={IMAGE_UPLOAD}
                  onChange={({ currentFile: file }) => {
                    setUrl(file.url);
                  }}
                >
                  {url ? (
                    <Avatar
                      src={url}
                      style={{ margin: 4 }}
                      hoverMask={hoverMask}
                    />
                  ) : (
                    <Avatar>{username[0]}</Avatar>
                  )}
                </Form.Upload>
              </div>
              <div className="space-x-4 text-center">
                <Button type="primary" loading={loading} htmlType="submit">
                  保存
                </Button>
                <Button onClick={() => openChangePasswordModal()}>
                  修改密码
                </Button>
              </div>
            </div>
          );
        }}
      </Form>
      <ChangePassword {...changePasswordModalProps} />
    </div>
  );
};

export default Space;
