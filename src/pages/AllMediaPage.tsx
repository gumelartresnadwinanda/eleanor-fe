import { useOutletContext } from "react-router-dom";
import { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "../components/Button";
import MediaModal from "../components/MediaModal"; // Import MediaModal

const AllMediaPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  // TODO: Replace the media array with your own media array
  const media = useMemo(() => [
    { thumbnail: "/thumbnails/thumb_IMG_6548.JPG.jpg", image: "/thumbnails/thumb_IMG_6548.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6549.JPG.jpg", image: "/thumbnails/thumb_IMG_6549.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6550.JPG.jpg", image: "/thumbnails/thumb_IMG_6550.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6551.JPG.jpg", image: "/thumbnails/thumb_IMG_6551.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6552.JPG.jpg", image: "/thumbnails/thumb_IMG_6552.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6553.JPG.jpg", image: "/thumbnails/thumb_IMG_6553.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6554.JPG.jpg", image: "/thumbnails/thumb_IMG_6554.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6555.JPG.jpg", image: "/thumbnails/thumb_IMG_6555.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6556.JPG.jpg", image: "/thumbnails/thumb_IMG_6556.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6557.JPG.jpg", image: "/thumbnails/thumb_IMG_6557.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6558.JPG.jpg", image: "/thumbnails/thumb_IMG_6558.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6559.JPG.jpg", image: "/thumbnails/thumb_IMG_6559.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6560.JPG.jpg", image: "/thumbnails/thumb_IMG_6560.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6561.JPG.jpg", image: "/thumbnails/thumb_IMG_6561.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6562.JPG.jpg", image: "/thumbnails/thumb_IMG_6562.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6563.JPG.jpg", image: "/thumbnails/thumb_IMG_6563.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6564.JPG.jpg", image: "/thumbnails/thumb_IMG_6564.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6565.JPG.jpg", image: "/thumbnails/thumb_IMG_6565.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6566.JPG.jpg", image: "/thumbnails/thumb_IMG_6566.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6567.JPG.jpg", image: "/thumbnails/thumb_IMG_6567.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6568.JPG.jpg", image: "/thumbnails/thumb_IMG_6568.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6569.JPG.jpg", image: "/thumbnails/thumb_IMG_6569.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6570.JPG.jpg", image: "/thumbnails/thumb_IMG_6570.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6571.JPG.jpg", image: "/thumbnails/thumb_IMG_6571.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6572.JPG.jpg", image: "/thumbnails/thumb_IMG_6572.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6573.JPG.jpg", image: "/thumbnails/thumb_IMG_6573.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6574.JPG.jpg", image: "/thumbnails/thumb_IMG_6574.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6575.JPG.jpg", image: "/thumbnails/thumb_IMG_6575.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6576.JPG.jpg", image: "/thumbnails/thumb_IMG_6576.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6577.JPG.jpg", image: "/thumbnails/thumb_IMG_6577.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6578.JPG.jpg", image: "/thumbnails/thumb_IMG_6578.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6579.JPG.jpg", image: "/thumbnails/thumb_IMG_6579.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6580.JPG.jpg", image: "/thumbnails/thumb_IMG_6580.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6581.JPG.jpg", image: "/thumbnails/thumb_IMG_6581.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6582.JPG.jpg", image: "/thumbnails/thumb_IMG_6582.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6583.JPG.jpg", image: "/thumbnails/thumb_IMG_6583.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6584.JPG.jpg", image: "/thumbnails/thumb_IMG_6584.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6585.JPG.jpg", image: "/thumbnails/thumb_IMG_6585.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6586.JPG.jpg", image: "/thumbnails/thumb_IMG_6586.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6587.JPG.jpg", image: "/thumbnails/thumb_IMG_6587.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6588.JPG.jpg", image: "/thumbnails/thumb_IMG_6588.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6589.JPG.jpg", image: "/thumbnails/thumb_IMG_6589.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6590.JPG.jpg", image: "/thumbnails/thumb_IMG_6590.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6591.JPG.jpg", image: "/thumbnails/thumb_IMG_6591.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6592.JPG.jpg", image: "/thumbnails/thumb_IMG_6592.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6593.JPG.jpg", image: "/thumbnails/thumb_IMG_6593.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6594.JPG.jpg", image: "/thumbnails/thumb_IMG_6594.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6595.JPG.jpg", image: "/thumbnails/thumb_IMG_6595.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6596.JPG.jpg", image: "/thumbnails/thumb_IMG_6596.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6597.JPG.jpg", image: "/thumbnails/thumb_IMG_6597.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6598.JPG.jpg", image: "/thumbnails/thumb_IMG_6598.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6599.JPG.jpg", image: "/thumbnails/thumb_IMG_6599.JPG.jpg" },
    { thumbnail: "/thumbnails/thumb_IMG_6600.JPG.jpg", image: "/thumbnails/thumb_IMG_6600.JPG.jpg" },
  ], []);

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
                src={isGridView ? src.thumbnail : src.image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-auto ${isGridView ? 'aspect-square' : 'max-w-[300px] mx-auto'} object-cover cursor-pointer`}
                onClick={() => setSelectedImage(isGridView ? src.thumbnail : src.image)}
              />
            ))}
          </div>
        </div>
        <MediaModal
          media={media}
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

