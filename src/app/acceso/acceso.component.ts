import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Usuario } from '../models/Usuario/usuario';
import * as bcrypt from 'bcryptjs';

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

  loginUsuario = {
    login: '', // puede ser nombreUsuario o email
    contrasenya: ''
  };

  error: string = '';
  exito: string = '';
  loginError: string = '';
  loginExito: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

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
        const usuarioAEnviar: Usuario = {
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

  iniciarSesion() {
    this.loginError = '';
    this.loginExito = '';

    const { login, contrasenya } = this.loginUsuario;

    if (!login || !contrasenya) {
      this.loginError = 'Todos los campos son obligatorios.';
      return;
    }

    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find(
        (u) => u.nombreUsuario === login || u.email === login
      );

      if (!usuario) {
        this.loginError = 'Usuario no encontrado.';
        return;
      }

      bcrypt.compare(contrasenya, usuario.contrasenya, (err, esValida) => {
        if (esValida) {
          localStorage.setItem('usuarioId', usuario.id?.toString() || '');
          localStorage.setItem('nombreUsuario', usuario.nombreUsuario);
          localStorage.setItem('email', usuario.email);
          localStorage.setItem('idRol', usuario.idRol?.toString() || '');
          localStorage.setItem('idHermano', usuario.idHermano != null ? usuario.idHermano.toString() : '');

          this.loginError = '';
          this.loginExito = 'Sesión iniciada correctamente.';

          this.router.navigate(['/']);
        } else {
          this.loginError = 'Contraseña incorrecta.';
        }
      });
    });
  }
}
