import { ImageOff } from "lucide-react";

interface EmptyMediaProps {
  message: string;
}

const EmptyMedia = ({ message }: EmptyMediaProps) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
    <ImageOff size={48} className="mb-4 text-gray-500" />
    <p className="text-gray-500">{message}</p>
  </div>
);

export default EmptyMedia;
