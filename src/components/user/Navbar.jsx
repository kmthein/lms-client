import React, { useState } from "react";
import { Input, Space } from "antd";
import { BsPerson } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
import RegisterForm from "./Register/RegisterForm";

const Navbar = () => {
  const { Search } = Input;
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className=" py-8">
      <div className=" w-[90%] mx-auto flex items-center justify-between">
        <h1 className=" text-3xl title tracking-wider">
          Book<span className="text-[#393280] ml-1">Wave</span>
        </h1>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 400, borderRadius: "10px" }}
        />
        <div className="flex gap-20 items-center uppercase font-medium">
          <ul className="flex gap-8">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/books">
              <li>Books</li>
            </Link>
            <Link to="/">
              <li>My Library</li>
            </Link>
          </ul>
          <ul className="flex gap-5">
            <li className="flex items-center gap-1">
              <BsPerson
                className="text-xl cursor-pointer"
                onClick={showModal}
              />
              {/* <span>Account</span> */}
            </li>
            <li className="flex items-center gap-1">
              <CiBookmark className="text-xl cursor-pointer" />
              {/* <span>Cart</span> */}
            </li>
          </ul>
        </div>
        <RegisterForm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
