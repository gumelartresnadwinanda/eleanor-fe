import React from "react";

interface LogoutIconProps {
  onClick?: () => void;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="p-2 rounded-md bg-red-100 hover:bg-red-200 cursor-pointer shadow-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-600"
    >
      <path d="M15 17l5-5-5-5" />
      <path d="M20 12H9" />
      <path d="M4 5v14" />
    </svg>
  </div>
);

export default LogoutIcon;
