import ThemeSwitch from "./ThemeSwitch";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md w-64 md:block`} style={{ zIndex: 10 }}>
      <div className="p-4 mt-16 pt-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">Sidebar</h2>
        {/* Add sidebar content here */}
      </div>
      <div className="absolute bottom-4 left-4">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Sidebar;
