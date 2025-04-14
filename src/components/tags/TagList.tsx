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
  if (type !== "link") return (
    <div className="mt-4">
      {tags.map((tag) => (
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
      ))}
    </div>
  )
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to={`/tags/${tag.name}/group`}
            className="flex-col inline-block px-3 py-3 m-1 shadow bg-gray-50 text-black font-bold rounded-sm no-underline transition duration-300 ease-in-out"
          >
            {tag.last_media &&
              <img src={tag.last_media} alt={tag.name} className="inline-block h-50 w-full object-cover" />}
            <p className="block p-1">{tag.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;
