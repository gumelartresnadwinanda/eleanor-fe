import axios from "axios";
import { useState, useEffect } from "react";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import Title from "../components/layout/Title";
import Popup from "../components/utilities/Popup";
import TagList from "../components/tags/TagList";
import { ELEANOR_BASE_URL } from "../config";
import { Tag, TagsResponse } from "../types/TagResponse";
import { serializeParams } from "../utils/serializeParams";
import FloatingButtons from "../components/buttons/FloatingButtons";
import { useOutletContext } from "react-router-dom";
import SortingButton from "../components/buttons/SortingButton";

const TagIndexPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean; }>();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "unprotected");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const isProtected = mode === "protected" ? true : mode === "unprotected" ? false : undefined;
        const response = await axios.get<TagsResponse>(
          `${ELEANOR_BASE_URL}/tags?${serializeParams({
            limit: 500,
            ...(isProtected !== undefined && { is_protected: isProtected }),
            sort_order: order,
            sort_by: "name",
          })}`,
          { withCredentials: true }
        );
        setTags(response.data.data);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      }
    };
    fetchTags();
  }, [mode, order]);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title text="Tags" />
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
      <SortingButton order={order} isFloating isPhoneScreen={isPhoneScreen} onToggleOrder={() => setOrder(order === 'asc' ? 'desc' : 'asc')} />
      <FloatingButtons
        isPhoneScreen={isPhoneScreen}
        setMode={setMode}
      />
    </Container>
  );
};

export default TagIndexPage;

