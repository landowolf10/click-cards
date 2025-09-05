import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-map-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-location.html',
  styleUrls: ['./map-location.scss']
})
export class MapLocation implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapEl!: ElementRef<HTMLDivElement>;

  @Input() cardId?: number;
  @Input() lat?: number;
  @Input() lng?: number;

  private route = inject(ActivatedRoute);
  private placesService = inject(PlacesService);

  private map?: L.Map;
  private viewReady = false;
  private coords?: { lat: number; lng: number };

  ngOnInit() {
    if (this.lat && this.lng) {
      // ✅ Caso 1: ya recibimos coordenadas por @Input
      this.coords = { lat: this.lat, lng: this.lng };
      this.tryInitMap();
      return;
    }

    // ✅ Caso 2: si no hay coords, uso cardId (propiedad o ruta)
    const id = this.cardId ?? Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.placesService.getLocationById(id).subscribe({
        next: (location) => {
          this.coords = { lat: parseFloat(location.lat), lng: parseFloat(location.long) };
          this.tryInitMap();
        },
        error: (err) => console.error('Error cargando ubicación:', err),
      });
    }
  }

  ngAfterViewInit() {
    this.viewReady = true;
    this.tryInitMap();
  }

  private tryInitMap() {
    if (!this.viewReady || !this.coords || this.map) return;

    const { lat, lng } = this.coords;
    this.map = L.map(this.mapEl.nativeElement).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Ubicación seleccionada')
      .openPopup();
  }

  openDirections() {
    if (!this.coords) return;
    const { lat, lng } = this.coords;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  }
}