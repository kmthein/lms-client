import React from "react";
import AuthForm from "../../components/admin/auth/AuthForm";

const Register = () => {
  return (
    <div className="h-screen flex items-center">
      <AuthForm isLogin={false} />
    </div>
  );
};

export default Register;
