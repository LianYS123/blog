import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useMutation } from "hooks";
import routers from "routers";
import { useHistory } from "react-router";
import { LOGOUT_URL } from "services/API";

const Login = () => {
  const [submit, { loading }] = useMutation(LOGOUT_URL);
  const history = useHistory();

  const handleLogin = async values => {
    history.push(routers.HOME);
    // const { token, userInfos, code, userId } = await submit(values);

    // if (code === "0000") {
    //   localStorage.setItem("acc", token);
    //   history.push(routers.HOME);
    // }
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
          Blog
        </Typography.Title>
        <Form.Item name={"account"} rules={[{ required: true }]}>
          <Input size="large" placeholder="Account" />
        </Form.Item>

        <Form.Item name={"password"} rules={[{ required: true }]}>
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
