import { Link, type PathRouteProps } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";
import ProtectedRoutes from "./components/utils/ProtectedRoute";
import { EventsPage } from "./page/events";

export interface IRoute extends PathRouteProps {
  subRoutes: IRoute[];
  title: string;
  icon?: React.ReactNode;
}

export const routes: IRoute[] = [
  {
    path: "/",
    title: "events",
    element: (
      <ProtectedRoutes>
        <Layout>
          <EventsPage />
        </Layout>
      </ProtectedRoutes>
    ),
    subRoutes: [],
    // subRoutes: [
    //   {
    //     path: "users/:selectedUserId?",
    //     title: "Users",
    //     element: "<UsersPage />",
    //     subRoutes: [],
    //   },
    // ],
  },

  // {
  //   path: "/auth",
  //   title: "auth",
  //   element: <AuthLayout />,
  //   subRoutes: [
  //     {
  //       path: "sign-in",
  //       title: "sign-in",
  //       element: "<SignIn />",
  //       subRoutes: [],
  //     },
  //   ],
  // },
];

export const sideBarRoutesRender = (
  routes: IRoute[],
  parentIndex: number = 0,
  parentPath: string = ""
) => {
  return routes.map((route, index) => (
    <React.Fragment key={`${parentIndex}-${index}`}>
      {route.subRoutes.length > 0 ? (
        <>
          <div className="!cursor-default !pl-[70px] text-slate-300">
            <ListItemText primary={route.title} />
          </div>
          {sideBarRoutesRender(route.subRoutes, index, route.path)}
        </>
      ) : (
        <Link
          to={parentPath + "/" + route.path}
          key={`${parentIndex}-${index}`}
        >
          <ListItemButton className="">
            <ListItemIcon className=" !px-2">
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItemButton>
        </Link>
      )}
    </React.Fragment>
  ));
};
