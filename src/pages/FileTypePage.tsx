import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import Container from "../components/Container";
import Description from "../components/Description";
import EmptyMedia from "../components/EmptyMedia";
import GroupedMediaGrid from "../components/GroupedMediaGrid";
import MediaModal from "../components/MediaModal";
import Popup from "../components/Popup";
import ScrollToTopButton from "../components/ScrollToTopButton";
import TagToggleList from "../components/TagToggleList";
import Title from "../components/Title";
import ToggleViewButton from "../components/ToggleViewButton";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { MediaResponse, Media } from "../types/MediaResponse";
import { Tag } from "../types/TagResponse";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import { serializeParams } from "../utils/serializeParams";

const FileTypePage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const { fileType } = useParams<{ fileType: string }>();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]); // State for active tags
  const [tags, setTags] = useState<Tag[]>([]); // State for tags

  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<{ data: Tag[] }>(`${ELEANOR_BASE_URL}/tags`);
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
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            page,
            limit,
            file_type: fileType,
            tags: activeTags.length > 0 ? activeTags.join(",") : undefined,
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
  }, [page, limit, fileType, activeTags]);

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
      <TagToggleList tags={tags} activeTags={activeTags} onTagClick={toggleTag} /> {/* Add TagToggleList component */}
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
      <ScrollToTopButton isPhoneScreen={isPhoneScreen} />
      <ToggleViewButton
        isGridView={isGridView}
        isPhoneScreen={isPhoneScreen}
        onToggle={() => setIsGridView(!isGridView)}
      />
    </Container>
  );
};

export default FileTypePage;
