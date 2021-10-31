import React from "react";
import { useMutation } from "hooks";
import routers from "routers";
import { useHistory } from "react-router";
import { AUTH_LOGIN } from "services/API";
import { FormattedMessage } from "react-intl";
import { Button, Form } from "@douyinfe/semi-ui";
import { useDispatch } from "react-redux";
import { appSlice } from "models/app";

const Login = () => {
  const [submit, { loading }] = useMutation(AUTH_LOGIN);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async values => {
    // history.push(routers.HOME);
    const result = await submit(values);
    const { data: token, userInfos, code } = result;

    if (code === "0000") {
      localStorage.setItem("acc", token);
      dispatch(appSlice.actions.setToken(token));
      history.push(routers.HOME);
    }
  };

  return (
    <Form
      labelAlign="right"
      labelCol={{ span: 6 }}
      labelPosition="left"
      className="w-96 mt-64 mx-auto"
      onSubmit={handleLogin}
    >
      <div className="text-center text-lg">
        <FormattedMessage id="WEBSITE_NAME" />
      </div>
      <Form.Input
        field="username"
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
