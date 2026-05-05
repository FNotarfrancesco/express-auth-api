import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'https://express-auth-api-u3p2.onrender.com/api/v1/productos';

  constructor(private http: HttpClient) { }

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  create(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto, this.getHeaders());
  }

  update(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, this.getHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  exportarCSV(): Observable<any> {
    return this.http.get(`${this.apiUrl}/export`, { ...this.getHeaders(), responseType: 'text' });
  }
}
