import { Tag, Info, X, Trash } from "lucide-react";
import { Media } from "../../types/MediaResponse";
import { Button } from "../buttons/Button";
import { useState } from "react";
import axios from "axios";
import { ELEANOR_BASE_URL } from "../../config";
import NotificationPopup from "../NotificationPopup";
import ConfirmDialog from "../ConfirmationDialog";

interface MediaModalControlsProps {
  selectedMedia: Media;
  showTags: boolean;
  setShowTags: (show: boolean) => void;
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
  handleTagClick: (tag: string) => void;
  setSelectedMedia: (media: Media | null) => void;
  onDelete: () => void
}

const MediaModalControls = ({
  selectedMedia,
  showTags,
  setShowTags,
  showInfo,
  setShowInfo,
  handleTagClick,
  setSelectedMedia,
  onDelete
}: MediaModalControlsProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');

  const deleteMedia = async (id: number, deleteWithData = false) => {
    const response = await axios.delete(`${ELEANOR_BASE_URL}/medias/${id}?deleteWithData=${deleteWithData}`);
    if (response.status == 200) {
      setPopupMessage('Delete Success!');
      setPopupType('success');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      onDelete();
    } else {
      setPopupMessage('Something went wrong!');
      setPopupType('error');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }

  // TODO: add function to open the media in drive (ensure the device used is same device used to save the media)
  // TODO: add function to handle edit tags in the media, can be modal or inline edit

  return (
    <>
      {showTags && selectedMedia.tags.split(',').map((tag, index) => (
        <span
          key={index}
          className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer content-center text-sm"
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
      <Button
        variant="secondary"
        className="p-2 relative"
        onClick={(e) => {
          e.stopPropagation();
          setShowInfo(!showInfo);
        }}
      >
        <Info size={24} />
        {showInfo && (
          <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded-md shadow-lg w-auto whitespace-nowrap">
            {/* TODO: Add copy id to clipboard on click */}
            <p><strong>ID:</strong> {selectedMedia.id}</p>
            <p><strong>Title:</strong> {selectedMedia.title}</p>
            <p><strong>Created At:</strong> {new Date(selectedMedia.created_at).toLocaleString()}</p>
          </div>
        )}
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
      <Button
        className="p-2"
        onClick={() => setShowConfirm(true)}><Trash /></Button>
      {showConfirm && (
        <ConfirmDialog
          title="Delete Media?"
          message="Are you sure you want to delete this item?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteMedia(selectedMedia.id);
            setShowConfirm(false);
          }}
          extraButton={{
            label: 'Yes, also remove from drive',
            onClick: () => {
              deleteMedia(selectedMedia.id, true);
              setShowConfirm(false);
            },
            style: { backgroundColor: 'gray', color: 'white' },
          }}
        />
      )}
      {showPopup && (
        <NotificationPopup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          type={popupType}
        />
      )}
    </>
  );
};

export default MediaModalControls;
