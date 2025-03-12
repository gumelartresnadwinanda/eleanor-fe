import React from "react";
import { Tag } from "../types/TagResponse";

interface TagToggleListProps {
  tags: Tag[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
}

const TagToggleList: React.FC<TagToggleListProps> = ({ tags, activeTags, onTagClick }) => {
  return (
    <div className="mt-4">
      {tags.map((tag) => (
        <span
          key={tag.id}
          onClick={() => onTagClick(tag.name)}
          className={`inline-block px-3 py-1 m-1 font-bold rounded-sm no-underline transition duration-300 ease-in-out cursor-pointer ${activeTags.includes(tag.name)
            ? "bg-sky-800 dark:bg-slate-50 text-white dark:text-black"
            : "bg-sky-50 dark:bg-slate-400 text-black"
            }`}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagToggleList;
