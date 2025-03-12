import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TitleProps {
  text: string;
  withBack?: boolean;
}

const Title = ({ text, withBack }: TitleProps) => {
  const navigate = useNavigate();

  if (!withBack) return <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{text}</h1>;
  return (
    <div className="flex items-center">
      <ArrowLeft
        className="cursor-pointer mr-4 dark:text-gray-100 text-gray-900"
        onClick={() => navigate(-1)}
        size={24} />
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{text}</h1>
    </div>)
};

export default Title;
