import React from "react";
import AuthForm from "../../components/admin/auth/AuthForm";

const Login = () => {
  return (
    <div className="h-screen flex items-center">
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;
