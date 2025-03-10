import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Grid, List } from "lucide-react";
import { Button } from "../components/Button";
import MediaModal from "../components/MediaModal";
import { MediaResponse, Media } from "../types/MediaResponse";

const AllMediaPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMedia = async (page: number) => {
    try {
      const response = await axios.get<MediaResponse>(`${import.meta.env.VITE_API_BASE_URL}/medias?page=${page}&limit=20`);
      setMedia((prevMedia) => [...prevMedia, ...response.data.data]);
      if (response.data.data.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    fetchMedia(page);
  }, [page]);

  const loadMoreMedia = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${isPhoneScreen ? 'text-center h-[calc(100vh-12rem)]' : 'h-[calc(100vh-8rem)]'}`}>
      <div className="w-full h-full overflow-y-auto scrollbar-hide relative">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Media</h1>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300">Here you can browse all your media.</p>
          <div className={`grid ${isGridView ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : 'grid-cols-1'} gap-1 mt-4`}>
            {media.map((src, index) => (
              <img
                key={index}
                src={isGridView ? src.thumbnail_md : src.thumbnail_lg}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-auto ${isGridView ? 'aspect-square' : 'max-w-[300px] mx-auto'} object-cover cursor-pointer`}
                onClick={() => setSelectedImage(isGridView ? src.file_path : src.file_path)}
              />
            ))}
          </div>
          {hasMore && (
            <Button
              variant="secondary"
              className="mt-4"
              onClick={loadMoreMedia}
            >
              Load More
            </Button>
          )}
        </div>
        <MediaModal
          media={media.map((item) => ({ thumbnail: item.thumbnail_md, image: item.thumbnail_lg }))}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
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
      </div>
    </div>
  );
};

export default AllMediaPage;

