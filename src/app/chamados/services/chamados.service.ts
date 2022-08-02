import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { Chamado } from '../models/chamado';
import { Pagamento } from '../models/pagamento';
import { PagamentoService } from './pagamento.service';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ChamadosService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/chamados'

  atualizarChamadosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private pagamentoService: PagamentoService,
    private funcionarioService: FuncionarioService,
    private authService: AuthService
  ) { }



  getChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.baseUrl)
  }


  salvarChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.baseUrl, chamado)
  }

  atualizarChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
      .pipe(
        tap((ch) => {
          this.atualizarChamadosSub$.next(true)
        })
      )
  }

  deletarChamado(idChamado: number) {

    return this.http.delete<Chamado>(`${this.baseUrl}/${idChamado}`)
      .pipe(
        tap(
          () => this.atualizarChamadosSub$.next(true)
        )
      )
  }

  cadastrarChamado(chamado: Chamado) {
    return this.http.post<Chamado>(this.baseUrl, chamado).pipe(
      tap(() => this.atualizarChamadosSub$.next(true))
    )
  }

  buscarChamadoPorId(idChamado: number) {
    return this.http.get<Chamado>(`${this.baseUrl}/${idChamado}`)
  }

  editarChamadoePagamento(chamado: Chamado, pagamento?: Pagamento): Observable<Chamado> {
    if (pagamento != null) {
      return this.pagamentoService.editarPagamento(chamado.idChamado!, pagamento).pipe(
        mergeMap(
          (pagamento) => {
            pagamento = pagamento;
            return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
              .pipe(
                tap(() => this.atualizarChamadosSub$.next(true))
              )
          }))
    }
    return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado).pipe(
      tap(() => this.atualizarChamadosSub$.next(true))
    )
  }


  editarChamado(chamado: Chamado, idFuncionario: number): Observable<Chamado> {
    return this.funcionarioService.getFuncionarioById(idFuncionario)
      .pipe(
        mergeMap(
          (funcionario) => {
            chamado.funcionario = funcionario
            return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
          }),
        tap(() => this.atualizarChamadosSub$.next(true))
      )
  }

  saveChamado(chamado:Chamado, idCliente:number, idFuncionario:number) {
    const token = this.authService.recuperarToken()
    
    return this.http.post<Chamado>(`${this.baseUrl}/${idCliente}/${idFuncionario}`,chamado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
   

  }
}







