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
  lat: string;
  long: string;
  schedule: string;
  phoneNumber: string;
  web: string;
  socialMedia: string;
  characteristics: string;
  creationDate: string;
  updateDate: string | null;
}