import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { registerApi } from "/@/service/api/user";

const RegisterDemo: React.FC<{ setType: Function }> = (props) => {
  const onFinish = async (values: any) => {
    const res = await registerApi(values);
    if ((res as any)?.errorCode == 0) {
      props.setType("login");
    }
  };
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ width: "400px", margin: "20px auto" }}
    >
      <Form.Item>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>REGISTER</h1>
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
        <Input size="large" prefix={<UserOutlined />} placeholder="" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" prefix={<LockOutlined />} placeholder="" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
        dependencies={["password"]}
      >
        <Input.Password size="large" prefix={<LockOutlined />} placeholder="" />
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Register
        </Button>
        Or <a onClick={() => props.setType("login")}>login now!</a>
      </Form.Item>
    </Form>
  );
};

export default RegisterDemo;
