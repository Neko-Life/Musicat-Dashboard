import { createBrowserRouter } from 'react-router-dom';
import Main from '@/views/Main';
import NotFound from '@/views/NotFound';
import Login from '@/views/Login';
import Servers from '@/views/Servers';
import { useDefinedComponentLayout } from '@/util/router';
import AppLayout from '@/layouts/AppLayout';

export default createBrowserRouter([
  {
    path: '/',
    element: useDefinedComponentLayout(Main),
  },
  {
    path: '/servers',
    element: useDefinedComponentLayout(Servers),
  },
  {
    path: '/login',
    element: useDefinedComponentLayout(Login),
  },
  {
    path: '/console',
    element: <AppLayout hideNavBar></AppLayout>,
  },
  {
    path: '*',
    element: useDefinedComponentLayout(NotFound),
  },
]);
