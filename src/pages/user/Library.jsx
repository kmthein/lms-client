import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../api/book";
import { Button, Row, Col, Card, Typography, Tag, Space } from "antd";
import { useSelector } from "react-redux";
import { uiState } from "../../features/ui/uiSlice";

const { Title, Text, Paragraph } = Typography;

const Library = () => {
  const [books, setBooks] = useState([]);

  const { loading } = useSelector(uiState);

  useEffect(() => {
    getAllBooks().then((res) => setBooks(res.data));
  }, []);

  console.log(books);
  return (
    <div className="w-[90%] mx-auto mt-8">
      <Row gutter={[20, 20]}>
        {books.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  src={
                    book.bookImg
                      ? import.meta.env.VITE_API + "/" + book.bookImg
                      : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
                  }
                  alt={book.title}
                  className="h-[300px] w-full object-cover"
                />
              }
            >
              <div className="p-4 text-center ">
                <Title level={4}>
                  {book.title}
                  {
                    <span className="text-sm italic text-gray-500 ml-1">
                      (3 Days Left)
                    </span>
                  }
                </Title>
                <Text type="secondary">
                  {book.author.name} <span>(Author)</span>
                </Text>
                <div className="mt-2">
                  <Space size={[0, 8]} wrap>
                    {book.genres.length > 0 ? (
                      book.genres.map((genre) => (
                        <Tag key={genre.id} color="blue">
                          {genre.genreName}
                        </Tag>
                      ))
                    ) : (
                      <Tag color="gray">Unknown Genre</Tag>
                    )}
                  </Space>
                </div>
                <Text type="secondary" className="block mt-2">
                  Published on: {book.publishYear}
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
