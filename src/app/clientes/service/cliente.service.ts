import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from 'src/app/funcionarios/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl = "http://localhost:8080/servicos/clientes"
  public atualizar$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient
  ) { }

  pegarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl)
  }

  pegarClientePeloId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`)
  }

  deletarCliente(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.atualizar$.next(true)
      })
    )
  }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente)
  }

  atualizarCliente(cliente: Cliente) {
    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.idCliente}`, cliente).pipe(
      tap(() => {
        this.atualizar$.next(true)
      })
    )
  }
}
