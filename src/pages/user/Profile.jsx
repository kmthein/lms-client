// src/components/UserProfile.js
import React from "react";
import { Card, Avatar, Typography, Button, Row, Col } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const UserProfile = () => {
  return (
    <div className="w-full lg:w-[90%] mx-auto">
      <Title level={3}>My Profile</Title>
      <Card>
        <div className="flex">
          <Avatar
            size={{
              xxl: 100,
            }}
            icon={
              <img src="https://images.pexels.com/photos/26546097/pexels-photo-26546097/free-photo-of-a-goat-lying-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            }
          />
          <div>
            <Title level={3}>John Doe</Title>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
