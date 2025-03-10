import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { Home, Library, ListMusic } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md w-64 md:block`} style={{ zIndex: 10 }}>
      <div className="p-4 mt-16 pt-4">
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:underline ${location.pathname === "/" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
              >
                <Home className="mr-2 w-6 h-6" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-media"
                className={`flex items-center px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:underline ${location.pathname === "/all-media" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
              >
                <Library className="mr-2 w-6 h-6" />
                All Media
              </Link>
            </li>
            <li>
              <Link
                to="/playlists"
                className={`flex items-center px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:underline ${location.pathname === "/playlists" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
              >
                <ListMusic className="mr-2 w-6 h-6" />
                Playlists
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-4 left-4">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Sidebar;
