import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HermanoService } from '../services/Hermano/hermano.service';
import { UsuarioService } from '../services/Usuario/usuario.service';  // Importa el servicio
import { Hermano } from '../models/Hermano/hermano';

@Component({
  selector: 'app-afiliacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './afiliacion.component.html',
  styleUrl: './afiliacion.component.css'
})
export class AfiliacionComponent {
  hermano: Omit<Hermano, 'id' | 'numeroHermano'> = {
    nombreCompleto: '',
    dni: '',
    fechaNacimiento: new Date(),
    fechaIngreso: new Date(),
    domiciliacionBancaria: ''
  };

  exito: string = '';
  error: string = '';

  constructor(
    private hermanoService: HermanoService,
    private usuarioService: UsuarioService // Inyecta aquí
  ) { }

  estaAfiliado(): boolean {
    const idHermano = localStorage.getItem('idHermano');
    return idHermano !== null && idHermano !== '' && idHermano !== 'null';
  }

  afiliar() {
    this.error = '';
    this.exito = '';

    if (
      !this.hermano.nombreCompleto ||
      !this.hermano.dni ||
      !this.hermano.fechaNacimiento ||
      !this.hermano.domiciliacionBancaria
    ) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    // Fecha de ingreso actual
    this.hermano.fechaIngreso = new Date();

    this.hermanoService.registrarHermano(this.hermano).subscribe({
      next: (nuevoHermano) => {
        localStorage.setItem('idHermano', nuevoHermano.id.toString());

        // Obtener idUsuario guardado en localStorage
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
          this.error = 'No se encontró el usuario logueado para actualizar.';
          return;
        }

        // Actualizamos solo el idHermano del usuario
        this.usuarioService.actualizarIdHermano(+usuarioId, nuevoHermano.id).subscribe({
          next: () => {
            this.exito = 'Afiliación completada con éxito y usuario actualizado.';
          },
          error: () => {
            this.error = 'Error al actualizar el usuario con el idHermano.';
          }
        });
      },
      error: () => {
        this.error = 'Error al registrar la afiliación.';
      }
    });
  }

  numeroHermano: number | null = null;
  dniHermano: string = '';

  exitoVincular: string = '';
  errorVincular: string = '';

  vincularHermanoExistente() {
    this.exitoVincular = '';
    this.errorVincular = '';

    if (!this.numeroHermano || !this.dniHermano) {
      this.errorVincular = 'Debes introducir número de hermano y DNI.';
      return;
    }

    const usuarioid = localStorage.getItem('usuarioId');
    if (!usuarioid) {
      this.errorVincular = 'No se encontró el usuario logueado.';
      return;
    }

    this.hermanoService.getHermanos().subscribe({
      next: (hermanos) => {
        const hermanoEncontrado = hermanos.find(
          (h) => h.numeroHermano === this.numeroHermano && h.dni === this.dniHermano
        );

        if (!hermanoEncontrado) {
          this.errorVincular = 'No se encontró ningún hermano con esos datos.';
          return;
        }

        // Si lo encuentra, actualiza el idHermano en el usuario
        this.usuarioService.actualizarIdHermano(+usuarioid, hermanoEncontrado.id).subscribe({
          next: () => {
            localStorage.setItem('idHermano', hermanoEncontrado.id.toString());
            this.exitoVincular = 'Hermano vinculado correctamente.';
          },
          error: () => {
            this.errorVincular = 'Error al vincular el hermano al usuario.';
          }
        });
      },
      error: () => {
        this.errorVincular = 'Error al obtener la lista de hermanos.';
      }
    });
  }

}
