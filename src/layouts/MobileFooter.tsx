import { Link, useLocation } from "react-router-dom";
import { Home, Library, Tag, User } from "lucide-react";
import ThemeSwitch from "../components/ThemeSwitch";
import useAuth from "../hooks/useAuth";

const MobileFooter = () => {
  const location = useLocation();
  const { user } = useAuth();
  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/all-media", icon: Library, label: "Library" },
    // { to: "/playlists", icon: ListMusic, label: "Playlists" },
    { to: "/tags", icon: Tag, label: "Tags" },
  ];
  const profileLink = import.meta.env.VITE_ADAM_AUTH_URL + '/login?redirect=' + window.location.href;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md shadow-top p-2 md:hidden">
      <nav className="flex justify-around items-center">
        {items.map(({ to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`text-gray-900 dark:text-gray-100 ${location.pathname === to ? "underline" : ""} hover:text-blue-500 dark:hover:text-blue-400`}
          >
            <Icon className={`w-6 h-6 ${location.pathname === to ? "text-blue-500 dark:text-blue-400" : ""}`} />
          </Link>
        ))}
        {!user && <div
          className="text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400"
          onClick={() => window.location.href = profileLink || "/default-profile"}
        >
          <User size={24} className="text-gray-900 dark:text-gray-100 w-6 h-6" />
        </div>}
        <ThemeSwitch />
      </nav>
    </footer>
  );
};

export default MobileFooter;
