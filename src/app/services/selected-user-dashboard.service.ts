import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralCountModel, GeneralCountModelDate } from '../models/general-count.model';
import { map, Observable } from 'rxjs';
import { SelectedUserCountModel } from '../models/selected-count.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedUserDashboardService {
  private baseUrl = 'http://192.168.0.6:8000/api/v1';

  constructor(private http: HttpClient) {}

  getGeneralCount(cardId: number): Observable<SelectedUserCountModel> {
    return this.http.get<SelectedUserCountModel>(`${this.baseUrl}/card/count/card?cardId=${cardId}`).pipe(
       map(status => this.mapCardFields(status))
    );
  }

  getCountByDate(cardId: number, date: string): Observable<GeneralCountModelDate> {
    return this.http.get<GeneralCountModelDate>(`${this.baseUrl}/card?cardId=${cardId}&date=${date}`).pipe(
       map(status => this.mapCardFieldsDate(status))
    );
  }

  getCountByRange(cardId: number, startDate: string, endDate: string): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/card/count/range?startDate=${startDate}&endDate=${endDate}&cardId=${cardId}`).pipe(
       map(status => this.mapCardFieldsRange(status))
    );
  }

  /*getCountByCity(city: string): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/cards/count/city?city=${city}`).pipe(
       map(status => this.mapCardFields(status))
    );
  }*/

  private mapCardFields(status: any): SelectedUserCountModel {
      return {
        cardName: status.card_name,
        visitedCount: status.visited_count,
        downloadedCount: status.downloaded_count
      };
    }

    private mapCardFieldsDate(status: any): GeneralCountModelDate {
      return {
        date: status.date,
        visitedCount: status.visited_count,
        downloadedCount: status.downloaded_count
      };
    }

    private mapCardFieldsRange(status: any): GeneralCountModel {
      return {
        visitedCount: status.visited_count,
        downloadedCount: status.downloaded_count
      };
    }
}
