import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PlacesPerCategory } from '../models/places-per-category.model';
import { Location } from '../models/location.model';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class AssociatedService {
  private baseUrl = 'http://192.168.0.6:8000/api/v1';
  //api/v1/card/$clientId

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<Card[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards`).pipe(
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
      lat: apiCard.lat,
      long: apiCard.long,
       schedule: apiCard.schedule,
      phoneNumber: apiCard.phone_number,
      web: apiCard.web,
      socialMedia: apiCard.social_media,
      characteristics: apiCard.characteristics,
      creationDate: apiCard.creation_date,
      updateDate: apiCard.update_date
    };
  }
}