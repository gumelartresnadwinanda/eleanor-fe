import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useMediaQuery from "../hooks/useMediaQuery";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow relative">
        <Sidebar isOpen={isSidebarOpen && !isPhoneScreen} />
        <div className={`flex flex-col items-center justify-center flex-grow p-4 transition-all duration-300 ${isSidebarOpen && !isPhoneScreen ? 'ml-64' : 'ml-0'}`}>
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg md:max-w-md lg:max-w-lg xl:max-w-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

