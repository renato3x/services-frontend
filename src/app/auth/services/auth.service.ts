import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmarLogoutComponent } from 'src/app/funcionarios/components/confirmar-logout/confirmar-logout.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'http://localhost:8080'
  private jwt = new JwtHelperService() // esse objeto permitirá saber se o token está válido ou não
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  signIn(user: User): Observable<{ Authorization: string }> {
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, user)
    .pipe(
      tap((response) => {
        this.armazenarToken(response.Authorization)
      })
    )
  }

  signOut(): void {
    this.dialog
      .open(ConfirmarLogoutComponent)
      .afterClosed()
      .subscribe((sair) => {
        if (sair) {
          this.removerToken()
          
          this.router.navigateByUrl('/auth/login')

          this.snackBar.open('Deslogado com sucesso!!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }
      });
  }

  armazenarToken(token: string): void {
    localStorage.setItem('authorization', token)
  }

  removerToken(): any {
    localStorage.removeItem('authorization')
  }

  recuperarToken(): string | null {
    return localStorage.getItem('authorization')
  }

  logado(): boolean {
    // o usuário estará logado se o token estiver armazenado
    // e o token ainda for válido
    const token = this.recuperarToken()

    if (token == null) {
      return false
    }
    return !this.jwt.isTokenExpired(token) // testando a validade do token
  }

  
}
