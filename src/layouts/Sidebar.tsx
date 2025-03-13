import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";
import { Home, Library, ListMusic, User, Tag, House, Video, Image, Gamepad2 } from "lucide-react"; // Import Video and Image icons

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  {
    to: "/",
    icon: Home,
    label: "Home",
  },
  {
    to: "/all-media",
    icon: Library,
    label: "All Media",
    subItems: [
      {
        to: "/tags/lrtrsprn_/group",
        icon: House,
        label: "lrtrsprn_",
      },
      {
        to: "/tags/negi/group",
        icon: Gamepad2,
        label: "negi",
      },
      {
        to: "/file-type/video",
        icon: Video,
        label: "Videos",
      },
      {
        to: "/file-type/photo",
        icon: Image,
        label: "Images",
      },
    ],
  },
  {
    to: "/tags",
    icon: Tag,
    label: "Tags",
  },
  {
    to: "/playlists",
    icon: ListMusic,
    label: "Playlists",
  },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const profileLink = import.meta.env.VITE_ADAM_AUTH_URL + '/login?redirect=' + window.location.href;

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md w-56 md:block`} style={{ zIndex: 10 }}>
      <div className="p-4 mt-16 pt-4">
        <nav className="mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:underline ${location.pathname === item.to ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                  <item.icon className="mr-2 w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
                {item.subItems && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.to}>
                        <Link
                          to={subItem.to}
                          className={`flex items-center px-2 py-1 rounded-md text-gray-900 dark:text-gray-100 hover:underline ${location.pathname === subItem.to ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                        >
                          <subItem.icon className="mr-2 w-5 h-5" />
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-4 flex items-center gap-2 w-full px-6 place-content-end">
        <div
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={() => window.location.href = profileLink || "/default-profile"}
        >
          <User size={24} className="text-gray-900 dark:text-gray-100" />
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Sidebar;
