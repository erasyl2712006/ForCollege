import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth"; // если у тебя такой функции пока нет — сделаем

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    const success = login(values.username, values.password);
    if (success) {
      message.success("Успешный вход");
      navigate("/dashboard");
    } else {
      message.error("Неверный логин или пароль");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>Вход</Title>
      <Form
        layout="vertical"
        name="login"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
