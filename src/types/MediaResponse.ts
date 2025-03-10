export interface Media {
  id: number;
  title: string;
  file_path: string;
  file_type: string;
  tags: string;
  duration: number | null;
  created_at: string;
  thumbnail_path: string;
  is_protected: boolean;
  thumbnail_lg: string;
  thumbnail_md: string;
  server_location: string;
}

export interface MediaResponse {
  data: Media[];
  next: number | null;
  prev: number | null;
  count: string;
}
