import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '@pages/main/Main';
import Layout from '@pages/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
