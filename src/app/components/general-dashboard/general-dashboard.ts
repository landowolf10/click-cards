import { Component, OnInit } from '@angular/core';
import { GeneralDashboardService } from '../../services/general-dashboard.service';
import { GeneralCountModel } from '../../models/general-count.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-general-dashboard',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule],
  templateUrl: './general-dashboard.html',
  styleUrl: './general-dashboard.scss'
})
export class GeneralDashboard implements OnInit {
  generalData?: GeneralCountModel;
  todayData?: GeneralCountModel;
  rangeData?: GeneralCountModel;
  cityData?: GeneralCountModel;

  selectedDate: Date = new Date();
  startDate: string = '';
  endDate: string = '';
  selectedCity: string = 'Ciudad';
  cities = ['Zihuatanejo', 'Acapulco', 'Morelia'];

  constructor(private dashboardService: GeneralDashboardService) {}

  ngOnInit(): void {
    this.loadGeneralData();
    //this.loadTodayData();
    //this.loadCityData(this.selectedCity);
  }

  loadGeneralData() {
    this.dashboardService.getGeneralCount().subscribe(data => this.generalData = data);
  }

  onDateChange(event: any) {
    const date = this.formatDateToYMD(this.selectedDate);
    this.dashboardService.getCountByDate(date).subscribe(data => {
      this.todayData = data;
    });
  }

  private formatDateToYMD(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  loadRangeData() {
    if (this.startDate && this.endDate) {
      this.dashboardService.getCountByRange(this.startDate, this.endDate)
        .subscribe(data => this.rangeData = data);
    }
  }

  loadCityData(city: string) {
    this.dashboardService.getCountByCity(city)
      .subscribe(data => this.cityData = data);
  }

  onCityChange(event: any) {
    this.selectedCity = event.target.value;
    this.loadCityData(this.selectedCity);
  }
}
