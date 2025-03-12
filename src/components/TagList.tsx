import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../types/TagResponse";

interface TagListProps {
  tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="mt-4">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          to={`/tags/${tag.name}/group`}
          className="inline-block px-3 py-1 m-1 bg-sky-200 dark:bg-slate-400 text-black bg:text-white font-bold rounded-sm no-underline transition duration-300 ease-in-out hover:bg-sky-400 dark:hover:bg-slate-900 hover:text-white"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
