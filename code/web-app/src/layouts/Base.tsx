import React from "react";
import { Layout } from "antd";
import "./base.less";
import HeaderDemo from "./component/Header";
import ContentDemo from "./component/Content";
import FooterDemo from "./component/Footer";

const LayoutPage: React.FC = () => {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <HeaderDemo />
      <ContentDemo />
      <FooterDemo />
    </Layout>
  );
};

export default LayoutPage;
