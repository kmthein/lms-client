import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

const Admin = () => {
  return (
    <div className="main pt-6">
      <div className="w-[98%] bg-[#fff] mx-auto rounded-md flex">
        <Sidebar />
        <div className="py-6 px-10 bg-[#f3f3f7] w-[80%] rounded-tr-md rounded-br-md">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
