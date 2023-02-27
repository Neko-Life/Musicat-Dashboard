import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../views/Main";
import NotFound from "../views/NotFound";

export default createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
