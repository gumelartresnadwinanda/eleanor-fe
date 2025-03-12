import React from "react";

interface FileTypeToggleListProps {
  activeFileType: string | null;
  onFileTypeClick: (fileType: string) => void;
}

const FileTypeToggleList: React.FC<FileTypeToggleListProps> = ({ activeFileType, onFileTypeClick }) => {
  const fileTypes = ["photo", "video"];

  return (
    <div className="mt-4">
      {fileTypes.map((fileType) => (
        <span
          key={fileType}
          onClick={() => onFileTypeClick(fileType)}
          className={`inline-block px-3 py-1 m-1 font-bold rounded-sm no-underline transition duration-300 ease-in-out cursor-pointer ${activeFileType === fileType
            ? "bg-sky-800 dark:bg-slate-50 text-white dark:text-black"
            : "bg-sky-50 dark:bg-slate-400 text-black"
            }`}
        >
          {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
        </span>
      ))}
    </div>
  );
};

export default FileTypeToggleList;
