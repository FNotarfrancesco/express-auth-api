import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://express-auth-api-u3p2.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string; confirm_password: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { withCredentials: true });
  }

  updateUserRole(userId: string, rol: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/rol`, { rol }, { withCredentials: true });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { withCredentials: true });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
