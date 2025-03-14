import { List, Grid } from "lucide-react";
import { Button } from "./Button";

interface ToggleViewButtonProps {
  isGridView: boolean;
  isPhoneScreen: boolean;
  onToggle: () => void;
}

const ToggleViewButton: React.FC<ToggleViewButtonProps> = ({ isGridView, isPhoneScreen, onToggle }) => {
  return (
    <Button
      variant="secondary"
      className={`fixed z-10 p-3 rounded-full shadow-lg right-6 ${isPhoneScreen ? 'bottom-20' : 'bottom-6'} shadow-md`}
      onClick={() => {
        onToggle();
        document.querySelector('.overflow-y-auto')?.scrollTo(0, 0);
      }}
    >
      {isGridView ? <List size={24} /> : <Grid size={24} />}
    </Button>
  );
};

export default ToggleViewButton;
