import React, { useEffect } from "react";
import axios from "axios";
import { ELEANOR_BASE_URL } from "../../config";
import { serializeParams } from "../../utils/serializeParams";
import { Link } from "react-router-dom";
import Title from "../layout/Title";
import { TagRecommendation as TagRecommendationInterface, TagRecommendationResponse } from "../../types/TagResponse";

interface TagRecommendationProps {
  tag?: string;
  isProtected?: boolean
}

const TagRecommendation: React.FC<TagRecommendationProps> = ({ tag, isProtected }) => {
  const [recommendations, setRecommendations] = React.useState<TagRecommendationInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const response = await axios.get<TagRecommendationResponse>(
          `${ELEANOR_BASE_URL}/tags/recommendations/${tag}?${serializeParams({
            ...(isProtected !== undefined && { is_protected: isProtected }),
          })}`,
          { withCredentials: true }
        );
        setRecommendations(response.data.data);
      } catch (error) {
        setRecommendations([]);
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    if (tag) {
      fetchRecommendation();
    }
  }, [tag, isProtected])

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-400 rounded-md shadow-md">
      <Title text={`More Like "${tag}"`} />
      {loading && (<p>Loading Recommendations</p>)}
      {!loading && recommendations?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {recommendations.map((rec) => (
            <Link
              key={rec.id}
              to={`/tags/${rec.tag}/group`}
              className="flex-col inline-block px-3 py-3 m-1 shadow bg-gray-50 text-black font-bold rounded-sm no-underline transition duration-300 ease-in-out"
              onClick={() => window.scrollTo(0, 0)}
            >
              {rec.last_media && (
                <img
                  src={rec.last_media}
                  alt={rec.tag}
                  className="inline-block h-50 object-cover w-full"
                />
              )}
              <p className="block p-1">{rec.tag}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No Recommendations For Now</p>
      )}
    </div>
  );
};

export default TagRecommendation;
