import { LogOut, User } from "lucide-react";
import ThemeSwitch from "../buttons/ThemeSwitch";

interface SidebarUserSectionProps {
  user: { username: string } | null;
  logout: () => void;
  profileLink: string;
}

const SidebarUserSection = ({ user, logout, profileLink }: SidebarUserSectionProps) => {
  return (
    <div className="absolute flex py-2 bottom-0 items-end gap-2 w-full px-4 justify-between bg-gray-50 dark:bg-gray-700 shadow-md">
      {user ? (
        <span className="text-gray-700 px-4 dark:text-gray-100 p-2 flex gap-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full " onClick={logout}>
          <LogOut></LogOut>
          {user.username}
        </span>
      ) : (
        <div
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={() => window.location.href = profileLink || "/default-profile"}
        >
          <User size={24} className="text-gray-900 dark:text-gray-100" />
        </div>
      )}
      <ThemeSwitch />
    </div>
  );
};

export default SidebarUserSection;
