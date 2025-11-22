import { Header } from "../components/UI/Header/Header";
import { NavList } from "../components/UI/NavList/NavList";
import { LeftSidebar } from "../components/UI/LeftSidebar/LeftSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-full">
      <div className="h-screen flex flex-col relative router-ctn">
        <div className="flex flex-none flex-col text-white">
          <Header />
          <NavList />
        </div>
        <div className="flex-1 flex white">
          <div className="bg-gray1 h-full sm:w-[15%] w-full hidden sm:block">
            <LeftSidebar />
          </div>
          <Outlet />
        </div>
        <div />
      </div>
    </div>
  );
};

export default MainLayout;
