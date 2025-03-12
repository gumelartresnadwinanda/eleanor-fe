import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./Button";

interface ScrollToTopButtonProps {
  isPhoneScreen: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isPhoneScreen }) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      variant="secondary"
      className={`fixed z-10 p-3 rounded-full shadow-lg right-6 transition-opacity duration-300 ${isPhoneScreen ? 'bottom-32' : 'bottom-18'} mb-2 ${isVisible ? 'opacity-100' : 'opacity-0'} shadow-md`}
      onClick={scrollToTop}
    >
      <ArrowUp size={24} />
    </Button>
  );
};

export default ScrollToTopButton;
