import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PlacesPerCategory } from '../models/places-per-category.model';
import { Location } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private baseUrl = 'http://192.168.0.6:8000/api/v1';
  //api/v1/card/$clientId

  constructor(private http: HttpClient) {}

  getPlacesPerCategory(ownerId: number, category: string): Observable<PlacesPerCategory[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards/place/category?owner_id=${ownerId}&category=${category}`).pipe(
      map(data => data.map(card => this.mapCardFields(card)))
    );
  }

  getLocationById(cardId: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/card/lat-long/${cardId}`).pipe(
      map(data => this.mapLocationFields(data))
    );
  }

  private mapCardFields(apiCard: any): PlacesPerCategory {
    return {
      id: apiCard.id,
      ownerId: apiCard.owner_id,
      cardId: apiCard.card_id,
      placeName: apiCard.place_name,
      category: apiCard.category
    };
  }

  private mapLocationFields(apiCard: any): Location {
    return {
      lat: apiCard.lat,
      long: apiCard.long,
      schedule: apiCard.schedule,
      phoneNumber: apiCard.phone_number,
      web: apiCard.web,
      socialMedia: apiCard.social_media,
      characteristics: apiCard.characteristics
    };
  }
}