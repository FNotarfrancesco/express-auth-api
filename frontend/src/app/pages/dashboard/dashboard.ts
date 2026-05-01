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
  productosFiltrados: any[] = [];

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

  statusFiltro: 'todos' | 'disponible' | 'no-disponible' = 'todos';

  descripcionExpandida: string | null = null;

  usuarios: any[] = [];
  editandoUsuarioId: string | null = null;
  usuarioEditandoRol: any = null;
  mostrarModalEliminarUsuario = false;
  usuarioAEliminar: any = null;

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
    this.cargarProductos();
    if (this.esAdmin) {
      this.cargarUsuarios();
    }
  }

  get esAdmin(): boolean {
    return this.usuario?.rol === 'admin';
  }

  get puedeEditar(): boolean {
    return this.usuario?.rol === 'admin' || this.usuario?.rol === 'editor';
  }

  get puedeEliminar(): boolean {
  return this.usuario?.rol === 'admin';
  }

  cargarUsuarios() {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  iniciarEdicionUsuario(usuario: any) {
    this.editandoUsuarioId = usuario._id;
    this.usuarioEditandoRol = { ...usuario };
  }

  guardarRolUsuario() {
    if (!this.editandoUsuarioId || !this.usuarioEditandoRol) return;

    this.authService.updateUserRole(this.editandoUsuarioId, this.usuarioEditandoRol.rol).subscribe({
      next: () => {
        this.editandoUsuarioId = null;
        this.usuarioEditandoRol = null;
        this.cargarUsuarios();
      },
      error: (err) => console.error(err)
    });
  }

  cancelarEdicionUsuario() {
    this.editandoUsuarioId = null;
    this.usuarioEditandoRol = null;
  }

  eliminarUsuario(usuario: any) {
    this.usuarioAEliminar = usuario;
    this.mostrarModalEliminarUsuario = true;
  }

  confirmarEliminarUsuario() {
    if (this.usuarioAEliminar) {
      this.authService.deleteUser(this.usuarioAEliminar._id).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModalEliminarUsuario();
        },
        error: (err) => console.error(err)
      });
    }
  }

cerrarModalEliminarUsuario() {
    this.mostrarModalEliminarUsuario = false;
    this.usuarioAEliminar = null;
  }

  exportarCSV() {
    this.productosService.exportarCSV().subscribe({
      next: (csv) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'productos.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error(err)
    });
  }

  cargarProductos() {
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.extraerCategorias();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  extraerCategorias() {
    const cats = this.productos.map(p => p.categoria).filter(c => c);
    this.categoriasDisponibles = [...new Set(cats)];
  }

  filtrarProductos() {
    let resultado = [...this.productos];

    if (this.terminoBusqueda.trim()) {
      const term = this.terminoBusqueda.toLowerCase();
      resultado = resultado.filter(p => p.nombre.toLowerCase().includes(term));
    }

    if (this.categoriaSeleccionada) {
      resultado = resultado.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.filtroOrden === 'mayor') {
      resultado.sort((a, b) => b.precio - a.precio);
    } else if (this.filtroOrden === 'menor') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (this.filtroOrden === 'az') {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.filtroOrden === 'za') {
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    // Tri-state de disponibilidad
    if (this.statusFiltro === 'disponible') {
      resultado = resultado.filter(p => p.disponible);
    } else if (this.statusFiltro === 'no-disponible') {
      resultado = resultado.filter(p => !p.disponible);
    }

    this.productosFiltrados = resultado;
  }

  crearProducto() {
    this.nuevoProducto.nombre = this.nuevoProducto.nombre.trim();

    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) return;

    if (this.nuevoProducto.stock < 0) {
      this.nuevoProducto.stock = 0;
    }

    if (this.nuevoProducto.precio < 0) {
      this.nuevoProducto.precio = 0;
    }

    this.productosService.create(this.nuevoProducto).subscribe({
      next: () => {
        this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, disponible: true };
        this.cargarProductos();
      },
      error: (err) => console.error(err)
    });
  }

  iniciarEdicion(producto: any) {
    this.editandoId = producto._id;
    this.editandoProducto = { ...producto };
  }

  guardarEdicion() {
    this.editandoProducto.nombre = this.editandoProducto.nombre.trim();

    if (!this.editandoId) return;

    if (this.editandoProducto.stock < 0) {
      this.editandoProducto.stock = 0;
    }

    if (this.editandoProducto.precio < 0) {
      this.editandoProducto.precio = 0;
    }

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
    this.authService.logout();
    this.router.navigate(['/login']);
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

  setStatusFiltro(status: 'todos'|'disponible'|'no-disponible') {
    this.statusFiltro = status;
    this.filtrarProductos();
  }

  toggleDescripcion(id: string) {
    if (this.descripcionExpandida === id) {
      this.descripcionExpandida = null;
    } else {
      this.descripcionExpandida = id;
    }
  }

}
