import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-grow bg-white xs:flex-col md:flex-row">
      <div className="xs:min-w-[400px] overflow-auto md:min-w-[200px] border-r border-solid bg-slate-100">
        <SideBar />
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
