import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../../types/TagResponse";

interface TagListProps {
  tags: Tag[];
  activeTags?: string[];
  onTagClick?: (tag: string) => void;
  type: "link" | "toggle";
}

const TagList: React.FC<TagListProps> = ({ tags, activeTags, onTagClick, type }) => {
  return (
    <div className="mt-4">
      {tags.map((tag) => (
        type === "link" ? (
          <Link
            key={tag.id}
            to={`/tags/${tag.name}/group`}
            className="flex-col inline-block px-3 py-3 m-1 shadow dark:shadow-gray-900 text-black dark:text-white font-bold rounded-sm no-underline transition duration-300 ease-in-out"
          >
            {tag.last_media && <img src={tag.last_media} alt={tag.name} className="inline-block h-20 object-cover" />}
            <p className="block p-1">{tag.name}</p>
          </Link>
        ) : (
          <span
            key={tag.id}
            onClick={() => onTagClick && onTagClick(tag.name)}
            className={`inline-block px-3 py-1 m-1 font-bold rounded-sm no-underline transition duration-300 ease-in-out cursor-pointer ${activeTags && activeTags.includes(tag.name)
              ? "bg-sky-800 dark:bg-slate-50 text-white dark:text-black"
              : "bg-sky-50 dark:bg-slate-400 text-black"
              }`}
          >
            {tag.name}
          </span>
        )
      ))}
    </div>
  );
};

export default TagList;
