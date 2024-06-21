import { IoMdAdd } from "react-icons/io";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookForm from "../../components/admin/book/BookForm";
import { getAllBooks } from "../../api/book";
import noImage from "../../assets/no_img.jpg";

const Books = ({
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleSearch,
  handleReset,
  getColumnSearchProps,
}) => {
  const [data, setData] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const getAllBooksHandler = async () => {
    const response = await getAllBooks();
    if (response.status == 200) {
      const modifiedData = response.data.map((d) => {
        if (d.bookImg != "") {
          return {
            ...d,
            key: d.id,
            title: d.title,
            publishYear: d.publishYear,
            stock: d.stock,
            image: import.meta.env.VITE_API + "/" + d.bookImg,
          };
        } else if (d.bookImg == "") {
          return {
            ...d,
            key: d.id,
            title: d.title,
            publishYear: d.publishYear,
            stock: d.stock,
            image: noImage,
          };
        }
        return d;
      });
      setData(modifiedData);
    }
  };

  useEffect(() => {
    getAllBooksHandler();
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Published Year",
      dataIndex: "publishYear",
      key: "publishYear",
      width: "20%",
      ...getColumnSearchProps("publishYear"),
      sorter: (a, b) => a.publishYear - b.publishYear,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div className="flex gap-4">
          <span
            className=" cursor-pointer"
            onClick={() => {
              setSelectedBookId(record.key);
              setOpen(true);
              setEditForm(true);
            }}
          >
            Edit
          </span>
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
          onClick={() => {
            showModal();
            setEditForm(false);
          }}
        >
          Add New
        </Button>
        <BookForm
          open={open}
          setOpen={setOpen}
          getAllBooksHandler={getAllBooksHandler}
          selectedBookId={selectedBookId}
          editForm={editForm}
          setEditForm={setEditForm}
        />
      </div>
      <Table columns={columns} dataSource={data} rowKey="key" />
    </div>
  );
};

export default Books;
