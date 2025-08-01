import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  nombreCompleto: string = '';
  comentario: string = '';
  estrellas: number = 0;

  setEstrellas(valor: number): void {
    this.estrellas = valor;
    console.log('Estrellas seleccionadas:', this.estrellas);
  }

  enviarFormulario(): void {
    console.log('Nombre:', this.nombreCompleto);
    console.log('Comentario:', this.comentario);
    console.log('Estrellas:', this.estrellas);
  }
}
