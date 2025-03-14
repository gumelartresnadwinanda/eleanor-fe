import { LogOut, Menu } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/buttons/Button";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className={`w-full flex fixed items-center p-2 ${user ? 'justify-between' : 'justify-center md:justify-between'} bg-white dark:bg-gray-800 shadow-md z-20`}>
      <Button onClick={toggleSidebar} variant="secondary" className="p-2 hidden md:block">
        <Menu className="w-6 h-6" />
      </Button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" className="w-12 h-12 mx-4" />
      <div className="p-2 hidden md:block" />
      {
        user &&
        <LogOut onClick={logout} className="w-6 h-6 mx-2 dark:text-gray-100 block md:hidden " />
      }
    </header>
  );
};

export default Header;
