import { Button, Table } from "antd";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublisherForm from "../../components/admin/publisher/PublisherForm";
import { getPublisherandBook } from "../../api/publisher";

const Publisher = ({
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleSearch,
  handleReset,
  getColumnSearchProps,
}) => {
  const [data, setData] = useState([]);
  console.log(data);
  const columns = [
    {
      title: "Name",
      dataIndex: "publisherName",
      key: "publisherName",
      width: "30%",
      ...getColumnSearchProps("publisherName"),
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
    getPublisherandBook().then((res) => setData(res));
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
        <PublisherForm open={open} setOpen={setOpen} />
      </div>
      <Table columns={columns} dataSource={data} rowKey={"publisherName"} />
    </div>
  );
};

export default Publisher;
