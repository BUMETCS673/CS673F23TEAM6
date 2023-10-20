import React, { useState } from "react";
import "./index.less";
import LoginBgSvg from "/@/assets/login-box-bg.svg";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginDemo: React.FC = () => {
  const [type, setType] = useState<"login" | "register">("login");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      className="login-box"
    >
      <div className="login-box-left">
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#FFF",
            zIndex: 100,
            width: 288,
          }}
        >
          College Street
        </h1>
        <img
          src={LoginBgSvg}
          className="login-box-bg"
          style={{ width: 288, height: 148 }}
        />
      </div>
      <div className="login-box-right">
        <LoginForm />
        {/* {type == "login" ? (
          <LoginForm setType={setType} />
        ) : (
          <RegisterForm setType={setType} />
        )} */}
      </div>
    </div>
  );
};

export default LoginDemo;
