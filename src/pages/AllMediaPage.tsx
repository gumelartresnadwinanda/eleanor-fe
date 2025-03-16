import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import { Button } from "../components/buttons/Button";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import EmptyMedia from "../components/media/EmptyMedia";
import FloatingButtons from "../components/buttons/FloatingButtons";
import GroupedMediaGrid from "../components/media/GroupedMediaGrid";
import MediaModal from "../components/media/MediaModal";
import Popup from "../components/utilities/Popup";
import Title from "../components/layout/Title";
import TagList from "../components/tags/TagList";
import SortingButton from "../components/buttons/SortingButton";

import { ELEANOR_BASE_URL } from "../config";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { Media, MediaResponse } from "../types/MediaResponse";
import { Tag } from "../types/TagResponse";
import { groupMediaByDate } from "../utils/groupMediaByDate";
import { serializeParams } from "../utils/serializeParams";
import FileTypeButton from "../components/buttons/FileTypeButton";
import { FileType } from "../types/FileTypes";

function AllMediaPage() {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean; }>();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [media, setMedia] = useState<Media[]>([]);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "unprotected");
  const modeRef = useRef(mode);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const orderRef = useRef(order);
  const [page, setPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [type, setType] = useState<FileType>("all");
  const typeRef = useRef(type);
  const [loading, setLoading] = useState(false); // Add loading state

  const limit = PAGINATION_LIMITS.high;
  const types: FileType[] = ["all", "photo", "video"];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<{ data: Tag[]; }>(`${ELEANOR_BASE_URL}/tags?${serializeParams({
          ...(isProtected !== undefined && { is_protected: isProtected }),
        })}`,
          { withCredentials: true }
        );
        setTags(response.data.data);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      }
    };

    fetchTags();
  }, [mode]);

  useEffect(() => {
    const fetchMedia = async (page: number) => {
      setLoading(true);
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<MediaResponse>(
          `${ELEANOR_BASE_URL}/medias?${serializeParams({
            page,
            limit,
            tags: activeTags.length > 0 ? activeTags.join(",") : undefined,
            sort_order: order,
            file_type: type,
            ...(isProtected !== undefined && { is_protected: isProtected }),
          })}`,
          { withCredentials: true }
        );
        if (page === 1) {
          setMedia(response.data.data);
        } else {
          setMedia((prevMedia) => {
            const newMedia = response.data.data.filter(
              (newItem) => !prevMedia.some((prevItem) => prevItem.id === newItem.id)
            );
            return [...prevMedia, ...newMedia];
          });
        }
        setHasMore(response.data.data.length >= limit);
      } catch (error) {
        setError(`Failed to fetch media. ${error}`);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };
    if (modeRef.current !== mode && page !== 1) {
      modeRef.current = mode;
      setPage(1);
      return;
    }
    if (orderRef.current !== order && page !== 1) {
      orderRef.current = order;
      setPage(1);
      return;
    }
    if (typeRef.current !== type && page !== 1) {
      typeRef.current = type;
      setPage(1);
      return;
    }
    fetchMedia(page);
  }, [page, limit, activeTags, mode, order, type]);

  const loadMoreMedia = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) => prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
    setPage(1); // Reset page to 1 when tags change
  };

  const changeType = () => {
    const nextTypeIndex = (types.indexOf(type) + 1) % types.length;
    setType(types[nextTypeIndex]);
  }

  const groupedMedia = groupMediaByDate(media);

  return (
    <Container>
      <Title text="All Media" />
      <Description text="Here you can browse all your media." />
      <TagList tags={tags} activeTags={activeTags} onTagClick={toggleTag} type="toggle" />
      <div className="flex gap-2">
        <SortingButton order={order} onToggleOrder={() => setOrder(order === 'asc' ? 'desc' : 'asc')} />
        <FileTypeButton type={type} onToggleType={changeType} />
      </div>
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {media.length === 0 ? (
        <EmptyMedia message="No media available." />
      ) : (
        <GroupedMediaGrid groupedMedia={groupedMedia} isGridView={isGridView} setSelectedMedia={setSelectedMedia} />
      )}
      {hasMore && media.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="mt-4"
            onClick={loadMoreMedia}
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Load More"}
          </Button>
        </div>
      )}
      <MediaModal
        media={media}
        selectedMedia={selectedMedia}
        setSelectedMedia={setSelectedMedia}
        isPhoneScreen={isPhoneScreen} />
      <FloatingButtons
        isPhoneScreen={isPhoneScreen}
        isGridView={isGridView}
        onToggleView={() => setIsGridView(!isGridView)}
        showScrollToTop
        showToggleView
        setMode={setMode}
      />
    </Container>
  );
}

export default AllMediaPage;

