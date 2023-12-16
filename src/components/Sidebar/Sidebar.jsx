import { Dashboard, Menu } from "@mui/icons-material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex gap-3 xs:flex-row md:flex-col">
      <RenderLink
        name="Dashboard"
        icon={<Dashboard fontSize="small" />}
        path="/dashboard"
      />
      <RenderLink
        name="Categories"
        icon={<Menu fontSize="small" />}
        path="/categories"
      />
    </div>
  );
};

const RenderLink = ({ path, icon, name }) => {
  // router
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      className={`flex items-center gap-2 p-4 hover:bg-blue-100 ${
        path === pathname && "bg-blue-100"
      }`}
    >
      {icon} {name}
    </Link>
  );
};

export default SideBar;
