import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../shared/models/department.model';
import { Login } from '../../shared/models/login.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, { email, password });
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/departments`);
  }
}
