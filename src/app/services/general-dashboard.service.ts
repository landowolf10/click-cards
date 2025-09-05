import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralCountModel } from '../models/general-count.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralDashboardService {
  private baseUrl = 'http://192.168.0.6:8000/api/v1';

  constructor(private http: HttpClient) {}

  getGeneralCount(): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/cards/count/general`).pipe(
       map(status => this.mapCardFields(status))
    );
  }

  getCountByDate(date: string): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/cards/count/date?date=${date}`).pipe(
       map(status => this.mapCardFields(status))
    );
  }

  getCountByRange(startDate: string, endDate: string): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/cards/count?startDate=${startDate}&endDate=${endDate}`).pipe(
       map(status => this.mapCardFields(status))
    );
  }

  getCountByCity(city: string): Observable<GeneralCountModel> {
    return this.http.get<GeneralCountModel>(`${this.baseUrl}/cards/count/city?city=${city}`).pipe(
       map(status => this.mapCardFields(status))
    );
  }

  private mapCardFields(status: any): GeneralCountModel {
      return {
        visitedCount: status.visited_count,
        downloadedCount: status.downloaded_count
      };
    }
}
