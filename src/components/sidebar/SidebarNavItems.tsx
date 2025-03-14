import { Link, useLocation } from "react-router-dom";
import { Home, Library, ListMusic, Tag, House, Video, Image, Gamepad2 } from "lucide-react";

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


const SidebarNavItems = () => {
  const location = useLocation();
  return (
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
  );
};

export default SidebarNavItems;
