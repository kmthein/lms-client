import React, { useState } from "react";
import { Form, Input, Button, Typography, Select, Avatar } from "antd";
import { useSelector } from "react-redux";
import { users } from "../../features/user/userSlice";

const { Title } = Typography;
const { Option } = Select;

const EditProfile = () => {
  const { user } = useSelector(users);

  const onFinish = (values) => {
    console.log(values);
    const formData = new FormData();
  };

  return (
    <div className="w-full lg:w-10/12 mx-auto mt-8">
      <Title level={3} className="mb-4">
        Edit Profile
      </Title>
      <Form
        layout="vertical"
        initialValues={{
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
          memberType: user.memberType,
          userImg: user.userImg,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userImg"
          label="User Image"
          rules={[{ required: true, message: "Please upload your image!" }]}
        >
          <Avatar size={100} src={import.meta.env.VITE_API + user.userImg} />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Please enter a valid email address!" },
            { required: true, message: "Please enter your email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="memberType"
          label="Member Type"
          rules={[{ required: true, message: "Please select member type!" }]}
        >
          <Select>
            <Option value="standard">Standard</Option>
            <Option value="premium">Premium</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
