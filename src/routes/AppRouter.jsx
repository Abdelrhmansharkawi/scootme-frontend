import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import Login from "../Login";
import Signup from "../Signup";
import History from "../History";
import ForgotPassword from "../ForgetPassword";
import BookRide from "../BookRide";
import Wallet from "../wallet";
import RideDetails from "../RideDetails";
import Profile from "../Profile";

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
  { path: "/wallet", element: <Wallet /> },
  { path: "/ride-details", element: <RideDetails /> },
  { path: "/profile", element: <Profile /> },
  {
    path: "/",
    element: <App />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
