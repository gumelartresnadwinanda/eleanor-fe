export interface Tag {
  id: number;
  name: string;
  is_protected: boolean;
  last_media?: string | null;
}

export interface TagsResponse {
  data: Tag[];
  next: number | null;
  prev: number | null;
  count: string;
}
export interface TagRecommendation {
  id: string;
  tag: string;
  last_media?: string | null;
}

export interface TagRecommendationResponse {
  data: TagRecommendation[];
  count: number;
}
