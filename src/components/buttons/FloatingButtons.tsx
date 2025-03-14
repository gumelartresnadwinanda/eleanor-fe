import React from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import ToggleViewButton from "./ToggleViewButton";
import ProtectedModeButton from "./ProtectedModeButton";
import useAuth from "../../hooks/useAuth";

interface FloatingButtonsProps {
  isPhoneScreen: boolean;
  isGridView?: boolean;
  onToggleView?: () => void;
  showScrollToTop?: boolean;
  showToggleView?: boolean;
  setMode?: (mode: string) => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  isPhoneScreen,
  isGridView = false,
  onToggleView = () => { },
  showScrollToTop = false,
  showToggleView = false,
  setMode = () => { },
}) => {
  const { user } = useAuth();
  return (
    <div className={`fixed z-10 gap-2 right-6 ${isPhoneScreen ? 'bottom-18' : 'bottom-6'} flex flex-col`}>
      {showScrollToTop && <ScrollToTopButton />}
      {showToggleView && (
        <ToggleViewButton
          isGridView={isGridView}
          onToggle={onToggleView}
        />
      )}
      {user && <ProtectedModeButton setMode={setMode} />}
    </div>
  );
};

export default FloatingButtons;
