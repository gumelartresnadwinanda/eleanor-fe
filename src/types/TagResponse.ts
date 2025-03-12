export interface Tag {
  id: number;
  name: string;
  is_protected: boolean;
}

export interface TagsResponse {
  data: Tag[];
  next: number | null;
  prev: number | null;
  count: string;
}
