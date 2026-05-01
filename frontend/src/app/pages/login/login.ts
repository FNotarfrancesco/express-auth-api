import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  onLogin() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Completá todos los campos';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 429) {
          this.error = 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar al servidor';
        } else {
          this.error = err.error?.errors?.[0] || 'Email o contraseña incorrectos';
        }
        this.cdr.detectChanges();
      }
    });
  }

  loginDemo(role: 'admin' | 'editor' | 'viewer') {
    switch (role) {
      case 'admin':
        this.email = 'admin@example.com';
        this.password = 'admin123+';
        break;
      case 'editor':
        this.email = 'editor@example.com';
        this.password = 'editor123+';
        break;
      case 'viewer': this.email = 'viewer@example.com';
        this.password = 'viewer123+';
        break;
    }
    this.onLogin();
  }

}
