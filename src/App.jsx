import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import { DatePicker } from 'antd';
import Main from './layouts/Main';
import Home from './pages/Home';
import Books from './pages/Books';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/books',
          element: <Books />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
