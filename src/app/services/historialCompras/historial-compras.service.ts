import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../../models/Pedido/pedido';
import { DetallePedido } from '../../models/DetallePedido/detalle-pedido';
import { Comentario } from '../../models/Comentario/comentario';
import { Producto } from '../../models/Producto/producto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistorialComprasService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getPedidos(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos/usuario/${usuarioId}`);
  }

  getDetallesPedido(pedidoId: number): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(`${this.apiUrl}/detalles-pedido/pedido/${pedidoId}`);
  }

  getComentariosPedido(pedidoId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comentarios/pedido/${pedidoId}`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  crearComentario(comentario: Omit<Comentario, 'id'>) {
    return this.http.post<Comentario>(`${this.apiUrl}/comentarios`, comentario);
  }


  actualizarComentario(id: number, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/comentarios/${id}`, comentario);
  }
}

