import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginParams } from "/@/service/types/user";
import { loginApi } from "/@/service/api/user";
import { setToken } from "/@/utils/local";
import { setInfo } from "/@/store/modules/user";
import { useDispatch } from "react-redux";

import { useAuth0 } from "@auth0/auth0-react";

const LoginDemo: React.FC<{}> = () => {
  const {loginWithRedirect } = useAuth0();
  
  return (
    <Button size="large" type="primary" htmlType="submit" onClick={() => loginWithRedirect()}>Login in</Button>
  )
};

export default LoginDemo;
