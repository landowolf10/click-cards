export interface Card {
  cardId: number;
  memberId: number;
  cardName: string;
  city: string;
  place: string;
  category: string;
  isPremium: string;
  image: string;
  backImage: string;
  creationDate: string;
  updateDate: string | null;
}