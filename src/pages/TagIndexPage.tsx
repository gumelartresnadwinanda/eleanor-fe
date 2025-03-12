import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import Title from "../components/Title";
import Description from "../components/Description";
import Popup from "../components/Popup";
import TagList from "../components/TagList";
import { Tag, TagsResponse } from "../types/TagResponse";
import { ELEANOR_BASE_URL } from "../config";

const TagIndexPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<TagsResponse>(`${ELEANOR_BASE_URL}/tags`);
        setTags(response.data.data);
      } catch (error) {
        setError(`Failed to fetch tags. ${error}`);
      }
    };

    fetchTags();
  }, []);

  return (
    <Container>
      <Title text="Tags" />
      <Description text="Browse media by tags." />
      {error && <Popup message={error} onClose={() => setError(null)} />}
      {Array.isArray(tags) && tags.length > 0 ? (
        <TagList tags={tags} />
      ) : (
        <p>No tags available.</p>
      )}
    </Container>
  );
};

export default TagIndexPage;

