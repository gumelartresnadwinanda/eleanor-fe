import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../components/buttons/Button";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import EmptyMedia from "../components/media/EmptyMedia";
import FloatingButtons from "../components/buttons/FloatingButtons";
import MediaGrid from "../components/media/MediaGrid";
import MediaModal from "../components/media/MediaModal";
import Popup from "../components/utilities/Popup";
import Title from "../components/layout/Title";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { Media, MediaResponse } from "../types/MediaResponse";
import { serializeParams } from "../utils/serializeParams";

const TagPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const { tag } = useParams<{ tag: string }>();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "unprotected");
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            tags: tag,
            page,
            limit,
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

    fetchMedia(page);
  }, [page, limit, tag, mode]);

  const loadMoreMedia = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container>
      <Title text={`Media tagged with "${tag}"`} withBack />
      <Description text={`Here you can browse all media tagged with "${tag}".`} />
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {media.length === 0 ? (
        <EmptyMedia message="No media available for this tag." />
      ) : (
        <MediaGrid media={media} isGridView={isGridView} setSelectedMedia={setSelectedMedia} />
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

export default TagPage;
