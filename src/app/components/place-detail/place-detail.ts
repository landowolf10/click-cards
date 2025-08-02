import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardStatusService } from '../../services/card-status.service';

@Component({
  selector: 'app-place-detail',
  imports: [CommonModule],
  templateUrl: './place-detail.html',
  styleUrl: './place-detail.scss'
})
export class PlaceDetail implements OnInit {
  card?: Card;
  private route = inject(ActivatedRoute);
  private cardService = inject(CardService);
  private cardStatusService = inject(CardStatusService);

  labels: string[] = [
    "Galería de fotos",
    "Información general",
    "Mapa de localización",
    "Restaurantes",
    "Hoteles",
    "Atracciones"
  ];

  ngOnInit() {
    const cardId = this.route.snapshot.paramMap.get('id');
    if (cardId) {
      this.cardService.getCardById(+cardId).subscribe({
        next: (data) => (this.card = data),
        error: (err) => console.error('Error loading card:', err),
      });
    }
  }

  onDownloadClick() {
    if (!this.card?.cardId) return;

    // Descargar imagen o PDF aquí...
    this.downloadCard();

    // Registrar el status "Descargado"
    this.cardStatusService.registerStatus(this.card.cardId, 'Downloaded').subscribe({
      next: () => console.log('Status Descargado registrado'),
      error: (err) => console.error('Error al registrar status:', err),
    });
  }

  downloadCard() {
    if (!this.card?.image) {
      console.error('No hay imagen para descargar');
      return;
    }

    fetch(this.card.image)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const fileExtension = this.card?.image.split('.').pop()?.split('?')[0] || 'jpg';
        const fileName = this.card?.cardName ? `${this.card.cardName}.${fileExtension}` : 'tarjeta.jpg';

        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error al descargar la imagen:', error);
      });
  }
}
