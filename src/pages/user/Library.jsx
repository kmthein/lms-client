import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../api/book";
import { Button, Row, Col, Card, Typography, Tag, Space } from "antd";
import { useSelector } from "react-redux";
import { uiState } from "../../features/ui/uiSlice";
import { getAllUserBookRent } from "../../api/bookrent";
import { users } from "../../features/user/userSlice";

const { Title, Text, Paragraph } = Typography;

const calculateDate = (date) => {
  const dueDate = new Date(date);
  const currentDate = new Date();
  const differenceInTime = dueDate - currentDate;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  console.log(differenceInDays.toFixed(2));
  return differenceInDays.toFixed(0);
};

const Library = () => {
  const [rentBooks, setRentBooks] = useState([]);

  const { loading } = useSelector(uiState);
  const { user } = useSelector(users);

  useEffect(() => {
    getAllUserBookRent(1).then((res) => setRentBooks(res.data));
  }, []);
  console.log(rentBooks);
  return (
    <div className="w-[90%] mx-auto mt-8">
      <Row gutter={[20, 20]}>
        {rentBooks.map((rentBook) => (
          <Col key={rentBook.rentId} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  src={
                    rentBook.imgName
                      ? import.meta.env.VITE_API + "/" + book.imgName
                      : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
                  }
                  alt={rentBook.imgName}
                  className="h-[300px] w-full object-cover"
                />
              }
            >
              <div className="p-4 text-center ">
                <Title level={4}>
                  {rentBook.bookTitle}
                  {
                    <span className="text-sm italic text-gray-500 mx-3">
                      {calculateDate(rentBook.dueDate) > 0 ? (
                        <Tag color="blue">
                          {calculateDate(rentBook.dueDate)} days left
                        </Tag>
                      ) : (
                        <Tag color="red">Expired</Tag>
                      )}
                    </span>
                  }
                </Title>
                <Text type="secondary">
                  {rentBook.authorName} <span>(Author)</span>
                </Text>
                <div className="mt-2">
                  <Space size={[0, 8]} wrap>
                    {rentBook.genres.length > 0 ? (
                      rentBook.genres.map((genre) => (
                        <Tag key={genre.genreId} color="blue">
                          {genre.genreName}
                        </Tag>
                      ))
                    ) : (
                      <Tag color="gray">Unknown Genre</Tag>
                    )}
                  </Space>
                </div>
                <Text type="secondary" className="block mt-2">
                  Published on: {rentBook.publishYear}
                </Text>
              </div>
              <Button className="w-full mt-2" type="primary">
                Repay
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Library;
