import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Grid, List } from "lucide-react";
import { Button } from "../components/Button";
import MediaModal from "../components/MediaModal";
import { MediaResponse, Media } from "../types/MediaResponse";
import { PAGINATION_LIMITS } from "../constants/pagination";
import MediaGrid from "../components/MediaGrid";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";

const AllMediaPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = PAGINATION_LIMITS.high;
  useEffect(() => {
    const fetchMedia = async (page: number) => {
      try {
        const response = await axios.get<MediaResponse>(`${import.meta.env.VITE_API_BASE_URL}/medias?page=${page}&limit=${limit}`);
        setMedia((prevMedia) => {
          const newMedia = response.data.data.filter(
            (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prevMedia, ...newMedia];
        });
        if (response.data.data.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia(page);
  }, [page, limit]);

  const loadMoreMedia = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container isPhoneScreen={isPhoneScreen}>
      <Title text="All Media" />
      <Description text="Here you can browse all your media." />
      <MediaGrid media={media} isGridView={isGridView} setSelectedMedia={setSelectedMedia} />
      {hasMore && (
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
      <Button
        variant="secondary"
        className={`fixed z-10 p-3 rounded-full shadow-lg right-6 ${isPhoneScreen ? 'bottom-22' : 'bottom-6'}`}
        onClick={() => {
          setIsGridView(!isGridView);
          document.querySelector('.overflow-y-auto')?.scrollTo(0, 0);
        }}
      >
        {isGridView ? <List size={24} /> : <Grid size={24} />}
      </Button>
    </Container>
  );
};

export default AllMediaPage;

