import { Tag, Info, X } from "lucide-react";
import { Media } from "../../types/MediaResponse";
import { Button } from "../buttons/Button";

interface MediaModalControlsProps {
  selectedMedia: Media;
  showTags: boolean;
  setShowTags: (show: boolean) => void;
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
  handleTagClick: (tag: string) => void;
  setSelectedMedia: (media: Media | null) => void;
}

const MediaModalControls = ({
  selectedMedia,
  showTags,
  setShowTags,
  showInfo,
  setShowInfo,
  handleTagClick,
  setSelectedMedia,
}: MediaModalControlsProps) => {
  return (
    <>
      {showTags && selectedMedia.tags.split(',').map((tag, index) => (
        <span
          key={index}
          className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer content-center text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleTagClick(tag.trim());
          }}
        >
          {tag.trim()}
        </span>
      ))}
      {selectedMedia.tags && (
        <Button
          variant="secondary"
          className="p-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowTags(!showTags);
          }}
        >
          <Tag size={24} />
        </Button>
      )}
      <Button
        variant="secondary"
        className="p-2 relative"
        onClick={(e) => {
          e.stopPropagation();
          setShowInfo(!showInfo);
        }}
      >
        <Info size={24} />
        {showInfo && (
          <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded-md shadow-lg w-auto whitespace-nowrap">
            <p><strong>Title:</strong> {selectedMedia.title}</p>
            <p><strong>Created At:</strong> {new Date(selectedMedia.created_at).toLocaleString()}</p>
          </div>
        )}
      </Button>
      <Button
        variant="secondary"
        className="p-2"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedMedia(null);
        }}
      >
        <X size={24} />
      </Button>
    </>
  );
};

export default MediaModalControls;
