import { Component, OnInit, HostListener } from '@angular/core';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { BandejaNoticiaService } from '../services/BandejaNoticia/bandeja-noticia.service';
import { NoticiaService } from '../services/Noticia/noticia.service';
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
  hayUsuario: boolean = false;

  notificaciones: {
    id: number;
    idUsuario: number;
    idNoticia: number;
    tipoNoticia: string;
    tituloNoticia?: string;
  }[] = [];

  mostrarNotificaciones = false;

  constructor(
    private usuarioService: UsuarioService,
    private bandejaNoticiaService: BandejaNoticiaService,
    private noticiaService: NoticiaService
  ) {
    const idRol = localStorage.getItem('idRol');
    this.esRol8 = idRol === '8';
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
    this.hayUsuario = localStorage.getItem('usuarioId') !== null;

    if (this.haySesion()) {
      const usuarioId = Number(localStorage.getItem('usuarioId'));
      this.cargarNotificaciones(usuarioId);
    }
  }

  haySesion(): boolean {
    return !!localStorage.getItem('usuarioId');
  }

  cerrarSesion(): void {
    localStorage.clear();
    location.reload();
  }

  obtenerNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') || '';
  }

  cargarNotificaciones(usuarioId: number): void {
    this.bandejaNoticiaService.getNotificacionesPorUsuario(usuarioId).subscribe(bandeja => {
      this.notificaciones = bandeja;

      this.notificaciones.forEach(notif => {
        this.noticiaService.getNoticiaById(notif.idNoticia).subscribe(noticia => {
          notif.tituloNoticia = noticia.titulo;
        });
      });
    });
  }

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

  cerrarNotificaciones(): void {
    this.mostrarNotificaciones = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.notificaciones');
    if (!clickedInside) {
      this.cerrarNotificaciones();
    }
  }
}
