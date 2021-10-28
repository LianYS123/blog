import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useMutation } from "hooks";
import routers from "routers";
import { useHistory } from "react-router";
import { AUTH_LOGIN } from "services/API";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const [submit, { loading }] = useMutation(AUTH_LOGIN);
  const history = useHistory();

  const handleLogin = async values => {
    // history.push(routers.HOME);
    const result = await submit(values);
    const { data: token, userInfos, code } = result;
    console.log(result);

    if (code === "0000") {
      localStorage.setItem("acc", token);
      history.push(routers.HOME);
    }
  };

  return (
    <Form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        overflow: "auto"
      }}
      onFinish={handleLogin}
    >
      <div
        style={{
          width: "50%",
          maxWidth: 500,
          minWidth: 300,
          transform: "translateY(-20%)"
        }}
      >
        <Typography.Title style={{ textAlign: "center" }} level={2}>
          <FormattedMessage id="WEBSITE_NAME" />
        </Typography.Title>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input size="large" placeholder="Account" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Button
          loading={loading}
          block
          size="large"
          htmlType="submit"
          type="primary"
        >
          登录
        </Button>
      </div>
    </Form>
  );
};

export default Login;
