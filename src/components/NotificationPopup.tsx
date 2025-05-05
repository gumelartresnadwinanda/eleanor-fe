import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type NotificationPopupProps = {
  message: string;
  onClose: () => void;
  type: 'success' | 'error';
};

const NotificationPopup: React.FC<NotificationPopupProps> = ({ message, onClose, type }) => {
  const popupStyles = type === 'success'
    ? 'bg-green-100 text-green-800 border-green-500'
    : 'bg-red-100 text-red-800 border-red-500';

  const icon = type === 'success'
    ? <CheckCircle className="h-6 w-6 text-green-500" />
    : <XCircle className="h-6 w-6 text-red-500" />;

  return (
    <div className="fixed bottom-4 right-4 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 border-l-4 ${popupStyles}`}>
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <p className={`text-lg font-semibold ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} hover:${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-lg transition`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
