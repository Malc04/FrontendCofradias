import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Usuario } from '../models/Usuario/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuarios: Usuario[] = [];
  esRol8: boolean = false;

  constructor(private usuarioService: UsuarioService) { 
    {
      const idRol = localStorage.getItem('idRol');
      this.esRol8 = idRol === '8';
    }
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  // Muestra el botón si hay un usuario guardado
  haySesion(): boolean {
    return !!localStorage.getItem('usuarioId');
  }

  cerrarSesion(): void {
    localStorage.clear(); // Elimina todo lo guardado
    location.reload();    // Recarga la página
  }

  obtenerNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') || '';
  }

}
