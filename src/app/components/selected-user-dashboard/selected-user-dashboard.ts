import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { GeneralCountModel, GeneralCountModelDate } from '../../models/general-count.model';
import { NavigationStateService } from '../../services/navigation-state.service';
import { SelectedUserDashboardService } from '../../services/selected-user-dashboard.service';

@Component({
  selector: 'app-selected-user-dashboard',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule],
  templateUrl: './selected-user-dashboard.html',
  styleUrl: './selected-user-dashboard.scss'
})
export class SelectedUserDashboard implements OnInit {
  generalData?: GeneralCountModel;
  todayData?: GeneralCountModelDate;
  rangeData?: GeneralCountModel;
  //cityData?: GeneralCountModel;

  selectedDate: Date = new Date();
  startDate: string = '';
  endDate: string = '';
  selectedCity: string = 'Ciudad';
  cities = ['Zihuatanejo', 'Acapulco', 'Morelia'];
  cardId: number | null = null;

  constructor(
    private dashboardService: SelectedUserDashboardService, 
    private router: Router, 
    private navigationState: NavigationStateService
  ) {}

  ngOnInit(): void {
    this.navigationState.isFromDashboard = true;
     this.cardId = this.navigationState.getSelectedUserId();
    this.loadGeneralData();
    //this.loadTodayData();
    //this.loadCityData(this.selectedCity);
  }

  loadGeneralData() {
    this.dashboardService.getGeneralCount(this.cardId!).subscribe(data => this.generalData = data);
  }

  onDateChange(event: any) {
    const date = this.formatDateToYMD(this.selectedDate);
    console.log('Date card id: ', this.cardId);
    console.log('Selected date: ', date);
    this.dashboardService.getCountByDate(this.cardId!, date).subscribe(data => {
      this.todayData = data;
    });
  }

  private formatDateToYMD(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  loadRangeData() {
    if (this.startDate && this.endDate) {
      this.dashboardService.getCountByRange(this.cardId!, this.startDate, this.endDate)
        .subscribe(data => this.rangeData = data);
    }
  }

  /*loadCityData(city: string) {
    this.dashboardService.getCountByCity(city)
      .subscribe(data => this.cityData = data);
  }

  onCityChange(event: any) {
    this.selectedCity = event.target.value;
    this.loadCityData(this.selectedCity);
  }*/
}
