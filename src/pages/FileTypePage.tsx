import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { Button } from "../components/buttons/Button";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import EmptyMedia from "../components/media/EmptyMedia";
import FloatingButtons from "../components/buttons/FloatingButtons";
import GroupedMediaGrid from "../components/media/GroupedMediaGrid";
import MediaModal from "../components/media/MediaModal";
import Popup from "../components/utilities/Popup";
import Title from "../components/layout/Title";
import TagList from "../components/tags/TagList";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { MediaResponse, Media } from "../types/MediaResponse";
import { Tag } from "../types/TagResponse";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import { serializeParams } from "../utils/serializeParams";

const FileTypePage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const { fileType } = useParams<{ fileType: string }>();
  const fileTypeRef = useRef(fileType); // Add a ref to track fileType changes
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "unprotected");
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]); // State for active tags
  const [tags, setTags] = useState<Tag[]>([]); // State for tags
  const modeRef = useRef(mode);

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<{ data: Tag[] }>(`${ELEANOR_BASE_URL}/tags`,
          { withCredentials: true }
        );
        setTags(response.data.data);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            page,
            limit,
            file_type: fileType,
            tags: activeTags.length > 0 ? activeTags.join(",") : undefined,
            ...(isProtected !== undefined && { is_protected: isProtected }),
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

    if (fileTypeRef.current !== fileType && page !== 1) {
      fileTypeRef.current = fileType;
      setPage(1);
      return;
    }
    if (modeRef.current !== mode && page !== 1) {
      modeRef.current = mode;
      setPage(1);
      return;
    }
    fetchMedia(page);
  }, [page, limit, fileType, activeTags, mode]);

  const loadMoreMedia = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
    setPage(1); // Reset page to 1 when tags change
  };

  const groupedMedia = groupMediaByDate(media);

  return (
    <Container>
      <Title text={`Media by File Type: ${fileType}`} />
      <Description text={`Here you can browse media filtered by file type (${fileType}).`} />
      <TagList tags={tags} activeTags={activeTags} onTagClick={toggleTag} type="toggle" /> {/* Add TagToggleList component */}
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {media.length === 0 ? (
        <EmptyMedia message="No media available." />
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
      <FloatingButtons
        isPhoneScreen={isPhoneScreen}
        isGridView={isGridView}
        onToggleView={() => setIsGridView(!isGridView)}
        showScrollToTop
        showToggleView
        setMode={setMode}
      />
    </Container>
  );
};

export default FileTypePage;
