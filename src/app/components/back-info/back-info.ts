import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MapLocation } from '../map-location/map-location';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-back-info',
  imports: [CommonModule, MapLocation],
  templateUrl: './back-info.html',
  styleUrl: './back-info.scss'
})
export class BackInfo implements OnInit {
  location: any;
  cardId?: number;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private placesService = inject(PlacesService);

  ngOnInit() {
    this.cardId = Number(this.route.snapshot.paramMap.get('cardId'));

    // 1. Intentar recuperar desde navigation state
    const nav = this.router.getCurrentNavigation();
    this.location = nav?.extras.state?.['location'];

    // 2. Si no viene nada (ej: refresh o acceso directo), pedir al servicio
    if (!this.location && this.cardId) {
      this.placesService.getLocationById(this.cardId).subscribe({
        next: (loc) => {
          this.location = loc;
          console.log('Ubicación cargada via fallback:', loc);
        },
        error: (err) => console.error('Error al cargar ubicación:', err),
      });
    }

    console.log('Location en BackInfo:', this.location);
  }
}