import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { AuthService } from '../../services/auth';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class Dashboard implements OnInit {
  productos: any[] = [];
  nuevoProducto = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, disponible: true };
  editandoId: string | null = null;
  editandoProducto: any = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, disponible: true };
  usuario: any = null;
  mostrarModalLogout = false;
  mostrarModalEliminar = false;
  productoAEliminar: string | null = null;
  terminoBusqueda = '';
  filtroOrden = '';
  categoriaSeleccionada = '';
  categoriasDisponibles: string[] = [];
  productosFiltrados: any[] = [];
  descripcionExpandida: string | null = null;

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarProductos();

    const userData = localStorage.getItem('user');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }

  }

  cargarProductos() {
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.categoriasDisponibles = [...new Set(data.map(p => p.categoria).filter(c => c))];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  crearProducto() {
    this.nuevoProducto.nombre = this.nuevoProducto.nombre.trim();

    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) return;

    this.productosService.create(this.nuevoProducto).subscribe({
      next: () => {
        this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, disponible: true };
        this.cargarProductos();
      },
      error: (err) => console.error(err)
    });
  }

  filtrarProductos() {
    let resultado = [...this.productos];

    if (this.terminoBusqueda) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(termino)
      );
    }

    if (this.categoriaSeleccionada) {
      resultado = resultado.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.filtroOrden === 'mayor') {
      resultado = resultado.sort((a, b) => b.precio - a.precio);
    } else if (this.filtroOrden === 'menor') {
      resultado = resultado.sort((a, b) => a.precio - b.precio);
    } else if (this.filtroOrden === 'az') {
      resultado = resultado.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
    } else if (this.filtroOrden === 'za') {
      resultado = resultado.sort((a, b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase()));
    }

    this.productosFiltrados = resultado;
  }

  iniciarEdicion(producto: any) {
    this.editandoId = producto._id;
    this.editandoProducto = { ...producto };
  }

  guardarEdicion() {
    this.editandoProducto.nombre = this.editandoProducto.nombre.trim();

    if (!this.editandoId) return;

    this.productosService.update(this.editandoId, this.editandoProducto).subscribe({
      next: () => {
        this.editandoId = null;
        this.cargarProductos();
      },
      error: (err) => console.error(err)
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  eliminarProducto(id: string) {
    this.productoAEliminar = id;
    this.mostrarModalEliminar = true;
  }

  confirmarEliminar() {
    if (this.productoAEliminar) {
      this.productosService.delete(this.productoAEliminar).subscribe({
        next: () => {
          this.cargarProductos();
          this.cerrarModalEliminar();
        },
        error: (err) => console.error(err)
      });
    }
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.productoAEliminar = null;
  }


  logout() {
    this.mostrarModalLogout = true;
  }

  confirmarLogout() {
    this.mostrarModalLogout = false;
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err)
    });
  }

  cerrarModalLogout() {
    this.mostrarModalLogout = false;
  }


  toggleCheckbox(tipo: string) {
    if (tipo === 'nuevo') {
      this.nuevoProducto.disponible = !this.nuevoProducto.disponible;
    } else if (tipo === 'edit') {
      this.editandoProducto.disponible = !this.editandoProducto.disponible;
    }
  }

  toggleDescripcion(id: string) {
    if (this.descripcionExpandida === id) {
      this.descripcionExpandida = null;
    } else {
      this.descripcionExpandida = id;
    }
  }

}
