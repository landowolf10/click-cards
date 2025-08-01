import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private baseUrl = 'http://192.168.0.1:8000/api/v1';
  //api/v1/card/$clientId

  constructor(private http: HttpClient) {}

  getCardsByPlaceNull(): Observable<Card[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards/carousel`).pipe(
      map(data => data.map(card => this.mapCardFields(card)))
    );
  }

  getCardsByPremium(): Observable<Card[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards/premium?isPremium=Yes`).pipe(
      map(premiumData => premiumData.map(premiumCard => this.mapCardFields(premiumCard)))
    );
  }

  getCardById(cardId: number): Observable<Card> {
    return this.http.get<any>(`${this.baseUrl}/card/${cardId}`).pipe(
      map(card => this.mapCardFields(card))
    );
  }

  getCardsByCategory(category: string): Observable<Card[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards/category?category=${category}`).pipe(
      map(data => data.map(card => this.mapCardFields(card)))
    );
  }


  private mapCardFields(apiCard: any): Card {
    return {
      cardId: apiCard.cardid,
      memberId: apiCard.memberid,
      cardName: apiCard.cardname,
      city: apiCard.city,
      place: apiCard.place,
      category: apiCard.category,
      isPremium: apiCard.premium,
      image: apiCard.image,
      backImage: apiCard.back_image,
      creationDate: apiCard.creation_date,
      updateDate: apiCard.update_date
    };
  }
}