import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { users } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const AdminProvider = ({ children }) => {
  const { user, token } = useSelector(users);

  const navigate = useNavigate();

  //   console.log(user);

  useEffect(() => {
    switch (true) {
      case !token:
        navigate("/admin-login");
        break;
      case token && user.role === "MEMBER":
        navigate("/");
        break;
      default:
        break;
    }
  }, [token, user, navigate]);

  return <>{children}</>;
};

export default AdminProvider;
