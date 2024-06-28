import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import RegisterForm from "./Register/RegisterForm";
import Cart from "../../features/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { allCart } from "../../features/cart/cartSlice";
import { logout, users } from "../../features/user/userSlice";
import { Button, Dropdown, Space, Input, Avatar } from "antd";
import { BiUser } from "react-icons/bi";

const Navbar = () => {
  const { Search } = Input;
  const [open, setOpen] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  const { user, token } = useSelector(users);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (token == null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [user]);

  const { cartItem } = useSelector(allCart);

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };
  const handleDrawer = () => {
    setIsDrawer(!isDrawer);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const items = [
    {
      label: <NavLink to="/profile">My Profile</NavLink>,
      key: "1",
    },
    {
      label: (
        <span
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </span>
      ),
      key: "2",
    },
  ];
  const menuProps = {
    items,
  };

  return (
    <div className=" py-8">
      <div className=" w-full lg:w-[90%] mx-auto flex items-center justify-between">
        <h1 className=" text-3xl title tracking-wider">
          Book<span className="text-[#393280] ml-1">Wave</span>
        </h1>
        {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 400, borderRadius: "10px" }}
        /> */}
        <div className="flex gap-20 items-center uppercase font-medium">
          <ul className="flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) => isActive && " font-bold"}
              end
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) => isActive && " font-bold"}
            >
              <li>Books</li>
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) => isActive && " font-bold"}
            >
              <li>My Library</li>
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => isActive && " font-bold"}
            >
              <li>History</li>
            </NavLink>
          </ul>
          <ul className="flex gap-5">
            {!isLogin ? (
              <li className="flex items-center gap-1">
                <BsPerson
                  className="text-xl cursor-pointer"
                  onClick={showModal}
                />
              </li>
            ) : (
              <Dropdown menu={menuProps} className=" cursor-pointer">
                <Avatar
                  icon={
                    user?.userImg != null ? (
                      <img src={import.meta.env.VITE_API + user?.userImg} />
                    ) : (
                      <BiUser />
                    )
                  }
                />
              </Dropdown>
            )}

            <li className="flex items-center gap-1 relative">
              <CiBookmark
                className="text-xl cursor-pointer"
                onClick={handleDrawer}
              />
              {cartItem.length > 0 && (
                <span className=" bg-[#dc3232] text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full absolute -right-3 -top-2">
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
