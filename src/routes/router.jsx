import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/shared/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllFoods from "../pages/allFoods/allFoods";
import MyAddedFoods from "../pages/myAddedFoods/MyAddedFoods";
import PrivetRoute from "./PrivetRoute";
import Blog from "../pages/Blogs/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "all-foods",
        element: <AllFoods />,
      },
      {
        path: "user/added-foods",
        element: (
          <PrivetRoute>
            <MyAddedFoods />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
