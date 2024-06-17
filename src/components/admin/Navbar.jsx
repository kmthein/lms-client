import React from "react";
import { Button, Input, Select, Space, Dropdown, Avatar } from "antd";
import { BiDownArrow, BiDownArrowAlt, BiUser } from "react-icons/bi";
import { CgArrowBottomLeft, CgPinBottom } from "react-icons/cg";
import { LuArrowDownNarrowWide } from "react-icons/lu";
import { BsCart, BsFillCartFill } from "react-icons/bs";

const { Search } = Input;
const Navbar = () => {
  const options = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "book",
      label: "Book",
    },
    {
      value: "genre",
      label: "Genre",
    },
    {
      value: "author",
      label: "Author",
    },
  ];

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const items = [
    {
      label: "Logout",
      key: "1",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex justify-between pb-6">
      <div>
        <Space.Compact>
          <Select
            defaultValue={"All"}
            options={options}
            className="w-[100px]"
          />
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
          />
        </Space.Compact>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <BsFillCartFill className=" text-xl" />
        </div>
        <Dropdown menu={menuProps} className=" rounded-full">
          <Button className="pl-0">
            <Space>
              <Avatar
                src="https://www.shutterstock.com/image-photo/portrait-serious-confident-businessman-entrepreneur-260nw-2022462281.jpg"
                icon={<BiUser />}
              ></Avatar>
              My Profile
              <BiDownArrowAlt />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;