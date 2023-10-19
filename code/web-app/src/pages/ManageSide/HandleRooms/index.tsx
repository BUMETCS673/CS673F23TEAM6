import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Radio, message } from "antd";
import "./index.less";
import { useLocation, useParams } from "react-router-dom";
import UploadDemo from "./components/Upload";
import { insertRoom, updateRoom } from "/@/service/api/manageRoom";
import { getRoomDetail } from "/@/service/api/userRoom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

const HandleRoomsDemo: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const param = useParams();

  const onFinish = async (values: any) => {
    let res;
    Object.assign(values, { location: "ucl" });
    if (location.pathname.includes("editRoom")) {
      res = await updateRoom({ id: Number(param?.id) }, values);
    } else {
      res = await insertRoom(values);
    }
    if ((res as any)?.errorCode == 0) {
      message.success("success");
    }
  };

  const initRoomDetail = async () => {
    const res = await getRoomDetail({ id: Number(param?.id) });
    if (res?.data?.id) {
      form.setFieldsValue(res?.data);
    }
  };
  useEffect(() => {
    if (location.pathname.includes("editRoom") && param?.id) {
      initRoomDetail();
    }
  }, []);

  return (
    <div className="handleroom_container">
      <h1 style={{ paddingBottom: 10 }}>
        {(location.pathname.includes("editRooms") ? "Edit" : "Create") +
          " Room"}
      </h1>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600, minWidth: 500, marginBottom: 100 }}
        scrollToFirstError
        size="large"
      >
        <Form.Item
          name="roomName"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input room name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Power Available"
          name="power"
          rules={[
            {
              required: true,
              message: "Please select power available!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}> Yes </Radio>
            <Radio value={0}> No </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[
            {
              required: true,
              message: "Please input capacity!",
            },
          ]}
        >
          <InputNumber min={1} precision={0} />
        </Form.Item>
        <Form.Item
          name="floor"
          label="Floor"
          rules={[{ required: true, message: "Please select floor!" }]}
        >
          <Radio.Group>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="photo"
          label="Image"
          rules={[{ required: true, message: "Please upload image!" }]}
        >
          <UploadDemo />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            SAVE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HandleRoomsDemo;
