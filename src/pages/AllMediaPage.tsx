import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import MediaModal from "../components/MediaModal";
import { MediaResponse, Media } from "../types/MediaResponse";
import { PAGINATION_LIMITS } from "../constants/pagination";
import GroupedMediaGrid from "../components/GroupedMediaGrid";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";
import Popup from "../components/Popup";
import EmptyMedia from "../components/EmptyMedia";
import ToggleViewButton from "../components/ToggleViewButton";
import ScrollToTopButton from "../components/ScrollToTopButton";
import TagToggleList from "../components/TagToggleList"; // Import TagToggleList
import { Tag } from "../types/TagResponse"; // Import Tag type

const AllMediaPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
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
        const response = await axios.get<{ data: Tag[] }>(`${import.meta.env.VITE_API_BASE_URL}/tags`);
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
        const tagsParam = activeTags.length > 0 ? `&tags=${activeTags.join(",")}` : "";
        const response = await axios.get<MediaResponse>(`${import.meta.env.VITE_API_BASE_URL}/medias?page=${page}&limit=${limit}${tagsParam}`);
        if (page === 1) {
          setMedia(response.data.data); // Reset media state only when the page changes
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
  }, [page, limit, activeTags]);

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
      <Title text="All Media" />
      <Description text="Here you can browse all your media." />
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

export default AllMediaPage;

