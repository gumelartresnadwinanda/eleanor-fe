import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { LockKeyhole, LockKeyholeOpen, LockOpen } from "lucide-react";

const modes: Array<keyof typeof icons> = ["protected", "unprotected", "all"];
const icons = {
  protected: <LockKeyhole />,
  unprotected: <LockKeyholeOpen />,
  all: <LockOpen />,
};

interface ProtectedModeButtonProps {
  setMode?: (mode: keyof typeof icons) => void;
}

const ProtectedModeButton: React.FC<ProtectedModeButtonProps> = ({ setMode }) => {
  const [currentMode, setCurrentMode] = useState<keyof typeof icons>(() => {
    const mode = localStorage.getItem("mode");
    return (mode === "protected" || mode === "unprotected" || mode === "all") ? mode : "unprotected";
  });

  useEffect(() => {
    localStorage.setItem("mode", currentMode);
    if (setMode) {
      setMode(currentMode);
    }
  }, [currentMode, setMode]);

  const handleClick = () => {
    const nextModeIndex = (modes.indexOf(currentMode) + 1) % modes.length;
    setCurrentMode(modes[nextModeIndex]);
  };

  return (
    <Button
      variant="secondary"
      className="p-3 rounded-full shadow-lg"
      onClick={handleClick}
    >
      {icons[currentMode]}
    </Button>
  );
};

export default ProtectedModeButton;
