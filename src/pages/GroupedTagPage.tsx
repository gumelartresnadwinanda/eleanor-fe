import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../components/buttons/Button";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import EmptyMedia from "../components/media/EmptyMedia";
import FileTypeToggleList from "../components/utilities/FileTypeToggleList";
import GroupedMediaGrid from "../components/media/GroupedMediaGrid";
import MediaModal from "../components/media/MediaModal";
import Popup from "../components/utilities/Popup";
import Title from "../components/layout/Title";
import ScrollToTopButton from "../components/buttons/ScrollToTopButton";
import ToggleViewButton from "../components/buttons/ToggleViewButton";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { Media, MediaResponse } from "../types/MediaResponse";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import { serializeParams } from "../utils/serializeParams";

const GroupedTagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const [media, setMedia] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFileType, setActiveFileType] = useState<string | null>(null);
  const tagRef = useRef(tag);

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            tags: tag,
            page,
            limit,
            file_type: activeFileType,
          })}`,
          { withCredentials: true }
        );
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
        setHasMore(response.data.data.length >= limit);
      } catch (error) {
        setError(`Failed to fetch media. ${error}`);
      }
    };

    if (tagRef.current !== tag && page !== 1) {
      tagRef.current = tag;
      setPage(1);
      return;
    }
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
