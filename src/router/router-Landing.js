import { createBrowserRouter } from 'react-router-dom';
import Main from '../views/Main';
import NotFound from '../views/NotFound';
import Login from '../views/Login';
import Servers from '../views/Servers';

export default createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/servers',
    element: <Servers />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
