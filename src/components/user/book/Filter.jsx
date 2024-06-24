import { Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllGenres } from "../../../api/genre";
const { Option } = Select;
const Filter = ({
  handleSortChange,
  sortOption,
  handleGenreChange,
  selectedGenre,
}) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getAllGenres().then((res) => setGenres(res.data));
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default Filter;
