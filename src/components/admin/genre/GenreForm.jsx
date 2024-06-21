import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { addGenre } from "../../../api/genre";

const GenreForm = ({ open, setOpen, getAllGenresHandler }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = async (values) => {
    setConfirmLoading(true);
    try {
      await addGenre(values);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to add genre:", error);
    } finally {
      setConfirmLoading(false);
      getAllGenresHandler();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        layout="vertical"
        form={form}
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
        onFinish={onCreate}
      >
        <h1 className="text-xl mb-3 font-medium">Add Genre Name</h1>
        <Form.Item
          name="genreName"
          label="Genre Name"
          rules={[
            {
              required: true,
              message: "Please input Genre Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenreForm;
