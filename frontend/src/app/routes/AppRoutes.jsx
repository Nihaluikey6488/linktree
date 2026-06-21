import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../../features/auth/ui/screens/Register";
import Login from "../../features/auth/ui/screens/Login";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Home from "../../features/dashboard/ui/screens/Home";
import Dashboard from "../../features/links/ui/screens/Dashboard";
import CreateLink from "../../features/links/ui/screens/CreateLink";
import Analytics from "../../features/links/ui/screens/Analytics";
import Profile from "../../features/links/ui/screens/Profile";
import ProfilePreview from "../../features/links/ui/screens/ProfilePreview";
import { useDispatch } from "react-redux";
import { currentEmployee } from "../../features/auth/state/auth/authAction";
import { addUser } from "../../features/auth/state/auth/authSlice";
import PublicRoute from "../ProtectedRoutes/PublicRoute";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
const AppRoutes = () => {
  let dispatch = useDispatch();
  useEffect(() => {

    (() => {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          dispatch(addUser(JSON.parse(stored)));
        } else {
          dispatch(currentEmployee());
        }
      } catch (error) {
        console.log("error hydrating user", error);
      }
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element:<AuthLayout/>,
      children: [
        {
          path: "",
          element:  <PublicRoute />,
          children: [
            {
              path: "",
              element: <Register />,
            },
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <DashBoardLayout />,
      children: [
        {
          path: "",
          element: <ProtectedRoute />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "create",
              element: <CreateLink />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "profile",
              element: <ProfilePreview />,
            },
          ],
        },
      ],
    },
    {
      // public profile (username)
      path: "/:username",
      element: <Profile />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
