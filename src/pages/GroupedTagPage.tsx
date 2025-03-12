import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import MediaModal from "../components/MediaModal";
import { MediaResponse, Media } from "../types/MediaResponse";
import { PAGINATION_LIMITS } from "../constants/pagination";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";
import Popup from "../components/Popup";
import EmptyMedia from "../components/EmptyMedia";
import GroupedMediaGrid from "../components/GroupedMediaGrid";
import ToggleViewButton from "../components/ToggleViewButton";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import FileTypeToggleList from "../components/FileTypeToggleList";

const GroupedTagPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const { tag } = useParams<{ tag: string }>();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFileType, setActiveFileType] = useState<string | null>(null); // State for active file type

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const fileTypeParam = activeFileType ? `&file_type=${activeFileType}` : "";
        const response = await axios.get<MediaResponse>(`${import.meta.env.VITE_API_BASE_URL}/medias?tags=${tag}&page=${page}&limit=${limit}${fileTypeParam}`);
        if (page === 1) {
          setMedia(response.data.data);
        } else {
          setMedia((prevMedia) => {
            const newMedia = response.data.data.filter(
              (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
            );
            return [...prevMedia, ...newMedia];
          });
        }
        if (response.data.data.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        setError(`Failed to fetch media. ${error}`);
      }
    };

    fetchMedia(page);
  }, [page, limit, tag, activeFileType]);

  const loadMoreMedia = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleFileType = (fileType: string) => {
    setActiveFileType((prevFileType) => (prevFileType === fileType ? null : fileType));
    setPage(1); // Reset page to 1 when file type changes
  };

  const groupedMedia = groupMediaByDate(media);

  return (
    <Container>
      <Title text={`Media tagged with "${tag}"`} withBack />
      <Description text={`Here you can browse all media tagged with "${tag}".`} />
      <FileTypeToggleList activeFileType={activeFileType} onFileTypeClick={toggleFileType} /> {/* Add FileTypeToggleList component */}
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {media.length === 0 ? (
        <EmptyMedia message="No media available for this tag." />
      ) : (
        <GroupedMediaGrid groupedMedia={groupedMedia} isGridView={isGridView} setSelectedMedia={setSelectedMedia} />
      )}
      {hasMore && media.length > 0 && (
        <Button
          variant="secondary"
          className="mt-4"
          onClick={loadMoreMedia}
        >
          Load More
        </Button>
      )}
      <MediaModal
        media={media}
        selectedMedia={selectedMedia}
        setSelectedMedia={setSelectedMedia}
        isPhoneScreen={isPhoneScreen}
      />
      <ScrollToTopButton isPhoneScreen={isPhoneScreen} />
      <ToggleViewButton
        isGridView={isGridView}
        isPhoneScreen={isPhoneScreen}
        onToggle={() => setIsGridView(!isGridView)}
      />
    </Container>
  );
};

export default GroupedTagPage;
