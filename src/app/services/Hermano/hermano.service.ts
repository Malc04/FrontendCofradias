import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hermano } from '../../models/Hermano/hermano';

@Injectable({
  providedIn: 'root'
})
export class HermanoService {
  private apiUrl = 'http://localhost:8080/api/hermanos';

  constructor(private http: HttpClient) {}

  registrarHermano(hermano: Omit<Hermano, 'id' | 'numeroHermano'>): Observable<Hermano> {
    return this.http.post<Hermano>(this.apiUrl, hermano);
  }
  

  getHermanos(): Observable<Hermano[]> {
    return this.http.get<Hermano[]>(this.apiUrl);
  }
  

  obtenerHermanoPorId(id: number) {
    return this.http.get<Hermano>(`http://localhost:8080/api/hermanos/${id}`);
  }
  
  actualizarHermano(id: number, campos: Partial<Hermano>) {
    return this.http.patch<Hermano>(`http://localhost:8080/api/hermanos/${id}/domiciliacion`, campos);
  }
  
}
