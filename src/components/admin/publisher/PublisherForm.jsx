import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { addPublisher } from "../../../api/publisher";

const PublisherForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = async (values) => {
    setConfirmLoading(true);
    try {
      await addPublisher(values);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to add genre:", error);
    } finally {
      setConfirmLoading(false);
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
        <h1 className="text-xl mb-3 font-medium">Add Publisher Name</h1>
        <Form.Item
          name="publisherName"
          label="Publisher Name"
          rules={[
            {
              required: true,
              message: "Please input Publisher Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PublisherForm;
