import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesPerCategory } from '../../models/places-per-category.model';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardStatusService } from '../../services/card-status.service';
import { DownloadService } from '../../services/download.service';
import { NavigationStateService } from '../../services/navigation-state.service';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-client-detail',
  imports: [CommonModule],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss'
})
export class ClientDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private cardService = inject(CardService);
  private cardStatusService = inject(CardStatusService);
  private downloadService = inject(DownloadService);
  private navigationState = inject(NavigationStateService);
  private placesService = inject(PlacesService);
  private router = inject(Router);
  

  place?: Card;
  loading = true;
  error = '';
  isFromDashboard = this.navigationState.isFromDashboard;

  ngOnInit() {
    console.log('Is from dashboard: ', this.isFromDashboard);
    const cardId = this.route.snapshot.paramMap.get('cardId');
    
    if (cardId) {
      const numericCardId = +cardId;

      if (!this.navigationState.isFromDashboard) {
        this.cardStatusService.registerStatus(numericCardId, 'Visited').subscribe({
          next: () => console.log('Status Visitado registrado'),
          error: (err) => console.error('Error al registrar status:', err),
        });
      }
    }

    this.route.params.subscribe(params => {
      const cardId = +params['cardId'];
      this.loadPlace(cardId);
    });
  }

  loadPlace(cardId: number) {
    this.loading = true;
    this.cardService.getCardById(cardId).subscribe({
      next: (data) => {
        this.place = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el lugar';
        this.loading = false;
        console.error('Error loading place:', err);
      }
    });
  }

  onDownloadClick() {
    if (this.place) {
      this.downloadService.downloadCard(this.place);
    }
  }

  onViewDashboard() {
    if (this.place) {
      //if (this.isFromDashboard) {
        // Navegar al dashboard en lugar de descargar
        console.log('Selected user Id: ', this.place.cardId);
        this.navigationState.setSelectedUserId(this.place.cardId);
        this.router.navigate(['/user-dashboard']);
      //} else {
        // Comportamiento normal: descargar cupón
        //this.downloadService.downloadCard(this.place);
      //}
    }
  }

  viewBackInfo() {
    if (this.place) {
      this.placesService.getLocationById(this.place.cardId).subscribe({
        next: (location) => {
          console.log('Ubicación recibida:', location);

          // Redirigimos al componente back-info con queryParams
          this.router.navigate(['/back-info', this.place!.cardId], {
            state: { location }  // 👈 pasamos toda la info en el navigation state
          });
        },
        error: (err) => console.error('Error cargando ubicación:', err),
      });
    }
  }

}