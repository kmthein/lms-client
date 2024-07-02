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
import React, { useEffect, useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, users } from "../../../features/user/userSlice";
import Title from "antd/es/skeleton/Title";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const AuthForm = ({ isLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const { user, token } = useSelector(users);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token]);

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const formData = new FormData();
    if (isLogin) {
      formData.append("email", values.email);
      formData.append("password", values.password);
      const response = await loginUser(formData);
      console.log(response);
      const status = response.data.status;
      if (status == "401" || status == "403") {
        messageApi.open({
          type: "error",
          content: response.data.message,
        });
      } else if (status == "200") {
        if (response.data.memberDTO) {
          console.log("Can't authorize");
          messageApi.open({
            type: "error",
            content: "You can't authorize this account!",
          });
          return;
        }
        const { token, librarianDTO } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(librarianDTO));
        dispatch(login({ user: librarianDTO, token }));
        navigate("/admin");
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      }
    }
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
    <>
      {contextHolder}
      {isLogin ? (
        <div className=" bg-[#f7f7f77e] admin_box w-[30%] mx-auto py-8 rounded-lg">
          <h1 className=" text-3xl title tracking-wider text-center">
            Book<span className="text-[#393280] ml-1">Wave</span>
          </h1>
          <p className="text-center mt-3">Admin Panel</p>
          <div className="w-[70%] mx-auto mt-20">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={
                {
                  // remember: true,
                }
              }
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <MdOutlineEmail className="site-form-item-icon text-[#434343]" />
                  }
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <BiLock className="site-form-item-icon text-[#434343]" />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button block mx-auto mb-5"
                >
                  Log in
                </Button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <Link to="/admin-register">
                    <span className=" ml-2 border-b-[1px] hover:text-gray-500 text-[#8071ed]">
                      Sign Up
                    </span>
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className="bg-[#f7f7f77e] admin_box w-[50%] mx-auto py-8 rounded-lg">
          <h1 className=" text-3xl title tracking-wider text-center">
            Book<span className="text-[#393280] ml-1">Wave</span>
          </h1>
          <p className="text-center mt-3">Admin Panel</p>
          <div className="w-[70%] mx-auto mt-7 admin-login">
            <Form
              name={"user_registration"}
              onFinish={onFinish}
              layout="vertical"
              initialValues={{ expired_date: 7 }}
            >
              <Title level={3} className="text-center my-4">
                Register
              </Title>
              <>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
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
                        {
                          required: true,
                          message: "Please input your name!",
                        },
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
                        {
                          required: true,
                          message: "Please input your email!",
                        },
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
                        {
                          required: true,
                          message: "Please input your password!",
                        },
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
                        {
                          required: true,
                          message: "Please input your address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </>
              <Row justify="center">
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit border-0 text-white"
                    >
                      Register
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <p className="text-center">
                  If you have already an account?{" "}
                  <span
                    className="text-blue-400 cursor-pointer underline"
                    onClick={() => navigate("/admin-login")}
                  >
                    Sign In
                  </span>
                </p>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
