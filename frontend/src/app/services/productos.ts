import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'https://express-auth-api-u3p2.onrender.com/api/v1/productos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto, { withCredentials: true });
  }

  update(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, { withCredentials: true });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  exportarCSV(): Observable<any> {
    return this.http.get(`${this.apiUrl}/export`, { withCredentials: true, responseType: 'text' });
  }
}
