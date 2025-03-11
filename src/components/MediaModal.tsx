import { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface MediaModalProps {
  media: { thumbnail: string; image: string }[];
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  isPhoneScreen: boolean;
}

const MediaModal = ({ media, selectedImage, setSelectedImage, isPhoneScreen }: MediaModalProps) => {
  const [animationClass, setAnimationClass] = useState("");

  const handleNextImage = useCallback(() => {
    if (selectedImage) {
      const currentIndex = media.findIndex((item) => item.image === selectedImage);
      const nextIndex = (currentIndex + 1) % media.length;
      setAnimationClass("slide-out-left");
      setTimeout(() => {
        setSelectedImage(media[nextIndex].image);
        setAnimationClass("slide-in-right");
      }, 300);
    }
  }, [selectedImage, media, setSelectedImage]);

  const handlePrevImage = useCallback(() => {
    if (selectedImage) {
      const currentIndex = media.findIndex((item) => item.image === selectedImage);
      const prevIndex = (currentIndex - 1 + media.length) % media.length;
      setAnimationClass("slide-out-right");
      setTimeout(() => {
        setSelectedImage(media[prevIndex].image);
        setAnimationClass("slide-in-left");
      }, 300);
    }
  }, [selectedImage, media, setSelectedImage]);

  useEffect(() => {
    let startX: number | null = null;
    let startY: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!selectedImage || startX === null || startY === null) return;
      const touch = e.changedTouches[0];
      const swipeDistanceX = touch.clientX - startX;
      const swipeDistanceY = touch.clientY - startY;
      if (swipeDistanceX > 50) handlePrevImage();
      if (swipeDistanceX < -50) handleNextImage();
      if (swipeDistanceY > 50) setSelectedImage(null);
      startX = null;
      startY = null;
    };

    if (selectedImage) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedImage, handleNextImage, handlePrevImage, setSelectedImage]);

  return (
    selectedImage && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
        {!isPhoneScreen && (
          <Button
            variant="secondary"
            className="absolute left-6"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        <img
          src={selectedImage}
          alt="Full size"
          className={`max-w-full max-h-full ${animationClass}`}
          onClick={(e) => e.stopPropagation()}
          onAnimationEnd={() => setAnimationClass("")}
        />
        {!isPhoneScreen && (
          <Button
            variant="secondary"
            className="absolute right-6"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <ChevronRight size={24} />
          </Button>
        )}
      </div>
    )
  );
};

export default MediaModal;
