import { CARD_SIZE, HOME_CARD_ALT, homeCard } from "@/lib/share-card";

export const alt = HOME_CARD_ALT;
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return homeCard();
}
