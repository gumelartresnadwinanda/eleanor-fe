import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./Button";


const ScrollToTopButton: React.FC<{ className?: string }> = ({ className }) => {
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
      className={`p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
      onClick={scrollToTop}
    >
      <ArrowUp size={24} />
    </Button>
  );
};

export default ScrollToTopButton;
