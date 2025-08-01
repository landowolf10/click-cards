import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';
import { CardStatusService } from '../../services/card-status.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-premium-carousel',
  imports: [CommonModule, RouterModule],
  templateUrl: './premium-carousel.html',
  styleUrl: './premium-carousel.scss'
})
export class PremiumCarousel implements OnInit {
  cards: Card[] = [];
  currentIndex = 0;
  autoplayInterval: any;
  private pointerDownX = 0;
  private pointerDeltaX = 0;
  private isPointerDown = false;
  categories = [
    {
      image: 'assets/images/atractions.webp',
      text: 'Atracciones',
      category: 'parks'
    },
    {
      image: 'assets/images/entertainment.webp',
      text: 'Entretenimiento',
      category: 'places_events'
    },
    {
      image: 'assets/images/food.jpg',
      text: 'Gastronomía',
      category: 'restaurants'
    },
    {
      image: 'assets/images/shopping.jpg',
      text: 'Compras',
      category: 'shopping'
    },
    {
      image: 'assets/images/diversion.jpg',
      text: 'Diversión familiar',
      category: 'fun'
    },
    {
      image: 'assets/images/img-conocer-mas.png',
      text: 'Conoce todas nuestras categorías',
      category: 'all_categories'
    }
  ];

  locations = [
    {
      name: 'Zihuatanejo',
      image: 'assets/images/Zihuatanejo_img.jpg',
      description: 'Zihuatanejo es un destino costero popular por sus playas...',
    },
    {
      name: 'Acapulco',
      image: 'assets/images/Acapulco_img.jpg',
      description: 'Acapulco ofrece vida nocturna, playas y vistas panorámicas...',
    },
    {
      name: 'Morelia',
      image: 'assets/images/Morelia.webp',
      description: 'Morelia destaca por su arquitectura colonial y su catedral...',
    },
  ];

  private cardStatusService = inject(CardStatusService);

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCardsByPremium().subscribe((data) => {
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

  onCategoryClick(category: string): void {
    this.cardService.getCardsByCategory(category).subscribe((data) => {
      this.cards = data;
      this.currentIndex = 0;
      this.resetAutoplay();
    });
  }

  openLocationModal(location: any) {
    // Abre tu modal aquí
    console.log('Abrir info de:', location.name);
  }

  openGeneralInfo() {
    // Abrir modal o navegar
    console.log('Ver más info general');
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  resetAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.startAutoplay();
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
