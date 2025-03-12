import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../components/Button";
import Container from "../components/Container";
import Description from "../components/Description";
import EmptyMedia from "../components/EmptyMedia";
import MediaGrid from "../components/MediaGrid";
import MediaModal from "../components/MediaModal";
import Popup from "../components/Popup";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Title from "../components/Title";
import ToggleViewButton from "../components/ToggleViewButton";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { Media, MediaResponse } from "../types/MediaResponse";
import { serializeParams } from "../utils/serializeParams";

const TagPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const { tag } = useParams<{ tag: string }>();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            tags: tag,
            page,
            limit,
          })}`
        );
        setMedia((prevMedia) => {
          if (page === 1) {
            return response.data.data;
          }
          const newMedia = response.data.data.filter(
            (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prevMedia, ...newMedia];
        });
        setHasMore(response.data.data.length >= limit);
      } catch (error) {
        setError(`Failed to fetch media. ${error}`);
      }
    };

    fetchMedia(page);
  }, [page, limit, tag]);

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
      <ScrollToTopButton isPhoneScreen={isPhoneScreen} />
      <ToggleViewButton
        isGridView={isGridView}
        isPhoneScreen={isPhoneScreen}
        onToggle={() => setIsGridView(!isGridView)}
      />
    </Container>
  );
};

export default TagPage;
