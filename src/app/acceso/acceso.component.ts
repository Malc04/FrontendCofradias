import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Usuario } from '../models/Usuario/usuario';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {
  nuevoUsuario: Usuario = {
    nombreUsuario: '',
    email: '',
    contrasenya: ''
  };

  error: string = '';
  exito: string = '';

  constructor(private usuarioService: UsuarioService) { }

  registrar() {
    this.error = '';
    this.exito = '';

    const { nombreUsuario, email, contrasenya } = this.nuevoUsuario;

    if (!nombreUsuario || !email || !contrasenya) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (contrasenya === nombreUsuario || contrasenya === email) {
      this.error = 'La contraseña no puede ser igual al nombre de usuario ni al email.';
      return;
    }

    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      const existe = usuarios.some(
        (u) => u.nombreUsuario === nombreUsuario || u.email === email
      );

      if (existe) {
        this.error = 'El nombre de usuario o el email ya están registrados.';
      } else {
        // 🔧 Aquí agregamos los campos faltantes al objeto
        const usuarioAEnviar = {
          ...this.nuevoUsuario,
          idRol: 1,
          idHermano: null,
          fechaRegistro: new Date().toISOString()
        };

        this.usuarioService.registrarUsuario(usuarioAEnviar).subscribe({
          next: () => {
            this.exito = 'Usuario registrado correctamente.';
            this.nuevoUsuario = {
              nombreUsuario: '',
              email: '',
              contrasenya: ''
            };
          },
          error: () => {
            this.error = 'Error al registrar el usuario.';
          }
        });
      }
    });
  }
}
