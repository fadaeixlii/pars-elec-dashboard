import React, { useState } from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { IRoute } from "@/Routes";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import clsx from "clsx";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import DiamondIcon from "@mui/icons-material/Diamond";
import HandymanIcon from "@mui/icons-material/Handyman";
import TranslateIcon from "@mui/icons-material/Translate";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
interface SideBarRoutesRenderProps {
  routes: IRoute[];
  parentPath?: string;
  parentIndex?: number | string;
}

const sidebarRoutes: IRoute[] = [
  {
    title: "Dashboard",
    path: "/",
    subRoutes: [],
    icon: <DashboardIcon />,
  },
  {
    title: "User",
    path: "/users",
    subRoutes: [],
    icon: <GroupIcon />,
  },
  {
    title: "Wallet",
    path: "/wallet",
    subRoutes: [],
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: "Orderbook",
    path: "/orderbook",
    subRoutes: [],
    icon: <CurrencyBitcoinIcon />,
  },
  {
    title: "Market Maker",
    path: "/mm",
    subRoutes: [],
    icon: <HandymanIcon />,
  },
  {
    title: "KYC",
    path: "/kyc",
    subRoutes: [],
    icon: <FolderSharedIcon />,
  },
  {
    title: "VIP",
    path: "/vip",
    subRoutes: [],
    icon: <DiamondIcon />,
  },
  {
    title: "Language",
    path: "/language",
    subRoutes: [],
    icon: <TranslateIcon />,
  },
  {
    title: "Tickets",
    path: "/tickets",
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
