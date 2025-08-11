import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import Layout from '@pages/Layout';
import Home from '@pages/home/Home';
import MapPage from './pages/map/MapPage';

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
        element: <MapPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
