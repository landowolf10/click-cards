import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationStateService {
  isFromDashboard = false;
  selectedUserId: number | null = null;

  setSelectedUserId(userId: number) {
    this.selectedUserId = userId;
  }

  getSelectedUserId(): number | null {
    return this.selectedUserId;
  }

  clearSelectedUserId() {
    this.selectedUserId = null;
  }
}
