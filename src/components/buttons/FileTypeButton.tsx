import React from "react";
import { Image, Library, Video } from "lucide-react";
import { Button } from "./Button";

interface FileTypeButtonProps {
  type: 'all' | 'photo' | 'video';
  onToggleType: () => void;
  className?: string;
}

const filetype = {
  all: {
    wording: 'Show All Type',
    icon: <Library className="w-4 h-4 text-gray-800 dark:text-white" />
  },
  photo: {
    wording: 'Show Picture Only',
    icon: <Image className="w-4 h-4 text-gray-800 dark:text-white" />
  },
  video: {
    wording: 'Show Video Only',
    icon: <Video className="w-4 h-4 text-gray-800 dark:text-white" />
  }
};

const FileTypeButton: React.FC<FileTypeButtonProps> = ({ type, onToggleType, className }) => {
  return (
    <div
      onClick={onToggleType}
      className={`cursor-pointer z-10 flex items-center shadow-md p-1 rounded-full mt-4 gap-3 pr-4 justify-self-start bg-gray-300 dark:bg-gray-700 ${className || ''}`}
    >
      <Button
        className="p-2 rounded-full shadow-lg transition-transform duration-300 bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-600"
      >
        {filetype[type].icon}
      </Button>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{filetype[type].wording}</p>
    </div>
  );
};

export default FileTypeButton;
