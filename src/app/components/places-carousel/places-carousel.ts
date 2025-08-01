import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { Card } from '../..//models/card.model';
import { RouterModule } from '@angular/router';
import { CardStatusService } from '../../services/card-status.service';
import { PremiumCarousel } from '../premium-carousel/premium-carousel';

@Component({
  selector: 'app-places-carousel',
  imports: [CommonModule, RouterModule, PremiumCarousel],
  templateUrl: './places-carousel.html',
  styleUrl: './places-carousel.scss'
})
export class PlacesCarousel implements OnInit {
  cards: Card[] = [];
  currentIndex = 0;
  autoplayInterval: any;
  private pointerDownX = 0;
  private pointerDeltaX = 0;
  private isPointerDown = false;
  private cardStatusService = inject(CardStatusService);

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCardsByPlaceNull().subscribe((data) => {
      this.cards = data;
      this.startAutoplay();
    });

    window.addEventListener('resize', () => {
      // Forzar recálculo si usas alguna variable para transformar
      this.currentIndex = this.currentIndex; // disparar cambio
    });
  }

  onImageClick(cardId: number) {
    this.cardStatusService.registerStatus(cardId, 'Visited').subscribe({
      next: () => console.log('Visited registrado'),
      error: (err) => console.error('Error al registrar status:', err),
    });
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  onPointerDown(event: PointerEvent): void {
    this.isPointerDown = true;
    this.pointerDownX = event.clientX;
    this.pointerDeltaX = 0;
    // Para que no se seleccione texto o imagen al arrastrar
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isPointerDown) return;
    this.pointerDeltaX = event.clientX - this.pointerDownX;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    const swipeThreshold = 50; // pixeles mínimos para considerar swipe

    if (this.pointerDeltaX > swipeThreshold) {
      this.prev();
    } else if (this.pointerDeltaX < -swipeThreshold) {
      this.next();
    }

    this.pointerDeltaX = 0;
  }

  getTransform(index: number): string {
    const offset = index - this.currentIndex;
    const width = window.innerWidth;

    let baseTranslateX: number;

    if (width <= 480) {
      baseTranslateX = 100;
    } else if (width <= 1024) {
      baseTranslateX = 180;
    } else {
      baseTranslateX = 220;
    }

    if (offset === 0) return 'scale(1.2) translateZ(50px)';
    if (offset === -1 || (offset === this.cards.length - 1 && this.currentIndex === 0))
      return `scale(0.9) translateX(${-baseTranslateX}px) translateZ(-50px)`;
    if (offset === 1 || (offset === -(this.cards.length - 1) && this.currentIndex === this.cards.length - 1))
      return `scale(0.9) translateX(${baseTranslateX}px) translateZ(-50px)`;
    return 'scale(0.8) translateZ(-100px)';
  }
}
