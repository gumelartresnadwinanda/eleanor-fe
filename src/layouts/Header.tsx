import { Button } from "../components/Button";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="w-full flex fixed items-center p-2 justify-center md:justify-between bg-white dark:bg-gray-800 shadow-md" style={{ zIndex: 20 }}>
      <Button onClick={toggleSidebar} variant="secondary" className="p-2 hidden md:block">
        <Menu className="w-6 h-6" />
      </Button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" className="w-12 h-12" />
      <div className="p-2 hidden md:block" />
    </header>
  );
};

export default Header;
