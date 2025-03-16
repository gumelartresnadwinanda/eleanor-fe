import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ScrollToTopButton from "./ScrollToTopButton";
import ToggleViewButton from "./ToggleViewButton";
import ProtectedModeButton from "./ProtectedModeButton";
import useAuth from "../../hooks/useAuth";
import { Button } from "./Button";

interface FloatingButtonsProps {
  isPhoneScreen: boolean;
  isGridView?: boolean;
  onToggleView?: () => void;
  showScrollToTop?: boolean;
  showToggleView?: boolean;
  setMode?: (mode: string) => void;
  className?: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  isPhoneScreen,
  isGridView = false,
  onToggleView = () => { },
  showScrollToTop = false,
  showToggleView = false,
  setMode = () => { },
  className,
}) => {
  const { user } = useAuth();
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className={`fixed z-10 gap-2 right-6 ${isPhoneScreen ? 'bottom-18' : 'bottom-6'} flex flex-col transition-all duration-300 ${className || ''}`}>
      {showButtons && (
        <>
          {showScrollToTop && <ScrollToTopButton className="transition-opacity duration-300 opacity-100" />}
          {user && <ProtectedModeButton setMode={setMode} className="transition-opacity duration-300 opacity-100" />}
          {showToggleView && (
            <ToggleViewButton
              isGridView={isGridView}
              onToggle={onToggleView}
              className="transition-opacity duration-300 opacity-100"
            />
          )}
        </>
      )}
      <Button
        variant="secondary"
        className="p-3 rounded-full shadow-lg transition-transform duration-300"
        onClick={() => setShowButtons(!showButtons)}
      >
        {showButtons ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};

export default FloatingButtons;
