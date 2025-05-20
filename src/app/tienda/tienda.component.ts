import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductoService } from '../services/Producto/producto.service';
import { Producto } from '../models/Producto/producto';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  productoExpandido: number | null = null;
  carrito: { producto: Producto; cantidad: number }[] = [];
  mostrarCarrito: boolean = false;
  sesionIniciada: boolean = false;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const usuarioId = localStorage.getItem('usuarioId');
    this.sesionIniciada = !!usuarioId;
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
    window.addEventListener('beforeunload', this.limpiarCarritoAlSalir);
  }

  ngOnDestroy(): void {
    this.limpiarCarritoAlSalir();
    window.removeEventListener('beforeunload', this.limpiarCarritoAlSalir);
  }

  toggleDetalle(id: number): void {
    this.productoExpandido = this.productoExpandido === id ? null : id;
  }

  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  anadirAlCarrito(producto: Producto) {
    const index = this.carrito.findIndex(item => item.producto.id === producto.id);
    if (index !== -1) {
      this.carrito[index].cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  reducirCantidad(productoId: number) {
    const index = this.carrito.findIndex(item => item.producto.id === productoId);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        this.carrito.splice(index, 1);
      }
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  limpiarCarritoAlSalir = () => {
    localStorage.removeItem('carrito');
  };

  finalizarCompra() {
    this.router.navigate(['/resumen-compra']);
  }

}
