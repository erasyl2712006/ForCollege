import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  ScheduleOutlined,
  HomeOutlined,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "32px",
            fontWeight: "bold",
          }}
        >
          ForCollege
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "/dashboard",
              icon: <HomeOutlined />,
              label: "Главная",
            },
            {
              key: "/schedule",
              icon: <ScheduleOutlined />,
              label: "Расписание",
            },
            {
              key: "/grades",
              icon: <BookOutlined />,
              label: "Оценки",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "right", paddingRight: 24 }}>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выйти
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
