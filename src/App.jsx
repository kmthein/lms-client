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
import Reservation from "./pages/admin/Reservation";
import { useSelector } from "react-redux";
import { users } from "./features/user/userSlice";
import AdminProvider from "./providers/AdminProvider";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";

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
          element: (
            <AdminProvider>
              <Home />
            </AdminProvider>
          ),
        },
        {
          path: "books",
          element: (
            <AdminProvider>
              <Books
                searchText={searchText}
                setSearchText={setSearchText}
                searchedColumn={searchedColumn}
                setSearchedColumn={setSearchedColumn}
                handleSearch={handleSearch}
                handleReset={handleReset}
                getColumnSearchProps={getColumnSearchProps}
              />
            </AdminProvider>
          ),
        },
        {
          path: "rent",
          element: (
            <AdminProvider>
              <Rent />
            </AdminProvider>
          ),
        },
        {
          path: "reservation",
          element: (
            <AdminProvider>
              <Reservation />
            </AdminProvider>
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
            <AdminProvider>
              <Author
                searchText={searchText}
                setSearchText={setSearchText}
                searchedColumn={searchedColumn}
                setSearchedColumn={setSearchedColumn}
                handleSearch={handleSearch}
                handleReset={handleReset}
                getColumnSearchProps={getColumnSearchProps}
              />
            </AdminProvider>
          ),
        },
        {
          path: "publisher",
          element: (
            <AdminProvider>
              <Publisher
                searchText={searchText}
                setSearchText={setSearchText}
                searchedColumn={searchedColumn}
                setSearchedColumn={setSearchedColumn}
                handleSearch={handleSearch}
                handleReset={handleReset}
                getColumnSearchProps={getColumnSearchProps}
              />
            </AdminProvider>
          ),
        },
      ],
    },
    {
      path: "/admin-register",
      element: <Register />,
    },
    {
      path: "/admin-login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
