import { Button } from "./Button";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md" style={{ zIndex: 20 }}>
      <Button onClick={toggleSidebar} variant="secondary" className="p-2 hidden md:block">
        ☰
      </Button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" className="w-12 h-12" />
      <Button variant="primary" className="p-2">
        Login
      </Button>
    </header>
  );
};

export default Header;
