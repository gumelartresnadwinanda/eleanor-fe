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

const MediaModal = ({ media, selectedMedia, setSelectedMedia, isPhoneScreen }: MediaModalProps) => {
  const [animationClass, setAnimationClass] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleNextMedia = useCallback(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const nextIndex = (currentIndex + 1) % media.length;
      setAnimationClass("slide-out-left");
      setSelectedMedia(media[nextIndex]);
      setAnimationClass("slide-in-right");
    }
  }, [selectedMedia, media, setSelectedMedia]);

  const handlePrevMedia = useCallback(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
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
      if (swipeDistanceX > 110) handlePrevMedia();
      if (swipeDistanceX < -110) handleNextMedia();
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
          <img
            key={selectedMedia.id}
            src={selectedMedia.file_path}
            alt="Full size"
            className={`max-w-full max-h-full ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={() => setAnimationClass("")}
          />
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
