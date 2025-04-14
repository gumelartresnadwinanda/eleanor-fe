import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import Title from "../components/layout/Title";
import Popup from "../components/utilities/Popup";
import TagList from "../components/tags/TagList";
import { ELEANOR_BASE_URL } from "../config";
import { Tag, TagsResponse } from "../types/TagResponse";
import { serializeParams } from "../utils/serializeParams";
import FloatingButtons from "../components/buttons/FloatingButtons";
import { useOutletContext, useParams } from "react-router-dom";
import SortingButton from "../components/buttons/SortingButton";
import { PAGINATION_LIMITS } from "../constants/pagination";
import { Button } from "../components/buttons/Button";

const TagIndexPage = () => {
  const { type: tagType } = useParams<{ type?: string }>();
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean; }>();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "unprotected");
  const modeRef = useRef(mode);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const typeRef = useRef(tagType);
  const [hasMore, setHasMore] = useState(true);
  const limit = PAGINATION_LIMITS.high;

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<TagsResponse>(
          `${ELEANOR_BASE_URL}/tags?${serializeParams({
            page,
            limit,
            ...(isProtected !== undefined && { is_protected: isProtected }),
            sort_order: order,
            sort_by: "name",
            check_media: true,
            type: tagType || 'stage'
          })}`,
          { withCredentials: true }
        );
        if (page === 1) {
          scrollTo(0, 0);
          setTags(response.data.data);
        } else {
          setTags((prevTags) => [...prevTags, ...response.data.data]);
        }
        setHasMore(response.data.data.length >= limit);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    if (typeRef.current !== tagType && page !== 1) {
      typeRef.current = tagType;
      setPage(1);
      return;
    }
    if (modeRef.current !== mode && page !== 1) {
      modeRef.current = mode;
      setPage(1);
      return;
    }
    fetchTags();
  }, [mode, order, tagType, page, limit]);

  const loadMoreTags = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title text="Tags" withBack />
      <Description text="Browse media by tags." />
      <input
        type="text"
        placeholder="Search for tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mt-4 border border-gray-300 rounded dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-slate-900"
      />
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {Array.isArray(filteredTags) && filteredTags.length > 0 ? (
        <TagList tags={filteredTags} type="link" />
      ) : (
        <p className="mt-4 dark:text-white">No tags found. Try a different search term.</p>
      )}
      {hasMore && tags.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="mt-4"
            onClick={loadMoreTags}
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : "Load More"}
          </Button>
        </div>
      )}
      <SortingButton order={order} isFloating isPhoneScreen={isPhoneScreen} onToggleOrder={() => setOrder(order === 'asc' ? 'desc' : 'asc')} />
      <FloatingButtons
        isPhoneScreen={isPhoneScreen}
        setMode={setMode}
      />
    </Container>
  );
};

export default TagIndexPage;

