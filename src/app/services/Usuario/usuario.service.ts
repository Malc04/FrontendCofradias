import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUsuarioUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUsuarioUrl);
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUsuarioUrl, usuario);
  }

  actualizarIdHermano(usuarioId: number, idHermano: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUsuarioUrl}/${usuarioId}`, { idHermano });
  }

  actualizarRolUsuario(idUsuario: number, nuevoRolId: number): Observable<any> {
    return this.http.patch(`http://localhost:8080/api/usuarios/${idUsuario}/rol`, {
      idRol: nuevoRolId
    });
  }

  obtenerUsuarioPorId(id: number) {
    return this.http.get<Usuario>(`http://localhost:8080/api/usuarios/${id}`);
  }

  actualizarUsuario(id: number, campos: Partial<Usuario>) {
    return this.http.patch<Usuario>(`http://localhost:8080/api/usuarios/${id}/nombre`, campos);
  }

}