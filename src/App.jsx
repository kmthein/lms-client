import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main";
import Home from "./pages/admin/Home";
import UserHome from "./pages/user/Home";
import UserBook from "./pages/user/Book";
import Books from "./pages/admin/Books";
import Admin from "./layouts/Admin";
import Genre from "./pages/admin/Genre";
import Author from "./pages/admin/Author";
import Publisher from "./pages/admin/Publisher";
import useSearch from "./hooks/useSearch";
import BookDetails from "./pages/user/BookDetails";

import History from "./pages/user/History";
import Library from "./pages/user/Library";

function App() {
  const {
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    handleSearch,
    handleReset,
    getColumnSearchProps,
  } = useSearch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <UserHome />,
        },
        {
          path: "/books",
          element: <UserBook />,
        },
        {
<<<<<<< HEAD
          path: "/library",
          element: <Library />,
        },
        {
          path: "/history",
          element: <History />,
=======
          path: "/books/:id",
          element: <BookDetails />,
>>>>>>> cc61525788ff098a9dcb1b07a917e738f8c78b8a
        },
      ],
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
          element: (
            <Author
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
          path: "publisher",
          element: (
            <Publisher
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
