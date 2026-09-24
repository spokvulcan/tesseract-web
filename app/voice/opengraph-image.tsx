import { CARD_SIZE, paperCard, paperCardAlt } from "@/lib/share-card";

export const alt = paperCardAlt("voice");
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return paperCard("voice");
}
