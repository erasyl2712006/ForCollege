import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Table, message } from "antd";

const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

type Lesson = {
  key: string;
  day: string;
  subject: string;
  time: string;
};

export default function Schedule() {
  const [form] = Form.useForm();
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("college-schedule");
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("college-schedule", JSON.stringify(schedule));
  }, [schedule]);

  const openModal = (record?: Lesson) => {
    if (record) {
      form.setFieldsValue(record);
      setEditKey(record.key);
    } else {
      form.resetFields();
      setEditKey(null);
    }
    setIsModalOpen(true);
  };

  const handleFinish = (values: Omit<Lesson, "key">) => {
    if (editKey) {
      setSchedule((prev) =>
        prev.map((item) => (item.key === editKey ? { ...values, key: editKey } : item))
      );
      message.success("Запись обновлена");
    } else {
      const newLesson = { ...values, key: Date.now().toString() };
      setSchedule((prev) => [...prev, newLesson]);
      message.success("Запись добавлена");
    }
    setIsModalOpen(false);
  };

  const deleteLesson = (key: string) => {
    Modal.confirm({
      title: "Удалить занятие?",
      onOk: () => {
        setSchedule((prev) => prev.filter((item) => item.key !== key));
        message.success("Удалено");
      },
    });
  };

  const columns = [
    {
      title: "День недели",
      dataIndex: "day",
    },
    {
      title: "Предмет",
      dataIndex: "subject",
    },
    {
      title: "Время",
      dataIndex: "time",
    },
    {
      title: "Действия",
      render: (_: any, record: Lesson) => (
        <>
          <Button size="small" onClick={() => openModal(record)} style={{ marginRight: 8 }}>
            Редактировать
          </Button>
          <Button danger size="small" onClick={() => deleteLesson(record.key)}>
            Удалить
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card title="📅 Расписание занятий" extra={<Button onClick={() => openModal()}>Добавить</Button>}>
        <Table columns={columns} dataSource={schedule} rowKey="key" pagination={false} />
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title={editKey ? "Редактировать занятие" : "Новое занятие"}
        onOk={() => form.submit()}
        okText={editKey ? "Сохранить" : "Добавить"}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="day" label="День недели" rules={[{ required: true, message: "Выберите день" }]}>
            <Select options={daysOfWeek.map((day) => ({ value: day, label: day }))} />
          </Form.Item>
          <Form.Item name="subject" label="Предмет" rules={[{ required: true, message: "Введите предмет" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Время" rules={[{ required: true, message: "Введите время" }]}>
            <Input placeholder="например, 08:30–10:00" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
