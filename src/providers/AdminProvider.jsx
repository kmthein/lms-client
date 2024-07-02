import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { users } from "../features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const AdminProvider = () => {
  const { user, token } = useSelector(users);

  let content;
  if (token && user.role === "LIBRARIAN") {
    content = <Outlet />;
  } else if (!token) {
    content = !token && <Navigate to="/admin-login" />;
  } else if (token && user.role === "MEMBER") {
    content = <Navigate to="/" />;
  } else {
    content = <Navigate to="/" />;
  }
  return (
    <>
      {/* {!token ? (
        <Navigate to="/admin-login" />
      ) : token && user.role === "MEMBER" ? (
        <Navigate to="/" />
      ) : (
        <Outlet />
      )} */}
      {content}
    </>
  );
};

export default AdminProvider;
