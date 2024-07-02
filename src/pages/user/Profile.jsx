import React from "react";
import { Card, Avatar, Typography, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { users } from "../../features/user/userSlice";
import { NavLink } from "react-router-dom";

const { Title, Text } = Typography;

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const Profile = () => {
  const { user } = useSelector(users);

  return (
    <div className="w-full lg:w-10/12 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>My Profile</Title>
        <NavLink
          to="edit"
          className="flex items-center px-4 py-2 text-gray-700 font-semibold"
        >
          <EditOutlined className="mr-2" />
          Edit
        </NavLink>
      </div>
      <Card className="mb-5">
        <div className="flex items-center">
          <Avatar
            size={100}
            src={import.meta.env.VITE_API + "/" + user.userImg}
          />
          <div className="ml-5">
            <Title level={4} className="mb-0">
              {user.username}
            </Title>
            <Text type="secondary">Member Type: {user.memberType}</Text>
            <br />
            <Text type="secondary">
              Expired Date: {formatDate(user.memberExpireDate)}
            </Text>
          </div>
        </div>
      </Card>
      <Card className="mb-5">
        <Title level={4} className="mb-4">
          Personal Information
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Text strong>Name</Text>
            <p>{user.name}</p>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Member Started Date</Text>
            <p>{formatDate(user.memberStartDate)}</p>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Email</Text>
            <p>{user.email}</p>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Phone</Text>
            <p>{user.phone}</p>
          </Col>
        </Row>
      </Card>
      <Card>
        <div>
          <Title level={4} className="mb-4">
            Address
          </Title>
          <p>{user.address}</p>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
