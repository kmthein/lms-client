import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../api/book";
import { getAllGenres } from "../../api/genre";
import { Card, Pagination, Radio, Select, Space } from "antd";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

const Book = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");
  const pageSize = 10;
  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res.data);
      setFilteredBooks(res.data);
    });
    getAllGenres().then((res) => setGenres(res.data));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleGenreChange = (value) => {
    if (value === "") {
      setFilteredBooks(books);
      setSelectedGenre("");
      return;
    }
    setSelectedGenre(value);
    const filterGenre = books.filter((book) =>
      book.genres.some((g) => g.genreName === value)
    );
    setFilteredBooks(filterGenre);
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSortOption(sortOption);
    let sortedBooks = [...books];

    const compare = (a, b, key) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
    if (sortOption === "author") {
      sortedBooks.sort((a, b) => compare(a.author, b.author, "name"));
    } else if (sortOption === "publisher") {
      sortedBooks.sort((a, b) =>
        compare(a.publisher, b.publisher, "publisherName")
      );
    } else if (sortOption === "year") {
      sortedBooks.sort((a, b) => compare(a, b, "publishYear"));
    }
    setFilteredBooks(sortedBooks);
  };

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-4 mt-8">
      <div className="w-full lg:w-[20%] mb-4 lg:mb-0">
        <h1 className="font-medium text-xl mb-4">Filter</h1>

        <Radio.Group onChange={handleSortChange} value={sortOption}>
          <Space direction="vertical">
            <Radio value={""}>Default</Radio>
            <Radio value={"author"}>Author</Radio>
            <Radio value={"publisher"}>Publisher</Radio>
            <Radio value={"year"}>Year</Radio>
          </Space>
        </Radio.Group>
        <Select
          placeholder="Select Genre"
          className="w-full mt-4"
          onChange={handleGenreChange}
          value={selectedGenre}
        >
          <Option value="">All Genre</Option>
          {genres.map((genre) => (
            <Option key={genre.genreId} value={genre.genreName}>
              {genre.genreName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex-1">
        <h1 className="font-medium text-xl mb-4">All Books</h1>
        <div className="flex flex-wrap gap-6">
          {currentBooks.map((book) => (
            <Card
              key={book.id}
              hoverable
              cover={
                <Link to={`/books/${book.id}`}>
                  <img
                    alt="book cover"
                    src={
                      book.bookImg
                        ? import.meta.env.VITE_API + book.bookImg
                        : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
                    }
                    className="h-[280px] 
                  w-full object-cover rounded-t-md"
                  />
                </Link>
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
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={filteredBooks.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;
