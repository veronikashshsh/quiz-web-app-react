import { Outlet } from "react-router-dom";

import NavBar from "../components/General/NavBar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex-1 p-2 overflow-y-auto md:h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
