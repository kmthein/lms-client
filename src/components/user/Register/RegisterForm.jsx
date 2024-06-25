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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { registerUser } from "../../../api/auth";

const { Option } = Select;
const { Title } = Typography;

const RegisterForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [signIn, setsignIn] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const onCreate = async (values) => {
    setConfirmLoading(true);
    try {
      console.log(values);
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.delete("image");
      formData.append("role", "MEMBER");
      images.forEach((file) => {
        formData.append("files", file);
      });
      const response = await registerUser(formData);
      console.log(response);
      if (response.status == 200) {
        setOpen(false);
        form.resetFields();
        setPreviewImg([]);
        setImages([]);
        messageApi.open({
          type: "success",
          content: "Member registration successful",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "This is an error message",
        });
      }
    } catch (error) {
      console.error("Failed to register:", error);
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
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

  const deleteHandler = (img) => {
    const indexToDelete = previewImg.findIndex((e) => e == img);
    if (indexToDelete != -1) {
      const updatedSelectedImg = [...images];
      updatedSelectedImg.splice(indexToDelete, 1);

      setImgCount((prev) => prev - 1);
      setImages(updatedSelectedImg);
      setPreviewImg(previewImg.filter((e) => e != img));
      URL.revokeObjectURL(img);
    }
    setPreviewImg(null);
  };

  const onChangeHandler = (e) => {
    const selectedImages = e.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    setImages(selectedImagesArray);

    setImgCount((prev) => prev + selectedImagesArray.length);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImg((prev) => [previewImagesArray]);
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
      {contextHolder}
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
                <Form.Item name="book_img" label="Book Image">
                  {(images.length < 1 || previewImg == []) && (
                    <label htmlFor="upload">
                      <div className=" border-[2px] border-dashed rounded-md w-full flex items-center h-[100px]">
                        <FaPlus className="mx-auto text-xl cursor-pointer text-black/50 hover:text-black/70 hover:text-[1.3rem]" />
                      </div>
                    </label>
                  )}
                  <input
                    type="file"
                    id="upload"
                    name="files"
                    multiple
                    onChange={onChangeHandler}
                    accept="image/*"
                  />
                  {previewImg &&
                    previewImg.map((img, index) => (
                      <div className=" h-32 relative" key={index}>
                        <img
                          src={img}
                          key={index}
                          className="w-full h-full object-contain rounded-md"
                        />
                        <FaTrashAlt
                          onClick={() => deleteHandler(img)}
                          className="z-50 absolute bottom-2 right-4 text-red-500 text-md cursor-pointer"
                        />
                      </div>
                    ))}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="member_type"
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
