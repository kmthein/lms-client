import { IoMdAdd } from "react-icons/io";
import { Button, Input, Modal, Space, Table } from "antd";
import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import BookForm from "../../components/admin/book/BookForm";

const data = [
  {
    key: "1",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s",

    title: "Book One",

    year: "2020",

    fees: "10",

    stock: "20",
  },

  {
    key: "2",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s",

    title: "Book Two",

    year: "2019",

    fees: "12",

    stock: "15",
  },

  {
    key: "3",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s",

    title: "Book Three",

    year: "2021",

    fees: "8",

    stock: "30",
  },

  {
    key: "4",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s",

    title: "Book Four",

    year: "2022",

    fees: "15",

    stock: "10",
  },
];

const Books = ({
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleSearch,
  handleReset,
  getColumnSearchProps,
}) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.image} alt="image" style={{ width: "100%" }} />
      ),
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Published Year",
      dataIndex: "year",
      key: "year",
      width: "20%",
      ...getColumnSearchProps("year"),
    },
    {
      title: "Rent Fees",
      dataIndex: "fees",
      key: "fees",
      ...getColumnSearchProps("fees"),
      sorter: (a, b) => a.fees.length - b.fees.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a.stock.length - b.stock.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="flex gap-4">
          <Link to={""}>Edit</Link>
          <Link to={""} className=" text-red-600">
            Delete
          </Link>
        </div>
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          icon={<IoMdAdd />}
          iconPosition={"end"}
          onClick={showModal}
        >
          Add New
        </Button>
        <BookForm open={open} setOpen={setOpen} />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Books;
