import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuartelillo } from '../../models/Cuartelillo/cuartelillo';

@Injectable({
  providedIn: 'root'
})
export class CuartelilloService {
  private baseUrl = 'http://localhost:8080/api/cuartelillos';

  constructor(private http: HttpClient) { }

  getDonativos(): Observable<Cuartelillo[]> {
    return this.http.get<Cuartelillo[]>(this.baseUrl);
  }

  crearDonativo(donativo: Partial<Cuartelillo>): Observable<Cuartelillo> {
    return this.http.post<Cuartelillo>(this.baseUrl, donativo);
  }
}
