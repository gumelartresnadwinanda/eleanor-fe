import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface MediaNavigationButtonsProps {
  handlePrevMedia: () => void;
  handleNextMedia: () => void;
}

const MediaNavigationButtons = ({ handlePrevMedia, handleNextMedia }: MediaNavigationButtonsProps) => {
  return (
    <>
      <Button
        variant="secondary"
        className="absolute left-6"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevMedia();
        }}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="secondary"
        className="absolute right-6"
        onClick={(e) => {
          e.stopPropagation();
          handleNextMedia();
        }}
      >
        <ChevronRight size={24} />
      </Button>
    </>
  );
};

export default MediaNavigationButtons;
