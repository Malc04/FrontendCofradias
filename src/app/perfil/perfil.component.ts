import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { HermanoService } from '../services/Hermano/hermano.service';
import { Usuario } from '../models/Usuario/usuario';
import { Hermano } from '../models/Hermano/hermano';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  hermano: Hermano | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private hermanoService: HermanoService
  ) { }

  ngOnInit(): void {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      this.usuarioService.obtenerUsuarioPorId(+usuarioId).subscribe(data => {
        this.usuario = data;
      });
    }

    const hermanoId = localStorage.getItem('idHermano');
    if (hermanoId && hermanoId !== 'null') {
      this.hermanoService.obtenerHermanoPorId(+hermanoId).subscribe(data => {
        this.hermano = data;
      });
    }
  }

  guardarUsuario() {
    if (this.usuario && this.usuario.id) {
      this.usuarioService.actualizarUsuario(this.usuario.id, {
        nombreUsuario: this.usuario.nombreUsuario
      }).subscribe({
        next: (usuarioActualizado) => {
          // Guarda el nuevo nombre de usuario en localStorage
          localStorage.setItem('nombreUsuario', usuarioActualizado.nombreUsuario);
          alert('Usuario actualizado correctamente');
        },
        error: () => {
          alert('Error al actualizar el usuario');
        }
      });
    }
  }


  guardarHermano() {
    if (this.hermano && this.hermano.id) {
      this.hermanoService.actualizarHermano(this.hermano.id, {
        domiciliacionBancaria: this.hermano.domiciliacionBancaria
      }).subscribe(() => {
        alert('Hermano actualizado correctamente');
      });
    }
  }
}
