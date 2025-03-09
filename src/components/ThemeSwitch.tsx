import { useEffect, useState } from "react";
import SunIcon from "../assets/SunIcon";
import MoonIcon from "../assets/MoonIcon";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-10 h-10 flex items-center justify-center"
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeSwitch;
