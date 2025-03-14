import { User, LogOut } from "lucide-react";
import ThemeSwitch from "../buttons/ThemeSwitch";

interface SidebarUserSectionProps {
  user: { username: string } | null;
  logout: () => void;
  profileLink: string;
}

const SidebarUserSection = ({ user, logout, profileLink }: SidebarUserSectionProps) => {
  return (
    <>
      {user ? (
        <div className="absolute bottom-4 flex items-end gap-2 w-full px-2 justify-between">
          <div className="flex items-center gap-2 py-2">
            <User size={24} className="text-gray-700 dark:text-gray-100" />
            <span className="text-gray-700 dark:text-gray-100 ">
              {user.username}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <ThemeSwitch />
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={logout}
            >
              <LogOut size={22} className="text-gray-900 dark:text-gray-100" />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-4 flex flex-col items-end gap-2 w-full px-2 place-content-end">
          <ThemeSwitch />
          <div
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => window.location.href = profileLink || "/default-profile"}
          >
            <User size={24} className="text-gray-900 dark:text-gray-100" />
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarUserSection;
