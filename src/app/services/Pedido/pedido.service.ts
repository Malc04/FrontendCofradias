import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/Producto/producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  realizarPedido(usuarioId: number, carrito: { producto: Producto; cantidad: number; }[], total: number, correo: string): Observable<any> {
    const pedido = {
      idUsuario: usuarioId,
      total,
      correo,
      productos: carrito.map(item => ({
        idProducto: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio
      }))
    };

    return this.http.post(`${this.apiUrl}/realizar`, pedido);
  }

  obtenerHistorialPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
