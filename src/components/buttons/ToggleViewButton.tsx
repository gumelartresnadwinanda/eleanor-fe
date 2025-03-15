import { List, Grid } from "lucide-react";
import { Button } from "./Button";

interface ToggleViewButtonProps {
  isGridView: boolean;
  onToggle: () => void;
  className?: string;
}

const ToggleViewButton: React.FC<ToggleViewButtonProps> = ({ isGridView, onToggle, className }) => {
  return (
    <Button
      variant="secondary"
      className={`p-3 rounded-full shadow-lg ${className || ''}`}
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
