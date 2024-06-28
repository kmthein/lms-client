import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import { getAllBookRent } from "../../api/bookrent";
import { formatDate } from "../../utils";

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllBookRent().then((res) => {
      // res.data.map((d) => (d.rentDate = formatDate(d.rentDate)));
      setData(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: ["book", "bookImg"],
      key: "image",
      render: (text, record) => (
        <img
          src={
            record.book.bookImg
              ? import.meta.env.VITE_API + "/" + record.book.bookImg
              : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
          }
          alt="book cover"
          className="h-[120px] w-[100px] object-cover rounded-t-md"
        />
      ),
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: ["book", "title"],
      key: "title",
      sorter: (a, b) => a.book.title.localeCompare(b.book.title),
      sortDirections: ["descend", "ascend"],
      width: "30%",
    },
    {
      title: "Genre",
      key: "genre",
      dataIndex: ["book", "genres"],
      render: (genres) => (
        <>
          {genres.map((genre) => (
            <Tag key={genre.genreId} color="blue">
              {genre.genreName}
            </Tag>
          ))}
        </>
      ),
      width: "20%",
    },
    {
      title: "Rent Date",
      dataIndex: "rentDate",
      key: "rentDate",
      sorter: (a, b) => new Date(a.rentDate) - new Date(b.rentDate),
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="rentId"
      pagination={{ pageSize: 10 }}
      className="w-[90%] mx-auto"
    />
  );
};

export default History;
