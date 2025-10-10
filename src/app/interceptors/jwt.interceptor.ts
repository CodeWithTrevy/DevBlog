import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const access_token = localStorage.getItem('AccessToken');
    let authReq = req;
    if (access_token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${access_token}` } });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
         
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            return this.http.post<{ accessToken: string }>('/api/auth/refresh', { refreshToken }).pipe(
              switchMap(res => {
                localStorage.setItem('token', res.accessToken);
                
                const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
                return next.handle(retryReq);
              })
            );
          }
        }
        return throwError(() => err);
      })
    );
  }
}
