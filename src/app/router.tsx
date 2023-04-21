import React, { lazy, Suspense, useCallback } from "react";
import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { getRestorationKey } from "./helpers";

const Dadhboard = lazy(() => import("../pages/dashboard"));
const TodoDetail = lazy(() => import("../pages/todo-detail"));
const NothingFoundPage = lazy(() => import("../pages/404"));

const RootRoute: React.FC = () => {
  const getKey = useCallback(getRestorationKey, []);
  return (
    <Suspense>
      <Outlet />
      <ScrollRestoration getKey={getKey} />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <Dadhboard />,
        // use pathname key for scroll restoration to remember position even after later navigation to home from header home links
        handle: { restorationKey: "pathname" },
      },
      {
        path: "todo/:id",
        element: <TodoDetail />,
      },
      {
        path: "*",
        element: <NothingFoundPage />,
      },
    ],
  },
]);
