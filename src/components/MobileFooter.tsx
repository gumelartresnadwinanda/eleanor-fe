import { Link, useLocation } from "react-router-dom";
import { Home, Library, ListMusic } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

const MobileFooter = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md shadow-top p-4 md:hidden">
      <nav className="flex justify-around items-center">
        <Link
          to="/"
          className={`text-gray-900 dark:text-gray-100 ${location.pathname === "/" ? "underline" : ""} hover:text-blue-500 dark:hover:text-blue-400`}
        >
          <Home className={`w-6 h-6 ${location.pathname === "/" ? "text-blue-500 dark:text-blue-400" : ""}`} />
        </Link>
        <Link
          to="/all-media"
          className={`text-gray-900 dark:text-gray-100 ${location.pathname === "/all-media" ? "underline" : ""} hover:text-blue-500 dark:hover:text-blue-400`}
        >
          <Library className={`w-6 h-6 ${location.pathname === "/all-media" ? "text-blue-500 dark:text-blue-400" : ""}`} />
        </Link>
        <Link
          to="/playlists"
          className={`text-gray-900 dark:text-gray-100 ${location.pathname === "/playlists" ? "underline" : ""} hover:text-blue-500 dark:hover:text-blue-400`}
        >
          <ListMusic className={`w-6 h-6 ${location.pathname === "/playlists" ? "text-blue-500 dark:text-blue-400" : ""}`} />
        </Link>
        <ThemeSwitch />
      </nav>
    </footer>
  );
};

export default MobileFooter;
