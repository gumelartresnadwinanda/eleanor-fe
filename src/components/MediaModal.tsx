import { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Tag, X, Info } from "lucide-react";
import { Button } from "./Button";
import { Media } from "../types/MediaResponse";
import { useNavigate } from "react-router-dom";

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
      setTimeout(() => {
        setSelectedMedia(media[nextIndex]);
        setAnimationClass("slide-in-right");
      }, 300);
    }
  }, [selectedMedia, media, setSelectedMedia]);

  const handlePrevMedia = useCallback(() => {
    if (selectedMedia) {
      const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
      setAnimationClass("slide-out-right");
      setTimeout(() => {
        setSelectedMedia(media[prevIndex]);
        setAnimationClass("slide-in-left");
      }, 300);
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
      if (swipeDistanceX > 120) handlePrevMedia();
      if (swipeDistanceX < -120) handleNextMedia();
      if (swipeDistanceY < -120) setSelectedMedia(null); // Enable close modal on swipe up
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

  return (
    selectedMedia && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {selectedMedia.file_type === "photo" ? (
          <img
            src={selectedMedia.file_path}
            alt="Full size"
            className={`max-w-full max-h-full ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={() => setAnimationClass("")}
          />
        ) : (
          <video
            src={selectedMedia.file_path}
            className={`max-w-full max-h-full ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={() => setAnimationClass("")}
            controls
            autoPlay
          />
        )}
        {!isPhoneScreen && (
          <Button
            variant="secondary"
            className="absolute left-6"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevMedia();
            }}
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        {!isPhoneScreen && (
          <Button
            variant="secondary"
            className="absolute right-6"
            onClick={(e) => {
              e.stopPropagation();
              handleNextMedia();
            }}
          >
            <ChevronRight size={24} />
          </Button>
        )}
        <div className="absolute top-6 right-6 flex flex-wrap gap-2">
          {showTags && selectedMedia.tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer content-center text-sm "
              onClick={(e) => {
                e.stopPropagation();
                handleTagClick(tag.trim());
              }}
            >
              {tag.trim()}
            </span>
          ))}
          {selectedMedia.tags && (
            <Button
              variant="secondary"
              className="p-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowTags(!showTags);
              }}
            >
              <Tag size={24} />
            </Button>
          )}

          {showInfo && (
            <div className="bg-white text-black p-2 rounded-md">
              <p><strong>Title:</strong> {selectedMedia.title}</p>
              <p><strong>Created At:</strong> {new Date(selectedMedia.created_at).toLocaleString()}</p>
            </div>
          )}
          <Button
            variant="secondary"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowInfo(!showInfo);
            }}
          >
            <Info size={24} />
          </Button>

          <Button
            variant="secondary"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMedia(null);
            }}
          >
            <X size={24} />
          </Button>
        </div>
      </div>
    )
  );
};

export default MediaModal;
