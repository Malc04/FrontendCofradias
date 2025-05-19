import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandejaNoticia } from '../../models/BandejaNoticia/bandeja-noticia';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BandejaNoticiaService {
  private apiUrl = 'http://localhost:8080/api/bandeja-noticias';

  constructor(private http: HttpClient) {}

  crearBandejaNoticia(bandeja: Omit<BandejaNoticia, 'id'>): Observable<BandejaNoticia> {
    return this.http.post<BandejaNoticia>(this.apiUrl, bandeja);
  }

  getNotificacionesPorUsuario(idUsuario: number) {
    return this.http.get<BandejaNoticia[]>(`http://localhost:8080/api/bandeja-noticias/usuario/${idUsuario}`);
  }  
}
