import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { AssociatedService } from '../../services/associated.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associated-list',
  imports: [CommonModule],
  templateUrl: './associated-list.html',
  styleUrl: './associated-list.scss'
})
export class AssociatedList implements OnInit {
  associates: Card[] = [];
  loading = true;

  constructor(private associatedService: AssociatedService, private router: Router) {}

  ngOnInit(): void {
    this.associatedService.getAllCards().subscribe({
      next: (data) => {
        this.associates = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando asociados:', err);
        this.loading = false;
      }
    });
  }

  goToDetail(cardId: number) {
    this.router.navigate(['/place', cardId]);
  }
}