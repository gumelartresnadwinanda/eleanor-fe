import React from "react";

interface EditIconProps {
  onClick?: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="cursor-pointer dark:text-white"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3L7 21H3v-4L16.5 3.5z" />
  </svg>
);

export default EditIcon;
