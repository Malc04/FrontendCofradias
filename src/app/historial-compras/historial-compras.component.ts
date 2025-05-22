import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComprasService } from '../services/historialCompras/historial-compras.service';
import { Pedido } from '../models/Pedido/pedido';
import { DetallePedido } from '../models/DetallePedido/detalle-pedido';
import { Comentario } from '../models/Comentario/comentario';
import { Producto } from '../models/Producto/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
  usuarioId!: number;
  pedidos: Pedido[] = [];
  detalles: { [pedidoId: number]: DetallePedido[] } = {};
  comentarios: { [productoId: number]: Comentario } = {};
  productos: Producto[] = [];
  pedidoAbiertoId: number | null = null;


  constructor(private historialService: HistorialComprasService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (!id) return;
    this.usuarioId = +id;

    this.historialService.getPedidos(this.usuarioId).subscribe(pedidos => {
      this.pedidos = pedidos;
      this.cargarProductos();

      pedidos.forEach(p => {
        this.historialService.getDetallesPedido(p.id).subscribe(dp => {
          this.detalles[p.id] = dp;
        });

        this.historialService.getComentariosPedido(p.id).subscribe(coms => {
          coms.forEach(c => {
            this.comentarios[c.idProducto] = c;
          });
        });
      });
    });
  }

  cargarProductos() {
    this.historialService.getProductos().subscribe(p => this.productos = p);
  }

  getProducto(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  guardarComentario(productoId: number, pedidoId: number, contenido: string, valoracion: number) {
    const existente = this.comentarios[productoId];

    if (existente && existente.id && existente.id !== 0) {
      // Si ya existe, actualiza (PUT)
      const actualizado: Comentario = {
        ...existente,
        contenido,
        valoracion
        // Nota: no actualizamos fechaComentario al editar
      };

      this.historialService.actualizarComentario(actualizado.id, actualizado)
        .subscribe(c => this.comentarios[productoId] = c);
    } else {
      // Si no existe, crea (POST) quitando 'id'
      const nuevoComentario: Omit<Comentario, 'id'> = {
        idUsuario: this.usuarioId,
        idProducto: productoId,
        idPedido: pedidoId,
        contenido,
        valoracion,
        fechaComentario: new Date()
      };

      this.historialService.crearComentario(nuevoComentario)
        .subscribe(c => this.comentarios[productoId] = c);
    }
  }



  toggleDetalles(pedidoId: number) {
    this.pedidoAbiertoId = this.pedidoAbiertoId === pedidoId ? null : pedidoId;
  }

  getComentario(productoId: number): Comentario {
    if (!this.comentarios[productoId]) {
      this.comentarios[productoId] = {
        id: 0,
        idProducto: productoId,
        idUsuario: this.usuarioId,
        idPedido: 0,  // Este lo pondremos dinámicamente cuando se guarde el comentario
        contenido: '',
        valoracion: 0,
        fechaComentario: new Date()
      };
    }
    return this.comentarios[productoId];
  }


}
