import React, { useState } from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { IRoute } from "@/Routes";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import clsx from "clsx";
import { Link } from "react-router-dom";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
interface SideBarRoutesRenderProps {
  routes: IRoute[];
  parentPath?: string;
  parentIndex?: number | string;
}

const sidebarRoutes: IRoute[] = [
  {
    title: "events",
    path: "/",
    subRoutes: [],
    icon: <ConfirmationNumberIcon />,
  },
];

const SideBarRoutesRender: React.FC<SideBarRoutesRenderProps> = ({
  routes,
  parentPath = "",
  parentIndex = 0,
}) => {
  const [openRoutes, setOpenRoutes] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (routeIndex: string) => {
    setOpenRoutes((prevState) => ({
      ...prevState,
      [routeIndex]: !prevState[routeIndex],
    }));
  };

  return (
    <>
      {routes.map((route, index) => {
        const currentIndex = `${parentIndex}-${index}`;
        const isOpen = openRoutes[currentIndex] ?? false;

        return (
          <React.Fragment key={currentIndex}>
            {route.subRoutes.length > 0 ? (
              <>
                <ListItemButton
                  className="!w-full !flex !justify-between !items-center"
                  onClick={() => handleToggle(currentIndex)}
                >
                  <div className="flex  items-center gap-1">
                    {route.icon ? (
                      <ListItemIcon className="!p-0">{route.icon}</ListItemIcon>
                    ) : null}
                    {route.title}
                  </div>
                  <ChevronRightIcon className={clsx(isOpen && "!rotate-90")} />
                </ListItemButton>
                {isOpen && (
                  <div className="pl-4">
                    <SideBarRoutesRender
                      routes={route.subRoutes}
                      parentPath={`${route.path}`}
                      parentIndex={currentIndex}
                    />
                  </div>
                )}
              </>
            ) : (
              <div key={currentIndex}>
                <Link to={`${parentPath ? parentPath + "/" : ""}${route.path}`}>
                  <ListItemButton className="">
                    <div className="flex  items-center gap-1">
                      {route.icon ? (
                        <ListItemIcon className="!p-0">
                          {route.icon}
                        </ListItemIcon>
                      ) : null}
                      {route.title}
                    </div>
                  </ListItemButton>
                </Link>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const SideBarItems: React.FC = () => {
  return <SideBarRoutesRender routes={sidebarRoutes} />;
};
