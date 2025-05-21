import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Table, DatePicker, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface GradeEntry {
  id: string;
  subject: string;
  grade: string;
  type: string;
  date: string;
}

const { Option } = Select;

export default function GradesPage() {
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [form] = Form.useForm();
  const [editingGrade, setEditingGrade] = useState<GradeEntry | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("grades");
    if (saved) setGrades(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades));
  }, [grades]);

  const onFinish = (values: any) => {
    const newGrade: GradeEntry = {
      id: editingGrade?.id || Date.now().toString(),
      subject: values.subject,
      grade: values.grade,
      type: values.type,
      date: values.date.format("YYYY-MM-DD"),
    };

    if (editingGrade) {
      setGrades((prev) => prev.map((g) => (g.id === editingGrade.id ? newGrade : g)));
      message.success("Оценка обновлена");
    } else {
      setGrades((prev) => [...prev, newGrade]);
      message.success("Оценка добавлена");
    }

    form.resetFields();
    setEditingGrade(null);
  };

  const onEdit = (record: GradeEntry) => {
    setEditingGrade(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
  };

  const onDelete = (id: string) => {
    Modal.confirm({
      title: "Удалить оценку?",
      onOk: () => {
        setGrades((prev) => prev.filter((g) => g.id !== id));
        message.success("Оценка удалена");
      },
    });
  };

  const columns: ColumnsType<GradeEntry> = [
    { title: "Предмет", dataIndex: "subject" },
    { title: "Оценка", dataIndex: "grade" },
    { title: "Тип", dataIndex: "type" },
    { title: "Дата", dataIndex: "date" },
    {
      title: "Действия",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>Редактировать</Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>📊 Оценки</h2>

      <Form form={form} layout="inline" onFinish={onFinish} style={{ marginBottom: 24 }}>
        <Form.Item name="subject" rules={[{ required: true, message: "Введите предмет" }]}>
          <Input placeholder="Предмет" />
        </Form.Item>
        <Form.Item name="grade" rules={[{ required: true, message: "Введите оценку" }]}>
          <Input placeholder="Оценка" />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true, message: "Выберите тип" }]}>
          <Select placeholder="Тип">
            <Option value="контрольная">Контрольная</Option>
            <Option value="домашняя">Домашняя работа</Option>
            <Option value="тест">Тест</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date" rules={[{ required: true, message: "Выберите дату" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingGrade ? "Сохранить" : "Добавить"}
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={grades} columns={columns} rowKey="id" />
    </div>
  );
}
