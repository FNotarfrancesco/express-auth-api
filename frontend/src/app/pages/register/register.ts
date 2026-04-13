import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirm_password = '';
  code = '';
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  onRegister() {
    this.error = '';
    this.success = '';

    if (!this.name || !this.email || !this.password || !this.confirm_password || !this.code) {
      this.error = 'Completá todos los campos';
      return;
    }

    if (this.password !== this.confirm_password) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 5) {
      this.error = 'La contraseña debe tener al menos 5 caracteres';
      return;
    }

    this.authService.register({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      confirm_password: this.confirm_password,
      code: this.code.trim()
    }).subscribe({
      next: (res) => {
        this.success = 'Usuario creado correctamente';
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.log('Error:', err);
        if (err.status === 429) {
          this.error = 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.';
        } else if (err.error?.errors?.[0]?.message) {
          this.error = err.error.errors[0].message;
        } else if (err.error?.errors?.[0]) {
          this.error = err.error.errors[0];
        } else {
          this.error = 'Error al registrar';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
