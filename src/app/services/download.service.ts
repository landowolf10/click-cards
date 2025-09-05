import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CardStatusService } from './card-status.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private cardStatusService: CardStatusService) {}

  downloadCard(card: Card) {
    if (!card?.image) {
      console.error('No hay imagen para descargar');
      return;
    }

    fetch(card.image)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const fileExtension = card.image.split('.').pop()?.split('?')[0] || 'jpg';
        const fileName = card.cardName ? `${card.cardName}.${fileExtension}` : 'tarjeta.jpg';

        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // registrar status
        if (card.cardId) {
          this.cardStatusService.registerStatus(card.cardId, 'Downloaded').subscribe({
            next: () => console.log('Status Descargado registrado'),
            error: (err) => console.error('Error al registrar status:', err),
          });
        }
      })
      .catch(error => {
        console.error('Error al descargar la imagen:', error);
      });
  }
}