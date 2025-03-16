import React from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { Button } from "./Button";

interface SortingButtonProps {
  isPhoneScreen?: boolean;
  order: 'asc' | 'desc';
  onToggleOrder: () => void;
  className?: string;
  isFloating?: boolean;
}

const sorting = {
  asc: {
    wording: 'Show Oldest First',
    icon: <ArrowUpNarrowWide className="w-4 h-4 text-gray-800 dark:text-white" />
  },
  desc: {
    wording: 'Show Latest First',
    icon: <ArrowDownNarrowWide className="w-4 h-4 text-gray-800 dark:text-white" />
  }
};

const SortingButton: React.FC<SortingButtonProps> = ({ order, onToggleOrder, className, isPhoneScreen, isFloating = false }) => {
  return (
    <div
      onClick={onToggleOrder}
      className={`cursor-pointer z-10 flex items-center shadow-md p-1 rounded-full mt-4 gap-3 ${isFloating ? `fixed right-20 ${isPhoneScreen ? 'bottom-19' : 'bottom-7'}` : 'pr-4 justify-self-start'} bg-gray-300 dark:bg-gray-700 ${className || ''}`}
    >
      <Button
        className="p-2 rounded-full shadow-lg transition-transform duration-300 bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-600"
      >
        {sorting[order].icon}
      </Button>
      {!isFloating && (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{sorting[order].wording}</p>
      )}
    </div>
  );
};

export default SortingButton;
