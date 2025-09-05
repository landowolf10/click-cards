import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../services/places-service';
import { PlacesPerCategory } from '../../models/places-per-category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places-by-category',
  imports: [CommonModule],
  templateUrl: './places-by-category.html',
  styleUrl: './places-by-category.scss'
})
export class PlacesByCategory implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private placesService = inject(PlacesService);

  places: PlacesPerCategory[] = [];
  loading = true;
  error = '';
  ownerId!: number;
  category!: string;
  categoryName = '';

   ngOnInit() {
    this.route.params.subscribe(params => {
      this.ownerId = +params['owner_id'];
      this.category = params['category'];
      this.setCategoryName();
      this.loadPlaces();
    });
  }

  setCategoryName() {
    const categoryNames: { [key: string]: string } = {
      'restaurants': 'Restaurantes',
      'hotels': 'Hoteles',
      'attractions': 'Atracciones'
    };
    this.categoryName = categoryNames[this.category] || this.category;
  }

  loadPlaces() {
    this.loading = true;
    this.placesService.getPlacesPerCategory(this.ownerId, this.category).subscribe({
      next: (data) => {
        this.places = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los lugares';
        this.loading = false;
        console.error('Error loading places:', err);
      }
    });
  }

  navigateToPlaceDetail(place: PlacesPerCategory) {
    this.router.navigate(['/place', place.cardId]);
  }

  goBack() {
    this.router.navigate(['/place', this.ownerId]);
  }
}