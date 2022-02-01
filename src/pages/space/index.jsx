import { Button, Form } from "@douyinfe/semi-ui";
import React from "react";
import { useSelector } from "react-redux";
import { useModalAction, useMutation } from "hooks";
import { COMMON_FORM_ITEM_LAYOUT } from "constants";
import { CHANGE_USER_INFO } from "services/user";
import { cloneDeep, pick } from "lodash";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ChangeAvatar } from "./ChangeAvatar";
import { Paper } from "@material-ui/core";
import dayjs from "dayjs";

const fields = ["birthday", "email", "nickName", "phone", "sex", "tel"];

const Space = () => {
  const { userInfo } = useSelector(state => state.app);
  const [changeUserInfo, { loading }] = useMutation(
    CHANGE_USER_INFO,
    {},
    { showActionMessage: true, autoHandleError: true }
  );
  const { open: openChangePasswordModal, ...passwordModalProps } =
    useModalAction();
  // const { open: openChangeAvatarModal, ...avatarModalProps } = useModalAction();

  const onSubmit = async _values => {
    const values = cloneDeep(_values);
    const { birthday } = values;
    if (birthday) {
      values.birthday = dayjs(birthday).format("YYYY-MM-DD");
    }
    values.id = userInfo.id;
    const { code } = await changeUserInfo(values);
  };
  return (
    <div
      className="mx-auto flex justify-between py-8 w-full"
      style={{ maxWidth: 800 }}
    >
      <div>
        <ChangeAvatar />
      </div>
      <Form
        className="h-full mx-4 flex-auto"
        {...COMMON_FORM_ITEM_LAYOUT}
        onSubmit={onSubmit}
        initValues={pick(userInfo, fields)}
      >
        {({ formApi, values }) => {
          return (
            <Paper className="p-8 flex h-full flex-col justify-between">
              <Form.Input
                label="昵称"
                field="nickName"
                placeholder="请输入用户名"
              />
              <Form.DatePicker
                label="生日"
                field="birthday"
                placeholder="请选择生日"
              />
              <Form.RadioGroup
                field="sex"
                label="性别"
                rules={[{ required: true, message: "请选择性别" }]}
              >
                <Form.Radio value={1}>男</Form.Radio>
                <Form.Radio value={2}>女</Form.Radio>
              </Form.RadioGroup>
              <Form.Input
                label="手机"
                field="phone"
                placeholder="请输入手机号"
                rules={[
                  { required: true, message: "请输入手机号" },
                  { pattern: /1\d{10}/, message: "手机号格式不正确" }
                ]}
              />
              <Form.Input
                label="电话"
                field="tel"
                placeholder="请输入电话号码"
              />
              <Form.Input
                label="邮箱"
                field="email"
                placeholder="请输入邮箱地址"
              />
              <div className="space-x-4 text-center">
                <Button onClick={() => openChangePasswordModal()}>
                  修改密码
                </Button>
                <Button theme="solid" loading={loading} htmlType="submit">
                  保存
                </Button>
              </div>
            </Paper>
          );
        }}
      </Form>
      <ChangePasswordModal {...passwordModalProps} />
    </div>
  );
};

export default Space;
