import React, { useEffect, useState } from "react";
import { Layout, Image, Tabs, Space, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreAddOutlined,
  BarChartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  TagsOutlined,
  UnorderedListOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import "../base.less";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "/@/store/modules/user";

const { Header } = Layout;

const items = [
  {
    label: "Display",
    path: "/manage/display",
    icon: <PlusCircleOutlined />,
    auth: "admin",
  },
  {
    label: "Search",
    path: "/manage/rooms",
    icon: <CopyOutlined />,
    auth: "admin",
  },
  // {
  //   label: "STATISTIC",
  //   path: "/manage/statistic",
  //   icon: <BarChartOutlined />,
  //   auth: "admin",
  // },
  {
    label: "SERVICE",
    path: "/user/service",
    icon: <AppstoreAddOutlined />,
    auth: "user",
  },
  {
    label: "HISTORY",
    path: "/user/history",
    icon: <HistoryOutlined />,
    auth: "user",
  },
  {
    label: "ROOMS",
    path: "/user/rooms",
    icon: <UnorderedListOutlined />,
    auth: "user",
  },
  {
    label: "PREFERBOOKING",
    path: "/user/preferBooking",
    icon: <TagsOutlined />,
    auth: "user",
  },
];

const HeaderDemo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>("");
  const user = useSelector((state: any) => state?.user);
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]);
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "#000000",
      }}
    >
      <div style={{ 
        flexShrink: 0, 
        height: "100%", 
        overflow: "hidden",
        color: '#fff',
        fontSize: '30px' 
      }}>
        <span>College Street</span>
      </div>
      <div
        style={{
          background: "#000000",
          flexGrow: 1,
          padding: "0px 30px",
          height: "100%",
        }}
      >
        <Tabs
          onTabClick={(e) => {
            navigate(e);
          }}
          activeKey={activeKey}
          items={items
            .filter((item) => item?.auth == user?.rule)
            .map((item) => {
              return {
                label: (
                  <span>
                    {item.icon}
                    {item.label}
                  </span>
                ),
                key: item.path,
              };
            })}
        />
      </div>
      <div style={{ flexShrink: 0 }}>
        <Tooltip title="Log Out">
          <a
            onClick={() => {
              dispatch(logOut());
              navigate("/login", { replace: true });
            }}
          >
            <Space>
              {user?.email} <LogoutOutlined />
            </Space>
          </a>
        </Tooltip>
      </div>
    </Header>
  );
};

export default HeaderDemo;
