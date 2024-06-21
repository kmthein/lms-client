import React, { useEffect, useState } from "react";
import { getAllBook } from "../../api/book";
import { Card, Button } from "antd";
import { CiHeart } from "react-icons/ci";

const { Meta } = Card;

const Book = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBook().then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-4 mt-8">
      <div className="w-full lg:w-[20%] mb-4 lg:mb-0">
        <h1 className="font-medium text-xl mb-4">Filter</h1>
      </div>
      <div className="flex-1">
        <h1 className="font-medium text-xl mb-4">All Books</h1>
        <div className="flex flex-wrap gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              hoverable
              cover={
                <img
                  alt="book cover"
                  src={
                    book.bookImg
                      ? book.bookImg
                      : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
                  }
                  className="h-[280px] w-full object-cover rounded-t-md"
                />
              }
              className="w-[200px] shadow-md rounded-md"
            >
              <Meta
                title={
                  <div className="flex justify-between items-center">
                    <h4 className="text-[14px]">{book.title}</h4>
                    <CiHeart />
                  </div>
                }
                description={
                  <div className="text-[12px]">
                    <p className="mb-1">
                      {book.author.name ? book.author.name : "Unknown"},{" "}
                      {book.publishYear ? book.publishYear : "Unknown"}
                    </p>
                    <p className="text-[12px]">
                      {book.genres.length > 0
                        ? book.genres.map((genre) => genre.genreName).join(", ")
                        : "Unknown Genre"}
                    </p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
