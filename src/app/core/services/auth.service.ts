import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../../shared/models/login-request.model';
import { LoginResponse } from '../../shared/models/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  login(email: string, password: string) {
    const loginCredentials: LoginRequest = { email, password };
    return this.http.post<LoginResponse>('/api/login', loginCredentials).pipe(
      tap((res: LoginResponse) => {
        this.cookie.set('auth_token', res.token, { path: '/', secure: true });
        this.cookie.set('user_email', res.user.email, { path: '/' });
      }),
    );
  }

  logout() {
    this.cookie.delete('auth_token', '/');
    this.cookie.delete('user_email', '/');
  }

  isAuthenticated() {
    return this.cookie.check('auth_token');
  }
  getToken() {
    return this.cookie.get('auth_token');
  }
  getUserEmail() {
    return this.cookie.get('user_email');
  }
}
