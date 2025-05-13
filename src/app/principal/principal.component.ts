import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Usuario } from '../models/Usuario/usuario';  // Asegúrate de importar la interfaz correctamente
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],  // Añade CommonModule aquí
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuarios: Usuario[] = [];  // Usamos la interfaz aquí

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Especificamos que el parámetro 'data' es de tipo 'Usuario[]'
    this.usuarioService.obtenerUsuarios().subscribe((data: Usuario[]) => {  // Ahora 'data' tiene el tipo correcto
      this.usuarios = data;
    });
  }
}
