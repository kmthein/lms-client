import React from "react";
import { Space, Table, Tag } from "antd";

const formatDate = (d = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${year}-${month}-${day}`;
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
          text === "reject"
            ? "red"
            : text === "pending"
            ? "processing"
            : text === "active"
            ? "orange"
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
        {(record.status === "pending" || record.status === "reject") && (
          <>
            <a href="#">Accept</a>
            {record.status === "pending" && (
              <a href="#" className="text-red-400">
                Reject
              </a>
            )}
          </>
        )}
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    booktitle: "JS Book",
    rentdate: formatDate(),
    duedate: formatDate(7),
    status: "pending",
  },
  {
    key: "2",
    name: "Jim Green",
    booktitle: "JAVA Book",
    rentdate: formatDate(),
    duedate: formatDate(7),
    status: "active",
  },
  {
    key: "3",
    name: "Joe Black",
    booktitle: "PYTHON Book",
    rentdate: formatDate(),
    duedate: formatDate(7),
    status: "reject",
  },
];

const Rent = () => <Table columns={columns} dataSource={data} />;

export default Rent;
