import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button, DatePicker, Input, Space } from "antd";
import Main from "./layouts/Main";
import Home from "./pages/admin/Home";
import Books from "./pages/admin/Books";
import Admin from "./layouts/Admin";
import Genre from "./pages/admin/Genre";
import Author from "./pages/admin/Author";
import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Highlighter from "react-highlight-words";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<BiSearch />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <BiSearch
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "books",
          element: (
            <Books
              searchText={searchText}
              setSearchText={setSearchText}
              searchedColumn={searchedColumn}
              setSearchedColumn={setSearchedColumn}
              handleSearch={handleSearch}
              handleReset={handleReset}
              getColumnSearchProps={getColumnSearchProps}
            />
          ),
        },
        {
          path: "genre",
          element: (
            <Genre
              searchText={searchText}
              setSearchText={setSearchText}
              searchedColumn={searchedColumn}
              setSearchedColumn={setSearchedColumn}
              handleSearch={handleSearch}
              handleReset={handleReset}
              getColumnSearchProps={getColumnSearchProps}
            />
          ),
        },
        {
          path: "author",
          element: <Author />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
