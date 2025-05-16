import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolService } from '../services/Rol/rol.service';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Rol } from '../models/Rol/rol';
import { Usuario } from '../models/Usuario/usuario'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-gestionrol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionrol.component.html',
  styleUrls: ['./gestionrol.component.css']
})
export class GestionrolComponent implements OnInit {
  roles: Rol[] = [];
  nuevoRol: string = '';
  mostrarInput: boolean = false;
  exito: string = '';
  error: string = '';

  // Para búsqueda de usuario por idHermano
  idHermanoBusqueda: string = '';
  usuarioEncontrado?: Usuario;

  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.obtenerRoles().subscribe({
      next: (data) => this.roles = data,
      error: () => this.error = 'Error al cargar los roles.'
    });
  }

  crearRol(): void {
    if (!this.nuevoRol.trim()) {
      this.error = 'El nombre del rol no puede estar vacío.';
      return;
    }

    this.rolService.crearRol({ id: 0, nombreRol: this.nuevoRol }).subscribe({
      next: () => {
        this.exito = 'Rol creado con éxito.';
        this.nuevoRol = '';
        this.mostrarInput = false;
        this.cargarRoles();
      },
      error: () => this.error = 'Error al crear el rol.'
    });
  }

  eliminarRol(id: number): void {
    this.rolService.eliminarRol(id).subscribe({
      next: () => {
        this.exito = 'Rol eliminado con éxito.';
        this.cargarRoles();
      },
      error: () => this.error = 'Error al eliminar el rol.'
    });
  }

  buscarUsuarioPorIdHermano(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        const encontrado = usuarios.find(u => u.idHermano?.toString() === this.idHermanoBusqueda.trim());
        if (encontrado) {
          this.usuarioEncontrado = encontrado;
          this.exito = 'Usuario encontrado correctamente.';
          this.error = '';
        } else {
          this.usuarioEncontrado = undefined;
          this.error = 'No se encontró ningún usuario con ese número de hermano.';
        }
      },
      error: () => this.error = 'Error al buscar el usuario.'
    });
  }

  actualizarRolUsuario(nuevoRolId: number): void {
    if (!this.usuarioEncontrado?.id) return;
  
    this.usuarioService.actualizarRolUsuario(this.usuarioEncontrado.id, nuevoRolId).subscribe({
      next: () => {
        this.exito = 'Rol actualizado correctamente.';
        this.usuarioEncontrado!.idRol = nuevoRolId;  // Asegura actualización local
      },
      error: () => {
        this.error = 'Error al actualizar el rol del usuario.';
      }
    });
  }
  
}
