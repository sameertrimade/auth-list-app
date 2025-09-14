import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: { email: string } }>('/api/login', { email, password })
      .pipe(
        tap((res) => {
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
