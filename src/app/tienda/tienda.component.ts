import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { ProductoService } from '../services/Producto/producto.service';
import { Producto } from '../models/Producto/producto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  productoExpandido: number | null = null;
  carrito: { producto: Producto; cantidad: number }[] = [];
  mostrarCarrito: boolean = false;
  sesionIniciada: boolean = false;
  rutaPermitida = '/resumen-compra';
  navegandoARutaPermitida = false;
  routerSubscription!: Subscription;

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

    // Detectar navegación dentro de Angular
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === this.rutaPermitida) {
          this.navegandoARutaPermitida = true;
        } else {
          this.limpiarCarritoAlSalir();
        }
      }
    });

    // Detectar recarga o cierre de pestaña
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  ngOnDestroy(): void {
    if (!this.navegandoARutaPermitida) {
      this.limpiarCarritoAlSalir();
    }
    this.routerSubscription?.unsubscribe();
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // Si no se va a la ruta permitida, limpiar carrito
    if (!this.navegandoARutaPermitida) {
      this.limpiarCarritoAlSalir();
    }
  };

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
    this.navegandoARutaPermitida = true;
    this.router.navigate(['/resumen-compra']);
  }
}
