import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@app/core/services';
import { environment } from '@envs/environment.development';
import { tap } from 'rxjs';
import { AuthDto, AuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly httpClient: HttpClient,
  ) {}

  signIn(body: AuthDto) {
    return this.httpClient
      .post<AuthResponse>(`${environment.apiUrl}/auth/sign-in`, body)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        }),
      );
  }

  signOut() {
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isValidToken();
  }
}
