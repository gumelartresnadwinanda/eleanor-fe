import { Play } from "lucide-react";
import { Media } from "../../types/MediaResponse";
import { useNavigate } from "react-router-dom";

interface MediaGridProps {
  media: Media[];
  isGridView: boolean;
  setSelectedMedia: (media: Media | null) => void;
}

const MediaGrid = ({ media, isGridView, setSelectedMedia }: MediaGridProps) => {
  const navigate = useNavigate();
  return (
    <div className={`grid ${isGridView ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' : 'grid-cols-1'} gap-1 mt-4`}>
      {media.map((item, index) => (
        <div key={index} className="relative max-w-[400px] mx-auto">
          <img
            src={isGridView ? item.thumbnail_md || item.file_path : item.thumbnail_lg || item.file_path}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-auto ${isGridView ? 'aspect-square' : ''} object-cover cursor-pointer`}
            onClick={() => setSelectedMedia(item)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/600x400?text=No+Preview+Available';
            }}
          />
          {item.file_type === 'video' && (
            <div className={`absolute ${isGridView ? 'inset-0' : 'top-0 left-0 right-0 bottom-[75px]'} flex items-center justify-center bg-[rgba(255,255,255,0.1)] cursor-pointer`}
              onClick={() => setSelectedMedia(item)}
            >
              <Play size={48} fill="white" className="text-white opacity-75" />
            </div>
          )}
          {!isGridView && (
            <div className="pt-2 mb-6 px-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium dark:text-gray-100">{item.title}</p>
                <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                {item.tags.split(',').map((tag, index) => (
                  <span key={index}
                    className="bg-gray-500 text-white px-2 py-1 rounded-md text-xs cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tags/${tag.trim()}/group`);
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
