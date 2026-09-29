import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, SignupRequest } from '../../features/auth/models/auth-service'
import { SKIP_LOADING } from '../tokens/loading-context';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private readonly http = inject(HttpClient);
  private readonly apiUrl = "https://ontkicxdgdybdmhojmtb.supabase.co/auth/v1/";

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}signup`,
      data
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}token?grant_type=password`,
        request
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem(
            "accessToken",
            response.access_token
          );
          sessionStorage.setItem(
            "refreshToken",
            response.refresh_token
          );
        })
      );
  }


// save session
saveSession(
    response: LoginResponse,
    rememberMe: boolean
  ): void {

   

    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "accessToken",
      response.access_token
    );

    if (rememberMe) {

      storage.setItem(
        "refreshToken",
        response.refresh_token
      );

      storage.setItem(
        "rememperMe",
        'true'
      );

      const expiresAt =
        Date.now() + (30*24 * 60 * 60*1000 );

      storage.setItem(
        "expireAt",
        expiresAt.toString()
      );
    }
  }

// generate refresh token
   refreshSession(): Observable<LoginResponse> {

    const refreshToken =
      this.getRefreshToken();

    if (!refreshToken) {
      throw new Error(
        'Refresh token not found.'
      );
    }

console.log("refresh session")
    return this.http
      .post<any>(
        `${this.apiUrl}/auth/v1/token?grant_type=refresh_token`,
        {
          refresh_token: refreshToken,
           context: new HttpContext().set(SKIP_LOADING, true)
        }
      )
      .pipe(
        tap((response) => {

          localStorage.setItem(
            "accessToken",
            response.access_token
          );

          localStorage.setItem(
            "refreshToken",
            response.refresh_token
          );
        })
      );
  }

// clear storage
  clearStorage(): void {
     localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    localStorage.removeItem(
      "rememperMe"
    );

    localStorage.removeItem(
      "expireAt"
    );

  
    sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
  }

  // generate access token 

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')?? sessionStorage.getItem('accessToken');
  }

  // get refresh token 

   getRefreshToken(): string | null {

    return  localStorage.getItem(
      "refreshToken")??sessionStorage.getItem(
      "refreshToken"
    );
  }

  // expireAt<date 
  isRememberMeActive(): boolean {

    const rememberMe =
      localStorage.getItem(
        "rememberMe"
      );

    if (rememberMe !== 'true') {
      return false;
    }

    const expiresAt = Number(
      localStorage.getItem(
        "expireAt"
      )
    );

    if (!expiresAt) {
      return false;
    }

    if (Date.now() >= expiresAt) {

      this.clearStorage();

      return false;
    }
console.log("remember active");
    return true;
  }

  isAuthenticated(): boolean {
   
    return !!this.getAccessToken();
  }



  // get user data 
   getUser(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}user`
    );
  }


  // logout
signout(): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}logout`, {});
}
}
