import { Media } from "../types/MediaResponse";

export const groupMediaByDate = (media: Media[]) => {
  const groupedMedia: { date: string; media: Media[] }[] = [];
  media.forEach((item) => {
    const date = new Date(item.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const group = groupedMedia.find((g) => g.date === date);
    if (group) {
      group.media.push(item);
    } else {
      groupedMedia.push({ date, media: [item] });
    }
  });
  return groupedMedia;
};
