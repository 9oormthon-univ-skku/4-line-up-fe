import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import Layout from '@pages/Layout';
import Home from '@pages/home/Home';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'notice',
        element: <Home />,
      },
      {
        path: 'timetable',
        element: <Home />,
      },
      {
        path: 'map',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
