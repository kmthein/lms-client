import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import GenreForm from "../../components/admin/genre/GenreForm";
import { getGenreandBookCount } from "../../api/genre";

const Genre = ({
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleSearch,
  handleReset,
  getColumnSearchProps,
}) => {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "30%",
      ...getColumnSearchProps("genre"),
    },
    {
      title: "Total Books",
      dataIndex: "bookCount",
      key: "bookCount",
      ...getColumnSearchProps("bookCount"),
      sorter: (a, b) => a.bookCount - b.bookCount,
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
  useEffect(() => {
    getGenreandBookCount().then((res) => setData(res));
  }, []);
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
        <GenreForm open={open} setOpen={setOpen} />
      </div>
      <Table columns={columns} dataSource={data} rowKey={"genre"} />
    </div>
  );
};

export default Genre;
