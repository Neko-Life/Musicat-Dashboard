import { RouterProvider } from 'react-router-dom';
import router from '@/router/router-Landing';

export default function Landing() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
