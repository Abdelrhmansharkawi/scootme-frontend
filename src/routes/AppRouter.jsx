import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import Login from "../Login";
import Signup from "../Signup";
import History from "../History";
import ForgotPassword from "../ForgetPassword";
import BookRide from "../BookRide";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  { path: "/history", element: <History /> },
  { path: "/book-ride", element: <BookRide /> },
  { path: "/forget-password", element: <ForgotPassword /> },

  {
    path: "/",
    element: <App />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
