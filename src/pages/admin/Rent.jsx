import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { formatDate } from "../../utils";
import { getAllBookRent } from "../../api/bookrent";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     booktitle: "JS Book",
//     rentdate: formatDate(),
//     duedate: formatDate(7),
//     status: "pending",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     booktitle: "JAVA Book",
//     rentdate: formatDate(),
//     duedate: formatDate(7),
//     status: "active",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     booktitle: "PYTHON Book",
//     rentdate: formatDate(),
//     duedate: formatDate(7),
//     status: "reject",
//   },
// ];

const Rent = () => {
  const [data, setData] = useState([]);

  const getAllRentHandler = async () => {
    const response = await getAllBookRent();
    if (response.status == 200) {
      const modifiedData = response.data.map((d) => {
        return {
          ...d,
          key: d.id,
          name: d.member.name,
          booktitle: d.book.title,
          rentdate: d.rentDate,
          duedate: d.dueDate,
          status: d.status,
        };
      });
      setData(modifiedData);
    }
  };

  useEffect(() => {
    getAllRentHandler();
  }, []);

  const handleAction = async (action) => {
    console.log(action);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Book Name",
      dataIndex: "booktitle",
      key: "booktitle",
      sorter: (a, b) => a.booktitle.localeCompare(b.booktitle),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Return Date",
      dataIndex: "rentdate",
      key: "rentdate",
      sorter: (a, b) => new Date(a.rentdate) - new Date(b.rentdate),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
      sorter: (a, b) => new Date(a.duedate) - new Date(b.duedate),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => (
        <Tag
          color={
            text === "Reject"
              ? "red"
              : text === "Pending"
              ? "processing"
              : text === "Accept"
              ? "green"
              : "warning"
          }
        >
          {text}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {(record.status === "Pending" || record.status === "Reject") && (
            <>
              <span
                onClick={() => handleAction("accept")}
                className="cursor-pointer"
              >
                Accept
              </span>
              {record.status === "Pending" && (
                <span
                  onClick={() => handleAction("reject")}
                  className="text-red-400 cursor-pointer"
                >
                  Reject
                </span>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};
export default Rent;
