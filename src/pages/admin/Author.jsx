import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthorForm from "../../components/admin/author/AuthorForm";
import { getAllAuthors } from "../../api/author";
import noImage from "../../assets/no_img.jpg";

const Author = ({
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleSearch,
  handleReset,
  getColumnSearchProps,
}) => {
  const [data, setData] = useState([]);

  const getAllAuthorsHandler = async () => {
    try {
      const response = await getAllAuthors();
      console.log(response);

      const modifiedData = response.data.map((d) => {
        if (d.image != null) {
          console.log("not null");
          return { ...d, image: import.meta.env.VITE_API + "/" + d.image };
        } else if (d.image == null) {
          return { ...d, image: noImage };
        }
        return d;
      });

      setData(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    getAllAuthorsHandler();
  }, []);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Total Books",
      dataIndex: "bookCount",
      key: "bookCount",
      ...getColumnSearchProps("bookCount"),
      sorter: (a, b) => a.bookCount.length - b.bookCount.length,
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
        <AuthorForm
          open={open}
          setOpen={setOpen}
          getAllAuthorsHandler={getAllAuthorsHandler}
        />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Author;
