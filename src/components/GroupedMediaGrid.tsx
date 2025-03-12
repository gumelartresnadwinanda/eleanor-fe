import { Media } from "../types/MediaResponse";
import MediaGrid from "./MediaGrid";

interface GroupedMediaGridProps {
  groupedMedia: { date: string; media: Media[] }[];
  isGridView: boolean;
  setSelectedMedia: (media: Media | null) => void;
}

const GroupedMediaGrid = ({ groupedMedia, isGridView, setSelectedMedia }: GroupedMediaGridProps) => {
  return (
    <div className="space-y-4">
      {groupedMedia.map((group, index) => (
        <div key={index}>
          <h2 className="mt-6 text-md font-semibold text-gray-900 dark:text-gray-100 mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
            {group.date}
          </h2>
          <MediaGrid media={group.media} isGridView={isGridView} setSelectedMedia={setSelectedMedia} />
        </div>
      ))}
    </div>
  );
};

export default GroupedMediaGrid;
