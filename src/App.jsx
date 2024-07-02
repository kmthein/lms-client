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
import Rent from "./pages/admin/Rent";
import Profile from "./pages/user/Profile";
import Reservation from "./pages/admin/Reservation";
import EditProfile from "./pages/user/EditProfile";

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
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/books",
          element: <UserBook />,
        },
        {
          path: "/library",
          element: <Library />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/books/:id",
          element: <BookDetails />,
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
          path: "rent",
          element: <Rent />,
        },
        {
          path: "reservation",
          element: <Reservation />,
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
