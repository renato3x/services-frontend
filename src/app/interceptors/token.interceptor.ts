import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const baseUrl = "http://localhost:8080";
    const token = this.authService.recuperarToken();
    if(request.url.substring(0, baseUrl.length) == baseUrl){
      if(token){
        const clone = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(clone)
      }
    }
    return next.handle(request);
  }
}
