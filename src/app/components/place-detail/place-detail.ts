import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { DownloadService } from '../../services/download.service';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-place-detail',
  imports: [CommonModule],
  templateUrl: './place-detail.html',
  styleUrl: './place-detail.scss'
})
export class PlaceDetail implements OnInit {
  card?: Card;
  isPlace = true;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cardService = inject(CardService);
  private downloadService = inject(DownloadService);
  private placesService = inject(PlacesService);

  labels: string[] = [
    "Información general",
    "Galería de fotos",
    "Mapa de localización",
    "Restaurantes",
    "Hoteles",
    "Atracciones"
  ];

  normalCardLabels: string[] = [
    "Menu",
    "Galería de fotos",
    "Servicios extra",
    "Información y reservaciones",
    "Descarga tu cupón",
    "Mapa de localización"
  ];

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['isPlace'] !== undefined) {
      this.isPlace = queryParams['isPlace'] === 'true';
    }
    
    const cardId = this.route.snapshot.paramMap.get('id');
    if (cardId) {
      this.cardService.getCardById(+cardId).subscribe({
        next: (data) => (this.card = data),
        error: (err) => console.error('Error loading card:', err),
      });
    }
  }

  onLabelClick(label: string) {
    if (!this.card?.cardId) return;

    console.log('Is place: ', this.isPlace);

    if(this.isPlace === true) {
      switch (label) {
        case "Mapa de localización":
          this.showLocation(this.card.cardId);
          //console.log('Navigate to map')
          break;
        case "Restaurantes":
          this.navigateToCategory('restaurants');
          break;
        case "Hoteles":
          this.navigateToCategory('hotels');
          break;
        case "Atracciones":
          this.navigateToCategory('attractions');
          break;
        default:
          console.log('Opción:', label);
      }
    } else {
      switch (label) {
        case "Menu":
          console.log('Navigate to menu')
          break;
        case "Galería de fotos":
          console.log('Navigate to menu');
          break;
        case "Servicios extra":
          console.log('Extra services');
          break;
        case "Información y reservaciones":
          console.log('Information and reservations');
          break;
        case "Descarga tu cupón":
          this.onDownloadClick();
          break;
        case "Mapa de localización":
          this.showLocation(this.card.cardId);
          //console.log('Navigate to map');
          break;
        default:
          console.log('Opción:', label);
      }
    }
  }

  showLocation(cardId: number) {
    const url = `/map/${cardId}`;
    console.log('Navegando a:', url);
    this.router.navigate([url]);
  }


  onDownloadClick() {
    if (this.card) {
      this.downloadService.downloadCard(this.card);
    }
  }

  navigateToCategory(category: string) {
    if (this.card) {
      this.router.navigate(['/places', this.card.cardId, category]);
    }
  }
}
