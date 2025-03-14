import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup = ({ message, onClose }: PopupProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg flex items-center z-20">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X size={24} />
      </button>
    </div>
  );
};

export default Popup;
