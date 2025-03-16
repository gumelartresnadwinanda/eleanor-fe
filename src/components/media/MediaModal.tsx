import { useEffect, useCallback, useState } from "react";
import { Media } from "../../types/MediaResponse";
import { useNavigate } from "react-router-dom";
import MediaNavigationButtons from "./MediaNavigationButtons";
import MediaModalControls from "./MediaModalControls";

interface MediaModalProps {
  media: Media[];
  selectedMedia: Media | null;
  setSelectedMedia: (media: Media | null) => void;
  isPhoneScreen: boolean;
}

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const MediaModal = ({ media, selectedMedia, setSelectedMedia, isPhoneScreen }: MediaModalProps) => {
  const [animationClass, setAnimationClass] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const navigate = useNavigate();

  const handleNextMedia = useCallback(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const nextIndex = (currentIndex + 1) % media.length;
      setIsHighResLoaded(false);
      setAnimationClass("slide-out-left");
      setSelectedMedia(media[nextIndex]);
      setAnimationClass("slide-in-right");
    }
  }, [selectedMedia, media, setSelectedMedia]);

  const handlePrevMedia = useCallback(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
      setIsHighResLoaded(false);
      setAnimationClass("slide-out-right");
      setSelectedMedia(media[prevIndex]);
      setAnimationClass("slide-in-left");
    }
  }, [selectedMedia, media, setSelectedMedia]);

  const handleTagClick = (tag: string) => {
    setSelectedMedia(null)
    navigate(`/tags/${tag}/group`);
  };

  useEffect(() => {
    let startX: number | null = null;
    let startY: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        setIsZooming(true);
      } else {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        setIsZooming(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        setIsZooming(false);
      }
      if (!selectedMedia || startX === null || startY === null || isZooming) return;
      const touch = e.changedTouches[0];
      const swipeDistanceX = touch.clientX - startX;
      const swipeDistanceY = touch.clientY - startY;
      if (swipeDistanceX > 80) handlePrevMedia();
      if (swipeDistanceX < -80) handleNextMedia();
      if (swipeDistanceY < -110) setSelectedMedia(null); // Enable close modal on swipe up
      startX = null;
      startY = null;
    };

    if (selectedMedia) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedMedia, handleNextMedia, handlePrevMedia, setSelectedMedia, isZooming]);

  useEffect(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const nextIndex = (currentIndex + 1) % media.length;
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
      preloadImage(media[nextIndex].file_path);
      preloadImage(media[prevIndex].file_path);
    }
  }, [selectedMedia, media]);

  useEffect(() => {
    if (selectedMedia) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedMedia]);

  return (
    selectedMedia && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {selectedMedia.file_type === "photo" ? (
          <div className="relative max-w-full max-h-full" style={{ width: '100%', height: '100%' }}> {/* Ensure container size */}
            {!isHighResLoaded && (
              <div className="absolute top-4 left-4 spinner"></div>
            )}
            <img
              key={`${selectedMedia.id}-low`}
              src={`${selectedMedia.thumbnail_md}`}
              alt="Low resolution"
              className={`absolute inset-0 w-full h-full object-contain ${animationClass} ${isHighResLoaded ? 'opacity-100' : 'opacity-100'}`}
              onClick={(e) => e.stopPropagation()}
              onAnimationEnd={() => setAnimationClass("")}
              style={{ transition: 'opacity 0.5s ease-in-out' }} // Smooth transition
            />
            <img
              key={selectedMedia.id}
              src={selectedMedia.file_path}
              alt="Full size"
              className={`absolute inset-0 w-full h-full object-contain ${animationClass} ${isHighResLoaded ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
              onLoad={() => {
                setIsHighResLoaded(true)
              }}
              onAnimationEnd={() => setAnimationClass("")}
              style={{ transition: 'opacity 0.5s ease-in-out' }} // Smooth transition
            />
          </div>
        ) : (
          <video
            key={selectedMedia.id}
            src={selectedMedia.file_path}
            className={`max-w-full max-h-full ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={() => setAnimationClass("")}
            controls
            autoPlay
          />
        )}
        {!isPhoneScreen && (
          <MediaNavigationButtons
            handlePrevMedia={handlePrevMedia}
            handleNextMedia={handleNextMedia}
          />
        )}
        <div className="absolute top-6 right-6 flex flex-wrap gap-2">
          <MediaModalControls
            selectedMedia={selectedMedia}
            showTags={showTags}
            setShowTags={setShowTags}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            handleTagClick={handleTagClick}
            setSelectedMedia={setSelectedMedia}
          />
        </div>
      </div>
    )
  );
};

export default MediaModal;
