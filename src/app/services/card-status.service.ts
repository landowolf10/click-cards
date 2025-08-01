import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardStatus } from '../models/card-status.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardStatusService {
  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  registerStatus(cardid: number, status: string): Observable<any> {
    const body: CardStatus = {
      cardid,
      status,
      city: 'Zihuatanejo',
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    return this.http.post(`${this.baseUrl}/cards/register_status`, body);
  }
}
