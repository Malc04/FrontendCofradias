import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../models/Producto/producto';
import { PedidoService } from '../services/Pedido/pedido.service';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css']
})
export class ResumenCompraComponent implements OnInit {
  carrito: { producto: Producto; cantidad: number }[] = [];
  total: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const datosCarrito = localStorage.getItem('carrito');
    if (datosCarrito) {
      this.carrito = JSON.parse(datosCarrito);
      this.calcularTotal();
    }
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, item) => {
      return sum + item.producto.precio * item.cantidad;
    }, 0);
  }

  comprar(): void {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    const correo = localStorage.getItem('email');

    if (!usuarioId || !correo) return;

    this.pedidoService.realizarPedido(usuarioId, this.carrito, this.total, correo).subscribe({
      next: () => {
        localStorage.removeItem('carrito');
        this.router.navigate(['/historial-compras']);
      },
      error: (err) => {
        console.error('Error al realizar el pedido', err);
      }
    });
  }


  // Escuchamos el evento de volver atrás en el navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    localStorage.removeItem('carrito');
    console.log('Se borró el carrito porque el usuario volvió atrás');
  }
}
