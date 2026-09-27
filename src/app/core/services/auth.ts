import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest } from '../../features/auth/models/signup-request';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private readonly http = inject(HttpClient);
  private readonly apiUrl = "https://ontkicxdgdybdmhojmtb.supabase.co/auth/v1";

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/signup`,
      data
    );
  }

 

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
