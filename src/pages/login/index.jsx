import React from "react";
import { useMutation } from "hooks";
import routers from "routers";
import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { Button, Form } from "@douyinfe/semi-ui";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";
import { encrypt } from "utils";
import { USER_LOGIN } from "services/auth";
import { useLocation } from "react-use";
import { parse } from "query-string";

const Login = () => {
  const [submit, { loading }] = useMutation(USER_LOGIN);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const handleLogin = async values => {
    // history.push(routers.HOME);
    values.password = encrypt(values.password); // 加密
    const result = await submit(values);
    const { data: token, userInfos, success } = result;

    if (success) {
      localStorage.setItem("acc", token);
      dispatch(appSlice.actions.setToken(token));
      const { redirect } = parse(search);
      if (redirect) {
        history.push(redirect);
      } else {
        history.push(routers.HOME);
      }
    }
  };

  return (
    <Form
      labelAlign="right"
      labelCol={{ span: 6 }}
      labelPosition="left"
      className="w-96 px-4 mt-48 mx-auto"
      onSubmit={handleLogin}
    >
      <div className="text-center text-lg">
        <FormattedMessage id="WEBSITE_NAME" />
      </div>
      <Form.Input
        field="account"
        label="用户名"
        rules={[{ required: true }]}
        size="large"
        placeholder="请输入用户名"
      />
      <Form.Input
        type="password"
        field="password"
        label="密码"
        rules={[{ required: true }]}
        size="large"
        placeholder="请输入密码"
      />

      <Button
        loading={loading}
        block
        size="large"
        htmlType="submit"
        type="primary"
      >
        登录
      </Button>
    </Form>
  );
};

export default Login;
