import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFound";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
