import React from "react";
import { Layout } from "antd";
import "../base.less";
import dayjs from "dayjs";  
import { CopyrightOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const FooterDemo: React.FC = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#ffffff",
        color: "#000",
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(99, 97, 97, 0.25)",
      }}
    >
      {/* © */}
      Copyright <CopyrightOutlined style={{padding:'0px 2px 0px 8px'}} />{dayjs().get("year")} College Street
    </Footer>
  );
};

export default FooterDemo;
