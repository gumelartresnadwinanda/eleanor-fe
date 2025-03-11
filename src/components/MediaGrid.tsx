import { Play } from "lucide-react";
import { Media } from "../types/MediaResponse";

interface MediaGridProps {
  media: Media[];
  isGridView: boolean;
  setSelectedMedia: (media: Media | null) => void;
}

const MediaGrid = ({ media, isGridView, setSelectedMedia }: MediaGridProps) => {
  return (
    <div className={`grid ${isGridView ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : 'grid-cols-1'} gap-1 mt-4`}>
      {media.map((item, index) => (
        <div key={index} className="relative">
          <img
            src={isGridView ? item.thumbnail_md : item.thumbnail_lg}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-auto ${isGridView ? 'aspect-square' : 'max-w-[400px] mx-auto'} object-cover cursor-pointer`}
            onClick={() => setSelectedMedia(item)}
          />
          {item.file_type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center"
              onClick={() => setSelectedMedia(item)}
            >
              <Play size={48} fill="white" className="text-white opacity-75" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
