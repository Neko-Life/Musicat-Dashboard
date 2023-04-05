import { createBrowserRouter } from 'react-router-dom';
import Main from '../views/Main';
import NotFound from '../views/NotFound';
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
    path: '*',
    element: <NotFound />,
  },
]);
