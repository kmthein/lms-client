import React, { useState } from "react";
import { Input, Space } from "antd";
import { BsPerson } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
import RegisterForm from "./Register/RegisterForm";
import Cart from "../../features/cart/Cart";
import { useSelector } from "react-redux";
import { allCart } from "../../features/cart/cartSlice";

const Navbar = () => {
  const { Search } = Input;
  const [open, setOpen] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  const { cartItem } = useSelector(allCart);

  const showModal = () => {
    setOpen(true);
  };
  const handleDrawer = () => {
    setIsDrawer(!isDrawer);
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
            <li className="flex items-center gap-1 relative">
              <CiBookmark
                className="text-xl cursor-pointer"
                onClick={handleDrawer}
              />
              {cartItem.length > 0 && (
                <span className=" bg-[#dc3232] text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full absolute -right-3 -top-3">
                  {cartItem.length}
                </span>
              )}
            </li>
          </ul>
        </div>
        <RegisterForm open={open} setOpen={setOpen} />
        <Cart onClose={handleDrawer} open={isDrawer} />
      </div>
    </div>
  );
};

export default Navbar;
