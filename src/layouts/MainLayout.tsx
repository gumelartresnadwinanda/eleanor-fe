import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileFooter from "./MobileFooter";
import useMediaQuery from "../hooks/useMediaQuery";

const MainLayout = () => {
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isPhoneScreen);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow relative">
        <Sidebar isOpen={isSidebarOpen && !isPhoneScreen} />
        <div className={`flex flex-col items-cente transition-all duration-300 flex-grow ${isSidebarOpen && !isPhoneScreen ? 'ml-64' : 'ml-0'} ${isPhoneScreen ? 'h-[calc(100vh-9rem)]' : ''}`}>
          <div className="w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-sm">
            <Outlet context={{ isPhoneScreen }} />
          </div>
        </div>
      </div>
      {isPhoneScreen && <MobileFooter />}
    </div>
  );
};

export default MainLayout;

