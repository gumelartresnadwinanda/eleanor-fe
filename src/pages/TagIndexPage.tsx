import { Link } from "react-router-dom";
import Title from "../components/Title";
import Description from "../components/Description";
import Container from "../components/Container";

const TagIndexPage = () => {
  const tags = [
    { name: "Content" },
    { name: "Funny" },
    { name: "Books" },
    { name: "Podcasts" },
    { name: "TV Shows" },
    { name: "Movies" },
    { name: "Music" },
    { name: "Technology" },
    { name: "Science" },
    { name: "Health" },
    { name: "Travel" },
    { name: "Food" },
    { name: "Mario" },
  ];

  return (
    <Container isPhoneScreen={false}>
      <Title text="Tags" />
      <Description text="Browse media by tags." />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Link key={tag.name} to={`/tags/${tag.name}`} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition">
            {tag.name}
          </Link>
        ))}
      </div>
    </Container >
  );
};

export default TagIndexPage;
