import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Noticia } from '../models/Noticia/noticia';
import { Usuario } from '../models/Usuario/usuario';
import { NoticiaService } from '../services/Noticia/noticia.service';
import { UsuarioService } from '../services/Usuario/usuario.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./noticias.component.css'],
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  usuarios: Usuario[] = [];
  noticiaSeleccionada: Noticia | null = null;

  nuevaNoticia: Partial<Noticia> = {
    titulo: '',
    contenido: '',
    fotoUrl: ''
  };

  usuarioId = localStorage.getItem('usuarioId');
  idRol = localStorage.getItem('idRol');

  constructor(
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarNoticias();
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  cargarNoticias() {
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  seleccionarNoticia(noticia: Noticia) {
    this.noticiaSeleccionada = noticia;
  }

  volverAListado() {
    this.noticiaSeleccionada = null;
  }

  crearNoticia() {
    if (
      this.nuevaNoticia.titulo &&
      this.nuevaNoticia.contenido &&
      this.nuevaNoticia.fotoUrl &&
      this.usuarioId
    ) {
      const noticiaAEnviar: Omit<Noticia, 'id'> = {
        titulo: this.nuevaNoticia.titulo,
        contenido: this.nuevaNoticia.contenido,
        fotoUrl: this.nuevaNoticia.fotoUrl,
        fechaPublicacion: new Date(),
        idUsuario: parseInt(this.usuarioId)
      };

      console.log('Noticia que voy a enviar:', noticiaAEnviar);

      this.noticiaService.crearNoticia(noticiaAEnviar).subscribe(() => {
        alert('Noticia creada');
        this.nuevaNoticia = {
          titulo: '',
          contenido: '',
          fotoUrl: ''
        };
        this.cargarNoticias();
      });
    } else {
      alert('Completa todos los campos para crear la noticia.');
    }
  }




  esAdmin(): boolean {
    return this.idRol === '8';
  }

  getNombreAutor(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.id === idUsuario);
    return usuario ? usuario.nombreUsuario : 'Desconocido';
  }

  eliminarNoticia(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiaService.eliminarNoticia(id).subscribe(() => {
        alert('Noticia eliminada');
        this.cargarNoticias();
        this.noticiaSeleccionada = null; // por si estábamos viendo una en detalle
      });
    }
  }

}
