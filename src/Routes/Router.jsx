// src/Routes/Router.jsx
import { createBrowserRouter } from "react-router";
import Root from "../LayOuts/Root";
import Home from "../Components/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import ErrorPage from "../Components/ErrorPage";
import DashboardHome from "../Components/DashboardHome";

import FeedLayout from "../LayOuts/FeedLayout";
import Feed from "../Components/Feed";
import MyPosts from "../Components/MyPosts";
import AddPost from "../Components/AddPost";
import EditPost from "../Components/EditPost";
import PostDetails from "../Components/PostDetails";
import ProtectedRoute from "../Components/ProtectedRoute";

// ✅ New import
import VerifyResult from "../Components/VerifyResult";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        ),
      },

      // ✅ New route for verification result
      { path: "/verify-result", element: <VerifyResult /> },
    ],
  },
  {
    path: "/feed",
    Component: FeedLayout,
    children: [
      { index: true, element: <Feed /> },
      {
        path: "my-posts",
        element: (
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "new-post",
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      { path: "post/:id", element: <PostDetails /> },
    ],
  },
  { path: "/*", element: <ErrorPage /> },
]);

export default router;
