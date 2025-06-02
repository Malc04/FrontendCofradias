import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  mostrarFormulario: boolean = false;
  imagenes: string[] = [
    'png/foto1.png',
    'png/foto2.png',
    'png/foto3.png',
    'png/foto4.png',
  ];

  imagenSeleccionada: string = this.imagenes[0];

  seleccionarImagen(img: string) {
    this.imagenSeleccionada = img;
  }
}
