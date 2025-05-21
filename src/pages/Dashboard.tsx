import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Добро пожаловать в систему колледжа</Title>
      <Paragraph>Выберите раздел в меню для работы:</Paragraph>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <Card title="📚 Расписание" bordered>
          <Link to="/schedule">Перейти</Link>
        </Card>
        <Card title="📝 Оценки" bordered>
          <Link to="/grades">Перейти</Link>
        </Card>
        <Card title="⚙️ Админ-панель" bordered>
          <Link to="/admin">Перейти</Link>
        </Card>
      </div>
    </div>
  );
}
