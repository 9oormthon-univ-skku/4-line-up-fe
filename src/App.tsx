import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import Layout from '@/pages/Layout';
import Home from '@/pages/home/Home';
import MapPage from '@/pages/map/MapPage';
import Notice from '@/pages/notice/Notice';
// import TestPage from '@/pages/TestPage';
import Timetable from './pages/timetable/Timetable';
import BoothDetail from './pages/booths/BoothDetail';

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
        element: <Timetable />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'booths/:boothId',
        element: <BoothDetail />,
      },
      {
        path: '*',
        element: <MainPage />,
      },
    ],
  },
  // {
  //   path: 'test',
  //   element: <TestPage />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
