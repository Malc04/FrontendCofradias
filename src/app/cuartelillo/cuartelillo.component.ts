import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuartelilloService } from '../services/Cuartelillo/cuartelillo.service';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { Cuartelillo } from '../models/Cuartelillo/cuartelillo';
import { Usuario } from '../models/Usuario/usuario';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuartelillo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuartelillo.component.html',
  styleUrls: ['./cuartelillo.component.css'],
  providers: [CurrencyPipe, DatePipe]
})
export class CuartelilloComponent implements OnInit {

  donativos: Cuartelillo[] = [];
  usuarios: Usuario[] = [];
  esAdmin: boolean = false;
  nuevoMonto: number | null = null;
  usuarioId: string | null = null;

  constructor(
    private cuartelilloService: CuartelilloService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    const rol = localStorage.getItem('idRol');
    this.esAdmin = (rol === '8');

    this.cargarDonativos();
    if (this.esAdmin) {
      this.cargarUsuarios();
    }

    this.usuarioId = localStorage.getItem('usuarioId');
    if (this.usuarioId) {
    }
  }

  cargarDonativos() {
    this.cuartelilloService.getDonativos().subscribe(data => {
      this.donativos = data;
    });
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  nombreUsuario(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.id === idUsuario);
    return usuario ? usuario.nombreUsuario : 'Desconocido';
  }

  agregarDonativo() {
    if (!this.nuevoMonto || this.nuevoMonto <= 0) {
      alert('Introduce un monto válido');
      return;
    }
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    if (!usuarioId) {
      alert('No se encontró usuario logueado');
      return;
    }

    const nuevoDonativo: Partial<Cuartelillo> = {
      idUsuario: usuarioId,
      montoDonativo: this.nuevoMonto,
      fecha: new Date()
    };

    this.cuartelilloService.crearDonativo(nuevoDonativo).subscribe(() => {
      alert('Donativo registrado correctamente');
      this.nuevoMonto = null;
      this.cargarDonativos();
    }, error => {
      alert('Error al registrar donativo');
    });
  }

  get montoTotal(): number {
    return this.donativos.reduce((acc, d) => acc + d.montoDonativo, 0);
  }

}
