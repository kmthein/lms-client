import { Button, Table } from "antd";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import BookForm from "../../components/admin/book/BookForm";

const data = [
  {
    key: "1",
    name: "Stephen Hawking",
    total_books: "120",
  },
  {
    key: "2",
    name: "Nicholas Sparks",
    total_books: "54",
  },
  {
    key: "3",
    name: "Suzanne Collins",
    total_books: "80",
  },
  {
    key: "4",
    name: "Spiegelman",
    total_books: "43",
  },
  {
    key: "5",
    name: "Rupi Kaur",
    total_books: "150",
  },
];

const Author = ({
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Total Books",
      dataIndex: "total_books",
      key: "total_books",
      ...getColumnSearchProps("total_books"),
      sorter: (a, b) => a.total_books.length - b.total_books.length,
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

export default Author;
