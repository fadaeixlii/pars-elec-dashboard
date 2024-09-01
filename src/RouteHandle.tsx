import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import type { IRoute } from "./Routes";
import { routes } from "./Routes";

export function RouteHandler() {
  const renderRoutes = (routes: IRoute[]) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          {...route}
          children={route.subRoutes && renderRoutes(route.subRoutes)}
        />
      );
    });
  };

  return (
    <Router basename="/">
      <Routes>{renderRoutes(routes)}</Routes>
    </Router>
  );
}
