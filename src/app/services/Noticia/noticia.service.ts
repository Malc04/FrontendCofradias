import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../../models/Noticia/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private apiUrl = 'http://localhost:8080/api/noticias';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  crearNoticia(noticia: Omit<Noticia, 'id'>): Observable<Noticia> {
    return this.http.post<Noticia>(this.apiUrl, noticia);
  }
  

  getNoticiaById(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  eliminarNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
