import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/pagamentos'
  atualizarPagamentosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPagamentos(): Observable<Pagamento[]> {
    const token = this.authService.recuperarToken()

    return this.http.get<Pagamento[]>(this.baseUrl)
  }

  /* deletePagamentos(pag: Pagamento): Observable<any> {
    const token = this.authService.recuperarToken()

      return this.http.delete<any>(`${this.baseUrl}/${pag.idPagamento}`)
  } */

  getPagamentoById(id: number): Observable<Pagamento>{
    const token = this.authService.recuperarToken()

    return this.http.get<Pagamento>(`${this.baseUrl}/${id}`)
  }

  salvarPagamento(pag: Pagamento, idChamado: number): Observable<Pagamento>{
    return this.http.post<Pagamento>(`${this.baseUrl}/${idChamado}`, pag)
  }

  atualizarPagamento(pag: Pagamento): Observable<Pagamento>{
    return this.http.put<Pagamento>(`${this.baseUrl}/${pag.idPagamento}`, pag)
    .pipe(
      tap((pagamento) => {
        this.atualizarPagamentosSub$.next(true)
      })
    )
  }
}
