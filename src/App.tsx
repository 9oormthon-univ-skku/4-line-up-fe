import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import Layout from '@/pages/Layout';
import Home from '@/pages/home/Home';
import MapPage from '@/pages/map/MapPage';
import Notice from '@/pages/notice/Notice';
import TestPage from '@/pages/TestPage';

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
        element: <Notice />,
      },
      {
        path: 'timetable',
        element: <Home />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
    ],
  },
  {
    path: 'test',
    element: <TestPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
