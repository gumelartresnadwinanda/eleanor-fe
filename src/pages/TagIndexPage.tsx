import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import Title from "../components/Title";
import Description from "../components/Description";
import Popup from "../components/Popup";
import TagList from "../components/TagList";
import { Tag, TagsResponse } from "../types/TagResponse";
import { ELEANOR_BASE_URL } from "../config";
import { serializeParams } from "../utils/serializeParams";

const TagIndexPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<TagsResponse>(
          `${ELEANOR_BASE_URL}/tags?${serializeParams({ limit: 100 })}`,
          { withCredentials: true }
        );
        setTags(response.data.data);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      }
    };

    fetchTags();
  }, []);

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
    </Container>
  );
};

export default TagIndexPage;

