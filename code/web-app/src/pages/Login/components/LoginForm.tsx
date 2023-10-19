import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginParams } from "/@/service/types/user";
import { loginApi } from "/@/service/api/user";
import { setToken } from "/@/utils/local";
import { setInfo } from "/@/store/modules/user";
import { useDispatch } from "react-redux";

const LoginDemo: React.FC<{ setType: Function }> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: LoginParams) => {
    // try {
    //   message.loading({
    //     content: "Loading...",
    //   });
    //   const res = await loginApi(values);
    //   message.destroy();
    //   if (res?.data) {
    //     setToken(res?.data?.thirdSession);
    //     dispatch(
    //       setInfo({
    //         email: values.email,
    //         token: res?.data?.thirdSession,
    //         rule: res?.data?.userType == 1 ? "admin" : "user",
    //       })
    //     );
    //     navigate("/", {
    //       replace: true,
    //     });
    //   }
    // } catch (error) {
    // } finally {
    //   message.destroy();
    // }
    setToken('token');
    dispatch(
      setInfo({
        email: values.email,
        token: 'token',
        rule: 'admin',
      })
    );
    navigate("/", {
      replace: true,
    });
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: "400px", margin: "20px auto" }}
    >
      <Form.Item>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>LOGIN</h1>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true, message: "Please input your email!" },
        ]}
      >
        <Input size="large" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your assword!" }]}
      >
        <Input.Password size="large" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Login in
        </Button>
        Or <a onClick={() => props.setType("register")}>register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginDemo;
