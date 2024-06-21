import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  Row,
  Col,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const RegisterForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [signIn, setsignIn] = useState(false);

  const onCreate = async (values) => {
    setConfirmLoading(true);
    try {
      console.log(values);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to register:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSignIn = () => {
    setsignIn(!signIn);
    form.resetFields();
  };

  return (
    <Modal
      footer={null}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={800}
    >
      <Form
        form={form}
        name={signIn ? "user_signin" : "user_registration"}
        onFinish={onCreate}
        layout="vertical"
        initialValues={{ expired_date: 7 }}
      >
        <Title level={3} className="text-center mb-4">
          {signIn ? "Sign In" : "Register"}
        </Title>

        {!signIn ? (
          <>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="image" label="Profile Image">
                  <Upload listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="membership"
                  label="Membership Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select your membership type!",
                    },
                  ]}
                >
                  <Select placeholder="Select membership type">
                    <Option value="standard">Standard</Option>
                    <Option value="premium">Premium</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="expired_date"
                  label="Expired Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the expiration date!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={7}>7 days (free)</Radio>
                    <Radio value={1}>1 month</Radio>
                    <Radio value={3}>3 months</Radio>
                    <Radio value={6}>6 months</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <Row justify="center">
          <Col>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-amber-500 hover:bg-amber-400 submit border-0 text-white"
              >
                {signIn ? "Sign In" : "Register"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          {!signIn ? (
            <p className="text-center">
              If You Have Already An Account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={handleSignIn}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-center">
              If You don't Have An Account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={handleSignIn}
              >
                Sign Up
              </span>
            </p>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterForm;
