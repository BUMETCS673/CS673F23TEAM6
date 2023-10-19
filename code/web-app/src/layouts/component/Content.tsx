import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "../base.less";

const { Content } = Layout;

const ContentDemo: React.FC = () => {
  return (
    <Content
      style={{ padding: "0 50px", display: "flex" }}
      className="site-layout"
    >
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </Content>
  );
};

export default ContentDemo;
