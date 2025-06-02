import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Noticia } from '../models/Noticia/noticia';
import { Usuario } from '../models/Usuario/usuario';
import { NoticiaService } from '../services/Noticia/noticia.service';
import { UsuarioService } from '../services/Usuario/usuario.service';
import { RolService } from '../services/Rol/rol.service';
import { BandejaNoticiaService } from '../services/BandejaNoticia/bandeja-noticia.service';
import { Rol } from '../models/Rol/rol';

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
  mostrarFormularioCreacion = false;


  roles: Rol[] = [];
  rolSeleccionadoId: string = '';
  tipoNoticia: string = '';


  nuevaNoticia: Partial<Noticia> = {
    titulo: '',
    contenido: '',
    fotoUrl: ''
  };

  usuarioId = localStorage.getItem('usuarioId');
  idRol = localStorage.getItem('idRol');

  constructor(
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private bandejaNoticiaService: BandejaNoticiaService
  ) { }


  ngOnInit() {
    this.cargarNoticias();
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
    this.rolService.obtenerRoles().subscribe(data => {
      this.roles = data;
    });
  }


  cargarNoticias() {
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data.sort((a, b) => {
        return new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime();
      });
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

      this.noticiaService.crearNoticia(noticiaAEnviar).subscribe((nuevaNoticiaCreada) => {
        alert('Noticia creada');
        this.cargarNoticias();
        this.nuevaNoticia = {
          titulo: '',
          contenido: '',
          fotoUrl: ''
        };

        if (this.rolSeleccionadoId && this.tipoNoticia) {
          const usuariosFiltrados = this.usuarios.filter(
            u => u.idRol === parseInt(this.rolSeleccionadoId)
          );

          console.log('Usuarios con rol seleccionado:', usuariosFiltrados);

          usuariosFiltrados.forEach(usuario => {
            if (usuario.id !== undefined) {
              const notificacion = {
                idUsuario: usuario.id,
                idNoticia: nuevaNoticiaCreada.id,
                tipoNoticia: this.tipoNoticia
              };

              console.log('Creando notificación:', notificacion);

              this.bandejaNoticiaService.crearBandejaNoticia(notificacion).subscribe({
                next: () => console.log(`✅ Notificación enviada a ${usuario.nombreUsuario}`),
                error: err => console.error(`❌ Error al enviar notificación:`, err)
              });
            }
          });
        }


        this.rolSeleccionadoId = '';
        this.tipoNoticia = '';
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
        this.noticiaSeleccionada = null;
      });
    }
  }

}
