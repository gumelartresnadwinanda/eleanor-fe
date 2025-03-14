import { ADAM_AUTH_URL } from "../config";
import useAuth from "../hooks/useAuth";
import SidebarUserSection from "../components/sidebar/SidebarUserSection";
import SidebarNavItems from "../components/sidebar/SidebarNavItems";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const profileLink = ADAM_AUTH_URL + '/login?redirect=' + window.location.href;

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md w-56 md:block`} style={{ zIndex: 10 }}>
      <div className="p-4 mt-16 pt-4">
        <nav className="mt-4">
          <SidebarNavItems />
        </nav>
      </div>
      <SidebarUserSection user={user} logout={logout} profileLink={profileLink} />
    </div>
  );
};

export default Sidebar;
